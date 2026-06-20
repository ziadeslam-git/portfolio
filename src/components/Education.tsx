import { GraduationCap, BookOpen } from "lucide-react";
import { MorphElement } from "@/components/MorphElement";

const Education = () => {
  const education = [
    {
      id: 1,
      role: "Information Systems",
      date: "2024 - Present",
      entity: "HICMIS",
      description: "Pursuing a degree in Information Systems, building a strong foundation in computer science and software engineering principles.",
      items: [
        { icon: GraduationCap, text: "Undergraduate Degree" }
      ]
    },
    {
      id: 2,
      role: "Backend .NET & C# Development",
      date: "2025 - Present",
      entity: "Erasoft Online Training",
      description: "Intensive training focusing on modern backend technologies and architectures.",
      items: [
        { icon: BookOpen, text: "C# & OOP" },
        { icon: BookOpen, text: "ASP.NET Core" },
        { icon: BookOpen, text: "EF Core" }
      ]
    }
  ];

  return (
    <section id="education" className="py-24 relative overflow-hidden bg-transparent z-10">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-20 pointer-events-none">
        <div className="max-w-7xl mx-auto pointer-events-auto">
          <MorphElement type="slide-up" className="text-center mb-16 lg:mb-24">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              Education & Training
            </h2>
            <p className="text-white/60 text-lg sm:text-xl max-w-3xl mx-auto">
              My academic background and continuous learning journey.
            </p>
          </MorphElement>

          <div className="relative max-w-5xl mx-auto">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2"></div>

            <div className="space-y-16 md:space-y-24">
              {education.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div key={item.id} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} justify-center w-full`}>
                    
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 items-center justify-center z-10">
                      <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-primary shadow-[0_0_15px_rgba(124,58,237,0.8)]' : 'bg-white/20'}`}></div>
                    </div>

                    <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-12 lg:pr-16' : 'md:pl-12 lg:pl-16'}`}>
                      <MorphElement type={isEven ? "slide-right" : "slide-left"} delay={0.1}>
                        <div className="p-8 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-primary/30 transition-all duration-300 group">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                              {item.role}
                            </h3>
                            <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-white/5 text-white/60 text-xs font-bold border border-white/10 whitespace-nowrap">
                              {item.date}
                            </span>
                          </div>
                          
                          <div className="text-[#00B4D8] font-medium mb-4 text-xs uppercase tracking-wider">
                            {item.entity}
                          </div>
                          
                          <p className="text-white/70 leading-relaxed mb-6 text-sm">
                            {item.description}
                          </p>
                          
                          <div className="space-y-3">
                            {item.items.map((listItem, i) => {
                              const Icon = listItem.icon;
                              return (
                                <div key={i} className="flex items-center gap-3 text-primary/80">
                                  <Icon className="w-4 h-4" />
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

export default Education;
