import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Code2, Database, Cloud, Layout } from "lucide-react";

const Skills = () => {
  const services = [
    {
      title: "Backend Development",
      description: "Building robust server-side applications with ASP.NET Core, creating RESTful APIs, and implementing clean architecture patterns.",
      icon: Code2,
      skills: ["C#", "ASP.NET Core", "Entity Framework", "REST APIs"]
    },
    {
      title: "Database Design",
      description: "Designing and optimizing relational and NoSQL databases, writing efficient queries, and ensuring data integrity.",
      icon: Database,
      skills: ["SQL Server", "PostgreSQL", "MongoDB", "Redis"]
    },
    {
      title: "DevOps & Cloud",
      description: "Deploying applications to cloud platforms, containerization with Docker, and implementing CI/CD pipelines.",
      icon: Cloud,
      skills: ["Git/GitHub", "Docker", "Azure", "CI/CD"]
    },
    {
      title: "Frontend Basics",
      description: "Creating responsive user interfaces with modern frameworks and ensuring seamless user experiences.",
      icon: Layout,
      skills: ["HTML/CSS", "JavaScript", "React", "Tailwind CSS"]
    },
  ];

  return (
    <section id="skills" className="py-24 lg:py-32 relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-black"></div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
              <span className="text-primary text-sm font-medium uppercase tracking-wider">What I Offer</span>
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
              My <span className="text-primary">Services</span>
            </h2>
            <p className="text-white/70 text-xl max-w-3xl mx-auto leading-relaxed">
              Specialized in backend development with expertise across the full stack
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}>
                  <Card className="p-8 lg:p-10 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-primary/30 hover:shadow-glow transition-all duration-500 group h-full">
                    <div className="flex items-start gap-5 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-glow">
                        <Icon className="w-8 h-8" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">{service.title}</h3>
                        <p className="text-white/60 text-base lg:text-lg leading-relaxed">{service.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 mt-6">
                      {service.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/80 text-sm font-medium hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all duration-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
