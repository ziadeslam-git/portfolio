import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface ThePurpleVoidProps {
  id: string;
}

const ThePurpleVoid = ({ id }: ThePurpleVoidProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current || !orbRef.current || prefersReducedMotion) return;

    // Pin the void section so the scroll just drives the orb expanding
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=150%", // Scroll distance while pinned
        scrub: 1,
        pin: true,
        // Optional: normalizeScroll helps prevent iOS Safari jitter when pinning
        // but we'll stick to robust standard properties for now
      }
    });

    // Start small, scale up massively to cover the screen
    tl.fromTo(orbRef.current, 
      { scale: 0, opacity: 0 },
      {
        scale: 50, // Massive scale to cover the screen
        opacity: 1,
        ease: "power2.inOut"
      }
    );

    // As you keep scrolling, fade to black before unpinning so it transitions cleanly to the next section
    tl.to(orbRef.current, {
      opacity: 0,
      ease: "power2.inOut"
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <div className="h-24 bg-gradient-to-b from-black via-primary/10 to-black" />;
  }

  return (
    <div ref={containerRef} id={id} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black z-10 pointer-events-none">
      <div 
        ref={orbRef}
        className="w-32 h-32 rounded-full bg-primary blur-3xl mix-blend-screen"
        style={{ transform: 'scale(0)', opacity: 0 }}
      />
    </div>
  );
};

export default ThePurpleVoid;
