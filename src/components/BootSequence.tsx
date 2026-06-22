import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface BootSequenceProps {
  onComplete: () => void;
}

const WireframeGeometry = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5" className={className}>
    {/* Icosahedron-like wireframe */}
    <polygon points="50,5 90,30 90,70 50,95 10,70 10,30" />
    <polygon points="50,5 50,35 90,30" />
    <polygon points="50,5 10,30 50,35" />
    <polygon points="10,30 30,65 50,35" />
    <polygon points="90,30 50,35 70,65" />
    <polygon points="30,65 70,65 50,35" />
    <polygon points="10,70 30,65 50,95" />
    <polygon points="90,70 70,65 50,95" />
    <polygon points="30,65 50,95 70,65" />
  </svg>
);

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
        const isDown = Math.random() > 0.5;
        const startX = (Math.random() > 0.5 ? -1 : 1) * (window.innerWidth + 300);
        const startY = isDown ? -window.innerHeight - 300 : window.innerHeight + 300;
        
        const endX = -startX;
        const endY = -startY;

        gsap.fromTo(meteor, 
          { 
            x: startX, 
            y: startY, 
            scale: Math.random() * 0.4 + 0.2, // increased scale
            opacity: Math.random() * 0.4 + 0.2, // increased visibility
            rotationZ: Math.random() * 360,
            filter: 'blur(8px)'
          },
          {
            x: endX,
            y: endY,
            rotationZ: "+=720",
            duration: Math.random() * 1.5 + 0.8,
            ease: "none",
            repeat: 3,
            delay: Math.random() * 1.5
          }
        );
      });

      // 2. Zero Gravity Geometry Float
      const geometries = gsap.utils.toArray('.geom');
      geometries.forEach((geom: any) => {
        gsap.fromTo(geom, 
          {
            x: (Math.random() - 0.5) * window.innerWidth * 1.5,
            y: (Math.random() - 0.5) * window.innerHeight * 1.5,
            rotationX: Math.random() * 360,
            rotationY: Math.random() * 360,
            rotationZ: Math.random() * 360,
            opacity: 0,
            scale: Math.random() * 1 + 0.5
          },
          {
            x: "+=" + ((Math.random() - 0.5) * 400),
            y: "+=" + ((Math.random() - 0.5) * 400),
            rotationX: "+=180",
            rotationY: "+=180",
            rotationZ: "+=180",
            opacity: Math.random() * 0.2 + 0.1, // Subtle visibility
            duration: Math.random() * 10 + 5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
          }
        );
      });

      // Show geometries fade in
      gsap.to('.geom', { opacity: 0.2, duration: 2 });

      // 3. Main Logo comes from deep space (3D effect)
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

      // 4. Name and Role appear elegantly
      tl.fromTo(nameRef.current,
        { y: 30, opacity: 0, filter: "blur(10px)", scale: 0.9 },
        { y: 0, opacity: 1, filter: "blur(0px)", scale: 1, duration: 1.0, ease: "power3.out" },
        "-=0.4"
      );

      tl.fromTo(roleRef.current,
        { y: 20, opacity: 0, letterSpacing: "1em" },
        { y: 0, opacity: 1, letterSpacing: "0.4em", duration: 1.0, ease: "power3.out" },
        "-=0.8"
      );

      // 5. Hold to read
      tl.to({}, { duration: 1.5 });

      // 6. Blast Out to reveal portfolio
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
      className="fixed inset-0 z-[10000] bg-[#030303] flex flex-col items-center justify-center overflow-hidden perspective-[1000px]"
    >
      {/* Zero Gravity Geometries Container */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center transform-style-3d">
        {Array.from({ length: 12 }).map((_, i) => (
          <WireframeGeometry 
            key={`geom-${i}`} 
            className="geom absolute w-64 h-64 sm:w-96 sm:h-96 text-primary opacity-0"
          />
        ))}
      </div>

      {/* Meteors Container */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        {Array.from({ length: 40 }).map((_, i) => (
          <img 
            key={`meteor-${i}`}
            src={`${import.meta.env.BASE_URL}uploads/profile-new.png`} 
            className="meteor absolute w-24 h-24 sm:w-32 sm:h-32 object-contain opacity-0"
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

        {/* Name (Cinematic Modern Sans) */}
        <h1 
          ref={nameRef} 
          className="text-4xl sm:text-6xl md:text-7xl font-sans font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70 mb-4 tracking-tighter drop-shadow-2xl"
        >
          Ziad ElKholy
        </h1>

        {/* Role (Cinematic Spaced Mono) */}
        <h2 
          ref={roleRef} 
          className="text-xs sm:text-sm md:text-base font-sans font-semibold text-primary/80 uppercase tracking-[0.4em] drop-shadow-md"
        >
          Software Engineering
        </h2>
      </div>
    </div>
  );
};

export default BootSequence;
