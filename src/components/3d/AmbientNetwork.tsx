import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export const AmbientNetwork = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const groupRef = useRef<THREE.Group>(null);
  const prefersReducedMotion = useReducedMotion();

  const particleCount = 100;
  const maxDistance = 3.5; // Max distance for connection

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = [];
    
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;     // x spread
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20; // y spread
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10; // z spread
      
      vel.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        )
      );
    }
    
    return [pos, vel];
  }, []);

  const lineGeometry = useMemo(() => new THREE.BufferGeometry(), []);

  useFrame(() => {
    if (prefersReducedMotion || !pointsRef.current || !linesRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    // Update positions
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] += velocities[i].x;
      positions[i * 3 + 1] += velocities[i].y;
      positions[i * 3 + 2] += velocities[i].z;

      // Bounce off invisible boundaries
      if (Math.abs(positions[i * 3]) > 10) velocities[i].x *= -1;
      if (Math.abs(positions[i * 3 + 1]) > 10) velocities[i].y *= -1;
      if (Math.abs(positions[i * 3 + 2]) > 5) velocities[i].z *= -1;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Connect close points
    const linePositions = [];
    const lineOpacities = [];

    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < maxDistance * maxDistance) {
          linePositions.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
          // Opacity based on distance
          const alpha = 1.0 - Math.sqrt(distSq) / maxDistance;
          lineOpacities.push(alpha, alpha);
        }
      }
    }

    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.Float32BufferAttribute(
      lineOpacities.map(a => [0.486, 0.227, 0.929]).flat(), // rgb equivalent of #7C3AED with dynamic alpha handled by material
      3
    ));
    
    // We update material opacity uniformly or use vertex colors
  });

  // Setup GSAP convergence
  useEffect(() => {
    if (prefersReducedMotion || !groupRef.current) return;
    
    // Select all triggers we inject in Index.tsx
    const triggers = document.querySelectorAll('.network-convergence-trigger');
    
    triggers.forEach((trigger) => {
      ScrollTrigger.create({
        trigger: trigger,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          gsap.to(groupRef.current!.scale, {
            x: 0.5, y: 0.5, z: 0.5, 
            duration: 1, 
            ease: "power2.inOut"
          });
          gsap.to(groupRef.current!.rotation, {
            y: "+=3.14", 
            duration: 1.5, 
            ease: "power2.inOut"
          });
        },
        onLeave: () => {
          gsap.to(groupRef.current!.scale, {
            x: 1, y: 1, z: 1, 
            duration: 1.5, 
            ease: "power2.out"
          });
        },
        onEnterBack: () => {
          gsap.to(groupRef.current!.scale, {
            x: 0.5, y: 0.5, z: 0.5, 
            duration: 1, 
            ease: "power2.inOut"
          });
        },
        onLeaveBack: () => {
          gsap.to(groupRef.current!.scale, {
            x: 1, y: 1, z: 1, 
            duration: 1.5, 
            ease: "power2.out"
          });
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <group ref={groupRef}>
      {/* The nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial 
          size={0.1} 
          color="#9B30FF" 
          transparent 
          opacity={0.8}
          sizeAttenuation={true} 
        />
      </points>
      
      {/* The connecting lines */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial 
          color="#7C3AED" 
          transparent 
          opacity={0.3} 
          blending={THREE.AdditiveBlending} 
        />
      </lineSegments>
    </group>
  );
};
