import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Terminal } from "lucide-react";
import { MorphElement } from "@/components/MorphElement";

const About = () => {
  const stats = [
    { number: "5+", label: "Real Systems Built" },
    { number: "15+", label: "Technologies" },
  ];

  const expertise = [
    "RESTful API Development",
    "Database Design & Optimization",
    "Clean Architecture Patterns",
    "Entity Framework Core",
    "Authentication & Authorization",
    "Caching & Performance (Redis)",
  ];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden bg-transparent z-10">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
            
            {/* Left side - Image & Terminal */}
            <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div className="relative max-w-md mx-auto lg:mx-0 group perspective-1000">
                <MorphElement type="rotate-y">
                  <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl transition-transform duration-700 hover:rotate-y-6 hover:rotate-x-[-2deg]">
                    
                    <div className="h-10 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                      <div className="ml-4 flex items-center gap-2 text-white/40 text-xs font-mono">
                        <Terminal className="w-3 h-3" />
                        <span>developer@ziad:~</span>
                      </div>
                    </div>
                    
                    <div className="p-6 font-mono text-sm sm:text-base leading-relaxed text-white/80">
                      <div className="flex gap-4">
                        <span className="text-primary font-bold">~</span>
                        <p><span className="text-purple-400">const</span> <span className="text-blue-400">developer</span> = {'{'}</p>
                      </div>
                      <div className="pl-12 flex flex-col gap-2 my-2 border-l border-white/10 ml-[21px]">
                        <p><span className="text-white/60">name:</span> <span className="text-green-400">"Ziad ELkholy"</span>,</p>
                        <p><span className="text-white/60">role:</span> <span className="text-green-400">"Backend Software Engineer"</span>,</p>
                        <p><span className="text-white/60">location:</span> <span className="text-green-400">"Cairo, EG"</span>,</p>
                        <p><span className="text-white/60">focus:</span> [<span className="text-green-400">"Performance"</span>, <span className="text-green-400">"Scalability"</span>],</p>
                      </div>
                      <div className="flex gap-4">
                        <span className="text-primary font-bold opacity-0">~</span>
                        <p>{'};'}</p>
                      </div>
                      
                      <div className="flex gap-4 mt-4 animate-pulse">
                        <span className="text-primary font-bold">~</span>
                        <span className="w-2 h-5 bg-white/60 inline-block"></span>
                      </div>
                    </div>
                  </div>
                </MorphElement>
                
                <MorphElement type="slide-up" delay={0.3} className="absolute -bottom-8 -right-8 sm:-right-4 z-20">
                  <Card className="p-6 bg-black/90 backdrop-blur-md rounded-2xl border border-primary/30 shadow-2xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Terminal className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-white">1<span className="text-primary">+</span></div>
                        <div className="text-sm text-white/60 font-medium">Year Building Real .NET Systems</div>
                      </div>
                    </div>
                  </Card>
                </MorphElement>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-2">
              <MorphElement type="slide-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 w-max mb-6">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="text-primary text-sm font-medium tracking-wide uppercase">Who is Ziad ELkholy?</span>
                </div>
              </MorphElement>
              
              <MorphElement type="slide-up" delay={0.1}>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                  Engineering <span className="text-primary">Digital Solutions</span>
                </h2>
              </MorphElement>
              
              <MorphElement type="slide-up" delay={0.2}>
                <div className="space-y-6 text-white/70 text-lg leading-relaxed mb-10">
                  <p>
                    I'm <strong className="text-white font-semibold">Ziad ELkholy</strong>, a passionate Backend Developer and Information Systems student 
                    at HICMIS. I specialize in building robust, scalable APIs and web applications 
                    using ASP.NET Core and modern development practices.
                  </p>
                  <p>
                    Every project I work on is an opportunity to learn something new and push my skills further. 
                    I believe in clean code, proper architecture, and building systems that last.
                  </p>
                </div>
              </MorphElement>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-10">
                {stats.map((stat, index) => (
                  <MorphElement key={index} type="scale" delay={0.3 + index * 0.1}>
                    <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/5 hover:border-primary/20 transition-all duration-300 group">
                      <div className="text-4xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                        {stat.number}
                      </div>
                      <div className="text-sm font-medium text-white/60 uppercase tracking-wider">{stat.label}</div>
                    </div>
                  </MorphElement>
                ))}
              </div>
              
              {/* Expertise */}
              <div className="mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                  {expertise.map((item, index) => (
                    <MorphElement key={index} type="slide-left" delay={0.4 + index * 0.05}>
                      <div className="flex items-center gap-3 group">
                        <CheckCircle2 className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors flex-shrink-0" />
                        <span className="text-base text-white/80 group-hover:text-white transition-colors">{item}</span>
                      </div>
                    </MorphElement>
                  ))}
                </div>
              </div>
              
              <MorphElement type="slide-up" delay={0.5}>
                <Button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 text-base font-semibold transition-all duration-300 group"
                >
                  Let's Work Together
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </MorphElement>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
