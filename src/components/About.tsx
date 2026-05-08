import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Terminal } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  const stats = [
    { number: "10+", label: "Projects Completed" },
    { number: "10+", label: "Technologies Mastered" },
  ];

  const expertise = [
    "RESTful API Development",
    "Database Design & Optimization",
    "Clean Architecture Patterns",
    "Entity Framework Core",
    "Authentication & Authorization",
    "Cloud Deployment (Azure)",
  ];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden bg-black">
      {/* Background gradients for extra depth */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
            
            {/* Left side - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative max-w-md mx-auto lg:mx-0 group">
                <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden border border-white/10 group-hover:border-primary/30 transition-colors duration-500">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none"></div>
                  <img 
                    src={`${import.meta.env.BASE_URL}uploads/hero-portrait.png`}
                    alt="Ziad ELkholy" 
                    className="w-full h-full object-cover object-top scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="absolute -bottom-8 -right-8 sm:-right-4 z-20"
                >
                  <Card className="p-6 bg-black/90 backdrop-blur-md rounded-2xl border border-primary/30 shadow-2xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Terminal className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-white">1<span className="text-primary">+</span></div>
                        <div className="text-sm text-white/60 font-medium">Years of Experience</div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </motion.div>

            {/* Right side - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-7 flex flex-col justify-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 w-max mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-primary text-sm font-medium tracking-wide uppercase">Who is Ziad ELkholy?</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Digital Solutions</span>
              </h2>
              
              <div className="space-y-6 text-white/70 text-lg leading-relaxed mb-10">
                <p>
                  I'm <strong className="text-white font-semibold">Ziad ELkholy</strong>, a passionate Backend Developer and Computer Science student 
                  at HICMIS. I specialize in building robust, scalable APIs and web applications 
                  using ASP.NET Core and modern development practices.
                </p>
                <p>
                  Every project I work on is an opportunity to learn something new and push my skills further. 
                  I believe in clean code, proper architecture, and building systems that last.
                </p>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-10">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  >
                    <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/5 hover:border-primary/20 transition-all duration-300 group">
                      <div className="text-4xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                        {stat.number}
                      </div>
                      <div className="text-sm font-medium text-white/60 uppercase tracking-wider">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Expertise */}
              <div className="mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                  {expertise.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                      className="flex items-center gap-3 group"
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors flex-shrink-0" />
                      <span className="text-base text-white/80 group-hover:text-white transition-colors">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="pt-4">
                <Button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 text-base font-semibold transition-all duration-300 group"
                >
                  Let's Work Together
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
