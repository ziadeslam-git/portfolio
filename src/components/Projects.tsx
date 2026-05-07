import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ExternalLink, Github } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Projects = () => {
  const [filter, setFilter] = useState("all");

  const projects = [
    {
      id: 1,
      title: "Dar Al Nashr Publishing House",
      description: "Complete e-commerce platform for book sales and publishing house website with inventory management and online ordering",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=400&fit=crop",
      tags: ["ASP.NET Core", "SQL Server", "Entity Framework", "Bootstrap", "HTML/CSS", "JavaScript"],
      category: "fullstack",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 2,
      title: "Personal Portfolio Website",
      description: "Modern, responsive portfolio website with dark theme, blue glow effects, and WhatsApp integration",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
      tags: ["React", "TypeScript", "Tailwind CSS", "Vite", "Framer Motion"],
      category: "fullstack",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 3,
      title: "Smart Store E-Commerce",
      description: "Full-stack ASP.NET Core MVC commerce system with admin operations, customer shopping, Identity, cart, wishlist, checkout, orders, reviews, Stripe sandbox payments, Cloudinary media, and AR/EN localization.",
      image: `${import.meta.env.BASE_URL}uploads/smart-store-preview.png`,
      tags: ["ASP.NET Core MVC", ".NET 10", "EF Core", "SQL Server", "Identity", "Stripe"],
      category: "fullstack",
      liveUrl: "https://e-commerce-team-2.runasp.net/",
      githubUrl: "https://github.com/ziadeslam-git/ECommerce_System",
      detailsUrl: "/projects/smart-store"
    },
    {
      id: 4,
      title: "Task Management API",
      description: "RESTful API for task and project management with JWT authentication",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      tags: ["ASP.NET Core", "Entity Framework", "JWT"],
      category: "backend",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 5,
      title: "Tech Company Website",
      description: "Professional website with CMS backend and optimized performance",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      tags: ["ASP.NET Core", "Entity Framework", "Bootstrap"],
      category: "fullstack",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 6,
      title: "Content Management System",
      description: "Custom CMS with comprehensive admin panel and user management",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop",
      tags: ["ASP.NET Core", "SQL Server", "Entity Framework"],
      category: "backend",
      liveUrl: "#",
      githubUrl: "#"
    },
  ];

  const filters = [
    { key: "all", label: "All Projects" },
    { key: "backend", label: "Backend" },
    { key: "fullstack", label: "Full Stack" }
  ];

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section id="projects" className="py-24 lg:py-32 relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-black"></div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 lg:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
              <span className="text-primary text-sm font-medium">My Work</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Latest <span className="text-primary">Projects</span>
            </h2>
            <p className="text-white/70 text-lg sm:text-xl max-w-3xl mx-auto mb-10">
              A collection of projects showcasing my backend development skills
            </p>
            
            <div className="flex flex-wrap justify-center gap-3">
              {filters.map((filterItem) => (
                <Button
                  key={filterItem.key}
                  variant={filter === filterItem.key ? "default" : "outline"}
                  onClick={() => setFilter(filterItem.key)}
                  className={`rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 ${
                    filter === filterItem.key 
                      ? 'bg-primary text-primary-foreground shadow-glow' 
                      : 'border-white/20 text-white/70 hover:text-white hover:border-white/40'
                  }`}
                >
                  {filterItem.label}
                </Button>
              ))}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="group overflow-hidden glass-card rounded-2xl border-white/10 hover:border-primary/30 transition-all duration-500 h-full">
                    <div className="relative overflow-hidden aspect-video">
                      {project.liveUrl !== "#" ? (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title}`}>
                          <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </a>
                      ) : (
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60"></div>
                      
                      <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                        {project.liveUrl !== "#" && (
                          <Button 
                            size="sm" 
                            className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 rounded-full"
                            asChild
                          >
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open live ${project.title}`}>
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                        {project.githubUrl !== "#" && (
                          <Button 
                            size="sm" 
                            className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 rounded-full"
                            asChild
                          >
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} source code`}>
                              <Github className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-lg font-bold">
                          {project.liveUrl !== "#" ? (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white transition-colors hover:text-primary"
                            >
                              {project.title}
                            </a>
                          ) : (
                            <span className="text-white transition-colors group-hover:text-primary">
                              {project.title}
                            </span>
                          )}
                        </h3>
                        {project.githubUrl !== "#" && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.title} GitHub repository`}
                            className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                      <p className="text-white/60 text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                          <Badge 
                            key={tagIndex}
                            className="bg-white/5 text-white/70 border-white/10 hover:bg-primary/20 hover:text-primary hover:border-primary/30 transition-colors text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      {project.detailsUrl && (
                        <Button
                          variant="outline"
                          className="mt-5 w-full rounded-full border-white/15 text-white/75 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                          asChild
                        >
                          <Link to={project.detailsUrl}>
                            <BookOpen className="mr-2 h-4 w-4" />
                            Project Details
                          </Link>
                        </Button>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Projects;
