import { motion } from 'framer-motion';
import { useRole } from '../context/RoleContext';
import { Briefcase, FlaskConical, Code, ArrowRight } from 'lucide-react';
import Hero3D from '../components/Hero3D';

export default function Landing() {
  const { setRole } = useRole();

  const cards = [
    { 
      id: 'recruiter', 
      title: "RECRUITER",
      subtitle: "CORPORATE",
      icon: <Briefcase size={32} />,
      desc: "Resume, Impact Metrics & Professional Summary.",
      border: "border-blue-500/50",
      // Blue glow
      glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]" 
    },
    { 
      id: 'professor', 
      title: "RESEARCHER",
      subtitle: "ACADEMIC",
      icon: <FlaskConical size={32} />,
      desc: "Methodology, Publications, Lab Protocols.",
      border: "border-emerald-500/50",
      // Green glow
      glow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]"
    },
    { 
      id: 'tech_head', 
      title: "TECH LEAD",
      subtitle: "DEVELOPER",
      icon: <Code size={32} />,
      desc: "GitHub, Architecture Diagrams & Deployment.",
      border: "border-purple-500/50",
      // Purple glow
      glow: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]"
    },
  ];

  return (
    // UPDATED: min-h-screen allows scrolling on mobile, overflow-x-hidden prevents side scrolling
    <div className="relative w-full min-h-screen bg-black text-white overflow-x-hidden flex flex-col items-center justify-center py-20">
      
      {/* 3D Background - Fixed position so it stays while you scroll */}
      <div className="fixed inset-0 z-0">
        <Hero3D />
      </div>

      {/* Vignette Overlay */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] z-0 pointer-events-none opacity-20" />

      {/* MAIN CONTENT CONTAINER */}
      <div className="z-10 w-full max-w-7xl px-4 flex flex-col items-center gap-12">
        
        {/* HEADER SECTION */}
        <motion.div 
  initial={{ opacity: 0, y: -50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="text-center flex flex-col items-center mb-8 relative z-20"
>
  <div className="text-blue-400 tracking-[0.5em] text-[10px] md:text-xs font-bold mb-4 uppercase opacity-80">
    System Online • v4.0
  </div>
  
  {/* FIXED TYPOGRAPHY: Changed tracking-tighter to tracking-widest */}
  <h1 className="text-6xl md:text-8xl font-black tracking-widest text-white mb-2 uppercase brand-font drop-shadow-[0_0_35px_rgba(59,130,246,0.6)]">
    LALITH VISHNU
  </h1>
  
  <h2 className="text-xl md:text-2xl font-light text-gray-400 tracking-[0.4em] mb-8 font-sans uppercase">
    Ramuni
  </h2>

  {/* The Tags */}
  <div className="flex flex-wrap justify-center gap-4">
    {[
      { label: 'IND. CHEMISTRY', border: 'border-blue-500/30' },
      { label: 'AI ARCHITECT', border: 'border-purple-500/30' },
      { label: '3D DEV', border: 'border-emerald-500/30' }
    ].map((tag) => (
      <span key={tag.label} className={`px-4 py-2 border ${tag.border} rounded-full text-[10px] md:text-xs font-mono text-gray-300 bg-black/40 backdrop-blur-md`}>
        {tag.label}
      </span>
    ))}
  </div>
</motion.div>
        {/* CARDS SECTION */}
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 w-full mt-8">
          {cards.map((card, index) => (
            <motion.button
              key={card.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              onClick={() => setRole(card.id)}
              className={`
                glass-panel group relative flex-1 min-w-[300px] min-h-[250px] p-8 
                rounded-2xl text-left transition-all duration-300 
                hover:-translate-y-2 hover:bg-white/10 ${card.border} border
                ${card.glow}
              `}
            >
              <div className="flex flex-col h-full justify-between relative z-10">
                
                {/* Icon & Subtitle */}
                <div className="flex items-start justify-between mb-6">
                  <div className="p-4 bg-white/5 rounded-xl text-white group-hover:scale-110 transition-transform">
                    {card.icon}
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 border border-white/20 px-2 py-1 rounded">
                    {card.subtitle}
                  </span>
                </div>

                {/* Text Content */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2 brand-font">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed font-sans opacity-80 group-hover:opacity-100">
                    {card.desc}
                  </p>
                </div>
                
                {/* Bottom CTA */}
                <div className="text-blue-400 text-xs font-bold pt-6 mt-auto flex items-center gap-2 group-hover:text-white transition-colors">
                   INITIALIZE_ <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

      </div>
    </div>
  );
}