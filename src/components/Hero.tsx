import { Button } from "@/components/ui/button";
import { ArrowRight, Code2 } from "lucide-react";
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
      {/* Background ambient lighting - strictly hidden on mobile/tablet to ensure pure black */}
      <div className="absolute top-1/3 -left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none hidden lg:block"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none hidden lg:block"></div>
      
      <SocialSidebar />
      
      <div className="relative z-10 container mx-auto px-4 sm:px-8 lg:pl-28 lg:pr-12">
        <div className="min-h-screen pt-24 pb-16 items-center justify-start flex flex-row">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center w-full max-w-7xl mx-auto">
            
            {/* Left side - Main content */}
            <div className="order-2 lg:order-1 lg:col-span-6 xl:col-span-7 text-center lg:text-left space-y-6">
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-2 backdrop-blur-md"
              >
                <Code2 className="w-4 h-4 text-primary" />
                <span className="text-white/80 text-sm font-medium tracking-wider uppercase">Backend Engineering</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-white mb-6 leading-[1.1] tracking-tight"
              >
                Hi, I'm <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-primary/80">
                  Ziad ELkholy
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg sm:text-xl md:text-2xl text-white/70 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light"
              >
                A <strong className="text-white font-medium">Backend Developer</strong> specializing in building scalable APIs, architecting secure databases, and delivering clean, enterprise-grade solutions using <strong className="text-white font-medium">.NET</strong>.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
              >
                <Button
                  onClick={() => scrollToSection('contact')}
                  className="group bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] rounded-full px-8 py-6 text-base font-semibold transition-all duration-300"
                >
                  Start a Project
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  onClick={() => scrollToSection('projects')}
                  className="group bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 rounded-full px-8 py-6 text-base font-semibold transition-all duration-300 backdrop-blur-md"
                >
                  Explore Work
                </Button>
              </motion.div>
            </div>

            {/* Right side - Profile with floating icons */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="order-1 lg:order-2 lg:col-span-6 xl:col-span-5 justify-center relative items-center lg:justify-end flex flex-col px-0"
            >
              <div className="relative w-full max-w-[100vw] lg:max-w-2xl mx-auto flex justify-center items-end h-[450px] sm:h-[550px] md:h-[650px] lg:h-[750px]">
                {/* 3D Icons Layer - Back */}
                <FloatingTechIcons layer="back" />
                
                {/* Subject Image - perfectly scaled and masked for a flawless blend */}
                <div className="relative z-10 h-full w-full flex justify-center items-end">
                  <img
                    alt="Ziad ELkholy"
                    className="h-[95%] w-auto object-contain object-bottom drop-shadow-[0_0_50px_rgba(124,58,237,0.15)] scale-100 lg:scale-[1.25] xl:scale-[1.35] origin-bottom transition-transform duration-500" 
                    src={`${import.meta.env.BASE_URL}uploads/hero-portrait.png`} 
                    style={{
                      WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 25%, black 100%)',
                      maskImage: 'linear-gradient(to top, transparent 0%, black 25%, black 100%)'
                    }}
                  />
                </div>

                {/* 3D Icons Layer - Front */}
                <FloatingTechIcons layer="front" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
