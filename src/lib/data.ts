// Data extracted from existing components to preserve 100% of the content

// From Skills.tsx
export const skillCategories = [
  {
    title: "Core Stack",
    iconName: "Code2", // Replaced JSX with string for mapping to Lucide icons
    gradient: "from-[#9B30FF]/20 to-transparent",
    borderGlow: "group-hover:border-[#9B30FF]/50",
    skills: ["C#", ".NET", "ASP.NET Core", "ASP.NET Web API", "MVC", "LINQ"]
  },
  {
    title: "Security & APIs",
    iconName: "Shield",
    gradient: "from-[#7C3AED]/20 to-transparent",
    borderGlow: "group-hover:border-[#7C3AED]/50",
    skills: ["JWT Auth", "ASP.NET Identity", "RESTful APIs", "SignalR", "Swagger", "CORS"]
  },
  {
    title: "Architecture",
    iconName: "LayoutTemplate",
    gradient: "from-[#8B5CF6]/20 to-transparent",
    borderGlow: "group-hover:border-[#8B5CF6]/50",
    skills: ["N-Tier", "Repository Pattern", "Unit of Work", "SOLID", "Dependency Injection"]
  },
  {
    title: "Data Layer",
    iconName: "Database",
    gradient: "from-[#A78BFA]/20 to-transparent",
    borderGlow: "group-hover:border-[#A78BFA]/50",
    skills: ["SQL Server", "T-SQL", "EF Core", "ADO.Net", "Dapper", "Database Design"]
  },
  {
    title: "Tools",
    iconName: "PenTool",
    gradient: "from-[#C4B5FD]/20 to-transparent",
    borderGlow: "group-hover:border-[#C4B5FD]/50",
    skills: ["Git", "GitHub", "Postman", "Visual Studio", "SSMS", "AutoMapper", "Cursor", "Docker", "Swagger UI", "Azure Portal", "Notion"]
  }
];

// From Projects.tsx
export const projects = [
  {
    id: 1,
    title: "AlAsma Admin (Publishing House)",
    badge: "PUBLISHING PLATFORM",
    features: [
      "Complete e-commerce platform for book sales, inventory management, and order fulfillment.",
      "Secure author dashboard with real-time sales analytics, royalty tracking, and publishing contract management.",
      "Built with ASP.NET Core MVC, EF Core Code-First, and SQL Server — following N-Tier architecture."
    ],
    imageName: "publishing-system.png",
    techStack: [
      { name: "ASP.NET Core", color: "bg-primary" },
      { name: "SQL Server", color: "bg-blue-500" },
      { name: "Entity Framework", color: "bg-indigo-500" }
    ],
    liveUrl: "https://al-asma-admin.runasp.net/",
    githubUrl: "https://github.com/ziadeslam-git/AlAsma.Admin",
    detailsUrl: "#",
    isImportant: true
  },
  {
    id: 2,
    title: "Smart Store E-Commerce",
    badge: "E-COMMERCE PLATFORM",
    features: [
      "Full-stack commerce system built with Clean Architecture, featuring admin operations and customer shopping flows.",
      "Complete feature set: Identity, cart, wishlist, checkout, orders, and product reviews.",
      "AR/EN localization support with Cloudinary media management and Stripe payment integration."
    ],
    imageName: "smart-store-preview.png",
    techStack: [
      { name: "ASP.NET Core MVC", color: "bg-primary" },
      { name: "EF Core", color: "bg-blue-500" },
      { name: "Stripe", color: "bg-indigo-500" }
    ],
    liveUrl: "https://e-commerce-team-2.runasp.net/",
    githubUrl: "https://github.com/ziadeslam-git/ECommerce_System",
    detailsUrl: "/projects/smart-store",
    isImportant: true
  },
  {
    id: 3,
    title: "Edu-Stream Digital Media",
    badge: "EDUCATIONAL PLATFORM",
    features: [
      "Integrated interactive learning environment focused on gamification and digital media skills.",
      "Structured curriculum with 6 learning modules, pre-skill assessment, and instant quizzes.",
      "Built with React, WebGL shaders, and GSAP featuring real-time progress tracking."
    ],
    imageName: "edu-stream.png",
    techStack: [
      { name: "React 18", color: "bg-cyan-400" },
      { name: "TypeScript", color: "bg-blue-500" },
      { name: "Tailwind CSS", color: "bg-teal-400" },
      { name: "WebGL & GSAP", color: "bg-purple-500" }
    ],
    liveUrl: "https://edu-stream-digital-media-platform.vercel.app/",
    githubUrl: "https://github.com/ziadeslam-git/Edu-Stream",
    detailsUrl: "/projects/edu-stream",
    isImportant: true
  },
  {
    id: 4,
    title: "Cinema System",
    badge: "ENTERTAINMENT SYSTEMS",
    features: [
      "Users can view available movies and book tickets.",
      "Includes seat selection and showtime organization.",
      "Designed to provide a smooth and user-friendly booking experience."
    ],
    imageName: "cinema-system.png",
    techStack: [
      { name: "C#", color: "bg-white" },
      { name: "ASP.NET Web API", color: "bg-primary" },
      { name: "MongoDB", color: "bg-green-500" }
    ],
    liveUrl: "#",
    githubUrl: "#",
    detailsUrl: "#",
    isImportant: false
  },
  {
    id: 5,
    title: "Hospital & Clinics System",
    badge: "HEALTHCARE SYSTEMS",
    features: [
      "Patient registration, appointment scheduling, and medical records.",
      "Doctor management and treatment history across multiple clinics.",
      "Designed to improve workflow and reduce manual errors."
    ],
    imageName: "clinic-system.png",
    techStack: [
      { name: "C#", color: "bg-white" },
      { name: ".NET 8", color: "bg-primary" },
      { name: "PostgreSQL", color: "bg-blue-400" }
    ],
    liveUrl: "#",
    githubUrl: "#",
    detailsUrl: "#",
    isImportant: false
  }
];

// From Journey.tsx
export const journeys = [
  {
    id: 1,
    role: "Backend .NET Developer",
    date: "2026 - NOW",
    entity: "Personal Projects",
    description: "Building backend projects on my own. Writing APIs, connecting to databases, and applying what I learned to make real, working systems.",
    items: [
      { iconName: "Server", text: "REST APIs" },
      { iconName: "Lock", text: "JWT & Identity" },
      { iconName: "Database", text: "SQL Server & EF Core" }
    ]
  },
  {
    id: 2,
    role: "Information Systems Student — Backend Track",
    date: "2024 - Present",
    entity: "Higher Institute for Computer & Information Sciences (HICMIS)",
    description: "Studying the full .NET backend track — from C# and OOP fundamentals to ASP.NET Core APIs, databases, Entity Framework Core, LINQ, and architectural patterns including Repository, Unit of Work, and Clean Architecture.",
    items: [
      { iconName: "Terminal", text: "C# & OOP" },
      { iconName: "Database", text: "SQL Server & EF Core" },
      { iconName: "Code", text: "ASP.NET Core APIs" }
    ]
  }
];
