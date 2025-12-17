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
      subtitle: "Corporate View",
      icon: <Briefcase size={28} />,
      desc: "ATS Resume, Impact Metrics & Professional Experience.",
      border: "hover:border-blue-500",
      shadow: "hover:shadow-blue-500/20"
    },
    { 
      id: 'professor', 
      title: "RESEARCHER",
      subtitle: "Academic View",
      icon: <FlaskConical size={28} />,
      desc: "Methodology, Publications, Lab Skills & GPA.",
      border: "hover:border-emerald-500",
      shadow: "hover:shadow-emerald-500/20"
    },
    { 
      id: 'tech_head', 
      title: "TECH LEAD",
      subtitle: "Code View",
      icon: <Code size={28} />,
      desc: "System Architecture, GitHub Stack & Live Deploys.",
      border: "hover:border-purple-500",
      shadow: "hover:shadow-purple-500/20"
    },
  ];

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
      
      {/* 1. 3D Background - Pushed behind everything */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Hero3D />
      </div>

      {/* 2. Gradient Overlay to darken edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 z-0 pointer-events-none" />

      {/* 3. Main Interface */}
      <div className="z-10 w-full max-w-7xl px-6 flex flex-col items-center justify-center h-full">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-20"
        >
          <p className="text-blue-400 tracking-[0.3em] text-xs md:text-sm font-bold mb-4 uppercase glow-blue">
            System Online • Portfolio v4.0
          </p>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-2 uppercase drop-shadow-2xl">
            Ramuni Lalith
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-500 tracking-tight">
            Vishnu
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs md:text-sm text-gray-400 font-mono">
            <span className="px-3 py-1 border border-white/10 rounded-full">IND. CHEMISTRY</span>
            <span className="px-3 py-1 border border-white/10 rounded-full">AI ARCHITECT</span>
            <span className="px-3 py-1 border border-white/10 rounded-full">3D DEV</span>
          </div>
        </motion.div>

        {/* Card Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {cards.map((card, index) => (
            <motion.button
              key={card.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              onClick={() => setRole(card.id)}
              className={`
                glass-card group relative p-6 md:p-8 rounded-xl text-left transition-all duration-300
                hover:scale-[1.02] hover:-translate-y-1 ${card.border} hover:bg-white/5
              `}
            >
              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent)] ${card.shadow}`} />
              
              <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10 group-hover:bg-white/10 transition-colors">
                    <span className="text-white group-hover:scale-110 block transition-transform duration-300">
                      {card.icon}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold border border-white/5 px-2 py-1 rounded">
                    {card.subtitle}
                  </span>
                </div>

                {/* Body */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2 font-mono group-hover:text-blue-200 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300">
                    {card.desc}
                  </p>
                </div>

                {/* Footer / CTA */}
                <div className="flex items-center text-xs font-bold tracking-widest text-gray-600 group-hover:text-white transition-colors pt-4 border-t border-white/5">
                  INITIALIZE 
                  <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
        
      </div>
    </div>
  );
}