// src/pages/Landing.jsx
import { motion } from 'framer-motion';
import { useRole } from '../context/RoleContext';
import { Briefcase, /* FlaskConical, */ ArrowRight, Heart, Medal, Star, Github, Linkedin, Mail } from 'lucide-react';
import Hero3D from '../components/Hero3D';

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

export default function Landing() {
  const { setRole } = useRole();
  const leftCards = cards.filter(card => card.position === 'left');
  const rightCards = cards.filter(card => card.position === 'right');

  const handleSelect = (roleId) => {
    setRole(roleId);
    fetch(`${import.meta.env.VITE_BACKEND_URL || ''}/log`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: roleId }),
    }).catch(() => {});
  };

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-x-hidden flex flex-col items-center">
      
      <div className="fixed inset-0 z-0"><Hero3D /></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,black_100%)] z-0 pointer-events-none opacity-40" />

      {/* --- SECTION 1: HERO & PERSONAS --- */}
      <div className="z-10 w-full flex flex-col items-center min-h-screen pt-8 pb-12 px-4 md:px-12 relative">
        
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
                  <p className="text-sm text-white font-mono">Research Intern · IISc Bangalore</p>
                  <p className="text-sm text-gray-500 font-mono">Molecular Electronics</p>
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
          <a href="https://github.com/rlv-iith" target="_blank" rel="noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono text-gray-400 hover:text-white transition-colors">
            <Github size={14} /> GitHub
          </a>
          <span className="text-white/20">|</span>
          <a href="https://www.linkedin.com/in/ramuni-lalith-vishnu-4143ab299/" target="_blank" rel="noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono text-gray-400 hover:text-blue-400 transition-colors">
            <Linkedin size={14} /> LinkedIn
          </a>
          <span className="text-white/20">|</span>
          <a href="mailto:ic23btech11016@iith.ac.in"
            className="flex items-center gap-1.5 text-xs font-mono text-gray-400 hover:text-white transition-colors">
            <Mail size={14} /> ic23btech11016@iith.ac.in
          </a>
        </motion.div>
      </div>

      {/* --- SECTION 2: SOCIAL & HOBBIES (Below the fold) --- */}
      <div className="z-10 w-full max-w-7xl px-6 py-20 border-t border-white/10 bg-black/80 backdrop-blur-xl">
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

    </div>
  );
}