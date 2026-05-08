import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide the preloader after 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
        >
          <div className="text-center overflow-hidden flex flex-col items-center">
            {/* Logo and Name side by side */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 mb-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-16 h-16 sm:w-20 sm:h-20 shrink-0"
              >
                <img 
                  src={`${import.meta.env.BASE_URL}uploads/profile-new.png`} 
                  alt="Logo" 
                  className="w-full h-full object-contain"
                />
              </motion.div>

              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight m-0"
              >
                Ziad ELkholy
              </motion.h1>
            </div>
            
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
            >
              <p className="text-primary/80 text-xs sm:text-sm font-bold tracking-[0.3em] uppercase">
                Backend .NET Developer
              </p>
            </motion.div>
          </div>
          
          {/* Subtle animated line */}
          <motion.div 
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.9, ease: "easeInOut" }}
            className="absolute bottom-1/4 w-40 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
