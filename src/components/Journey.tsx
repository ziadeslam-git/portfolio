import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code, Database, Server, Terminal, Lock } from "lucide-react";
import { journeys } from "@/lib/data";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MorphElement } from "@/components/MorphElement";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, any> = {
  Server, Lock, Database, Terminal, Code
};

const Journey = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion) return;

    if (titleRef.current && textRef.current) {
      const titleChars = titleRef.current.innerText.split("");
      titleRef.current.innerText = "";
      
      titleChars.forEach(char => {
        const span = document.createElement("span");
        span.innerText = char;
        span.style.opacity = "0";
        titleRef.current?.appendChild(span);
      });

      gsap.to(titleRef.current.children, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
        opacity: 1,
        stagger: 0.05,
        ease: "power2.out"
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === titleRef.current) t.kill();
      });
    };
  }, [prefersReducedMotion]);

  return (
    <section id="journey" ref={containerRef} className="py-24 relative overflow-hidden bg-transparent z-10">
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-[0.02] pointer-events-none select-none z-0 overflow-hidden font-black uppercase tracking-tighter leading-[0.85]">
        <h1 className="text-[18vw] text-white whitespace-nowrap">SOFTWARE</h1>
        <h2 className="text-[18vw] text-transparent whitespace-nowrap" style={{ WebkitTextStroke: '3px white' }}>ENGINEERING</h2>
        <h3 className="text-[18vw] text-white whitespace-nowrap">BACKEND</h3>
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-20 pointer-events-none">
        <div className="max-w-7xl mx-auto pointer-events-auto">
          <div className="text-center mb-16 lg:mb-24 min-h-[120px]">
            <h2 ref={titleRef} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              My Journey
            </h2>
            <MorphElement type="slide-up" delay={0.5}>
              <p ref={textRef} className="text-white/60 text-lg sm:text-xl max-w-3xl mx-auto">
                A look at where I started and where I am now.
              </p>
            </MorphElement>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2"></div>

            <div className="space-y-16 md:space-y-24">
              {journeys.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div key={item.id} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} justify-center w-full`}>
                    
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 items-center justify-center z-10">
                      <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_15px_rgba(124,58,237,0.8)]"></div>
                    </div>

                    <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-12 lg:pr-16' : 'md:pl-12 lg:pl-16'}`}>
                      <MorphElement type={isEven ? "slide-right" : "slide-left"} delay={0.1}>
                        <div className="p-8 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-primary/30 transition-all duration-300">
                          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-4">
                            <h3 className="text-xl font-bold text-white">
                              {item.role}
                            </h3>
                            <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-white/5 text-primary text-xs font-bold border border-white/10 whitespace-nowrap">
                              {item.date}
                            </span>
                          </div>
                          
                          <div className="text-white/50 font-medium mb-4 uppercase tracking-wider text-xs">
                            {item.entity}
                          </div>
                          
                          <p className="text-white/70 leading-relaxed mb-6 text-sm">
                            {item.description}
                          </p>
                          
                          <div className="space-y-3">
                            {item.items.map((listItem, i) => {
                              const IconComponent = iconMap[listItem.iconName];
                              return (
                                <div key={i} className="flex items-center gap-3 text-white/60">
                                  {IconComponent && <IconComponent className="w-4 h-4 text-primary" />}
                                  <span className="text-xs font-medium">{listItem.text}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </MorphElement>
                    </div>

                    <div className="hidden md:block w-1/2 pointer-events-none"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
