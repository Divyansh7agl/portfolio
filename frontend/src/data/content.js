/* ============================================================
   DIVYANSH.OS — single source of truth for ALL portfolio content.
   Shared by the home experience and every linked view.
   Edit here only.
   ============================================================ */

export const PROFILE = {
  name: "Divyansh Agarwal",
  first: "Divyansh",
  brand: "DIVYANSH.OS",
  role: "Full Stack Developer | AI Builder | Problem Solver",
  roleShort: "Full Stack Developer & AI Builder",
  monogram: "DA",
  intro:
    "I'm an IT undergraduate passionate about building useful software, experimenting with AI, and solving real-world engineering problems. I enjoy working across the stack, from designing intuitive interfaces to building backend systems and integrating AI capabilities.",
  heroSub:
    "An IT engineering student at MBM Engineering College with a track record of shipping production-grade products. I build full-stack and AI-powered applications using modern web technologies.",
  approach:
    "I treat every build like a product, not a demo — shipping things that work end to end, then iterating on what the real world does to them.",
  email: "divyansh.agl.jpr@gmail.com",
  location: "Jodhpur, India",
  photo:
    "https://customer-assets-gfyr7b9c.emergentagent.net/job_dev-command-27--5wvaxanw/artifacts/c1ecda4493679121_1748949910834%20%282%29.jpeg",
    socials: {
    github: "https://github.com/Divyansh7agl",
    githubRepos: "https://github.com/Divyansh7agl?tab=repositories",
    linkedin: "https://www.linkedin.com/in/divyansh-agarwal-ab3794325/",
    leetcode: "https://leetcode.com/u/divyansh75/",
  },
};

export const EDUCATION = {
  degree: "B.E. Information Technology",
  school: "MBM University, Jodhpur",
  period: "2024 — 2028 (expected)",
  detail: "9.04 SGPA in the first semester.",
};

