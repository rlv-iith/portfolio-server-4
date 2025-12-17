import { Briefcase, Code, FlaskConical, Trophy, Cpu, Globe } from 'lucide-react';

export const content = {
  // Shared Personal Info
  personal: {
    name: "Lalith Vishnu",
    email: "ic23btech11016@iith.ac.in",
    github: "https://github.com/rlv-iith",
    linkedin: "https://linkedin.com/in/ramuni-lalith-vishnu"
  },

  // 1. DASHBOARD HEADER INFO (Based on Role)
  headers: {
    recruiter: {
      title: "CANDIDATE PROFILE",
      tagline: "High-Impact Engineer ready for deployment.",
      bio: "IIT Hyderabad Undergraduate with a unique hybrid profile in Industrial Chemistry and Computer Science. Proven track record of winning hackathons, optimizing workflows by 30%, and deploying full-stack AI solutions.",
      color: "text-blue-400",
      border: "border-blue-500/50",
      icon: <Briefcase />
    },
    professor: {
      title: "RESEARCH PORTFOLIO",
      tagline: "Translational Research: Chemistry + Applied AI.",
      bio: "Undergraduate Researcher focusing on Heterogeneous Catalysis and Electrochemical Energy. Experience with Dr. Narendra Kurra (ElectroChem Group) and synthetic data generation for LiDAR point clouds.",
      color: "text-emerald-400",
      border: "border-emerald-500/50",
      icon: <FlaskConical />
    },
    tech_head: {
      title: "DEV_LOG // V4.0",
      tagline: "Architecture, Stacks, and Containerization.",
      bio: "Full-Stack Developer & AI Architect. Expert in converting manual workflows into Python scripts, Dockerizing ML pipelines, and building Agents with LangChain & OpenAI.",
      color: "text-purple-400",
      border: "border-purple-500/50",
      icon: <Code />
    }
  },

  // 2. THE PROJECTS (Dynamic Content)
  // ... keep imports and headers same ...

  projects: [
    {
      id: "mitsubishi",
      title: "3D Point Cloud Segmentation",
      category: "Computer Vision",
      stack: ["Python", "Blender API", "Docker", "LiDAR"],
      // NEW: Theme Definition
      bgTheme: "from-purple-900 via-indigo-950 to-black",
      descriptions: {
        recruiter: "Winner of Mitsubishi 3D Tech Hackathon. Reduced data labeling time by 11x using an automated pipeline, saving significant manual labor costs.",
        professor: "Developed a novel procedural synthetic data generation engine in Blender to train Semantic Segmentation models, overcoming data scarcity in LiDAR scanning.",
        tech_head: "Built a Python-Blender bridge using Geometry Nodes. Containerized the entire ML pipeline in Docker for reproducible inference on 3D point clouds."
      },
      link: "https://github.com/rlv-iith"
    },
    {
      id: "electrochem",
      title: "ElectroChem Lab Automation",
      category: "Robotics / R&D",
      stack: ["Python", "G-Code", "AxiDraw", "Hardware"],
      // NEW: Theme Definition
      bgTheme: "from-emerald-900 via-teal-950 to-black",
      descriptions: {
        recruiter: "Designed prototypes with ±0.005 precision. Automated manual lab workflows, increasing testing throughput by 30%.",
        professor: "Worked under Dr. Narendra Kurra. Contributed to device prototyping and automated the AxiDraw machine for precise electrochemical deposition patterns.",
        tech_head: "Hacked an AxiDraw plotter using Python and CMD to accept custom G-Code for precise material deposition. Integrated with Solid Edge designs."
      },
      link: "#"
    },
    {
      id: "fintech-ai",
      title: "Explainable AI Credit Risk",
      category: "FinTech",
      stack: ["XGBoost", "SHAP", "React", "Docker"],
      // NEW: Theme Definition
      bgTheme: "from-slate-800 via-yellow-950/30 to-black",
      descriptions: {
        recruiter: "Built an end-to-end Credit Risk Platform. Delivers explainable decisions (Glass-box AI), crucial for financial compliance and user trust.",
        professor: "Implemented fairness-aware metrics to handle career breaks in credit scoring. Utilized SHAP values to provide interpretability for XGBoost predictions.",
        tech_head: "Deployed a microservices architecture. Backend: Python (FastAPI/Flask) running XGBoost. Frontend: React. Orchestrated via Docker Compose."
      },
      link: "#"
    },
    {
      id: "ibm-agent",
      title: "AI Textbook Tutor",
      category: "GenAI",
      stack: ["LangChain", "OpenAI", "Streamlit", "RAG"],
      // NEW: Theme Definition
      bgTheme: "from-blue-900 via-cyan-950 to-black",
      descriptions: {
        recruiter: "IBM Capstone Project: Created an AI Tutor that helps students learn faster. Managed deployment to cloud platforms.",
        professor: "Designed a Retrieval-Augmented Generation (RAG) system to ensure the AI only answers based on uploaded textbook PDFs, eliminating hallucinations.",
        tech_head: "Engineered a RAG pipeline using LangChain. vectorized PDFs into a vector store and wrapped it in a Streamlit UI for real-time interaction."
      }
    }
  ]
};