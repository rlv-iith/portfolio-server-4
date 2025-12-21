import { Briefcase, Code, FlaskConical } from 'lucide-react';

export const content = {
  // Shared Personal Info
  personal: {
    name: "Lalith Vishnu",
    email: "ic23btech11016@iith.ac.in",
    github: "https://github.com/rlv-iith",
    linkedin: "https://www.linkedin.com/in/ramuni-lalith-vishnu-4143ab299/",
    photo: "/images/Profile.JPG"
  },

  // 1. DASHBOARD HEADER INFO
  headers: {
    recruiter: {
      title: "CANDIDATE PROFILE",
      tagline: "High-Impact Engineer ready for deployment.",
      bio: "IIT Hyderabad Undergraduate with a unique hybrid profile in Industrial Chemistry and Computer Science. Proven track record of optimizing lab workflows by 30% via code and building full-stack AI solutions.",
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

  // 2. CV DATA SECTION (COMPLETE)
  resume: {
    education: [
      {
        degree: "B.Tech Industrial Chemistry",
        school: "IIT Hyderabad",
        year: "2023 - 2027",
        score: "CGPA: 7.79",
        id: "iith"
      },
      {
        degree: "Class XII",
        school: "Narayana Junior College",
        year: "2021 - 2023",
        score: "93.80%",
        id: "12th"
      }
    ],

    // Only REAL jobs/internships go here
    experience: [
      {
        role: "Research Intern",
        company: "ElectroChem Materials Group",
        duration: "May 2024 – Dec 2024",
        desc: [
          "Developed custom software to automate AxiDraw machines for precise surface cutting and material deposition.",
          "Collaborated with 2 Ph.D. scholars on Micro-superconductors; contributed to a research paper currently under publication.",
          "Designed prototype devices with ±0.005 precision, reducing experiment time by 30%."
        ]
      }
    ],

    // Workshop goes here
    certifications: [
      {
        title: "IBM SkillBuild: From Learner to Builder",
        issuer: "IBM",
        desc: "AI Agent Architect Capstone. Built a RAG pipeline to prevent model hallucinations."
      },
      {
        title: "Patent Filing & Prior Art Search",
        issuer: "IISc Bangalore | MoE India",
        desc: "Practical approach to intellectual property rights and search mechanisms."
      }
    ],

    // The "PoR" Section
    responsibilities: [
      {
        role: "Operations Coordinator",
        org: "Tinkerers' Lab – IITH",
        year: "2024–25",
        desc: "Oversaw operations for 80+ members. Managed ₹18L worth of inventory and lab infrastructure."
      },
      {
        role: "Core Team Member",
        org: "Torque (Auto Club) – IITH",
        year: "2024–25",
        desc: "Project Lead for Internal Combustion RC Car. Battery Domain Head for Mars Rover Challenge (Goa 2024)."
      },
      {
        role: "Class Representative",
        org: "Dept. Industrial Chemistry",
        year: "2023–24",
        desc: "Elected by 22 students. Bridged faculty-student communication and resolved ERP issues."
      }
    ],

    // The Skills Matrix
    skills: {
      technical: ["Python", "Pandas/NumPy", "Scikit-learn", "Docker", "React.js", "Node.js", "LangChain", "Streamlit", "SQLAlchemy"],
      tools: ["Git/GitHub", "Blender (Geometry Nodes)", "Solid Edge", "AutoCAD", "MATLAB", "LaTeX", "Arduino"],
      core: ["Machine Learning in Chem", "Electrochemistry", "Heterogeneous Catalysis"]
    },

    hackathons: [
      "Mitsubishi 3D Tech Hackathon 2024: Cash Prize Winner for 3D Segmentation contribution.",
      "Finshield Hackathon 2025: National Finalist - Built AI-driven credit risk analysis.",
      "NPCI Hackathon 2024: Qualified for Round 2 (Conducted by E-Cell)."
    ],

    achievements: [
      "Offered AI/ML Internship by Dr. Satish Kumar Regonda for excellent performance in coursework.",
      "Secured All INDIA Rank 1140 in UCEED 2023.",
      "NCC Cadet & Best Shooter (CATC - VII).",
      "Karate Shodan (Black Belt)."
    ]
  },

  // 3. THE PROJECTS
  projects: [
    {
      id: "mitsubishi",
      title: "3D Point Cloud Segmentation",
      category: "Computer Vision",
      stack: ["Python", "Blender API", "Docker", "LiDAR"],
      bgTheme: "from-purple-900 via-indigo-950 to-black",
      descriptions: {
        recruiter: "Cash Prize Winner. Engineered an automated data pipeline using Python/Docker that reduced manual labeling time by 11x.",
        professor: "Developed a novel procedural synthetic data generation engine in Blender to train Semantic Segmentation models.",
        tech_head: "Built a Python-Blender bridge using Geometry Nodes. Containerized the entire ML pipeline in Docker for reproducible inference."
      },
      link: "https://github.com/rlv-iith/3d-point-cloud" 
    },
    {
      id: "electrochem",
      title: "ElectroChem Lab Automation",
      category: "Robotics / R&D",
      stack: ["Python", "G-Code", "AxiDraw", "Hardware"],
      bgTheme: "from-emerald-900 via-teal-950 to-black",
      descriptions: {
        recruiter: "Built custom automation software for surface cutting. Collaborated with PhDs to increase lab testing throughput by 30%.",
        professor: "Contributed to a publication (under review) by automating the AxiDraw machine for precise electrochemical deposition.",
        tech_head: "Hacked an AxiDraw plotter using Python/CMD to accept custom G-Code. Integrated with Solid Edge designs."
      },
      link: "https://github.com/rlv-iith"
    },
    {
      id: "fintech-ai",
      title: "Explainable AI Credit Risk",
      category: "FinTech",
      stack: ["XGBoost", "SHAP", "React", "Docker"],
      bgTheme: "from-slate-800 via-yellow-950/30 to-black",
      descriptions: {
        recruiter: "National Finalist Project. Built an end-to-end Platform for credit decisions. Delivers 'Glass-box' explainability for compliance.",
        professor: "Implemented fairness-aware metrics handling career breaks. Utilized SHAP values to provide interpretability for XGBoost.",
        tech_head: "Deployed a microservices architecture (FastAPI + React + Docker). Trained XGBoost on synthetic financial datasets."
      },
      link: "https://github.com/rlv-iith/credit-risk-ai"
    },
    {
      id: "ibm-agent",
      title: "AI Textbook Tutor",
      category: "GenAI",
      stack: ["LangChain", "OpenAI", "Streamlit", "RAG"],
      bgTheme: "from-blue-900 via-cyan-950 to-black",
      descriptions: {
        recruiter: "Developed an AI Tutor that eliminates hallucinations by referencing uploaded PDFs. Live deployed.",
        professor: "Designed a RAG system ensuring answers are strictly derived from source textbooks, suitable for academic rigor.",
        tech_head: "Engineered a RAG pipeline using LangChain. Vectorized PDFs and wrapped the agent in a Streamlit UI."
      },
      link: "https://github.com/rlv-iith/ai-tutor"
    }
  ]
};