export const SKILLS = [
  { category: "Languages", items: ["JavaScript", "Python", "C++", "C", "HTML", "CSS"] },
  { category: "Frontend", items: ["React.js", "Next.js", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Flask", "FastAPI"] },
  { category: "Databases", items: ["MongoDB", "PostgreSQL", "Supabase", "Firebase", "Neon", "Drizzle ORM"] },
  { category: "Cloud", items: ["AWS", "Azure", "Vercel"] },
  { category: "AI & Tools", items: ["Ollama", "Gemini API", "Git", "GitHub", "VS Code", "Cursor"] },
];

export const PROJECTS = [
  {
    id: "ratify",
    name: "Ratify",
    category: "Cloud · Full-Stack",
    tagline: "Multi-cloud monitoring dashboard",
    desc: "A platform that gives visibility into cloud infrastructure across AWS and Azure — real-time usage, cost inefficiencies and optimization insights surfaced in one place.",
    tech: ["React", "JavaScript", "Tailwind CSS", "Flask", "AWS", "Azure"],
    links: { live: "https://ratify-3mew.vercel.app/" },
    achievement: "2nd place — 24-hour hackathon",
    accent: "#38BDF8",
    mockup: "cloud",
    caseStudy: {
      overview:
        "Ratify is a multi-cloud monitoring dashboard built to unify visibility across AWS and Azure. Instead of hopping between provider consoles, usage, costs and optimization opportunities surface in one interface.",
      problem:
        "Infrastructure spread across two clouds means two consoles, two metric systems and two billing views. Inefficiencies hide in the gaps between them.",
      solution:
        "A React + Tailwind dashboard backed by a Flask API layer that pulls from AWS and Azure APIs, visualizes usage in real time, and highlights cost inefficiencies with actionable insights.",
      architecture: ["React + Tailwind CSS frontend", "Flask API layer", "AWS & Azure provider APIs", "Aggregation + insight engine"],
      implementation: [
        "Real-time usage visualization across both clouds",
        "Cost inefficiency analysis with surfaced optimization insights",
        "Provider APIs abstracted behind one API layer",
      ],
      challenges: "Normalizing two very different cloud provider APIs into a single coherent data model without losing provider-specific detail.",
      learned: "How to design an abstraction layer that keeps heterogeneous cloud APIs behind one interface — and how much that pays off under hackathon time pressure.",
    },
  },
  {
    id: "clutch-ai",
    name: "Clutch AI",
    category: "AI · Voice",
    tagline: "AI-powered Interview Pressure Simulator",
    desc: "An interview simulation application using real-time voice interaction and AI-generated feedback — four difficulty modes, PDF resume parsing, and an engine that scores clarity and composure.",
    tech: ["React", "TypeScript", "Ollama", "Groq API", "Web Speech API"],
    links: { live: "https://clutch-ai.netlify.app/" },
    accent: "#A78BFA",
    mockup: "voice",
    caseStudy: {
      overview:
        "Clutch AI runs realistic interview pressure tests: it speaks to you in real time, adapts to your resume, and scores your answers on clarity and composure.",
      problem:
        "Interview practice alone is awkward. Most tools are text-based and never recreate the pressure of speaking out loud while being evaluated.",
      solution:
        "A voice-first simulator with four difficulty modes. The Web Speech API handles real-time speech, a PDF parser personalizes questions from your resume, and an AI feedback engine scores every answer.",
      architecture: ["React + TypeScript frontend", "Web Speech API for live voice", "Groq API / LLM layer for questions + feedback", "Ollama for local model runs", "PDF resume parsing pipeline"],
      implementation: [
        "Real-time voice interviews — speak, get asked back, continuously",
        "Four dynamic difficulty modes, from warm-up to brutal",
        "AI feedback engine scoring clarity and composure",
      ],
      challenges: "Keeping the voice + LLM loop fast enough to feel like a real conversation — speech recognition latency and instant feedback don't come free.",
      learned: "Building low-latency, voice-driven AI interaction in the browser and where local models (Ollama) fit versus hosted LLM APIs.",
    },
  },
  {
    id: "linkedin-labs",
    name: "LinkedIn Labs",
    category: "AI · Full-Stack",
    tagline: "AI-powered LinkedIn Profile Optimizer",
    desc: "An AI-powered tool that optimizes LinkedIn profiles — built with a Python backend and a React frontend.",
    tech: ["React", "JavaScript", "Python", "Tailwind CSS", "Framer Motion"],
    links: {},
    accent: "#22D3EE",
    mockup: "optimizer",
    caseStudy: {
      overview: "LinkedIn Labs is an AI-powered LinkedIn Profile Optimizer.",
      problem: "Most profiles undersell the work behind them.",
      solution: "A tool that uses AI to optimize LinkedIn profiles, with a Python backend and a React + Framer Motion frontend.",
    },
  },
  {
    id: "green-links",
    name: "The Green Links",
    category: "Full-Stack · Production",
    tagline: "Eco-friendly business directory — live in production",
    desc: "A production-grade eco-friendly business directory with 20+ listings, three-tier RBAC, a CMS admin panel, React for UI and Firebase real-time database.",
    tech: ["TypeScript", "React", "Firebase", "Tailwind CSS"],
    links: { live: "https://thegreenlinks.in/" },
    accent: "#34D399",
    mockup: "directory",
    caseStudy: {
      overview:
        "The Green Links is a live, production eco-friendly business directory at thegreenlinks.in — 20+ listings, role-based management and a full CMS admin panel.",
      problem: "Eco-conscious businesses had no single trusted directory to be discovered through.",
      solution:
        "A production directory built on React + TypeScript with a Firebase real-time database, a three-tier RBAC system, and a CMS admin panel for managing listings.",
      architecture: ["React + TypeScript UI", "Firebase real-time database", "Three-tier RBAC authorization", "CMS admin panel"],
      implementation: ["20+ curated listings in production", "Role-based access across three tiers", "Admin panel for full content control"],
      learned: "What it actually takes to run a live product — real users, real content, real upkeep.",
    },
  },
  {
    id: "chess",
    name: "Chess Game",
    category: "Frontend",
    tagline: "Browser chess",
    desc: "A chess game built for the browser — one of several self-driven frontend builds.",
    tech: [],
    links: {},
    accent: "#F59E0B",
    mockup: "board",
    caseStudy: null,
  },
  {
    id: "spotify-clone",
    name: "Spotify Clone",
    category: "Frontend",
    tagline: "Streaming UI clone",
    desc: "A Spotify interface clone — a frontend build focused on recreating a production-grade UI.",
    tech: [],
    links: {},
    accent: "#4ADE80",
    mockup: "player",
    caseStudy: null,
  },
  {
    id: "tic-tac-toe",
    name: "Tic Tac Toe",
    category: "Frontend",
    tagline: "Classic game, rebuilt",
    desc: "Tic Tac Toe for the browser — a compact frontend build.",
    tech: [],
    links: {},
    accent: "#F472B6",
    mockup: "grid",
    caseStudy: null,
  },
];

export const ACHIEVEMENTS = [
  {
    year: "2026",
    title: "2nd Place — e-Yantra Grand Finale",
    org: "IIT Bombay",
    desc: "Secured 2nd place (1st runner-up) at the e-Yantra Grand Finale at IIT Bombay, out of thousands of participating teams.",
    photo:
      "https://customer-assets-gfyr7b9c.emergentagent.net/job_6b4fdd01-ea79-4752-ae8d-09048c13c1ce/artifacts/c71769d0f3a7a5e1_eyantra%20first%20runner%20up.webp",
    tag: "Robotics",
  },
  {
    year: "2026",
    title: "Top 20 — Ideathon (Prometeo)",
    org: "IIT Jodhpur",
    desc: "Shortlisted in the top 20 for innovative problem-solving in a nationwide ideathon.",
    photo:
      "https://customer-assets-gfyr7b9c.emergentagent.net/job_6b4fdd01-ea79-4752-ae8d-09048c13c1ce/artifacts/9d1deee26bd81fd0_top%2020%20ideathon%20%28IIT%20Jodhpur%29.jpeg",
    tag: "Innovation",
  },
  {
    year: "2025",
    title: "Runner-up — Hackingly Cloud Hackathon",
    org: "Hackingly",
    desc: "Built a scalable real-world solution under extreme time pressure, securing 2nd position.",
    photo:
      "https://customer-assets-gfyr7b9c.emergentagent.net/job_6b4fdd01-ea79-4752-ae8d-09048c13c1ce/artifacts/bbd46abc663fb1a3_cloud%20based%20hackathon%201st%20runner%20up.jpeg",
    tag: "Cloud",
  },
  {
    year: "2025",
    title: "Software Development Engineer Intern",
    org: "Skillonation",
    desc: "Developed full-stack features, integrated LLM APIs to automate content processing, and set up secure Firebase authentication.",
    tag: "Experience",
  },
  {
    year: "2025",
    title: "AI Trainee — Top 5% of cohort",
    org: "iStart Rajasthan (RKCL)",
    desc: "Ranked in the top 5% of 40+ trainees with a 97% score. Trained on supervised learning and real-world AI applications with Python and scikit-learn.",
    tag: "AI",
  },
  {
    year: "2024",
    title: "4th Place — 36-hour AI Hackathon",
    org: "National level",
    desc: "Secured 4th place in an intensive 36-hour AI-based hackathon.",
    photo:
      "https://customer-assets-gfyr7b9c.emergentagent.net/job_6b4fdd01-ea79-4752-ae8d-09048c13c1ce/artifacts/bd3b6fe02005b724_ai%20hackathon%204th%20place.jpeg",
    tag: "AI",
  },
  {
    year: "",
    title: "Aester Alpha Hackathon Finalist",
    org: "",
    desc: "Finalist at the Aester Alpha hackathon.",
    photo:
      "https://customer-assets-gfyr7b9c.emergentagent.net/job_6b4fdd01-ea79-4752-ae8d-09048c13c1ce/artifacts/6b82e461ac8a12fa_aester%20alpha%20hackathon%20finalist.jpeg",
    tag: "Hackathon",
  },
  {
    year: "",
    title: "Gold Medal — Inter-University Kabaddi Championship",
    org: "IIT Jodhpur",
    desc: "Won the gold medal at the Inter-University Kabaddi Championship hosted at IIT Jodhpur.",
    tag: "Sport",
  },
  {
    year: "",
    title: "University Representation — Chess & Kabaddi",
    org: "MBM University",
    desc: "Represented the university in both Chess and Kabaddi.",
    tag: "Sport",
  },
  {
    year: "",
    title: "150+ DSA problems practiced",
    org: "",
    desc: "Consistent problem-solving across data structures and algorithms.",
    tag: "DSA",
  },
  {
    year: "",
    title: "9.04 SGPA — First Semester",
    org: "MBM University",
    desc: "Academic performance in the first semester of B.E. Information Technology.",
    tag: "Academic",
  },
];

export const LAB = {
  experiments: [
    {
      title: "Voice-driven interview simulation",
      desc: "Real-time speech-to-text interview pressure simulation with an AI engine scoring clarity and composure — the engine behind Clutch AI.",
      stack: ["Web Speech API", "Groq API", "TypeScript"],
      status: "Shipped",
      link: "https://clutch-ai.netlify.app/",
      category: "AI experiments",
    },
    {
      title: "Local LLM pipelines with Ollama",
      desc: "Running and evaluating local models with Ollama for private, low-latency AI features.",
      stack: ["Ollama", "Python"],
      status: "Active",
      link: "",
      category: "AI experiments",
    },
    {
      title: "Multi-cloud visibility",
      desc: "Normalizing AWS and Azure APIs into one monitoring surface — usage, cost inefficiencies and optimization insights.",
      stack: ["AWS", "Azure", "Flask"],
      status: "Shipped",
      link: "https://ratify-3mew.vercel.app/",
      category: "Cloud infrastructure",
    },
    {
      title: "Production directory platform",
      desc: "The Green Links — an eco-business directory with RBAC and a CMS admin panel, live and maintained in production.",
      stack: ["React", "TypeScript", "Firebase"],
      status: "Live",
      link: "https://thegreenlinks.in/",
      category: "Full-stack applications",
    },
    {
      title: "Profile optimization with AI",
      desc: "LinkedIn Labs — an AI-powered LinkedIn profile optimizer with a Python backend and React frontend.",
      stack: ["Python", "React", "Tailwind CSS"],
      status: "Active",
      link: "",
      category: "Developer tools",
    },
  ],
  currentlyExploring: [
    "Local LLM agents with Ollama",
    "Cloud cost optimization on AWS & Azure",
    "Voice-first AI interfaces",
    "Full-stack patterns for production apps",
  ],
};

export const RESUME = {
  url: "/resume/Divyansh_SDE_Resume.pdf",
  label: "Divyansh_Agarwal_Resume.pdf",
};

export const CONTACT = {
  email: PROFILE.email,
  github: PROFILE.socials.github,
  linkedin: PROFILE.socials.linkedin,
};

export const HERO_WORDS = ["FULL-STACK DEVELOPER", "AI BUILDER", "PROBLEM SOLVER", "CLOUD TINKERER"];

export const STATS = [
  { value: "150+", label: "DSA problems practiced" },
  { value: "3", label: "live products shipped" },
  { value: "5", label: "hackathon honors" },
  { value: "9.04", label: "SGPA — first semester" },
];
