import { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BootSequenceProps {
  onComplete: () => void;
}

const BootParticleNetwork = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const groupRef = useRef<THREE.Group>(null);
  const particleCount = 150;
  const maxDistance = 2.5; // Max distance for lines

  // Particles state
  const particles = useMemo(() => {
    const arr = [];
    let count = 0;
    
    // Target Z shape definition with thickness
    // Top segment (45 pts): (-5, 5) -> (5, 5)
    for (let i = 0; i < 45; i++) {
      const t = i / 44;
      arr.push({ 
        targetX: -5 + t * 10 + (Math.random() - 0.5) * 1.5, 
        targetY: 5 + (Math.random() - 0.5) * 1.5, 
        targetZ: (Math.random() - 0.5) * 2 
      });
      count++;
    }
    // Diagonal segment (60 pts): (5, 5) -> (-5, -5)
    for (let i = 0; i < 60; i++) {
      const t = i / 59;
      arr.push({ 
        targetX: 5 - t * 10 + (Math.random() - 0.5) * 1.5, 
        targetY: 5 - t * 10 + (Math.random() - 0.5) * 1.5, 
        targetZ: (Math.random() - 0.5) * 2 
      });
      count++;
    }
    // Bottom segment (45 pts): (-5, -5) -> (5, -5)
    for (let i = 0; i < 45; i++) {
      const t = i / 44;
      arr.push({ 
        targetX: -5 + t * 10 + (Math.random() - 0.5) * 1.5, 
        targetY: -5 + (Math.random() - 0.5) * 1.5, 
        targetZ: (Math.random() - 0.5) * 2 
      });
      count++;
    }

    // Initialize with random wandering state and explosion targets
    return arr.map(p => ({
      ...p,
      x: (Math.random() - 0.5) * 20,
      y: (Math.random() - 0.5) * 20,
      z: (Math.random() - 0.5) * 10,
      vx: (Math.random() - 0.5) * 0.04,
      vy: (Math.random() - 0.5) * 0.04,
      vz: (Math.random() - 0.5) * 0.04,
      explosionTargetX: (Math.random() - 0.5) * 80,
      explosionTargetY: (Math.random() - 0.5) * 80,
      explosionTargetZ: (Math.random() - 0.5) * 60,
      progress: 0, // 0 = wander, 1 = form Z
      explosionProgress: 0 // 0 = Z form, 1 = exploded
    }));
  }, []);

  const maxLines = (particleCount * (particleCount - 1)) / 2;
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);
  const lineColors = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);
  const positionArray = useMemo(() => new Float32Array(particleCount * 3), []);

  useEffect(() => {
    // Animate to form Z
    gsap.to(particles, {
      progress: 1,
      duration: 2,
      delay: 0.5,
      ease: "power3.inOut"
    });

    // Animate Explosion outwards exactly as the logo appears prominently
    gsap.to(particles, {
      explosionProgress: 1,
      duration: 1.5,
      delay: 3.5, // wait until Z forms, logo appears, then scatter!
      ease: "power4.out"
    });
  }, [particles]);

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current || !groupRef.current) return;

    // Subtle cinematic group rotation
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    
    // Mouse parallax
    const mouseX = (state.pointer.x * Math.PI) / 10;
    const mouseY = (state.pointer.y * Math.PI) / 10;
    groupRef.current.rotation.x += 0.05 * (mouseY - groupRef.current.rotation.x);
    groupRef.current.rotation.z += 0.05 * (mouseX - groupRef.current.rotation.z);

    // Update particles
    for (let i = 0; i < particleCount; i++) {
      const p = particles[i];
      
      // Update wander state
      p.x += p.vx;
      p.y += p.vy;
      p.z += p.vz;

      // Bounce limits
      if (Math.abs(p.x) > 15) p.vx *= -1;
      if (Math.abs(p.y) > 15) p.vy *= -1;
      if (Math.abs(p.z) > 10) p.vz *= -1;

      // Lerp between wander and Z-target based on progress
      let currentX = THREE.MathUtils.lerp(p.x, p.targetX, p.progress);
      let currentY = THREE.MathUtils.lerp(p.y, p.targetY, p.progress);
      let currentZ = THREE.MathUtils.lerp(p.z, p.targetZ, p.progress);

      // Lerp to explosion target
      if (p.explosionProgress > 0) {
        currentX = THREE.MathUtils.lerp(currentX, p.explosionTargetX, p.explosionProgress);
        currentY = THREE.MathUtils.lerp(currentY, p.explosionTargetY, p.explosionProgress);
        currentZ = THREE.MathUtils.lerp(currentZ, p.explosionTargetZ, p.explosionProgress);
      }

      positionArray[i * 3] = currentX;
      positionArray[i * 3 + 1] = currentY;
      positionArray[i * 3 + 2] = currentZ;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Connect close points
    let lineCount = 0;

    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = positionArray[i * 3] - positionArray[j * 3];
        const dy = positionArray[i * 3 + 1] - positionArray[j * 3 + 1];
        const dz = positionArray[i * 3 + 2] - positionArray[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < maxDistance * maxDistance) {
          const idx = lineCount * 6;
          linePositions[idx] = positionArray[i * 3];
          linePositions[idx + 1] = positionArray[i * 3 + 1];
          linePositions[idx + 2] = positionArray[i * 3 + 2];
          
          linePositions[idx + 3] = positionArray[j * 3];
          linePositions[idx + 4] = positionArray[j * 3 + 1];
          linePositions[idx + 5] = positionArray[j * 3 + 2];

          // Opacity fades out at max distance
          const alpha = 1.0 - Math.sqrt(distSq) / maxDistance;
          // When forming the Z, we can boost the opacity for a glowing effect
          const boost = particles[0].progress * 0.5;
          const finalAlpha = Math.min(1.0, alpha + boost);
          
          // Pre-multiply alpha into color for additive blending
          lineColors[idx] = 0.608 * finalAlpha;
          lineColors[idx + 1] = 0.188 * finalAlpha;
          lineColors[idx + 2] = 1.0 * finalAlpha;
          
          lineColors[idx + 3] = 0.608 * finalAlpha;
          lineColors[idx + 4] = 0.188 * finalAlpha;
          lineColors[idx + 5] = 1.0 * finalAlpha;
          
          lineCount++;
        }
      }
    }

    const lineGeo = linesRef.current.geometry;
    lineGeo.setDrawRange(0, lineCount * 2);
    lineGeo.attributes.position.needsUpdate = true;
    lineGeo.attributes.color.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positionArray}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial 
          size={0.15} 
          color="#c084fc" 
          transparent 
          opacity={0.9}
          sizeAttenuation={true} 
          depthWrite={false}
        />
      </points>
      
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={maxLines * 2}
            array={linePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={maxLines * 2}
            array={lineColors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial 
          color="#ffffff" 
          transparent 
          opacity={1.0} 
          blending={THREE.AdditiveBlending} 
          vertexColors
          depthWrite={false}
        />
      </lineSegments>
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

      // 1. Z-Formation takes about 2.5s to complete (0.5s delay + 2s duration)
      // So we wait 2.2s before fading in the logo heavily
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
          delay: 2.2 // Let the Z particle network form first
        }
      );

      // 2. Name and Role appear elegantly
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

      // 3. Hold to read
      tl.to({}, { duration: 1.5 });

      // 4. Blast Out to reveal portfolio
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
      {/* Interactive 3D Particle Background */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
          <BootParticleNetwork />
        </Canvas>
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
