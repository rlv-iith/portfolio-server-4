// src/pages/Landing.jsx
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useRole } from '../context/RoleContext';
import { Briefcase, /* FlaskConical, */ ArrowRight, GraduationCap, Medal, Star, Github, Linkedin, Mail, Send, SlidersHorizontal, ChevronDown, ExternalLink, Lock } from 'lucide-react';
import Hero3D from '../components/Hero3D';
import Footer from '../components/Footer';
import { trackEvent, SESSION_TOKEN, SESSION_ID } from '../analytics';
import { LINKS } from '../data/links.config';
import { GALLERY_META, GALLERY_FALLBACK } from '../data/gallery.config';
import { content } from '../data/projectData';

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
  { title: "NATIONAL SOCIAL SERVICE", subtitle: "100+ HOURS SERVICE", icon: <GraduationCap size={24} />, desc: "Community leadership & social impact initiatives.", color: "text-rose-400", border: "border-rose-500/30" },
  { title: "NATIONAL CADET CORPS", subtitle: "CADET / DISCIPLINE", icon: <Medal size={24} />, desc: "Leadership & team coordination.", color: "text-yellow-400", border: "border-yellow-500/30" },
  { title: "PHOTOGRAPHER", subtitle: "NATURE / EVENTS", icon: <Star size={24} />, desc: "Love to capture movements — nature, wildlife & live events.", color: "text-white", border: "border-white/30" },
];

