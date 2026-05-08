import { Code2, Database, Shield, LayoutTemplate, PenTool } from "lucide-react";
import { motion } from "framer-motion";

const Skills = () => {
  const skillCategories = [
    {
      title: "Core Stack",
      icon: <Code2 className="w-6 h-6 text-[#9B30FF]" />,
      gradient: "from-[#9B30FF]/20 to-transparent",
      borderGlow: "group-hover:border-[#9B30FF]/50",
      skills: ["C#", ".NET", "ASP.NET Core", "ASP.NET Web API", "MVC", "LINQ"]
    },
    {
      title: "Security & APIs",
      icon: <Shield className="w-6 h-6 text-[#7C3AED]" />,
      gradient: "from-[#7C3AED]/20 to-transparent",
      borderGlow: "group-hover:border-[#7C3AED]/50",
      skills: ["JWT Auth", "ASP.NET Identity", "RESTful APIs", "SignalR", "Swagger", "CORS"]
    },
    {
      title: "Architecture",
      icon: <LayoutTemplate className="w-6 h-6 text-[#8B5CF6]" />,
      gradient: "from-[#8B5CF6]/20 to-transparent",
      borderGlow: "group-hover:border-[#8B5CF6]/50",
      skills: ["N-Tier", "Repository Pattern", "Unit of Work", "SOLID", "Dependency Injection"]
    },
    {
      title: "Data Layer",
      icon: <Database className="w-6 h-6 text-[#A78BFA]" />,
      gradient: "from-[#A78BFA]/20 to-transparent",
      borderGlow: "group-hover:border-[#A78BFA]/50",
      skills: ["SQL Server", "T-SQL", "EF Core", "ADO.Net", "Dapper", "Database Design"]
    },
    {
      title: "Tools",
      icon: <PenTool className="w-6 h-6 text-[#C4B5FD]" />,
      gradient: "from-[#C4B5FD]/20 to-transparent",
      borderGlow: "group-hover:border-[#C4B5FD]/50",
      skills: ["Git", "GitHub", "Postman", "Visual Studio", "SSMS", "AutoMapper", "Cursor", "Codex", "Claude", "Claude Code", "ChatGPT", "Notion"]
    }
  ];

  return (
    <section id="skills" className="py-24 lg:py-32 relative overflow-hidden bg-black">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-purple-900/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 sm:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16 lg:mb-24 text-center sm:text-left flex flex-col sm:flex-row justify-between items-end gap-6"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-primary text-sm font-medium tracking-wide uppercase">Technical Arsenal</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Skillset</span>
              </h2>
            </div>
            <p className="text-white/50 text-base sm:text-lg max-w-md text-center sm:text-right hidden md:block">
              Engineered for performance, scalability, and security using industry-standard enterprise technologies.
            </p>
          </motion.div>

          {/* Luxury Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {skillCategories.map((category, idx) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`group relative rounded-[2rem] overflow-hidden bg-[#0a0a0a] border border-white/5 ${category.borderGlow} transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 ${idx === 3 ? 'md:col-span-2 lg:col-span-1' : ''} ${idx === 4 ? 'md:col-span-2 lg:col-span-2' : ''}`}
              >
                {/* Subtle Gradient Background */}
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${category.gradient} rounded-full blur-3xl -mr-10 -mt-10 opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}></div>
                
                <div className="relative p-8 lg:p-10 z-10 h-full flex flex-col">
                  
                  <div className="flex items-center gap-5 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                      {category.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      {category.title}
                    </h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 mt-auto">
                    {category.skills.map((skill) => (
                      <div 
                        key={skill}
                        className="px-5 py-2.5 rounded-full border border-white/5 bg-white/5 text-white/70 text-sm font-medium hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-default"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Skills;
