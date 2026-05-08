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
      
      {/* Layer 1: Background Layer with Ambient Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,20,30,1)_0%,rgba(0,0,0,1)_70%)] z-0"></div>
      
      {/* Ambient Orbs */}
      <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-purple-900/15 rounded-full blur-[150px] pointer-events-none"></div>
      
      {/* Layer 2: Big HTML Text Background (The requested "BUILD", "INNOVATE" text) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-[0.04] pointer-events-none select-none z-0 overflow-hidden font-black uppercase tracking-tighter leading-[0.85]">
        <h1 className="text-[18vw] text-white whitespace-nowrap">BUILD</h1>
        <h2 className="text-[18vw] text-transparent whitespace-nowrap" style={{ WebkitTextStroke: '3px white' }}>INNOVATE</h2>
        <h3 className="text-[18vw] text-white whitespace-nowrap">SYSTEMS</h3>
      </div>
      
      {/* Sidebar */}
      <SocialSidebar />
      
      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-8 lg:pl-32 lg:pr-12">
        <div className="min-h-screen pt-24 pb-16 flex flex-col lg:flex-row items-center justify-center lg:justify-start">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-16 items-center w-full max-w-7xl mx-auto">
            
            {/* Left side - Main text content (Layer 4 basically) */}
            {/* Mobile: pulls up slightly to blend with the image fade-out. Desktop: standard alignment. */}
            <div className="order-2 lg:order-1 lg:col-span-6 xl:col-span-7 text-center lg:text-left space-y-6 relative z-30 -mt-12 sm:-mt-20 lg:mt-0">
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-md mb-2 shadow-[0_0_30px_rgba(124,58,237,0.15)]"
              >
                <Code2 className="w-5 h-5 text-primary" />
                <span className="text-white/90 text-xs sm:text-sm font-semibold tracking-widest uppercase">Backend Engineering</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-white mb-6 leading-[1.1] tracking-tight drop-shadow-2xl"
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
                  className="group bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] rounded-full px-8 py-6 text-base font-semibold transition-all duration-300 relative overflow-hidden border border-primary/50"
                >
                  <span className="relative z-10 flex items-center">
                    Start a Project
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
                </Button>
                <Button
                  onClick={() => scrollToSection('projects')}
                  className="group bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 rounded-full px-8 py-6 text-base font-semibold transition-all duration-300 backdrop-blur-md"
                >
                  Explore Work
                </Button>
              </motion.div>
            </div>

            {/* Right side - Layer 3 (Subject) with Layer 4 (Floating Icons) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="order-1 lg:order-2 lg:col-span-6 xl:col-span-5 justify-center relative items-center lg:justify-end flex flex-col px-0"
            >
              <div className="relative w-full max-w-[100vw] lg:max-w-3xl xl:max-w-[4xl] mx-auto flex justify-center items-center h-[450px] sm:h-[550px] md:h-[650px] lg:h-[750px]">
                {/* 3D Icons Layer - Back */}
                <FloatingTechIcons layer="back" />
                
                {/* Subject Image - Layer 3 - Interactive Glowing Card */}
                <div className="relative z-10 w-full sm:w-[90%] lg:w-[110%] xl:w-[120%] flex justify-center items-center perspective-1000 lg:-ml-6 xl:-ml-12">
                  <div className="relative group w-full transition-all duration-700 ease-out hover:-translate-y-4 hover:scale-[1.03]">
                    {/* Animated Glow Behind the Image (Reduced glow intensity) */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-purple-500/10 to-transparent rounded-3xl lg:rounded-[2.5rem] blur-2xl opacity-30 group-hover:opacity-80 group-hover:blur-3xl transition-all duration-700"></div>
                    
                    <img
                      alt="Ziad ELkholy"
                      className="relative w-full h-auto object-cover rounded-3xl lg:rounded-[2.5rem] border border-white/10 shadow-[0_0_30px_rgba(124,58,237,0.1)] group-hover:shadow-[0_0_60px_rgba(124,58,237,0.25)] group-hover:border-primary/50 transition-all duration-700" 
                      src={`${import.meta.env.BASE_URL}uploads/hero-portrait.png`} 
                    />
                  </div>
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