// REUSABLE PERSONA CARD COMPONENT
const PersonaCard = ({ card, index, onSelect, locked, onLockedClick }) => (
  <motion.button
    key={card.id}
    initial={{ opacity: 0, x: card.position === 'left' ? -100 : 100 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.5 + index * 0.1, type: "tween", duration: 0.4 }}
    onClick={() => locked ? onLockedClick() : onSelect(card.id)}
    whileHover={{ scale: 1.05, x: card.position === 'left' ? 10 : -10 }}
    className={`glass-panel group relative w-full p-6 rounded-3xl text-left transition-all duration-300 hover:bg-white/10 ${card.border} border ${card.glow} shadow-lg hover:shadow-2xl`}
  >
    <div className="flex flex-col gap-4">
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
      {locked ? (
        <div className="text-yellow-500/70 text-xs font-bold pt-4 mt-auto flex items-center gap-2">
          <Lock size={11} /> FILL FORM BELOW TO UNLOCK_
        </div>
      ) : (
        <div className="text-blue-400 text-xs font-bold pt-4 mt-auto flex items-center gap-2 group-hover:text-white transition-colors">
          INITIALIZE_ <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform"/>
        </div>
      )}
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

function VisitorForm({ onSubmit, highlight }) {
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
      className={`glass-panel p-6 rounded-3xl border flex flex-col gap-6 transition-all duration-500 ${highlight ? 'border-yellow-400/60 shadow-[0_0_24px_rgba(234,179,8,0.2)]' : 'border-white/10'}`}
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

const DEPLOYABLES = [
  {
    name: "Portfolio AI Brain",
    desc: "FastAPI · RAG · Multi-LLM",
    github: LINKS.social.github,
    deploy: LINKS.services.frontend,
  },
  {
    name: "Credit Risk AI",
    desc: "XGBoost · SHAP · Docker",
    github: LINKS.projects["fintech-ai"].github,
    deploy: null,
  },
  {
    name: "3D Synthetic Data Engine",
    desc: "Blender · Python · LiDAR",
    github: LINKS.projects["mitsubishi"].github,
    deploy: null,
  },
  {
    name: "AI Textbook Tutor",
    desc: "LangChain · RAG · Streamlit",
    github: LINKS.projects["ibm-agent"].github,
    deploy: null,
  },
  {
    name: "AxiDraw Automation",
    desc: "Python · G-Code · Hardware",
    github: LINKS.projects["electrochem"].github,
    deploy: null,
  },
];

const SUGGESTED = [
  "What has he built?",
  "Tell me about the MCP work at Stremly",
  "What's his tech stack?",
];

const MODES = [
  { id: 'RACE',    label: 'RACE',      desc: 'cloud · first wins' },
  { id: 'SINGLE',  label: 'SINGLE',    desc: 'cloud · one model' },
  { id: 'COMPETE', label: 'COMPETE',   desc: 'cloud · best reply' },
  { id: 'LOCAL',   label: 'LOCAL SLM', desc: 'laptop · semantic RAG' },
];

function ChatPanel() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! Ask me anything about Lalith — his projects, experience, or tech stack." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('RACE');
  const [showModes, setShowModes] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (messages.length > 1) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages, loading]);

  async function send(text) {
    const msg = text.trim();
    if (!msg || loading) return;
    setInput('');
    inputRef.current?.focus();
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
        body: JSON.stringify({ message: msg, history: messages, persona: 'recruiter', mode, token: SESSION_TOKEN, session_id: SESSION_ID }),
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
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs tracking-[0.3em] text-gray-500 uppercase font-mono">Ask about me</span>
          <p className="text-sm text-gray-400 font-mono mt-1">
            Powered by LLM ·{' '}
            <span className="text-blue-400 text-xs">{mode}</span>
          </p>
          <p className="text-[10px] text-gray-600 font-mono mt-0.5 italic"></p>
        </div>
        <button
          onClick={() => setShowModes(v => !v)}
          title="Router mode"
          className={`p-1.5 rounded-lg border transition-colors ${showModes ? 'border-blue-500/50 text-blue-400' : 'border-white/10 text-gray-600 hover:text-gray-400'}`}
        >
          <SlidersHorizontal size={13} />
        </button>
      </div>

      {/* Mode selector — hidden until ⚙ is clicked */}
      {showModes && (
        <div className="flex flex-col gap-2 p-3 bg-white/3 border border-white/8 rounded-xl">
          <span className="text-[9px] tracking-[0.25em] text-gray-600 uppercase font-mono">Router Mode</span>
          <div className="flex gap-2">
            {MODES.map(m => (
              <button
                key={m.id}
                onClick={() => { setMode(m.id); setShowModes(false); }}
                className={`flex-1 py-1.5 px-2 rounded-lg border text-[10px] font-mono font-bold tracking-wider transition-all ${
                  mode === m.id
                    ? 'border-blue-500/60 bg-blue-600/20 text-blue-300'
                    : 'border-white/10 text-gray-500 hover:border-white/20 hover:text-gray-300'
                }`}
              >
                <div>{m.label}</div>
                <div className="text-[8px] font-normal opacity-60 mt-0.5">{m.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

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
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); send(input); } }}
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
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [highlightForm, setHighlightForm] = useState(false);
  const [showUnlockToast, setShowUnlockToast] = useState(false);
  const interactRef = useRef(null);

  const handleLockedClick = () => {
    interactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setHighlightForm(true);
    setShowUnlockToast(true);
    setTimeout(() => setHighlightForm(false), 2000);
    setTimeout(() => setShowUnlockToast(false), 3500);
  };

  const handleSelect = (roleId) => {
    setRole(roleId);
    fetch(`${import.meta.env.VITE_BACKEND_URL || ''}/log`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: roleId, token: SESSION_TOKEN, session_id: SESSION_ID }),
    }).catch(() => {});
  };

  const handleVisitorSubmit = (fields) => {
    setFormSubmitted(true);
    trackEvent('visitor_form', { role: fields.role });
    fetch(`${import.meta.env.VITE_BACKEND_URL || ''}/log`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...fields, token: SESSION_TOKEN, session_id: SESSION_ID }),
    }).catch(() => {});
  };

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-x-hidden flex flex-col items-center">

      {/* Unlock toast */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: showUnlockToast ? 1 : 0, x: showUnlockToast ? 0 : 40 }}
        transition={{ duration: 0.3 }}
        className="fixed top-6 right-6 z-50 pointer-events-none"
      >
        <div className="flex flex-col items-center gap-3 px-10 py-6 rounded-3xl border border-yellow-500/40 bg-black/95 backdrop-blur-md shadow-[0_0_40px_rgba(234,179,8,0.2)]">
          <Lock size={22} className="text-yellow-400" />
          <p className="text-lg font-bold brand-font text-white tracking-widest text-center">ACCESS LOCKED</p>
          <p className="text-sm font-mono text-yellow-300 text-center">
            Fill out the <span className="text-white font-bold">Interact form</span> below to unlock
          </p>
        </div>
      </motion.div>

      <div className="fixed inset-0 z-0"><Hero3D /></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,black_100%)] z-0 pointer-events-none opacity-40" />

      {/* --- SECTION 1: HERO & PERSONAS --- */}
      <div data-section="hero" className="z-10 w-full flex flex-col items-center pt-8 pb-16 px-4 md:px-12 relative">
        
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
        <div className="w-full flex flex-col md:flex-row justify-between items-start mt-4 max-w-[1600px]">

          {/* LEFT — About Me + Experience */}
          <div className="w-full md:w-1/4 pl-0 md:pl-8 flex flex-col gap-6 py-4">

            {/* WHO AM I */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="glass-panel w-full p-6 rounded-3xl border border-white/10 flex flex-col gap-4"
            >
              <span className="text-xs tracking-[0.3em] text-gray-500 uppercase font-mono">Who Am I</span>
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-sm text-gray-400 font-mono">B.Tech Industrial Chemistry</p>
                  <p className="text-base font-bold text-white brand-font">IIT Hyderabad</p>
                  <p className="text-sm text-blue-400 font-mono mt-0.5">2023 – 2027 · CGPA 7.99</p>
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

            {/* EXPERIENCE */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="glass-panel w-full p-6 rounded-3xl border border-white/10 flex flex-col gap-3"
            >
              <span className="text-xs tracking-[0.3em] text-gray-500 uppercase font-mono">Experience</span>
              {content.resume.experience.map((exp, i) => (
                <div key={i} className="flex items-start justify-between gap-2 group">
                  <div className="flex items-start gap-2 min-w-0">
                    <span className="w-1 h-1 rounded-full bg-blue-500/50 flex-shrink-0 mt-[5px] group-hover:bg-blue-400 transition-colors" />
                    <div className="min-w-0">
                      <p className="text-xs text-white font-mono leading-snug group-hover:text-blue-300 transition-colors">{exp.role}</p>
                      <p className="text-[10px] text-gray-500 font-mono leading-snug truncate">{exp.company.split('(')[0].trim()}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-600 font-mono flex-shrink-0 mt-0.5">{exp.duration.split('–')[0].trim()}</span>
                </div>
              ))}
            </motion.div>

          </div>

          {/* CENTER — 3D passthrough */}
          <div className="hidden md:block md:w-2/4" />

          {/* RIGHT — Achievements top · Recruiter bottom */}
          <div className="w-full md:w-1/4 pr-0 md:pr-8 flex flex-col justify-start gap-6 pt-2 pb-4">

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
              <PersonaCard key={card.id} card={card} index={index} onSelect={handleSelect} locked={!formSubmitted} onLockedClick={handleLockedClick} />
            ))}

          </div>
        </div>

      </div>

      {/* --- SECTION 2: WHO ARE YOU + ASK ABOUT ME --- */}
      <div ref={interactRef} data-section="interact" className="z-10 w-full max-w-7xl px-6 py-20 border-t border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-[1px] bg-white/20 flex-grow" />
          <h3 className="text-xl font-bold tracking-[0.3em] brand-font text-gray-400">INTERACT</h3>
          <div className="h-[1px] bg-white/20 flex-grow" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* LEFT — Who are you? */}
          <VisitorForm onSubmit={handleVisitorSubmit} highlight={highlightForm} />

          {/* RIGHT — Ask about me */}
          <ChatPanel />

        </div>

        {/* Disclaimer */}
        <p className="mt-6 text-center text-[10px] text-gray-600 font-mono leading-relaxed max-w-2xl mx-auto border border-white/5 rounded-xl px-4 py-3 bg-white/2">
          ⚠ LLMs can make mistakes — always verify important information independently.
          <span className="text-yellow-600/70"> LOCAL SLM mode & on-device LLM deployment are in beta testing</span> and may be unavailable or unstable.
        </p>
      </div>

      {/* --- SECTION: DEPLOYABLES --- */}
      <div data-section="deployables" className="z-10 w-full max-w-7xl px-6 py-20 border-t border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-[1px] bg-white/20 flex-grow" />
          <h3 className="text-xl font-bold tracking-[0.3em] brand-font text-gray-400">DEPLOYABLES</h3>
          <div className="h-[1px] bg-white/20 flex-grow" />
        </div>
        <div className="relative">
          {/* Maintenance overlay */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl backdrop-blur-md bg-black/60 border border-white/10">
            <span className="text-2xl mb-3">🛠️</span>
            <p className="text-white font-bold brand-font tracking-widest text-lg">LIVE DEMOS ROLLING OUT</p>
            <p className="text-xs text-gray-400 font-mono mt-1">Deployments in progress — check back soon</p>
          </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.projects.map((proj) => {
            const links = LINKS.projects[proj.id] || {};
            return (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4 }}
                className="group border border-white/10 bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-mono text-blue-400 border border-blue-500/20 px-2 py-1 rounded bg-blue-500/5">{proj.category}</span>
                  <div className="flex gap-3">
                    <a href={links.github || LINKS.social.github} target="_blank" rel="noreferrer"
                      onClick={() => trackEvent('project_github', { id: proj.id })}
                      className="text-gray-500 hover:text-white transition-colors">
                      <Github size={14} />
                    </a>
                    {links.demo ? (
                      <a href={links.demo} target="_blank" rel="noreferrer"
                        onClick={() => trackEvent('project_demo', { id: proj.id })}
                        className="text-gray-500 hover:text-blue-400 transition-colors">
                        <ExternalLink size={14} />
                      </a>
                    ) : (
                      <span className="text-gray-700 cursor-not-allowed" title="Not deployed yet">
                        <ExternalLink size={14} />
                      </span>
                    )}
                  </div>
                </div>
                <h3 className="font-bold text-lg text-white mb-2 group-hover:text-blue-300 transition-colors">{proj.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4 min-h-[3rem]">{proj.descriptions.recruiter}</p>
                <div className="flex flex-wrap gap-2 border-t border-white/5 pt-4">
                  {proj.stack.map((tech) => (
                    <span key={tech} className="text-[10px] text-gray-500 font-mono">#{tech}</span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
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

      {/* --- SECTION: CONTACT --- */}
      <div data-section="contact" className="z-10 w-full max-w-7xl px-6 py-20 border-t border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-[1px] bg-white/20 flex-grow" />
          <h3 className="text-xl font-bold tracking-[0.3em] brand-font text-gray-400">CONTACT</h3>
          <div className="h-[1px] bg-white/20 flex-grow" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12"
        >
          <a href={LINKS.social.github} target="_blank" rel="noreferrer"
            onClick={() => trackEvent('link_click', { label: 'GitHub' })}
            className="glass-panel flex items-center gap-3 px-8 py-4 rounded-2xl border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all group">
            <Github size={20} className="group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">GitHub</p>
              <p className="text-sm font-bold text-white font-mono">rlv-iith</p>
            </div>
          </a>
          <a href={LINKS.social.linkedin} target="_blank" rel="noreferrer"
            onClick={() => trackEvent('link_click', { label: 'LinkedIn' })}
            className="glass-panel flex items-center gap-3 px-8 py-4 rounded-2xl border border-white/10 text-gray-400 hover:text-blue-400 hover:border-blue-500/30 transition-all group">
            <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">LinkedIn</p>
              <p className="text-sm font-bold text-white font-mono">Ramuni Lalith Vishnu</p>
            </div>
          </a>
          <a href={`mailto:${LINKS.social.email}`}
            onClick={() => trackEvent('link_click', { label: 'Email' })}
            className="glass-panel flex items-center gap-3 px-8 py-4 rounded-2xl border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all group">
            <Mail size={20} className="group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">Email</p>
              <p className="text-sm font-bold text-white font-mono">{LINKS.social.email}</p>
            </div>
          </a>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}