import { Briefcase, Code, FlaskConical, Zap } from 'lucide-react';

export const content = {
  // Shared Personal Info
  personal: {
    name: "Ramuni Lalith Vishnu",
    email: "ic23btech11016@iith.ac.in",
    github: "https://github.com/rlv-iith",
    linkedin: "https://www.linkedin.com/in/ramuni-lalith-vishnu-4143ab299/",
    photo: "/images/Profile.JPG" // Ensure this image exists in public/images/
  },

  // ... (keep all the headers and resume data from the previous version) ...

  headers: {
    recruiter: {
      title: "CANDIDATE PROFILE",
      // tagline: "Building scalable AI applications and data-driven systems.",
      bio: "IIT Hyderabad Undergraduate (Industrial Chemistry + CS). Built MCP server infrastructure at Stremly, researching at IISc Bangalore, and shipped end-to-end AI pipelines — from containerized ML models to LLM agent tooling.",
      color: "text-blue-400",
      border: "border-blue-500/50",
      icon: <Briefcase />
    },
    professor: {
      title: "RESEARCH FELLOW",
      tagline: "Molecular Electronics & Quantum Chemistry.",
      bio: "Research Intern at IISc Bangalore (Single Molecular Science Lab). Focused on Heterogeneous Catalysis, Electrochemical Energy, and applying Generative AI (Llama 3.2) to scientific workflows.",
      color: "text-emerald-400",
      border: "border-emerald-500/50",
      icon: <FlaskConical />
    },
    tech_head: {
      title: "SYSTEM ARCHITECT",
      tagline: "DevOps, GenAI & Full-Stack Systems.",
      bio: "Expert in building production-ready AI Agents (RAG pipelines). Skilled in Dockerizing microservices, managing Synthetic Data pipelines with Blender API, and deploying scalable REST APIs for ML inference.",
      color: "text-purple-400",
      border: "border-purple-500/50",
      icon: <Code />
    },
    catalyst: {
      title: "R&D SYSTEMS ENGINEER",
      tagline: "From First Principles to Production Scale.",
      bio: "Synthesizing deep knowledge of physical sciences with AI architecture to build novel systems. Focused on Energy, Quantum, and automating complex scientific discovery with intelligent agents.",
      color: "text-amber-400",
      border: "border-amber-500/50",
      icon: <Zap />
    }
  },

  resume: {
    education: [
      {
        degree: "B.Tech Industrial Chemistry",
        school: "IIT Hyderabad",
        year: "2023 - 2027",
        
        id: "iith"
      },
      {
        degree: "Class XII",
        school: "Narayana Junior College",
        year: "2021 - 2023",
        
        id: "12th"
      }
    ],

    experience: [
      {
        role: "AI Systems Intern",
        company: "Stremly (AI Startup)",
        duration: "Apr 2026 – Jun 2026",
        desc: [
          "Built backend systems to let LLMs interact with tools like Slack and Jira using a standard interface (MCP).",
          "Added Redis-based monitoring to track service health and reliability.",
          "Implemented HMAC-based authentication to secure API communication between services.",
          "Designed async request handling to manage multiple tool calls and avoid race conditions."
        ]
      },
      {
        role: "Research Intern",
        company: "Indian Institute of Science (IISc), Bangalore",
        duration: "Dec 2025 – Apr 2026",
        desc: [
          "Developed a new setup to measure thermopower in molecular junctions.",
          "Built hardware systems for temperature-controlled experiments.",
          "Wrote Python code to control instruments and automate data collection.",
          "Used SEM imaging to analyze fabricated devices."
        ]
      },
      {
        role: "Safety Intern",
        company: "Laboratory Chemical Safety (IITH)",
        duration: "July 2025 – Nov 2025",
        desc: [
          "Refined and updated the Institute Safety Manual under the Safety Committee.",
          "Streamlined documentation protocols for hazardous material handling."
        ]
      },
      {
        role: "Research Intern",
        company: "ElectroChem Materials Group (IITH)",
        duration: "May 2024 – Dec 2024",
        desc: [
          "Automated an AxiDraw machine using Python & G-Code for precise electrochemical deposition (±0.005 inches).",
          "Collaborated with Ph.D. scholars on Micro-superconductors; contributed to a paper currently under review.",
          "Designed prototype devices using Solid Edge to reduce experiment turnaround time by 30%."
        ]
      }
    ],

    certifications: [
      {
        title: "IBM SkillBuild: AI Agent Architect",
        issuer: "IBM",
        type: "Online Course",
        desc: "Capstone Project: Built a functional AI Agent with RAG architecture to prevent hallucinations."
      },
      {
        title: "Patent Filing & Prior Art Search",
        issuer: "IISc Bangalore | MoE India",
        type: "Workshop",
        desc: "Workshop on Intellectual Property Rights and patent search mechanisms."
      }
    ],

    responsibilities: [
      {
        role: "Outbound & PR Coordinator",
        org: "International Relations Cell – IITH",
        year: "2025–26",
        desc: "Facilitating global academic partnerships and managing public relations for the institute."
      },
      {
        role: "Operations Coordinator",
        org: "Tinkerers' Lab – IITH",
        year: "2024–25",
        desc: "Managed an 80+ member team and ₹18L worth of inventory. Played a key role in BUILD-2024 incubator."
      },
      {
        role: "Core Team Member",
        org: "Torque (Auto Club) – IITH",
        year: "2024–25",
        desc: "Project Lead for Internal Combustion RC Car. Battery Domain Head for Mars Rover Challenge (Goa)."
      }
    ],

    skills: {
      core:    ["Python", "SQL", "C++"],
      ai_data: ["XGBoost", "RAG Pipelines", "LangChain", "SHAP"],
      systems: ["Docker", "REST APIs", "Git/GitHub"]
    },

    hackathons: [
      "Finshield Hackathon 2025: National Finalist (Credit Risk AI).",
      "Mitsubishi 3D Tech Hackathon 2024: Cash Prize Winner (3D Segmentation Pipeline).",
      "NPCI Hackathon 2024: Qualified for Round 2."
    ],

    achievements: [
      "Secured All INDIA Rank 13665 in JEE Advanced.",
      "Secured All INDIA Rank 1140 in UCEED 2023.",
      "Young Innovators Program Selection (CSIR-CCMB 2019).",
      "Karate Shodan (Black Belt) & National Player."
    ]
  },

  // 3. THE PROJECTS (UPDATED WITH CORRECT GITHUB LINKS)
  projects: [
    {
      id: "fintech-ai",
      title: "Credit Risk & Explainable AI",
      category: "FinTech / ML",
      stack: ["XGBoost", "SHAP", "Docker", "React"],
      bgTheme: "from-slate-800 via-yellow-950/30 to-black",
      descriptions: {
        recruiter: "National Finalist Project. Architected an end-to-end platform for credit decisions with 'Glass-box' explainability using SHAP. Containerized using Docker Compose.",
        professor: "Engineered a fairness-aware feature pipeline handling career breaks. Optimized XGBoost metrics (AUC-ROC / F1-Score) on synthetic datasets.",
        tech_head: "Deployed a microservices architecture (FastAPI backend + React frontend). Implemented custom income consistency scoring algorithms."
      },
      link: "https://github.com/rlv-iith" // General link as repo is private
    },
    {
      id: "mitsubishi",
      title: "3D Synthetic Data Engine",
      category: "Computer Vision",
      stack: ["Blender", "Python", "LiDAR", "Docker"],
      bgTheme: "from-purple-900 via-indigo-950 to-black",
      descriptions: {
        recruiter: "Cash Prize Winner. Solved the data-scarcity problem by building a Synthetic Data Generation engine in Blender, reducing manual labeling time by 11x.",
        professor: "Procedurally generated pre-labeled LiDAR point clouds using Geometry Nodes to train Semantic Segmentation models without human bias.",
        tech_head: "Built a Python-Blender bridge for automated rendering. Containerized the entire pipeline for reproducible 3D inference."
      },
      link: "https://github.com/rlv-iith/3d-point-cloud" // CORRECTED
    },
    {
      id: "ibm-agent",
      title: "AI Textbook Tutor (RAG)",
      category: "GenAI Agent",
      stack: ["LangChain", "OpenAI", "Streamlit", "VectorDB"],
      bgTheme: "from-blue-900 via-cyan-950 to-black",
      descriptions: {
        recruiter: "IBM Capstone Project. Built and deployed a hallucination-free AI Tutor that answers questions strictly from uploaded PDF textbooks.",
        professor: "Implemented a Retrieval Augmented Generation (RAG) architecture to create a smart knowledge base for academic content.",
        tech_head: "Engineered the backend using LangChain agents. Managed context windows and vector embeddings for precise query retrieval."
      },
      link: "https://github.com/rlv-iith/ai-tutor" // CORRECTED
    },
    {
      id: "electrochem",
      title: "Lab Automation (AxiDraw)",
      category: "Robotics / Hardware",
      stack: ["Python", "G-Code", "Solid Edge", "Hardware"],
      bgTheme: "from-emerald-900 via-teal-950 to-black",
      descriptions: {
        recruiter: "Bridged software and hardware. Hacked an AxiDraw machine to perform precise chemical deposition, increasing lab throughput by 30%.",
        professor: "Designed prototype devices with ±0.005 inch precision. Work contributed to ongoing research in Micro-superconductors.",
        tech_head: " wrote custom Python scripts to generate G-Code paths for non-standard hardware control. Integrated with CAD designs."
      },
      link: "https://github.com/rlv-iith" // General link as repo is private
    }
  ]
};