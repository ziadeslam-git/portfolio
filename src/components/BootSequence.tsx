import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Code2 } from 'lucide-react';

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence = ({ onComplete }: BootSequenceProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
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

      // Step 1: Logo slams down action-style
      tl.fromTo(logoRef.current, 
        { scale: 3, opacity: 0, y: -100 },
        { scale: 1.2, opacity: 1, y: 0, duration: 0.7, ease: "bounce.out" }
      );

      // Step 2: Name whips in
      tl.fromTo(nameRef.current,
        { x: -50, opacity: 0, skewX: 10 },
        { x: 0, opacity: 1, skewX: 0, duration: 0.5, ease: "power4.out" },
        "-=0.2"
      );

      // Step 3: Role snaps in with letter spacing
      tl.fromTo(roleRef.current,
        { scale: 1.2, opacity: 0, letterSpacing: "1em" },
        { scale: 1, opacity: 1, letterSpacing: "0.2em", duration: 0.5, ease: "power4.out" },
        "-=0.2"
      );

      // Step 4: Hold
      tl.to({}, { duration: 1.0 });

      // Step 5: Blast out
      tl.to([logoRef.current, nameRef.current, roleRef.current], {
        scale: 1.5,
        opacity: 0,
        filter: "blur(10px)",
        stagger: 0.05,
        duration: 0.4,
        ease: "power2.in"
      });

      // Fade out background
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut"
      }, "-=0.2");

    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, onComplete]);

  if (prefersReducedMotion) return null;

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[10000] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="flex flex-col items-center justify-center">
        {/* Logo Element (No Box/Frame) */}
        <div 
          ref={logoRef} 
          className="mb-8 relative flex items-center justify-center"
        >
          {/* Glowing aura */}
          <div className="absolute inset-0 bg-primary/40 rounded-full blur-2xl animate-pulse scale-[2]"></div>
          <img src={`${import.meta.env.BASE_URL}uploads/profile-new.png`} alt="Ziad Logo" className="w-20 h-20 sm:w-24 sm:h-24 object-contain relative z-10" />
        </div>

        {/* Name (New Font: Serif) */}
        <h1 
          ref={nameRef} 
          className="text-5xl sm:text-6xl md:text-7xl font-serif font-black text-white mb-4 tracking-tighter drop-shadow-xl"
        >
          Ziad ElKholy
        </h1>

        {/* Role (New Font: Mono) */}
        <h2 
          ref={roleRef} 
          className="text-base sm:text-xl md:text-2xl font-mono font-bold text-primary tracking-[0.2em] uppercase"
        >
          Software Engineering
        </h2>
      </div>
    </div>
  );
};

export default BootSequence;
