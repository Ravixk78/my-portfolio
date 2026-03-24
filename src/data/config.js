import { Palette, Code, Terminal, BrainCircuit, Download, Smartphone, Database, Globe, Cpu } from 'lucide-react';

export const PORTFOLIO_DATA = {
  name: "Ravindu Kushan", // ඔබේ නම මෙතනට දාන්න
  titlePrefix: " ",
  titleGradient: "Intern",
  titleSuffix: "Software Engineer",
  tagline: "Building modern, scalable and user-focused digital products.",
  avatar: "cv .jpg", // ඔබේ පින්තූරය මෙතනට දාන්න
  email: "ravindukushan78@gmail.com",
  phone: "+94 70 412 6703",
  cvUrl: "https://drive.google.com/file/d/1ot6T38-lVcHzA4Wm-Uoi0sZHX5gNTLiZ/view?usp=drive_link", // ඔබේ CV එකේ Link එක මෙතනට දාන්න (Google Drive link එකක් වුණත් කමක් නැහැ)
  aboutQuote: '"Building solutions that are simple, scalable, and meaningful."',
  aboutBio: "I’m a passionate Software Engineering undergraduate with a strong interest in building modern and user-friendly applications. I enjoy turning ideas into real-world solutions through clean, efficient, and scalable code.My focus is on creating high- quality digital products that not only work well but also provide a smooth user experience.I’m constantly learning new technologies and improving my skills to stay up - to - date in the fast - growing tech industry..",
  aboutTitle: "Technical",
  aboutSubtitle: "Explorer",
  capabilitiesTitle: "System_Capabilities",
  projectsTitle: "FEATURED",
  projectsSubtitle: "Projects",
  socials: {
    github: "https://github.com/Ravixk78",
    linkedin: "https://www.linkedin.com/in/ravindu-kushan-1a3300326/",
    instagram: "https://www.instagram.com/ravi_x_k/"
  },
  projects: [
    {
      title: "Sniper Car Care",
      description: "Developing a car service management system with integrated POS billing, camera-based vehicle detection, and automated SMS notifications. The system enhances service efficiency with real-time processing and a user-friendly interface.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
      tech: ["React", " Node.js", " HTML", "CSS", "JavaScript"],
      links: { github: "https://github.com/Sashika-Dilmina/Sniper-Car-Care---POS-System", live: "#" }
    },
    {
      title: "Sithamithuru Elder Wellbeing App",
      description: "Built a mobile application focused on elderly wellbeing with features like health tracking, emergency alerts, and real-time caregiver notifications, ensuring a safe and user-friendly experience.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      tech: ["React Native", "JavaScript"],
      links: { github: "https://github.com/dilminekanayaka/SithaMithuru-Elder-Care-System", live: "#" }
    },
    {
      title: "QuickServe",
      description: "Developed a cross-platform mobile application for booking professional services with real-time updates, secure authentication, and a modern, responsive user interface.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      tech: ["Flutter", "Dart ", "Supabase"],
      links: { github: "https://github.com/Ravixk78/Quick-Serve", live: "#" }
    },
    {
      title: "Bizz Tracker",
      description: "Developed a full-stack business management web application to track income, expenses, and profits with real-time updates. The system provides interactive financial insights and secure user authentication for efficient data management.",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80",
      tech: ["React", "Node.js", "Express.js", "MongoDB"],
      links: { github: "https://github.com/Sashika-Dilmina/Expense-Tracker-clone", live: "#" }
    },
    {
      title: "Melody Master",
      description: "Developed a music management web application that allows users to browse and manage songs through a clean and responsive interface. The system ensures smooth navigation and efficient data handling for an improved user experience.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      tech: ["PHP", "MySQL ", "HTML", "CSS", "JavaScript"],
      links: { github: "https://github.com/Ravixk78/Music-Instrument-Shop-Online-Store", live: "https://melody-masters.gt.tc/" }
    }
  ],
  skills: [
    { name: 'FULL-STACK DEV', icon: Globe, color: '#00ff88' },
    { name: 'MOBILE DEV', icon: Smartphone, color: '#00ff88' },
    { name: 'API DEVELOPMENT', icon: Terminal, color: '#00ff88' },
    { name: 'DATABASE MGMT', icon: Database, color: '#00ff88' }
  ],
};
