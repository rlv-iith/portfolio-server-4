// src/pages/Landing.jsx
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useRole } from '../context/RoleContext';
import { Briefcase, /* FlaskConical, */ ArrowRight, Heart, Medal, Star, Github, Linkedin, Mail, Send } from 'lucide-react';
import Hero3D from '../components/Hero3D';
import Footer from '../components/Footer';
import { trackEvent, SESSION_TOKEN } from '../analytics';
import { LINKS } from '../data/links.config';
import { GALLERY_META, GALLERY_FALLBACK } from '../data/gallery.config';

// Auto-import every image dropped into src/assets/gallery/ ─────────────────
// To add a photo: drop it in that folder, then add metadata in gallery.config.js
const _rawGallery = import.meta.glob(
  '../assets/gallery/*.{jpg,jpeg,png,webp,gif,JPG,JPEG,PNG,WEBP,GIF}',
  { eager: true, query: '?url', import: 'default' }
);
const GALLERY_IMAGES = Object.entries(_rawGallery).map(([path, url]) => ({
  filename: path.split('/').pop(),
  url,
}));

const cards = [
  { id: 'recruiter', title: "RECRUITER", subtitle: "CORPORATE", icon: <Briefcase size={32} />, desc: "Resume, Impact Metrics & Professional Summary.", border: "border-blue-500/50", glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]", position: "right" },
  // { id: 'professor', title: "RESEARCHER", subtitle: "ACADEMIC", icon: <FlaskConical size={32} />, desc: "Methodology, Publications, Lab Protocols.", border: "border-emerald-500/50", glow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]", position: "left" },
];

const achievements = [
  { label: "National Finalist", sub: "Finshield Hackathon 2025", color: "text-yellow-400" },
  { label: "Cash Prize Winner", sub: "Mitsubishi 3D Tech 2024", color: "text-yellow-400" },
  { label: "Research Intern", sub: "IISc Bangalore", color: "text-blue-400" },
  { label: "Under-review Paper", sub: "Micro-supercapacitors · ElectroChem", color: "text-emerald-400" },
  { label: "AIR 13665", sub: "JEE Advanced", color: "text-gray-300" },
];
const extras = [
  { title: "NATIONAL SOCIAL SERVICE", subtitle: "100+ HOURS SERVICE", icon: <Heart size={24} />, desc: "Community leadership & social impact initiatives.", color: "text-rose-400", border: "border-rose-500/30" },
  { title: "NATIONAL CADET CORPS", subtitle: "CADET / DISCIPLINE", icon: <Medal size={24} />, desc: "Military training, leadership & team coordination.", color: "text-yellow-400", border: "border-yellow-500/30" },
  { title: "SHOTOKAN KARATE", subtitle: "BLACK BELT (SHODAN)", icon: <Star size={24} />, desc: "National Player. Focus, discipline & perseverance.", color: "text-white", border: "border-white/30" },
];

// REUSABLE PERSONA CARD COMPONENT
const PersonaCard = ({ card, index, onSelect }) => (
  <motion.button
    key={card.id}
    initial={{ opacity: 0, x: card.position === 'left' ? -100 : 100 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.5 + index * 0.1, type: "tween", duration: 0.4 }}
    onClick={() => onSelect(card.id)}
    whileHover={{ scale: 1.05, x: card.position === 'left' ? 10 : -10 }}
    className={`glass-panel group relative w-full max-w-[350px] min-h-[240px] p-6 rounded-3xl text-left transition-all duration-300 hover:bg-white/10 ${card.border} border ${card.glow} shadow-lg hover:shadow-2xl`}
  >
    <div className="flex flex-col h-full justify-between">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-white/5 rounded-xl text-white group-hover:scale-110 transition-transform">
          {card.icon}
        </div>
        <span className="text-[10px] uppercase tracking-widest text-gray-400 border border-white/20 px-2 py-1 rounded">
          {card.subtitle}
        </span>
      </div>
      <div>
        <h3 className="text-xl font-bold text-white mb-2 brand-font">
          {card.title}
        </h3>
        <p className="text-xs text-gray-300 leading-relaxed font-sans opacity-80 group-hover:opacity-100">
          {card.desc}
        </p>
      </div>
      <div className="text-blue-400 text-xs font-bold pt-4 mt-auto flex items-center gap-2 group-hover:text-white transition-colors">
        INITIALIZE_ <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform"/>
      </div>
    </div>
  </motion.button>
);

