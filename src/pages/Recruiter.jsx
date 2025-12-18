import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRole } from '../context/RoleContext';
import { content } from '../data/projectData';
import { ArrowLeft, ExternalLink, Github, ChevronRight, FileText } from 'lucide-react';

export default function Recruiter() {
  const { setRole } = useRole();
  const [hoveredProj, setHoveredProj] = useState(null);
  
  const role = 'recruiter';
  const data = content.headers[role];
  const projects = content.projects;

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30 relative overflow-hidden">
      
      {/* 0. DYNAMIC BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0">
         <AnimatePresence>
            {/* If hovering, show colorful gradient */}
            {hoveredProj && (
                <motion.div
                    key={hoveredProj}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] ${content.projects.find(p => p.id === hoveredProj)?.bgTheme} opacity-40`}
                />
            )}
            {/* If NOT hovering, show default "Noise" or Subtle Black */}
            {!hoveredProj && (
                 <motion.div
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-black"
                 />
            )}
         </AnimatePresence>
         
         {/* Noise Overlay (Optional Texture) */}
         <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
      </div>

      {/* 1. FIXED TOP NAV */}
      <nav className="fixed top-0 left-0 w-full h-16 bg-black/60 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-4">
            <button onClick={() => setRole(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
                <ArrowLeft size={20} />
            </button>
            <div className="text-sm font-mono text-gray-500">
                SYSTEM :: <span className={data.color}>RECRUITER</span> VIEW
            </div>
        </div>
        <div className="hidden md:flex items-center gap-6 text-xs tracking-widest text-gray-500 font-bold">
            {/* ACTIVE RESUME BUTTON */}
            <a 
              href="/Lalith_Vishnu_Resume.pdf" 
              download="Lalith_Vishnu_Resume.pdf"
              className="flex items-center gap-2 text-blue-400 hover:text-white transition-colors border border-blue-500/30 px-3 py-1.5 rounded bg-blue-500/10 hover:bg-blue-500/20"
            >
              <FileText size={14} />
              <span>DOWNLOAD_CV</span>
            </a>
            
            <a href={content.personal.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GITHUB</a>
            <a href={content.personal.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LINKEDIN</a>
        </div>
      </nav>

      {/* Main Content Area - Z-10 to stay above background */}
      <main className="relative z-10 pt-24 pb-20 px-4 md:px-12 max-w-7xl mx-auto">
        
        {/* 2. HEADER */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`border-l-4 ${data.border.replace('border', 'border-l')} pl-6 mb-16`}
        >
            <h1 className={`text-4xl md:text-6xl font-black uppercase mb-4 brand-font ${data.color} glow-text`}>
                {data.title}
            </h1>
            <p className="text-xl md:text-2xl text-white font-light mb-2">
                {data.tagline}
            </p>
            <p className="text-gray-400 max-w-3xl leading-relaxed">
                {data.bio}
            </p>
        </motion.header>

        {/* 3. PROJECT GRID */}
        <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
            {projects.map((project) => (
                <motion.div 
                    key={project.id}
                    variants={item}
                    onMouseEnter={() => setHoveredProj(project.id)}
                    onMouseLeave={() => setHoveredProj(null)}
                    
                    className="group relative bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl cursor-default"
                >
                    <div className="p-8">
                        {/* Top Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className={`px-2 py-1 text-[10px] font-mono border rounded uppercase ${data.color} ${data.border} bg-white/5`}>
                                {project.category}
                            </span>
                            {project.stack.slice(0,3).map(tech => (
                                <span key={tech} className="px-2 py-1 text-[10px] font-mono text-gray-500 border border-white/5 rounded">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-200 transition-colors brand-font">
                            {project.title}
                        </h3>

                        {/* Dynamic Description */}
                        <p className="text-gray-400 text-sm leading-relaxed mb-8 h-20">
                            {project.descriptions[role] || project.descriptions.recruiter}
                        </p>

                        {/* Footer Links */}
                        <div className="flex items-center justify-between border-t border-white/5 pt-4">
                            <div className="flex gap-4">
                                {project.link && project.link !== "#" && (
                                    <a href={project.link} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">
                                        <Github size={18} />
                                    </a>
                                )}
                                <button className="text-gray-500 hover:text-white transition-colors">
                                    <ExternalLink size={18} />
                                </button>
                            </div>
                            <span className={`text-xs font-bold flex items-center ${data.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                                DETAILS <ChevronRight size={14} />
                            </span>
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
      </main>

    </div>
  );
}

