import { useEffect, useRef } from 'react';
import { getEvents } from '../analytics';

function getSessionId() {
  let id = sessionStorage.getItem('_sid');
  if (!id) { id = crypto.randomUUID(); sessionStorage.setItem('_sid', id); }
  return id;
}

function isReturning() {
  const was = localStorage.getItem('_rv') === '1';
  localStorage.setItem('_rv', '1');
  return was;
}

function getPageLoadMs() {
  try {
    const nav = performance.getEntriesByType('navigation')[0];
    return Math.round(nav?.loadEventEnd - nav?.startTime) || 0;
  } catch { return 0; }
}

export function useAnalytics() {
  const sectionsTime = useRef({});
  const sectionStart = useRef({});
  const scrollDepth = useRef(0);
  const cursorQuadrant = useRef('');
  const idleStart = useRef(null);
  const totalIdleMs = useRef(0);
  const idleTimer = useRef(null);
  const startTime = useRef(Date.now());
  const flushed = useRef(false);

  const SESSION_ID = useRef(getSessionId()).current;
  const RETURNING = useRef(isReturning()).current;
  const PAGE_LOAD_MS = useRef(getPageLoadMs()).current;

  useEffect(() => {
    function resetIdle() {
      if (idleStart.current !== null) {
        totalIdleMs.current += Date.now() - idleStart.current;
        idleStart.current = null;
      }
      clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        idleStart.current = Date.now();
      }, 30000);
    }

    // -- Copy events --
    const onCopy = () => {
      const sel = window.getSelection()?.toString().slice(0, 120) || '';
      // imported dynamically to avoid circular dep at module parse time
      import('../analytics').then(m => m.trackEvent('copy', { selection: sel }));
    };
    document.addEventListener('copy', onCopy);

    // -- Cursor quadrant (throttled) --
    let lastMove = 0;
    const onMove = (e) => {
      resetIdle();
      const now = Date.now();
      if (now - lastMove < 500) return;
      lastMove = now;
      const qx = e.clientX / window.innerWidth < 0.5 ? 'L' : 'R';
      const qy = e.clientY / window.innerHeight < 0.5 ? 'T' : 'B';
      cursorQuadrant.current = qy + qx;
    };
    window.addEventListener('mousemove', onMove);

    // -- Scroll depth --
    const onScroll = () => {
      resetIdle();
      const el = document.documentElement;
      const pct = Math.round((el.scrollTop / (el.scrollHeight - el.clientHeight || 1)) * 100);
      if (pct > scrollDepth.current) scrollDepth.current = pct;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // -- Keyboard / touch (reset idle) --
    window.addEventListener('keydown', resetIdle);
    window.addEventListener('touchstart', resetIdle, { passive: true });

    // -- Section time tracking (IntersectionObserver + MutationObserver) --
    const observed = new WeakSet();
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        const name = e.target.dataset.section;
        if (!name) return;
        if (e.isIntersecting) {
          sectionStart.current[name] = Date.now();
        } else if (sectionStart.current[name]) {
          sectionsTime.current[name] = (sectionsTime.current[name] || 0) + (Date.now() - sectionStart.current[name]);
          delete sectionStart.current[name];
        }
      });
    }, { threshold: 0.4 });

    function observeNewSections() {
      document.querySelectorAll('[data-section]').forEach(el => {
        if (!observed.has(el)) {
          io.observe(el);
          observed.add(el);
        }
      });
    }

    observeNewSections();
    const mo = new MutationObserver(observeNewSections);
    mo.observe(document.body, { childList: true, subtree: true });

    // -- Flush --
    function flush() {
      if (flushed.current) return;
      flushed.current = true;

      // Close any still-open section timers
      Object.entries(sectionStart.current).forEach(([name, start]) => {
        sectionsTime.current[name] = (sectionsTime.current[name] || 0) + (Date.now() - start);
      });

      // Close any open idle period
      if (idleStart.current !== null) {
        totalIdleMs.current += Date.now() - idleStart.current;
      }

      const payload = {
        session_id: SESSION_ID,
        screen: `${window.screen.width}x${window.screen.height}`,
        colorScheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
        localHour: new Date().getHours(),
        returning: RETURNING,
        sessionDuration: Date.now() - startTime.current,
        pageLoadMs: PAGE_LOAD_MS,
        idleTime: totalIdleMs.current,
        sections: sectionsTime.current,
        scrollDepth: scrollDepth.current,
        cursorQuadrant: cursorQuadrant.current,
        events: getEvents(),
      };

      const url = `${import.meta.env.VITE_BACKEND_URL || ''}/track`;
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });

      // sendBeacon is unreliable on iOS Safari — fall back to fetch with keepalive
      const sent = navigator.sendBeacon(url, blob);
      if (!sent) {
        fetch(url, { method: 'POST', body: blob, keepalive: true }).catch(() => {});
      }
    }

    const onHide = () => { if (document.visibilityState === 'hidden') flush(); };
    document.addEventListener('visibilitychange', onHide);
    window.addEventListener('pagehide', flush);
    // iOS fires freeze when the page is put in back/forward cache
    window.addEventListener('freeze', flush);

    resetIdle();

    return () => {
      document.removeEventListener('copy', onCopy);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', resetIdle);
      window.removeEventListener('touchstart', resetIdle);
      document.removeEventListener('visibilitychange', onHide);
      window.removeEventListener('pagehide', flush);
      window.removeEventListener('freeze', flush);
      io.disconnect();
      mo.disconnect();
      clearTimeout(idleTimer.current);
    };
  }, []);
}
