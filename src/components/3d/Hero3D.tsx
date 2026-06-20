import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export const Hero3D = () => {
  const groupRef = useRef<THREE.Group>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!groupRef.current || prefersReducedMotion) return;

    // Use a lightweight ScrollTrigger to move the Hero 3D objects up when scrolling down
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero", // The DOM section
        start: "top top",
        end: "bottom top",
        scrub: 1,
      }
    });

    tl.to(groupRef.current.position, {
      y: 5, // Move up
      z: -10, // Move back into the distance
      ease: "power1.inOut"
    });

    return () => {
      tl.kill();
    };
  }, [prefersReducedMotion]);

  useFrame((state) => {
    if (!groupRef.current || prefersReducedMotion) return;
    
    // Slow cinematic rotation based on time
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    
    // Slight parallax based on mouse
    const targetX = (state.pointer.x * Math.PI) / 10;
    const targetY = (state.pointer.y * Math.PI) / 10;
    
    groupRef.current.rotation.x += 0.05 * (targetY - groupRef.current.rotation.x);
    groupRef.current.rotation.z += 0.05 * (targetX - groupRef.current.rotation.z);
  });

  return (
    <group ref={groupRef} position={[0, 0, -2]}>
      {/* Central Abstract Shape representing Backend Core */}
      <Float speed={prefersReducedMotion ? 0 : 2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[3, 1, -2]}>
          <icosahedronGeometry args={[1.5, 0]} />
          <MeshDistortMaterial 
            color="#9B30FF" 
            emissive="#4c1d95"
            emissiveIntensity={0.5}
            wireframe
            distort={prefersReducedMotion ? 0 : 0.4} 
            speed={prefersReducedMotion ? 0 : 2} 
          />
        </mesh>
      </Float>

      {/* Floating Shard 1 */}
      <Float speed={prefersReducedMotion ? 0 : 3} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-4, 3, -3]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial color="#7C3AED" wireframe={false} opacity={0.8} transparent />
        </mesh>
      </Float>

      {/* Floating Shard 2 */}
      <Float speed={prefersReducedMotion ? 0 : 1.5} rotationIntensity={2} floatIntensity={1.5}>
        <mesh position={[5, -2, -4]} rotation={[0, Math.PI / 3, Math.PI / 6]}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#c084fc" wireframe opacity={0.4} transparent />
        </mesh>
      </Float>

      {/* Floating Shard 3 */}
      <Float speed={prefersReducedMotion ? 0 : 2.5} rotationIntensity={0.8} floatIntensity={1.2}>
        <mesh position={[-3, -2, -1]} rotation={[Math.PI / 2, 0, Math.PI / 4]}>
          <tetrahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial color="#8b5cf6" roughness={0.2} metalness={0.8} />
        </mesh>
      </Float>
    </group>
  );
};
