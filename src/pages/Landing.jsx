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
      glow: "group-hover:shadow-[0_0_40px_rgba(59,130,246,0.4)]"
    },
    { 
      id: 'professor', 
      title: "RESEARCHER",
      subtitle: "ACADEMIC",
      icon: <FlaskConical size={32} />,
      desc: "Methodology, Publications, Lab Protocols.",
      border: "border-emerald-500/50",
      glow: "group-hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]"
    },
    { 
      id: 'tech_head', 
      title: "TECH LEAD",
      subtitle: "DEVELOPER",
      icon: <Code size={32} />,
      desc: "GitHub, Architecture Diagrams & Deployment.",
      border: "border-purple-500/50",
      glow: "group-hover:shadow-[0_0_40px_rgba(168,85,247,0.4)]"
    },
  ];

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden flex flex-col items-center justify-center">
      
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Hero3D />
      </div>

      {/* Vignette Overlay (Darkens the corners) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,black_100%)] z-0 pointer-events-none" />

      {/* MAIN CONTENT CONTAINER */}
      <div className="z-10 w-full max-w-7xl px-4 flex flex-col items-center gap-12">
        
        {/* HEADER SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center flex flex-col items-center"
        >
          <div className="text-blue-400 tracking-[0.5em] text-xs font-bold mb-6 uppercase glow-text">
            System Online • v4.0
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-2 uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] brand-font">
            RAMUNI LALITH
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-light text-gray-400 tracking-[0.2em] mb-8 brand-font">
            VISHNU
          </h2>

          {/* Tags - Now with explicit margins */}
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {['IND. CHEMISTRY', 'AI ARCHITECT', '3D DEV'].map((tag) => (
              <span key={tag} className="px-4 py-2 border border-white/20 rounded-full text-xs font-mono text-gray-300 bg-black/40 backdrop-blur-md">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* CARDS SECTION - Switched to Flex Wrap for reliability */}
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
      `}
    >
      {/* ... keeping your inner content the same ... */}
      <div className="flex flex-col h-full justify-between">
          <div className="flex items-start justify-between mb-6">
            <div className="p-4 bg-white/5 rounded-xl text-white">
              {card.icon}
            </div>
            <span className="text-[10px] uppercase tracking-widest text-gray-400 border border-white/20 px-2 py-1 rounded">
              {card.subtitle}
            </span>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-2 font-sci">
              {card.title}
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              {card.desc}
            </p>
          
          </div>
          
          <div className="text-blue-400 text-xs font-bold pt-4 mt-auto">
             INITIALIZE_
          </div>
      </div>
    </motion.button>
  ))}
</div>
      </div>
    </div>
  );
}