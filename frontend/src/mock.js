const getAcademicYearString = () => {
  const startYear = 2024;
  const currentDate = new Date();
  const yearNum = currentDate.getFullYear() - startYear + (currentDate.getMonth() >= 7 ? 1 : 0);
  const yearNames = ["First", "Second", "Third", "Fourth"];
  return (yearNum >= 1 && yearNum <= 4) ? `${yearNames[yearNum - 1]}-year` : yearNum > 4 ? "Graduated" : "First-year";
};

export const profile = {
  name: "Chaitanya Siddharth",
  title: "AI & ML Student",
  location: "Bangalore, India",
  locationCode: "BLR",
  email: "chaitanyasiddharth01@gmail.com",
  linkedin: "https://linkedin.com/in/chaitanya-siddharth-a39609321",
  linkedinUsername: "chaitanya-siddharth-a39609321",
  github: "https://github.com/Chaitanyasiddharth",
  githubUsername: "Chaitanyasiddharth",
  bio: `${getAcademicYearString()} B.Tech in AI & ML at Alliance University; strong Python, DSA, and problem-solving foundation.`,
  avatarUrl: "/avatar.jpg",
  version: "1.0.0",
  availability: "Available for internships",
};

export const skills = [
  "AI",
  "ML",
  "Entrepreneurship",
  "Research",
  "Python",
  "DSA",
  "React 19",
  "Tailwind CSS",
  "FastAPI",
  "MongoDB",
];

export const focusAreas = [
  { name: "Machine Learning & AI Core", level: "Intermediate" },
  { name: "Python Programming", level: "Advanced" },
  { name: "Data Structures & Algorithms", level: "Advanced" },
  { name: "Academic Research & Writing", level: "Intermediate" },
  { name: "Full-Stack Web (React + FastAPI)", level: "Intermediate" },
  { name: "Database Systems (MongoDB + SQL)", level: "Intermediate" },
  { name: "Entrepreneurship & Innovation", level: "Intermediate" },
];

export const education = [
  {
    year: "2024 - 2028",
    degree: "B.Tech in Artificial Intelligence & Machine Learning",
    institution: "Alliance University",
    location: "Bangalore, India",
    status: "Ongoing",
  },
  {
    year: "2022 - 2024",
    degree: "Class 12 (Pre-University Science)",
    institution: "BGS PU College",
    location: "Bangalore, India",
    status: "Completed",
  },
  {
    year: "2020 - 2022",
    degree: "Class 10 (Secondary School)",
    institution: "BGS School",
    location: "Bangalore, India",
    status: "Completed",
  },
];

export const experience = [
  {
    title: "Open to Internships",
    role: "AI/ML & Software Developer Intern",
    company: "Seeking Opportunities",
    period: "Ongoing",
    description: "Actively looking for internship opportunities in Bangalore or remote. Ready to contribute, build, and learn in fast-paced software engineering and machine learning teams.",
    tags: ["AI", "ML", "Python", "React", "FastAPI"],
  },
  {
    title: "Self-Directed Learner",
    role: "Independent Builder",
    company: "Personal Projects & Open Source",
    period: "2024 - Present",
    description: "Deepened knowledge in neural network design, model training pipelines, and building web apps. Actively participating in developer forums, solving algorithmic challenges, and studying startup frameworks.",
    tags: ["DSA", "Deep Learning", "FastAPI", "Systems Design"],
  },
];

export const projects = [
  {
    id: "01",
    title: "Smart AI Camera",
    subtitle: "COMPUTER VISION",
    description: "Real-time object detection and tracking pipeline. Implements bounding box animation and custom heatmap overlays to visualize inference and target tracking density.",
    stack: ["Python", "YOLOv8", "OpenCV", "PyTorch"],
    status: "Ongoing",
  },
  {
    id: "02",
    title: "Smart Pet Collar",
    subtitle: "IOT & HEALTH TRACKING",
    description: "Holographic pet health tracking dashboard. Integrates real-time mock data streams for GPS, heartbeat monitoring, and stress levels on an animated pet model.",
    stack: ["React", "FastAPI", "WebSockets", "ChartJS"],
    status: "Live",
  },
  {
    id: "03",
    title: "FactCheck AI",
    subtitle: "NATURAL LANGUAGE PROCESSING",
    description: "Verification pipeline parsing natural language statements through NLP cross-referencing layers to generate truth credibility scores and automated refutations.",
    stack: ["FastAPI", "Transformers", "Pydantic", "MongoDB"],
    status: "Live",
  },
  {
    id: "04",
    title: "Minimalist Dev Portfolio",
    subtitle: "FULL STACK WEB",
    description: "Dark editorial-style single-page portfolio with clean typography, custom grain, and marquee ribbons. Integrated with Claude AI for streaming chatbot interactions.",
    stack: ["React 19", "Tailwind CSS", "FastAPI", "MongoDB"],
    status: "Live",
  },
];

export const certificates = [
  {
    title: "Python for Data Science",
    issuer: "IBM / Coursera",
    year: "2024",
    credentialId: "IBM-PYDS-9238",
  },
  {
    title: "Machine Learning Specialization",
    issuer: "DeepLearning.AI / Stanford",
    year: "2024",
    credentialId: "DL-ML-2849",
  },
  {
    title: "Data Structures and Algorithms",
    issuer: "GeeksforGeeks",
    year: "2024",
    credentialId: "GFG-DSA-1082",
  },
  {
    title: "AI Ethics & Global Applications",
    issuer: "Alliance University Academic",
    year: "2025",
    credentialId: "AU-AIE-5620",
  },
];
