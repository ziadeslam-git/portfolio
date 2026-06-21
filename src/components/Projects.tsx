import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Github, ExternalLink, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MorphElement } from "@/components/MorphElement";
import { projects } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const [filter, setFilter] = useState("important");
  const [activeProject, setActiveProject] = useState<typeof projects[0] | null>(null);
  const deckRef = useRef<HTMLDivElement>(null);

  const filteredProjects = projects.filter((p) => {
    if (filter === "important") return p.isImportant;
    return true;
  });

  useEffect(() => {
    if (!deckRef.current) return;
    
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.project-card-wrapper');
      
      // Calculate spread based on screen size to replace the buggy CSS negative margins
      const isMobile = window.innerWidth < 768;
      
      gsap.fromTo(cards, 
        {
          y: 400,
          x: 0,
          scale: 0.5,
          opacity: 0,
          rotationZ: (i: number) => (i - (cards.length - 1) / 2) * 15 // Initial heavy fan
        },
        {
          y: (i: number) => isMobile ? (i - (cards.length - 1) / 2) * 140 : 0, // Vertical spread on mobile
          x: (i: number) => isMobile ? 0 : (i - (cards.length - 1) / 2) * 180, // Horizontal spread on desktop
          scale: 1,
          opacity: 1,
          rotationZ: (i: number) => (i - (cards.length - 1) / 2) * (isMobile ? 3 : 5), // Softly fanned final
          stagger: 0.1,
          ease: "power3.out",
          duration: 1.2,
          scrollTrigger: {
            trigger: deckRef.current,
            start: "top 80%", 
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
          }
        }
      );
    }, deckRef);

    return () => ctx.revert();
  }, [filteredProjects.length]);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-transparent z-10">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-20 pointer-events-none">
        <div className="max-w-7xl mx-auto pointer-events-auto">
          <MorphElement type="slide-up" delay={0.1} className="mb-16 lg:mb-24 text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              My <span className="text-primary">Projects</span>
            </h2>
            <p className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
              Interactive 3D tiles. Hover to flip, click to inspect.
            </p>

            <div className="flex justify-center gap-4">
              <Button
                variant={filter === "important" ? "default" : "outline"}
                onClick={() => setFilter("important")}
                className={`rounded-full px-8 py-6 text-sm font-bold tracking-wide uppercase transition-all duration-300 ${
                  filter === "important" 
                    ? 'bg-primary text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] border-transparent' 
                    : 'bg-white/5 border-white/20 text-white hover:bg-white/10'
                }`}
              >
                Important
              </Button>
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
                className={`rounded-full px-8 py-6 text-sm font-bold tracking-wide uppercase transition-all duration-300 ${
                  filter === "all" 
                    ? 'bg-primary text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] border-transparent' 
                    : 'bg-white/5 border-white/20 text-white hover:bg-white/10'
                }`}
              >
                All Projects
              </Button>
            </div>
          </MorphElement>

          {/* Absolute positioning container to prevent layout shifts */}
          <div ref={deckRef} className="relative flex justify-center items-center perspective-[2000px] h-[800px] md:h-[600px] py-12">
            {filteredProjects.map((project, index) => (
              <div key={project.id} className="project-card-wrapper absolute w-[90%] max-w-[350px] md:w-[400px] h-[500px]" style={{ zIndex: index }}>
                <div 
                  className="project-card relative w-full h-full group cursor-pointer transform-style-3d transition-transform duration-700 ease-out hover:!rotate-z-0 hover:-translate-y-16 hover:scale-105"
                  onClick={() => setActiveProject(project)}
                >
                  <div className="relative w-full h-full transform-style-3d transition-transform duration-1000 ease-out group-hover:rotate-y-180">
                  {/* Front Face */}
                  <div className="absolute inset-0 backface-hidden bg-black/80 backdrop-blur-xl border border-white/20 hover:border-primary/50 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)] flex flex-col">
                    <div className="h-[220px] w-full bg-black/80 relative overflow-hidden">
                      {project.imageName ? (
                        <img 
                          src={`${import.meta.env.BASE_URL}uploads/${project.imageName}`} 
                          alt={project.title}
                          className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-purple-900/20">
                          <span className="text-white/20 font-bold text-4xl">{project.title.substring(0, 2)}</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                      <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
                        <span className="text-xs font-bold text-primary uppercase">{project.badge}</span>
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col justify-between relative z-10 bg-black/50">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {project.techStack.slice(0, 3).map((tech, i) => (
                            <span key={i} className="px-2.5 py-1 bg-white/10 border border-white/10 rounded-md text-white/90 text-xs font-medium">
                              {tech.name}
                            </span>
                          ))}
                          {project.techStack.length > 3 && (
                            <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-white/50 text-xs font-medium">
                              +{project.techStack.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-primary text-sm font-semibold flex items-center mt-4">
                        Hover to flip <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                  </div>

                  {/* Back Face */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#0a0a0a] border border-primary/40 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(124,58,237,0.3)] flex flex-col">
                    {/* Faded Background Image - Fixed opacity and gradient to make it visible */}
                    {project.imageName && (
                      <div className="absolute inset-0 z-0">
                        <img 
                          src={`${import.meta.env.BASE_URL}uploads/${project.imageName}`} 
                          alt={project.title}
                          className="w-full h-full object-cover opacity-50 blur-[2px] mix-blend-lighten"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/40 via-[#0a0a0a]/80 to-[#0a0a0a]"></div>
                      </div>
                    )}
                    
                    <div className="relative z-10 p-6 flex flex-col h-full">
                      <h3 className="text-xl font-bold text-white mb-3 flex items-center justify-between">
                      {project.title}
                      <span className="text-xs text-primary/80 font-mono">BACKEND</span>
                    </h3>
                    
                    <p className="text-white/70 text-sm leading-relaxed flex-1">
                      {project.description || "Click to view full architectural details and feature breakdowns."}
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Full Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, i) => (
                          <span key={i} className="flex items-center gap-1.5 px-2 py-1 bg-white/10 border border-white/20 rounded-md text-white/90 text-[10px] font-medium">
                            <span className={`w-1.5 h-1.5 rounded-full ${tech.color}`}></span>
                            {tech.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-auto relative z-20">
                      <Button className="flex-1 bg-primary hover:bg-primary/90 text-white text-xs font-bold pointer-events-auto" onClick={(e) => {
                        e.stopPropagation();
                        setActiveProject(project);
                      }}>
                        Full Details
                      </Button>
                      
                      {project.githubUrl !== "#" && (
                        <Button size="icon" variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-primary pointer-events-auto" asChild onClick={(e) => e.stopPropagation()}>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"><Github className="w-4 h-4" /></a>
                        </Button>
                      )}
                      
                      {project.liveUrl !== "#" && (
                        <Button size="icon" variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-primary pointer-events-auto" asChild onClick={(e) => e.stopPropagation()}>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"><ExternalLink className="w-4 h-4" /></a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
          </div>
        </div>
      </div>

      {/* Project Detail Overlay */}
      {activeProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pointer-events-auto">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setActiveProject(null)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative w-full max-w-4xl bg-[#0a0a0f] border border-primary/30 rounded-2xl shadow-[0_0_50px_rgba(124,58,237,0.2)] overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
            
            <button 
              onClick={() => setActiveProject(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full md:w-1/2 h-[300px] md:h-auto bg-black relative border-r border-white/5">
              {activeProject.imageName ? (
                <img 
                  src={`${import.meta.env.BASE_URL}uploads/${activeProject.imageName}`} 
                  alt={activeProject.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-purple-900/20">
                  <span className="text-white/20 font-bold text-6xl">{activeProject.title.substring(0, 2)}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="inline-flex px-3 py-1 rounded-full border border-primary/30 bg-primary/20 text-primary text-[10px] font-bold tracking-widest uppercase mb-4">
                  {activeProject.badge}
                </div>
                <h3 className="text-3xl font-bold text-white">{activeProject.title}</h3>
              </div>
            </div>

            <div className="w-full md:w-1/2 p-8 flex flex-col max-h-full overflow-y-auto custom-scrollbar">
              <h4 className="text-lg font-bold text-white mb-4">Core Features</h4>
              <div className="space-y-4 mb-8 flex-1">
                {activeProject.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-white/70 text-sm leading-relaxed">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-white/10">
                <h4 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-4">Architecture Stack</h4>
                <div className="flex flex-wrap gap-2 mb-8">
                  {activeProject.techStack.map((tech, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5">
                      <span className={`w-1.5 h-1.5 rounded-full ${tech.color}`}></span>
                      <span className="text-white/80 text-xs font-medium">{tech.name}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {activeProject.detailsUrl !== "#" && (
                    <Button className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold" asChild>
                      <Link to={activeProject.detailsUrl}>Read Case Study</Link>
                    </Button>
                  )}
                  {activeProject.githubUrl !== "#" && (
                    <Button variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10" asChild>
                      <a href={activeProject.githubUrl} target="_blank" rel="noopener noreferrer"><Github className="w-4 h-4 mr-2" /> Code</a>
                    </Button>
                  )}
                  {activeProject.liveUrl !== "#" && (
                    <Button variant="outline" className="bg-transparent border-primary/50 text-primary hover:bg-primary/10" asChild>
                      <a href={activeProject.liveUrl} target="_blank" rel="noopener noreferrer"><ExternalLink className="w-4 h-4 mr-2" /> Live</a>
                    </Button>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
