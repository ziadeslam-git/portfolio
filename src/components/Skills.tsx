import { Code2, Shield, LayoutTemplate, Database, PenTool } from "lucide-react";
import { skillCategories } from "@/lib/data";
import { MorphElement } from "@/components/MorphElement";

const iconMap: Record<string, any> = {
  Code2, Shield, LayoutTemplate, Database, PenTool
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-transparent z-10">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-20 pointer-events-none">
        <div className="max-w-7xl mx-auto pointer-events-auto">
          <MorphElement type="slide-up" delay={0.1} className="mb-16 lg:mb-24 text-center sm:text-left flex flex-col sm:flex-row justify-between items-end gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-primary text-sm font-medium tracking-wide uppercase">Technical Arsenal</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                Premium <span className="text-primary">Skillset</span>
              </h2>
            </div>
            <p className="text-white/50 text-base sm:text-lg max-w-md text-center sm:text-right hidden md:block">
              Engineered for performance, scalability, and security using industry-standard enterprise technologies.
            </p>
          </MorphElement>

          <div className="relative max-w-5xl mx-auto">
            {/* The continuous vertical line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2"></div>

            <div className="space-y-16 md:space-y-24">
              {skillCategories.map((category, index) => {
                const isEven = index % 2 === 0;
                const IconComponent = iconMap[category.iconName] || Code2;
                
                return (
                  <div key={category.title} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} justify-center w-full`}>
                    
                    {/* The glowing dot on the timeline */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 items-center justify-center z-10">
                      <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_15px_rgba(124,58,237,0.8)]"></div>
                    </div>

                    <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-12 lg:pr-16' : 'md:pl-12 lg:pl-16'}`}>
                      <MorphElement type={isEven ? "slide-right" : "slide-left"} delay={0.1}>
                        <div className="p-8 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-primary/30 transition-all duration-300 group">
                          
                          <div className="flex items-center gap-4 border-b border-white/10 pb-4 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors">
                              <IconComponent className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-white tracking-tight">
                              {category.title}
                            </h3>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-3 py-1.5 rounded-full border border-white/20 bg-white/5 text-white/90 text-sm font-medium whitespace-nowrap hover:bg-primary/20 hover:border-primary/50 transition-colors"
                              >
                                {skill}
                              </span>
                            ))}
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

export default Skills;
