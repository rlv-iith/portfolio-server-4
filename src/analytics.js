// Singleton event accumulator — import trackEvent anywhere, useAnalytics flushes it
const _events = [];

export function trackEvent(type, data = {}) {
  _events.push({ type, data, t: Date.now() });
}

export function getEvents() {
  return [..._events];
}

// 4-digit session token — same value sent with /log and /track for cross-referencing
function makeToken() {
  let t = sessionStorage.getItem('_stok');
  if (!t) {
    t = String(Math.floor(1000 + Math.random() * 9000));
    sessionStorage.setItem('_stok', t);
  }
  return t;
}

export const SESSION_TOKEN = makeToken();
