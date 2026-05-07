import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  const stats = [
    { number: "10+", label: "Projects Completed" },
    { number: "10+", label: "Technologies" },
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
      <div className="absolute inset-0 bg-black"></div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Left side - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="relative">
              <div className="relative max-w-md mx-auto lg:mx-0">
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
                  <img 
                    src={`${import.meta.env.BASE_URL}uploads/IMG-20260110-WA0020.jpg`}
                    alt="Ziad ELkholy - Backend Developer" 
                    className="w-full h-full object-cover object-top rounded-3xl shadow-2xl"
                  />
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}>
                  <Card className="absolute -bottom-8 -right-8 sm:right-0 p-6 sm:p-8 bg-black/80 backdrop-blur-sm rounded-2xl border border-primary/30">
                    <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">1+</div>
                    <div className="text-base text-white/70">Years<br/>Experience</div>
                  </Card>
                </motion.div>
              </div>
            </motion.div>

            {/* Right side - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
                <span className="text-primary text-sm font-medium  tracking-wider">Who is Ziad ELkholy?</span>
              </div>
              
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8">
                About Me
              </h2>
              
              <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-10">
                I'm Ziad ELkholy, a passionate Backend Developer and Computer Science student 
                at HICMIS. I specialize in building robust, scalable APIs and web applications 
                using ASP.NET Core and modern development practices. Every project I work on 
                is an opportunity to learn something new and push my skills further. I believe 
                in clean code, proper architecture, and building systems that last.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 mb-10">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}>
                    <Card className="p-6 sm:p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 text-center hover:border-primary/30 transition-all duration-300">
                      <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                      <div className="text-sm sm:text-base text-white/70">{stat.label}</div>
                    </Card>
                  </motion.div>
                ))}
              </div>
              
              {/* Expertise */}
              <div className="mb-10">
                <h4 className="text-white text-xl font-semibold mb-5">My expertise includes:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {expertise.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                      className="flex items-center gap-3 text-white/80">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-base">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <Button 
                onClick={() => scrollToSection('contact')}
                className="bg-transparent border-2 border-white/30 text-white hover:bg-white hover:text-black rounded-full px-8 py-6 text-base font-semibold transition-all duration-300 group">
                Contact Me
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
