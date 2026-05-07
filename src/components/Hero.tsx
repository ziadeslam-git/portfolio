import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import FloatingTechIcons from "./FloatingTechIcons";
import SocialSidebar from "./SocialSidebar";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Pure black background */}
      <div className="absolute inset-0 z-0 bg-black"></div>
      
      <SocialSidebar />
      
      <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:pl-28 lg:pr-12">
        <div className="min-h-screen pt-24 pb-16 items-center justify-start flex flex-row">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full max-w-7xl mx-auto">
            {/* Left side - Main content */}
            <div className="order-2 lg:order-1 text-center lg:text-left space-y-6">
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-white/70 text-base sm:text-lg mb-3">
                Hi I'm
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                <span className="text-primary">Ziad ELkholy</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                A <span className="text-primary font-semibold">Backend Developer</span> With Experience In 
                Building Scalable APIs, Database Design, And 
                Clean Architecture Using <span className="text-primary font-semibold">.NET</span>
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <Button
                  onClick={() => scrollToSection('contact')}
                  className="group bg-transparent border-2 border-white/30 text-white hover:bg-white hover:text-black rounded-full px-10 py-7 text-lg font-semibold transition-all duration-300">
                  Contact me
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  onClick={() => scrollToSection('projects')}
                  variant="outline"
                  className="rounded-full px-10 py-7 text-lg font-semibold border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300">
                  View Work
                  <ExternalLink className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </div>

            {/* Right side - Profile with floating icons */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="order-1 lg:order-2 justify-center relative items-end lg:justify-center flex flex-col px-0">
              <div className="relative w-full max-w-md lg:max-w-lg mx-auto">
                <FloatingTechIcons />
                <div className="relative mx-auto w-[330px] h-[330px] sm:w-[430px] sm:h-[430px] lg:w-[570px] lg:h-[570px]">
                  <div className="relative w-full h-full rounded-3xl overflow-hidden">
                    <img
                      alt="Ziad ELkholy - Backend Developer"
                      className="w-full h-full object-cover object-top shadow-2xl rounded-3xl" 
                      src={`${import.meta.env.BASE_URL}uploads/1af38daa-53c3-4e23-81e6-e7c043a22881.png`} />
                    <div className="absolute bottom-0 left-0 right-0 h-[25%] bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
