import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence = ({ onComplete }: BootSequenceProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainLogoRef = useRef<HTMLImageElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLHeadingElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        }
      });

      // 1. Meteors Flying (Random Diagonals)
      const meteors = gsap.utils.toArray('.meteor');
      meteors.forEach((meteor: any) => {
        // Decide trajectory: Top-Left to Bottom-Right, or Bottom-Left to Top-Right
        const isDown = Math.random() > 0.5;
        const startX = (Math.random() > 0.5 ? -1 : 1) * (window.innerWidth + 200);
        const startY = isDown ? -window.innerHeight - 200 : window.innerHeight + 200;
        
        const endX = -startX;
        const endY = -startY;

        gsap.fromTo(meteor, 
          { 
            x: startX, 
            y: startY, 
            scale: Math.random() * 0.4 + 0.1, 
            opacity: Math.random() * 0.4 + 0.1,
            rotationZ: Math.random() * 360,
            filter: 'blur(6px)'
          },
          {
            x: endX,
            y: endY,
            rotationZ: "+=720",
            duration: Math.random() * 1.2 + 0.6,
            ease: "none",
            repeat: 2,
            delay: Math.random() * 0.8
          }
        );
      });

      // 2. Main Logo comes from deep space (3D effect)
      tl.fromTo(mainLogoRef.current,
        { 
          scale: 0.01, 
          opacity: 0, 
          filter: "blur(40px)",
          rotationZ: -45
        },
        { 
          scale: 1, 
          opacity: 1, 
          filter: "blur(0px)",
          rotationZ: 0,
          duration: 2.2, 
          ease: "expo.inOut" 
        }
      );

      // 3. Name and Role appear elegantly
      tl.fromTo(nameRef.current,
        { y: 40, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );

      tl.fromTo(roleRef.current,
        { y: 20, opacity: 0, letterSpacing: "0.8em" },
        { y: 0, opacity: 1, letterSpacing: "0.2em", duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );

      // 4. Hold to read
      tl.to({}, { duration: 1.2 });

      // 5. Blast Out to reveal portfolio
      tl.to(containerRef.current, {
        scale: 1.5,
        opacity: 0,
        filter: "blur(20px)",
        duration: 0.6,
        ease: "power3.in"
      });

    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, onComplete]);

  if (prefersReducedMotion) return null;

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[10000] bg-[#030303] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Meteors Container */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        {Array.from({ length: 20 }).map((_, i) => (
          <img 
            key={i}
            src={`${import.meta.env.BASE_URL}uploads/profile-new.png`} 
            className="meteor absolute w-16 h-16 sm:w-20 sm:h-20 object-contain opacity-0"
            alt=""
          />
        ))}
      </div>

      <div className="flex flex-col items-center justify-center relative z-10">
        {/* Main Huge Logo */}
        <div className="mb-6 relative flex items-center justify-center">
          <img 
            ref={mainLogoRef}
            src={`${import.meta.env.BASE_URL}uploads/profile-new.png`} 
            alt="Ziad Logo" 
            className="w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] object-contain relative z-10 drop-shadow-[0_0_80px_rgba(124,58,237,0.4)]" 
          />
        </div>

        {/* Name (Cinematic Serif) */}
        <h1 
          ref={nameRef} 
          className="text-5xl sm:text-6xl md:text-7xl font-serif font-black text-white mb-4 tracking-tighter drop-shadow-2xl"
        >
          Ziad ElKholy
        </h1>

        {/* Role (Technical Mono) */}
        <h2 
          ref={roleRef} 
          className="text-base sm:text-lg md:text-xl font-mono font-bold text-primary uppercase drop-shadow-md"
        >
          Software Engineering
        </h2>
      </div>
    </div>
  );
};

export default BootSequence;
