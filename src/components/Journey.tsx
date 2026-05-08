import { motion } from "framer-motion";
import { Code, Database, Server, Terminal, Lock } from "lucide-react";

const Journey = () => {
  const journeys = [
    {
      id: 1,
      role: "Backend .NET Developer",
      date: "2026 - NOW",
      entity: "Personal Projects",
      description: "Building backend projects on my own. Writing APIs, connecting to databases, and applying what I learned to make real, working systems.",
      items: [
        { icon: Server, text: "REST APIs" },
        { icon: Lock, text: "JWT & Identity" },
        { icon: Database, text: "SQL Server & EF Core" }
      ]
    },
    {
      id: 2,
      role: "BIS Student — Backend Track",
      date: "2025 - 2026",
      entity: "HICMIS",
      description: "Studied the full .NET backend track — from C# and OOP fundamentals to ASP.NET Core APIs, databases, Entity Framework, LINQ, and design patterns like Repository and Unit of Work.",
      items: [
        { icon: Terminal, text: "C# & OOP" },
        { icon: Database, text: "SQL Server & EF Core" },
        { icon: Code, text: "ASP.NET Core APIs" }
      ]
    }
  ];

  return (
    <section id="journey" className="py-24 lg:py-32 relative overflow-hidden bg-black">
      
      {/* Layer 1: Background Layer with Ambient Lighting (Exactly like Hero) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,20,30,1)_0%,rgba(0,0,0,1)_70%)] z-0"></div>
      
      {/* Ambient Orbs */}
      <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-purple-900/15 rounded-full blur-[150px] pointer-events-none z-0"></div>

      {/* Layer 2: Big HTML Text Background (Exactly like Hero but with Journey text) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-[0.04] pointer-events-none select-none z-0 overflow-hidden font-black uppercase tracking-tighter leading-[0.85]">
        <h1 className="text-[18vw] text-white whitespace-nowrap">SOFTWARE</h1>
        <h2 className="text-[18vw] text-transparent whitespace-nowrap" style={{ WebkitTextStroke: '3px white' }}>ENGINEERING</h2>
        <h3 className="text-[18vw] text-white whitespace-nowrap">BACKEND</h3>
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16 lg:mb-24"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              My Journey
            </h2>
            <p className="text-white/60 text-lg sm:text-xl max-w-3xl mx-auto">
              A look at where I started and where I am now.
            </p>
          </motion.div>

          <div className="relative max-w-5xl mx-auto">
            {/* Vertical timeline line for desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2"></div>

            <div className="space-y-12 md:space-y-0">
              {journeys.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div key={item.id} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} justify-center w-full`}>
                    
                    {/* Timeline Node */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 items-center justify-center z-10">
                      <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-primary shadow-glow' : 'bg-white/20'}`}></div>
                    </div>

                    {/* Card Container */}
                    <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-12 lg:pr-16' : 'md:pl-12 lg:pl-16'}`}>
                      <motion.div
                        initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="glass-card p-8 lg:p-10 rounded-2xl border border-white/5 hover:border-primary/30 transition-all duration-500 group relative overflow-hidden"
                      >
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="relative z-10">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                            <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-primary transition-colors">
                              {item.role}
                            </h3>
                            <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/5 text-white/60 text-sm font-medium border border-white/10 whitespace-nowrap">
                              {item.date}
                            </span>
                          </div>
                          
                          <div className="text-[#00B4D8] font-medium mb-4">
                            {item.entity}
                          </div>
                          
                          <p className="text-white/60 leading-relaxed mb-6">
                            {item.description}
                          </p>
                          
                          <div className="space-y-3">
                            {item.items.map((listItem, i) => {
                              const Icon = listItem.icon;
                              return (
                                <div key={i} className="flex items-center gap-3 text-primary/80">
                                  <Icon className="w-4 h-4" />
                                  <span className="text-sm font-medium">{listItem.text}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Empty space for the other half */}
                    <div className="hidden md:block w-1/2"></div>
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
