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

      // Step 1: Show Logo (drop in / scale up)
      tl.fromTo(logoRef.current, 
        { scale: 0.5, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: "back.out(1.5)" }
      );

      // Step 2: Name appears
      tl.fromTo(nameRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );

      // Step 3: Role appears
      tl.fromTo(roleRef.current,
        { opacity: 0, y: 20, filter: "blur(5px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );

      // Step 4: Hold for a moment to let user read
      tl.to({}, { duration: 0.8 });

      // Step 5: Dramatic exit (everything moves up and fades out)
      tl.to([logoRef.current, nameRef.current, roleRef.current], {
        y: -50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.in"
      });

      // Fade out background
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut"
      }, "-=0.3");

    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, onComplete]);

  if (prefersReducedMotion) return null;

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[10000] bg-[#050505] flex flex-col items-center justify-center"
    >
      <div className="flex flex-col items-center justify-center">
        {/* Logo Element */}
        <div 
          ref={logoRef} 
          className="mb-8 relative flex items-center justify-center w-24 h-24 rounded-2xl bg-black/50 border border-white/10 shadow-[0_0_50px_rgba(124,58,237,0.3)]"
        >
          {/* Glowing background */}
          <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl animate-pulse"></div>
          {/* Fallback logo icon/text */}
          <Code2 className="w-12 h-12 text-primary relative z-10" />
        </div>

        {/* Name */}
        <h1 
          ref={nameRef} 
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight"
        >
          Ziad ElKholy
        </h1>

        {/* Role */}
        <h2 
          ref={roleRef} 
          className="text-lg sm:text-xl md:text-2xl font-light text-primary tracking-[0.2em] uppercase"
        >
          Software Engineering
        </h2>
      </div>
    </div>
  );
};

export default BootSequence;