// ─── MULTIMEDIA PHOTO COLLAGE ────────────────────────────────────────────────
// Diamond layout: rows of [1, 3, 5, 5, 3, 1] images = 18 max
const DIAMOND_ROWS = [1, 3, 5, 5, 3, 1];

const GalleryItem = ({ img }) => {
  const meta = GALLERY_META[img.filename] || GALLERY_FALLBACK;
  return (
    <motion.div
      whileHover={{ scale: 1.06, zIndex: 20 }}
      transition={{ duration: 0.18 }}
      className="relative group overflow-hidden rounded-xl flex-shrink-0 cursor-pointer"
      style={{ width: 220, height: 147 }}
    >
      <img
        src={img.url}
        alt={meta.event}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
        draggable={false}
      />
      {/* hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex flex-col justify-end p-2.5 pointer-events-none">
        <p className={`text-[10px] font-bold leading-tight truncate ${meta.category}`}>
          {meta.project}
        </p>
        <p className="text-[9px] text-gray-300 font-mono leading-tight mt-0.5 truncate opacity-90">
          {meta.event}
        </p>
      </div>
    </motion.div>
  );
};

const GalleryCollage = () => {
  if (GALLERY_IMAGES.length === 0) {
    return (
      <div className="text-center py-16 border border-dashed border-white/10 rounded-3xl">
        <p className="text-gray-600 font-mono text-sm">Drop photos into</p>
        <code className="text-gray-500 font-mono text-xs mt-1 block">src/assets/gallery/</code>
        <p className="text-gray-700 font-mono text-[10px] mt-2">
          then add event metadata in gallery.config.js
        </p>
      </div>
    );
  }

  // Slice images into diamond rows, skip empty tail rows
  let idx = 0;
  const rows = DIAMOND_ROWS.map(count => {
    const slice = GALLERY_IMAGES.slice(idx, idx + count);
    idx += count;
    return slice;
  }).filter(r => r.length > 0);

  return (
    <div className="overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 pb-2">
      <div className="flex flex-col items-center gap-1.5 mx-auto" style={{ width: 'fit-content', minWidth: 'min(100%, 870px)' }}>
        {rows.map((row, ri) => (
          <div key={ri} className="flex gap-1.5 justify-center">
            {row.map(img => <GalleryItem key={img.filename} img={img} />)}
          </div>
        ))}
      </div>
    </div>
  );
};


const FIELD_CLASS = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-mono text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-colors";

function VisitorForm({ onSubmit }) {
  const [form, setForm] = useState({ name: '', role: '', company: '', purpose: '', feedback: '' });
  const [submitted, setSubmitted] = useState(false);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
    setSubmitted(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col gap-6"
    >
      <div>
        <span className="text-xs tracking-[0.3em] text-gray-500 uppercase font-mono">Who are you?</span>
        <p className="text-sm text-gray-400 font-mono mt-1">Tell me a bit about yourself.</p>
      </div>

      {submitted ? (
        <div className="flex-grow flex flex-col items-center justify-center gap-3 py-8 text-center">
          <div className="text-3xl">✓</div>
          <p className="text-white font-bold brand-font">Thanks, {form.name || 'visitor'}!</p>
          <p className="text-xs text-gray-500 font-mono">Your details have been logged. Feel free to explore.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text" placeholder="Name" required
            value={form.name} onChange={set('name')}
            className={FIELD_CLASS}
          />
          <input
            type="text" placeholder="Role  (e.g. Recruiter, Professor, Student)"
            value={form.role} onChange={set('role')}
            className={FIELD_CLASS}
          />
          <input
            type="text" placeholder="Company / Institute"
            value={form.company} onChange={set('company')}
            className={FIELD_CLASS}
          />
          <input
            type="text" placeholder="Purpose  (e.g. Hiring, Collaboration, Research)"
            value={form.purpose} onChange={set('purpose')}
            className={FIELD_CLASS}
          />
          <textarea
            placeholder="Suggestions or feedback  (optional)"
            rows={3}
            value={form.feedback} onChange={set('feedback')}
            className={`${FIELD_CLASS} resize-none`}
          />
          <button
            type="submit"
            className="mt-1 w-full py-2.5 rounded-xl bg-blue-600/30 border border-blue-500/30 text-blue-400 hover:bg-blue-600/50 hover:text-white font-mono text-sm font-bold tracking-widest transition-all"
          >
            SUBMIT_
          </button>
        </form>
      )}
    </motion.div>
  );
}

const SUGGESTED = [
  "What has he built?",
  "Tell me about the MCP work at Stremly",
  "What's his tech stack?",
];

function ChatPanel() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! Ask me anything about Lalith — his projects, experience, or tech stack." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (messages.length > 1) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  async function send(text) {
    const msg = text.trim();
    if (!msg || loading) return;
    setInput('');
    const next = [...messages, { role: 'user', content: msg }];
    setMessages(next);
    setLoading(true);
    trackEvent('chat_message', { preview: msg.slice(0, 60) });

    const aiUrl = import.meta.env.VITE_AI_BRAIN_URL;
    if (!aiUrl) {
      setMessages([...next, { role: 'assistant', content: "AI Brain not connected yet — coming soon!" }]);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${aiUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, history: messages, persona: 'recruiter' }),
      });
      if (!res.ok) throw new Error('non-ok');
      const { reply } = await res.json();
      setMessages([...next, { role: 'assistant', content: reply }]);
    } catch {
      setMessages([...next, { role: 'assistant', content: "AI Brain is offline right now. Check back soon!" }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col gap-4"
    >
      <div>
        <span className="text-xs tracking-[0.3em] text-gray-500 uppercase font-mono">Ask about me</span>
        <p className="text-sm text-gray-400 font-mono mt-1">Powered by MCP + LLM — ask anything.</p>
      </div>

      {/* Message thread */}
      <div className="flex-grow overflow-y-auto max-h-[320px] flex flex-col gap-3 pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm font-mono leading-relaxed ${
              m.role === 'user'
                ? 'bg-blue-600/30 border border-blue-500/30 text-white'
                : 'bg-white/5 border border-white/10 text-gray-300'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5">
              <span className="flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggested prompts */}
      {messages.length === 1 && (
        <div className="flex flex-wrap gap-2">
          {SUGGESTED.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="text-xs font-mono text-gray-400 border border-white/10 rounded-full px-3 py-1 hover:bg-white/10 hover:text-white transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send(input)}
          placeholder="Ask anything..."
          className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-mono text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-colors"
        />
        <button
          onClick={() => send(input)}
          disabled={!input.trim() || loading}
          className="p-2.5 bg-blue-600/30 border border-blue-500/30 rounded-xl text-blue-400 hover:bg-blue-600/50 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <Send size={16} />
        </button>
      </div>
    </motion.div>
  );
}

export default function Landing() {
  const { setRole } = useRole();

  const handleSelect = (roleId) => {
    setRole(roleId);
    fetch(`${import.meta.env.VITE_BACKEND_URL || ''}/log`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: roleId, token: SESSION_TOKEN }),
    }).catch(() => {});
  };

  const handleVisitorSubmit = (fields) => {
    trackEvent('visitor_form', { role: fields.role });
    fetch(`${import.meta.env.VITE_BACKEND_URL || ''}/log`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...fields, token: SESSION_TOKEN }),
    }).catch(() => {});
  };

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-x-hidden flex flex-col items-center">
      
      <div className="fixed inset-0 z-0"><Hero3D /></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,black_100%)] z-0 pointer-events-none opacity-40" />

      {/* --- SECTION 1: HERO & PERSONAS --- */}
      <div data-section="hero" className="z-10 w-full flex flex-col items-center min-h-screen pt-8 pb-12 px-4 md:px-12 relative">
        
        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center flex flex-col items-center mb-4 relative"
        >
          {/* ... Header content remains the same ... */}
          <div className="text-blue-400 tracking-[0.5em] text-[10px] md:text-xs font-bold mb-4 uppercase opacity-80">System Online • v4.0</div>
          <h1 className="text-6xl md:text-8xl font-black tracking-widest text-white mb-2 uppercase brand-font drop-shadow-[0_0_35px_rgba(59,130,246,0.6)]">LALITH VISHNU</h1>
          <h2 className="text-xl md:text-2xl font-light text-gray-400 tracking-[0.4em] mb-8 font-sans uppercase">Ramuni</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[ 'AI Systems Engineer', 'IIT Hyderabad' ].map((label) => (
              <span key={label} className="px-4 py-2 border border-white/20 rounded-full text-[10px] md:text-xs font-mono text-gray-300 bg-black/40 backdrop-blur-md">{label}</span>
            ))}
          </div>
        </motion.div>

        {/* WIDE SPLIT LAYOUT */}
        <div className="w-full flex flex-col md:flex-row justify-between items-stretch flex-grow mt-8 max-w-[1600px]">

          {/* LEFT — About Me */}
          <div className="w-full md:w-1/4 pl-0 md:pl-8 flex items-center py-4">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="glass-panel w-full h-full min-h-[320px] p-6 rounded-3xl border border-white/10 flex flex-col gap-4"
            >
              <span className="text-xs tracking-[0.3em] text-gray-500 uppercase font-mono">Who Am I</span>
              <div className="flex flex-col gap-4 flex-grow justify-between">
                <div>
                  <p className="text-sm text-gray-400 font-mono">B.Tech Industrial Chemistry</p>
                  <p className="text-base font-bold text-white brand-font">IIT Hyderabad</p>
                  <p className="text-sm text-blue-400 font-mono mt-0.5">2023 – 2027 · CGPA 7.99</p>
                </div>
                <div className="h-[1px] bg-white/10" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Targeting</p>
                  <p className="text-sm text-white font-mono">AI Engineering</p>
                  <p className="text-sm text-white font-mono">Data Science</p>
                </div>
                <div className="h-[1px] bg-white/10" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Currently</p>
                  <p className="text-sm text-white font-mono">AI Systems Intern · Stremly</p>
                  <p className="text-sm text-gray-500 font-mono">Dublin, Ireland · AI Startup</p>
                </div>
                <div className="h-[1px] bg-white/10" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Stack</p>
                  <div className="flex flex-wrap gap-1">
                    {['Python', 'React', 'Node', 'Docker', 'RAG', 'ML'].map(s => (
                      <span key={s} className="text-xs font-mono border border-white/20 px-1.5 py-0.5 rounded text-gray-300">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* CENTER — 3D passthrough */}
          <div className="hidden md:block md:w-2/4" />

          {/* RIGHT — Achievements top · Recruiter bottom */}
          <div className="w-full md:w-1/4 pr-0 md:pr-8 flex flex-col justify-between gap-6 py-4">

            {/* ACHIEVEMENTS */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="glass-panel p-5 rounded-3xl border border-white/10"
            >
              <span className="text-xs tracking-[0.3em] text-gray-500 uppercase font-mono block mb-4">Highlights</span>
              <div className="flex flex-col gap-3">
                {achievements.map((item, i) => (
                  <div key={i}>
                    <p className={`text-sm font-bold ${item.color}`}>{item.label}</p>
                    <p className="text-xs text-gray-500 font-mono">{item.sub}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RECRUITER CARD */}
            {cards.map((card, index) => (
              <PersonaCard key={card.id} card={card} index={index} onSelect={handleSelect} />
            ))}

          </div>
        </div>

        {/* Contact Line */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 flex items-center gap-6 opacity-60 hover:opacity-100 transition-opacity"
        >
          <a href={LINKS.social.github} target="_blank" rel="noreferrer"
            onClick={() => trackEvent('link_click', { label: 'GitHub' })}
            className="flex items-center gap-1.5 text-xs font-mono text-gray-400 hover:text-white transition-colors">
            <Github size={14} /> GitHub
          </a>
          <span className="text-white/20">|</span>
          <a href={LINKS.social.linkedin} target="_blank" rel="noreferrer"
            onClick={() => trackEvent('link_click', { label: 'LinkedIn' })}
            className="flex items-center gap-1.5 text-xs font-mono text-gray-400 hover:text-blue-400 transition-colors">
            <Linkedin size={14} /> LinkedIn
          </a>
          <span className="text-white/20">|</span>
          <a href={`mailto:${LINKS.social.email}`}
            onClick={() => trackEvent('link_click', { label: 'Email' })}
            className="flex items-center gap-1.5 text-xs font-mono text-gray-400 hover:text-white transition-colors">
            <Mail size={14} /> {LINKS.social.email}
          </a>
        </motion.div>
      </div>

      {/* --- SECTION 2: WHO ARE YOU + ASK ABOUT ME --- */}
      <div data-section="interact" className="z-10 w-full max-w-7xl px-6 py-20 border-t border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-[1px] bg-white/20 flex-grow" />
          <h3 className="text-xl font-bold tracking-[0.3em] brand-font text-gray-400">INTERACT</h3>
          <div className="h-[1px] bg-white/20 flex-grow" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* LEFT — Who are you? */}
          <VisitorForm onSubmit={handleVisitorSubmit} />

          {/* RIGHT — Ask about me */}
          <ChatPanel />

        </div>
      </div>

      {/* --- SECTION 3: MULTIMEDIA GALLERY --- */}
      <div data-section="gallery-media" className="z-10 w-full max-w-7xl px-6 py-20 border-t border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-[1px] bg-white/20 flex-grow" />
          <h3 className="text-xl font-bold tracking-[0.3em] brand-font text-gray-400">GALLERY</h3>
          <div className="h-[1px] bg-white/20 flex-grow" />
        </div>
        <p className="text-center text-xs text-gray-600 font-mono mb-10">
          Hover any photo to see the event and project
        </p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <GalleryCollage />
        </motion.div>
      </div>

      {/* --- SECTION 5: SOCIAL & HOBBIES (Below the fold) --- */}
      <div data-section="extras" className="z-10 w-full max-w-7xl px-6 py-20 border-t border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="flex items-center gap-4 mb-12">
            <div className="h-[1px] bg-white/20 flex-grow" />
            <h3 className="text-xl font-bold tracking-[0.3em] brand-font text-gray-400">
                OPERATIONAL EXTRAS
            </h3>
            <div className="h-[1px] bg-white/20 flex-grow" />
        </div>

        {/* 3-Column Grid for Hobbies */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {extras.map((item, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 50 }} // Start a bit lower
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }} // Trigger when 50% is visible
                    // --- ANIMATION FIX 2: FASTER SCROLL-IN ---
                    // Removed the per-item delay for a more unified entrance.
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`p-6 border ${item.border} rounded-2xl bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-4`}
                >
                    <div className={`p-3 rounded-xl bg-black/50 ${item.color}`}>
                        {item.icon}
                    </div>
                    <div>
                        <h4 className={`font-bold text-sm ${item.color} tracking-wider`}>{item.title}</h4>
                        <span className="text-[10px] text-gray-500 font-mono border border-white/10 px-1 rounded">{item.subtitle}</span>
                        <p className="text-xs text-gray-400 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}