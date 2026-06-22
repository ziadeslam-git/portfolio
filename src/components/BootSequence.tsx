import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface BootSequenceProps {
  onComplete: () => void;
}

const zPoints = [
  [-4, 4, 0], [-1.33, 4, 0], [1.33, 4, 0], [4, 4, 0], // Top
  [2, 1.33, 0], [0, -1.33, 0], [-2, -4, 0], // Diagonal (adjusted to connect smoothly)
  [-4, -6.66, 0], [-1.33, -6.66, 0], [1.33, -6.66, 0], [4, -6.66, 0] // Bottom
];

const Boot3DBackground = () => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  
  useEffect(() => {
    // Form the Z shape
    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const target = zPoints[i % zPoints.length];
      
      // Start scattered wildly
      mesh.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 30 - 15
      );

      // Animate into Z formation
      gsap.to(mesh.position, {
        x: target[0],
        y: target[1] + 1.33, // offset slightly to center the Z
        z: target[2],
        duration: 1.5,
        ease: "expo.out",
        delay: 0.2
      });

      // Also animate scale for a pop effect
      mesh.scale.set(0.1, 0.1, 0.1);
      gsap.to(mesh.scale, {
        x: 1, y: 1, z: 1,
        duration: 1.5,
        ease: "back.out(1.5)",
        delay: 0.2
      });
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Slow cinematic rotation of the whole Z
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    
    // Mouse parallax
    const targetX = (state.pointer.x * Math.PI) / 5;
    const targetY = (state.pointer.y * Math.PI) / 5;
    groupRef.current.rotation.x += 0.05 * (targetY - groupRef.current.rotation.x);
    groupRef.current.rotation.z += 0.05 * (targetX - groupRef.current.rotation.z);
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {zPoints.map((_, i) => (
        <Float key={i} speed={2} rotationIntensity={1.5} floatIntensity={1}>
          <mesh ref={el => meshRefs.current[i] = el}>
            {i % 3 === 0 ? <icosahedronGeometry args={[0.8, 0]} /> : 
             i % 3 === 1 ? <octahedronGeometry args={[0.8, 0]} /> : 
             <boxGeometry args={[1, 1, 1]} />}
            <meshStandardMaterial color="#9B30FF" wireframe opacity={0.6} transparent />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

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

      // 1. Meteors Flying (Completely Random Paths)
      const meteors = gsap.utils.toArray('.meteor');
      meteors.forEach((meteor: any) => {
        // Spawn from random edges, go to random edges
        const side = Math.floor(Math.random() * 4); // 0: top, 1: bottom, 2: left, 3: right
        let startX, startY, endX, endY;
        
        if (side === 0) { // Top to bottom
          startX = (Math.random() - 0.5) * window.innerWidth * 2;
          startY = -200;
          endX = (Math.random() - 0.5) * window.innerWidth * 2;
          endY = window.innerHeight + 200;
        } else if (side === 1) { // Bottom to top
          startX = (Math.random() - 0.5) * window.innerWidth * 2;
          startY = window.innerHeight + 200;
          endX = (Math.random() - 0.5) * window.innerWidth * 2;
          endY = -200;
        } else if (side === 2) { // Left to right
          startX = -200;
          startY = (Math.random() - 0.5) * window.innerHeight * 2;
          endX = window.innerWidth + 200;
          endY = (Math.random() - 0.5) * window.innerHeight * 2;
        } else { // Right to left
          startX = window.innerWidth + 200;
          startY = (Math.random() - 0.5) * window.innerHeight * 2;
          endX = -200;
          endY = (Math.random() - 0.5) * window.innerHeight * 2;
        }

        gsap.fromTo(meteor, 
          { 
            x: startX, 
            y: startY, 
            scale: Math.random() * 0.4 + 0.2, 
            opacity: Math.random() * 0.4 + 0.2,
            rotationZ: Math.random() * 360,
            filter: 'blur(8px)'
          },
          {
            x: endX,
            y: endY,
            rotationZ: "+=720",
            duration: Math.random() * 2 + 1, // varied speed
            ease: "none",
            repeat: -1,
            delay: Math.random() * 2
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
          duration: 2.5, 
          ease: "expo.inOut",
          delay: 1.5 // Let the Z shape form first
        }
      );

      // 3. Name and Role appear elegantly
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

      // 4. Hold to read
      tl.to({}, { duration: 1.5 });

      // 5. Blast Out to reveal portfolio
      tl.to(containerRef.current, {
        scale: 1.5,
        opacity: 0,
        filter: "blur(20px)",
        duration: 0.8,
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
      {/* Interactive 3D Background */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <Environment preset="city" />
          <Boot3DBackground />
        </Canvas>
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

      <div className="flex flex-col items-center justify-center relative z-10 pointer-events-none">
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
