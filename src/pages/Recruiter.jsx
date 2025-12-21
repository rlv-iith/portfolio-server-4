import { motion } from 'framer-motion';
import { useRole } from '../context/RoleContext';
import { content } from '../data/projectData';
import { 
    ArrowLeft, Github, FileText, GraduationCap, Briefcase, 
    Trophy, Code, Users, Cpu, Medal, MapPin 
} from 'lucide-react';

const SectionTitle = ({ icon: Icon, title, color }) => (
    <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4 mt-12">
        <div className={`p-2 rounded-lg bg-${color}-500/10 text-${color}-400`}>
            <Icon size={24} />
        </div>
        <h2 className="text-2xl font-bold uppercase tracking-widest text-white brand-font">
            {title}
        </h2>
    </div>
);

// NEW: Holographic Image Component (Passport Size: 2x2 inches = ~192px)
const TechProfileImage = ({ src }) => (
    <div className="relative w-44 h-44 md:w-48 md:h-56 shrink-0 group">
        {/* Glowing Border Container */}
        <div className="absolute inset-0 border-2 border-blue-500/30 rounded-xl rotate-3 group-hover:rotate-0 transition-transform duration-500" />
        <div className="absolute inset-0 border-2 border-white/10 rounded-xl -rotate-3 group-hover:rotate-0 transition-transform duration-500 bg-black" />
        
        {/* The Image Wrapper */}
        <div className="absolute inset-2 rounded-lg overflow-hidden border border-white/20">
            {/* The Image (Grayscale -> Color on Hover) */}
            <img 
                src={src} 
                alt="Profile" 
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500" 
            />
            
            {/* Scanner Line Animation */}
            <motion.div 
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 w-full h-[2px] bg-blue-400 shadow-[0_0_10px_#3b82f6] opacity-50"
            />
            {/* Tech Overlay (Grid) */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
        </div>
    </div>
);

export default function Recruiter() {
  const { setRole } = useRole();
  const color = "blue"; 
  const resume = content.resume; 
  const projects = content.projects;

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30">
      
      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full h-16 bg-black/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-4">
            <button onClick={() => setRole(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
                <ArrowLeft size={20} />
            </button>
            <div className="text-sm font-mono text-gray-500">
                <span className="text-blue-400">RECRUITER</span> DASHBOARD
            </div>
        </div>
        <div className="hidden md:flex items-center gap-4">
            <a href="/Lalith_Vishnu_Resume.pdf" download className="flex items-center gap-2 px-4 py-1.5 text-xs font-bold text-blue-400 border border-blue-500/30 rounded bg-blue-500/10 hover:bg-blue-500/20 transition-all">
                <FileText size={14} /> DOWNLOAD CV
            </a>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-4 md:px-0 max-w-4xl mx-auto">
        
        {/* 1. HERO HEADER (Reorganized with Image) */}
        <motion.header 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="flex flex-col-reverse md:flex-row items-center md:items-start gap-8 border-b border-white/10 pb-12 mb-12"
        >
            <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                    <span className="px-3 py-1 bg-blue-900/30 text-blue-400 text-[10px] font-bold tracking-widest uppercase rounded border border-blue-500/30">
                        System Online
                    </span>
                    <span className="text-gray-500 text-[10px] font-mono tracking-widest">
                        EST. 2025
                    </span>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-black uppercase mb-4 brand-font text-white">
                    Lalith <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Vishnu</span>
                </h1>
                
                <p className="text-xl text-gray-300 font-light mb-6 max-w-xl mx-auto md:mx-0">
                    Industrial Chemist & Full-Stack AI Engineer. Bridging the gap between 
                    <span className="text-white font-medium"> Molecule</span> and 
                    <span className="text-white font-medium"> Machine</span>.
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm font-mono text-gray-500">
                    <div className="flex items-center gap-2">
                         <Briefcase size={14} /> Available for Internships
                    </div>
                    <div className="flex items-center gap-2">
                         <MapPin size={14} /> Hyderabad, India
                    </div>
                </div>
            </div>

            {/* THE NEW IMAGE COMPONENT */}
            <TechProfileImage src={content.personal.photo} />

        </motion.header>

        {/* 2. SKILLS (Top Priority for Recruiters) */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 bg-blue-900/5 border border-blue-500/20 rounded-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-50 transition-opacity"><Code /></div>
                    <h3 className="text-blue-400 font-bold mb-4 uppercase text-xs tracking-widest">
                         Technical Arsenal
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {resume.skills.technical.map(s => (
                            <span key={s} className="px-2 py-1 text-xs font-mono bg-blue-500/10 text-blue-200 rounded border border-blue-500/20">{s}</span>
                        ))}
                    </div>
                </div>
                <div className="p-6 bg-white/5 border border-white/10 rounded-xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-50 transition-opacity"><Cpu /></div>
                    <h3 className="text-emerald-400 font-bold mb-4 uppercase text-xs tracking-widest">
                         Tools & Core
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {[...resume.skills.tools, ...resume.skills.core].slice(0, 10).map(s => (
                            <span key={s} className="px-2 py-1 text-xs font-mono bg-emerald-500/10 text-emerald-200 rounded border border-emerald-500/20">{s}</span>
                        ))}
                    </div>
                </div>
             </div>
        </motion.section>

        {/* 3. PROFESSIONAL EXPERIENCE (The "Meat") */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <SectionTitle icon={Briefcase} title="Experience" color={color} />
            <div className="space-y-6 pl-4 border-l border-white/10 ml-3">
                {resume.experience.map((exp, i) => (
                    <div key={i} className="relative pl-8 group">
                        <div className="absolute -left-[5px] top-6 w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6] group-hover:scale-150 transition-transform" />
                        <div className="bg-white/[0.02] border border-white/10 p-6 rounded-xl hover:bg-white/[0.05] transition-colors">
                            <div className="flex flex-wrap justify-between items-end mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                                    <p className="text-blue-400 text-sm font-mono">{exp.company}</p>
                                </div>
                                <span className="text-xs text-gray-500 font-mono uppercase tracking-widest bg-white/5 px-2 py-1 rounded">{exp.duration}</span>
                            </div>
                            <ul className="list-disc list-inside space-y-2">
                                {exp.desc.map((point, idx) => (
                                    <li key={idx} className="text-gray-400 text-sm leading-relaxed">{point}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </motion.section>

        {/* 4. TECHNICAL DELIVERABLES (Projects) */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <SectionTitle icon={Code} title="Deliverables" color={color} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((proj) => (
                    <div key={proj.id} className="group border border-white/10 bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all hover:-translate-y-1 relative">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-[10px] font-mono text-blue-400 border border-blue-500/20 px-2 py-1 rounded bg-blue-500/5">{proj.category}</span>
                            <a href={proj.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-colors">
                                <Github size={14} />
                            </a>
                        </div>
                        <h3 className="font-bold text-lg text-white mb-2 group-hover:text-blue-300 transition-colors">{proj.title}</h3>
                        <p className="text-sm text-gray-400 leading-relaxed mb-4 min-h-[3rem]">{proj.descriptions.recruiter}</p>
                        <div className="flex flex-wrap gap-2 mt-auto border-t border-white/5 pt-4">
                            {proj.stack.map((tech) => (<span key={tech} className="text-[10px] text-gray-500">#{tech}</span>))}
                        </div>
                    </div>
                ))}
            </div>
        </motion.section>

        {/* 5. EDUCATION & CERTIFICATIONS (Reordered lower) */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <SectionTitle icon={GraduationCap} title="Education & Certs" color={color} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resume.education.map((edu) => (
                    <div key={edu.id} className="p-6 border border-white/10 rounded-xl bg-white/5 flex flex-col justify-center">
                         <div className="flex justify-between items-center mb-2">
                            <h3 className="font-bold text-white">{edu.school}</h3>
                            <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded">{edu.year}</span>
                        </div>
                        <p className="text-gray-400 text-sm">{edu.degree}</p>
                        <p className="text-white font-mono text-xs mt-1">{edu.score}</p>
                    </div>
                ))}
                {resume.certifications.map((cert, i) => (
                     <div key={i} className="p-6 border border-dashed border-white/10 rounded-xl hover:bg-white/5 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-white text-sm">{cert.title}</h3>
                            <span className="text-[10px] uppercase font-bold text-gray-500 border border-white/10 px-2 py-1 rounded">Workshop</span>
                        </div>
                        <p className="text-blue-400 text-xs font-mono mb-2">{cert.issuer}</p>
                        <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{cert.desc}</p>
                    </div>
                ))}
            </div>
        </motion.section>

        {/* 6. LEADERSHIP (PoR) */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <SectionTitle icon={Users} title="Leadership" color={color} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {resume.responsibilities.map((pos, i) => (
                    <div key={i} className="p-4 border border-white/5 bg-white/[0.02] rounded-xl hover:bg-white/5 transition-all">
                        <h3 className="text-white font-bold text-sm mb-1">{pos.role}</h3>
                        <p className="text-blue-400 text-xs font-mono mb-2">{pos.org}</p>
                        <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">{pos.desc}</p>
                    </div>
                ))}
            </div>
        </motion.section>

        {/* 7. COMPETITIVE EVENTS */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <SectionTitle icon={Trophy} title="Awards & Events" color={color} />
            <div className="bg-black/30 border border-white/10 rounded-xl overflow-hidden mb-6">
                {[...resume.hackathons, ...resume.achievements].map((item, i) => (
                    <div key={i} className="px-6 py-4 border-b border-white/5 last:border-0 flex items-start gap-3 hover:bg-white/5 transition-colors">
                         <span className={`mt-1 text-${i < 3 ? 'blue' : 'yellow'}-500`}><Trophy size={14} /></span>
                        <p className="text-sm text-gray-300">{item}</p>
                    </div>
                ))}
            </div>
        </motion.section>

      </main>
    </div>
  );
}