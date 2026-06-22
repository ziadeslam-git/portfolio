import { useState, useRef, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { CheckCircle2, Github, ExternalLink, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MorphElement } from "@/components/MorphElement";
import { projects } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const [activeProject, setActiveProject] = useState<typeof projects[0] | null>(null);
  
  // Carousel State
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastWheelTime = useRef<number>(0);

  // We want the most important projects to be central.
  // Actually, we just sort them by importance so the best ones are first.
  const displayProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      if (a.isImportant && !b.isImportant) return -1;
      if (!a.isImportant && b.isImportant) return 1;
      return 0;
    });
  }, []);

  // Prevent page scroll when using mouse wheel on carousel and throttle to fix glitching
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheelPrevent = (e: WheelEvent) => {
      e.preventDefault();
      
      const now = Date.now();
      if (now - lastWheelTime.current < 400) return; // Throttle fast scrolling to prevent glitching

      if (Math.abs(e.deltaX) > 20 || Math.abs(e.deltaY) > 20) {
        lastWheelTime.current = now;
        if (e.deltaX > 0 || e.deltaY > 0) {
          navigate(1);
        } else {
          navigate(-1);
        }
      }
    };

    container.addEventListener('wheel', handleWheelPrevent, { passive: false });
    return () => container.removeEventListener('wheel', handleWheelPrevent);
  }, [displayProjects.length]);

  // Drag Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const diffX = e.clientX - startX;
    
    // Threshold to swipe
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        navigate(-1);
      } else {
        navigate(1);
      }
      setIsDragging(false);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const navigate = (direction: number) => {
    setActiveIndex((prev) => {
      const total = displayProjects.length;
      let next = prev + direction;
      if (next < 0) next = total - 1;
      if (next >= total) next = 0;
      return next;
    });
  };

  const getOffset = (index: number) => {
    const total = displayProjects.length;
    let offset = index - activeIndex;
    
    // Wrap around for infinite loop
    if (offset > Math.floor(total / 2)) {
      offset -= total;
    } else if (offset < -Math.floor(total / 2)) {
      offset += total;
    }
    
    return offset;
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-transparent z-10">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-20 pointer-events-none">
        <div className="max-w-7xl mx-auto pointer-events-auto">
          <MorphElement type="slide-up" delay={0.1} className="mb-16 lg:mb-24 text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              My <span className="text-primary">Projects</span>
            </h2>
            <p className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
              Interactive 3D tiles. Swipe, scroll, or drag to explore. Click for details.
            </p>
          </MorphElement>

          {/* 3D Coverflow Container */}
          <div 
            ref={containerRef}
            className="relative flex justify-center items-center perspective-[2000px] h-[600px] md:h-[600px] py-12 touch-none select-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            {displayProjects.map((project, index) => {
              const offset = getOffset(index);
              const isHovered = hoveredIndex === index;
              
              // Base 3D positioning
              const isMobile = window.innerWidth < 768;
              const spacing = isMobile ? 120 : 250; // Tweak spread
              const zPush = isMobile ? 120 : 200;
              
              // Add a subtle lift to the center card when hovered
              const centerHoverLift = (offset === 0 && isHovered) ? 0.05 : 0;
              const centerHoverTranslateY = (offset === 0 && isHovered) ? -15 : 0;

              const baseScale = 1 - Math.abs(offset) * 0.15 + centerHoverLift;
              const baseZ = -Math.abs(offset) * zPush;
              
              // Adjust X translation slightly so outer cards are distinctly separated
              const translateX = Math.sign(offset) * (Math.abs(offset) * spacing + (Math.abs(offset) > 1 ? 40 : 0));
              
              // Add pyramid effect: Side cards are pushed down
              const translateY = Math.abs(offset) * 40 + centerHoverTranslateY; 
              const rotateY = -Math.sign(offset) * (isMobile ? 15 : 30);
              
              // Blur side cards, but remove blur entirely if the user hovers over it
              const blurAmount = isHovered ? 0 : Math.max(0, (Math.abs(offset) - 0.5) * 2);
              const opacity = isHovered ? 1 : Math.max(0, 1 - Math.abs(offset) * 0.3);

              // Sort order: center card should be on top
              const zIndex = 100 - Math.abs(offset);

              // Stagger appearance based on distance from center
              const staggerDelay = Math.abs(offset) * 0.2;

              return (
                <div 
                  key={project.id} 
                  className="project-card-wrapper absolute w-[85%] max-w-[360px] md:w-[450px] h-[500px] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{ 
                    zIndex,
                    transform: `translateX(${translateX}px) translateY(${translateY}px) translateZ(${baseZ}px) rotateY(${rotateY}deg) scale(${baseScale})`,
                    filter: blurAmount === 0 ? 'none' : `blur(${blurAmount}px)`,
                    opacity: opacity
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => {
                    if (offset === 0) {
                      setActiveProject(project);
                    } else {
                      setActiveIndex(index);
                    }
                  }}
                >
                  {/* Animation Wrapper for initial scroll appearance */}
                  <MorphElement type="slide-up" delay={staggerDelay} className="w-full h-full">
                    <div 
                      className={`project-card relative w-full h-full group cursor-pointer transform-style-3d transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:rotate-y-180`}
                    >
                      {/* Front Face */}
                      <div className="absolute inset-0 backface-hidden bg-black/90 backdrop-blur-xl border border-white/20 group-hover:border-primary/50 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)] flex flex-col">
                        <div className="h-[220px] w-full bg-black relative overflow-hidden">
                          {project.imageName ? (
                            <img 
                              src={`${import.meta.env.BASE_URL}uploads/${project.imageName}`} 
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-700"
                              draggable={false}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-purple-900/20">
                              <span className="text-white/20 font-bold text-4xl">{project.title.substring(0, 2)}</span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                          <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
                            <span className="text-xs font-bold text-primary uppercase">{project.badge}</span>
                          </div>
                          
                          {/* Highlight strictly on center active card */}
                          {offset === 0 && (
                             <div className="absolute inset-0 bg-primary/20 animate-pulse pointer-events-none mix-blend-overlay"></div>
                          )}
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
                            {offset === 0 ? (
                               <>Hover to flip <ArrowRight className="w-4 h-4 ml-2" /></>
                            ) : (
                               <>Click to bring to center</>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Back Face */}
                      <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#0a0a0a] border border-primary/40 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(124,58,237,0.3)] flex flex-col">
                        <div className="relative z-10 p-6 flex flex-col h-full">
                          <h3 className="text-xl font-bold text-white mb-3 flex items-center justify-between">
                            {project.title}
                            <span className="text-xs text-primary/80 font-mono">DETAILS</span>
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
                  </MorphElement>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Project Detail Overlay via Portal to escape stacking context */}
      {activeProject && createPortal(
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
      , document.body)}
    </section>
  );
};

export default Projects;
