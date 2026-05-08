import { Button } from "@/components/ui/button";
import { CheckCircle2, Github, Globe, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Projects = () => {
  const [filter, setFilter] = useState("important");

  const projects = [
    {
      id: 1,
      title: "AlAsma Admin (Publishing House)",
      badge: "PUBLISHING PLATFORM",
      features: [
        "Complete e-commerce platform for book sales and inventory management.",
        "Secure author dashboard for real-time sales and royalty tracking.",
        "Transparent publishing status updates and financial reports."
      ],
      image: `${import.meta.env.BASE_URL}uploads/publishing-system.png`,
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
        "Full-stack commerce system with admin operations and customer shopping.",
        "Features include Identity, cart, wishlist, checkout, orders, reviews.",
        "Supports AR/EN localization and Cloudinary media management."
      ],
      image: `${import.meta.env.BASE_URL}uploads/smart-store-preview.png`,
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
      title: "Bank Management System",
      badge: "FINANCIAL SERVICES",
      features: [
        "Account creation, deposits, withdrawals, and balance tracking.",
        "Basic transaction validation and data consistency handling.",
        "Focused on reliability, security, and structured data management."
      ],
      image: `${import.meta.env.BASE_URL}uploads/bank-system.png`,
      techStack: [
        { name: "C#", color: "bg-white" },
        { name: ".NET Core", color: "bg-primary" },
        { name: "SQL Server", color: "bg-blue-500" },
        { name: "Redis", color: "bg-red-500" }
      ],
      liveUrl: "#",
      githubUrl: "#",
      detailsUrl: "#",
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
      image: `${import.meta.env.BASE_URL}uploads/cinema-system.png`,
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
      image: `${import.meta.env.BASE_URL}uploads/clinic-system.png`,
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

  const displayedProjects = filter === "important" 
    ? projects.filter(p => p.isImportant)
    : projects;

  return (
    <section id="projects" className="py-20 lg:py-28 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-6 sm:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="mb-12 lg:mb-20 text-center"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
              My Projects
            </h2>
            <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto italic mb-8">
              Real systems I built while working — real projects for real clients and businesses.
            </p>

            {/* Filter Buttons */}
            <div className="flex justify-center gap-4">
              <Button
                variant={filter === "important" ? "default" : "outline"}
                onClick={() => setFilter("important")}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 ${
                  filter === "important" 
                    ? 'bg-primary text-primary-foreground shadow-glow border-transparent' 
                    : 'bg-white/5 border-white/20 text-white hover:bg-white/10'
                }`}
              >
                Important Projects
              </Button>
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 ${
                  filter === "all" 
                    ? 'bg-primary text-primary-foreground shadow-glow border-transparent' 
                    : 'bg-white/5 border-white/20 text-white hover:bg-white/10'
                }`}
              >
                All Projects
              </Button>
            </div>
          </motion.div>

          <div className="space-y-16 lg:space-y-24">
            <AnimatePresence mode="popLayout">
              {displayedProjects.map((project, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.6 }}
                    className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}
                  >
                    {/* Image Section */}
                    <div className="w-full lg:w-1/2">
                      <div className="relative group rounded-2xl lg:rounded-3xl overflow-hidden glass-dark border border-white/5 transition-all duration-500 hover:border-primary/50 hover:shadow-neon aspect-video sm:aspect-[4/3] lg:aspect-square flex items-center justify-center">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* No dark overlay! Keeping it 100% visible */}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                      <div className="inline-flex px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-4 w-fit">
                        {project.badge}
                      </div>
                      
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                        {project.title}
                      </h3>

                      <div className="space-y-4 mb-8">
                        {project.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                              {feature}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.techStack.map((tech, i) => (
                          <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-colors">
                            <span className={`w-1.5 h-1.5 rounded-full ${tech.color}`}></span>
                            <span className="text-white/80 text-xs sm:text-sm font-medium">{tech.name}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        {project.githubUrl !== "#" && (
                          <Button 
                            variant="outline"
                            className="bg-transparent border-white/20 text-white hover:bg-white/10 rounded-xl px-5 h-12 font-semibold"
                            asChild
                          >
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              View Code
                            </a>
                          </Button>
                        )}
                        {project.liveUrl !== "#" && (
                          <Button 
                            variant="outline"
                            className="bg-transparent border-primary/50 text-primary hover:bg-primary/10 rounded-xl px-5 h-12 font-semibold"
                            asChild
                          >
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              Website
                            </a>
                          </Button>
                        )}
                        {project.detailsUrl !== "#" && (
                          <Button 
                            className="bg-primary hover:bg-primary-glow text-white rounded-xl px-6 h-12 font-bold shadow-glow"
                            asChild
                          >
                            <Link to={project.detailsUrl}>
                              Details
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
