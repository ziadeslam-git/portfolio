import { useRef, useState, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, Sphere, Trail } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillCategories } from '@/lib/data';
import { Code2, Shield, LayoutTemplate, Database, PenTool } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-6 h-6 text-[#9B30FF]" />,
  Shield: <Shield className="w-6 h-6 text-[#7C3AED]" />,
  LayoutTemplate: <LayoutTemplate className="w-6 h-6 text-[#8B5CF6]" />,
  Database: <Database className="w-6 h-6 text-[#A78BFA]" />,
  PenTool: <PenTool className="w-6 h-6 text-[#C4B5FD]" />
};

interface PlanetProps {
  category: typeof skillCategories[0];
  position: [number, number, number];
  orbitRadius: number;
  orbitSpeed: number;
  color: string;
}

const SkillPlanet = ({ category, position, orbitRadius, orbitSpeed, color }: PlanetProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const portalRef = useRef<HTMLElement | null>(null);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const { clock } = useThree();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    portalRef.current = document.getElementById('r3f-html-portal');
  }, []);

  const angleOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(() => {
    if (prefersReducedMotion) return;
    
    if (groupRef.current && !active) {
      const angle = clock.elapsedTime * orbitSpeed + angleOffset;
      groupRef.current.position.x = Math.cos(angle) * orbitRadius;
      groupRef.current.position.z = Math.sin(angle) * orbitRadius;
    }

    if (planetRef.current) {
      planetRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={groupRef} position={prefersReducedMotion ? position : [0, position[1], 0]}>
      <Sphere
        ref={planetRef}
        args={[active ? 1.5 : 1, 32, 32]}
        onClick={(e) => {
          e.stopPropagation();
          setActive(!active);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'default';
        }}
      >
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered || active ? 0.8 : 0.2}
          wireframe={!active}
        />
      </Sphere>

      {!prefersReducedMotion && !active && (
        <Trail
          width={2}
          length={8}
          color={new THREE.Color(color)}
          attenuation={(t) => t * t}
        >
          <mesh position={[0, 0, 0]} />
        </Trail>
      )}

      {/* Detail Popover rendered into portal */}
      {portalRef.current && (
        <Html
          portal={portalRef as any}
          position={[0, active ? 2 : 1.5, 0]}
          center
          zIndexRange={[100, 0]}
          className={`transition-all duration-500 ${active ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-90 pointer-events-none'}`}
        >
          {/* Strict flex-col layout to completely eliminate text overlapping */}
          <div className="w-[300px] sm:w-[350px] p-6 rounded-2xl bg-black/90 backdrop-blur-xl border border-white/20 shadow-[0_0_30px_rgba(124,58,237,0.3)] flex flex-col gap-4">
            
            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                {iconMap[category.iconName]}
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                {category.title}
              </h3>
            </div>
            
            <div className="flex flex-col gap-3 max-h-[40vh] overflow-y-auto custom-scrollbar pr-2">
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full border border-white/20 bg-white/10 text-white/90 text-sm font-medium whitespace-nowrap"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <button 
              onClick={(e) => { e.stopPropagation(); setActive(false); }}
              className="absolute top-4 right-4 text-white/50 hover:text-white"
            >
              ✕
            </button>
          </div>
        </Html>
      )}
      
      {/* Permanent floating label ensuring it is readable at all times */}
      {!active && portalRef.current && (
        <Html portal={portalRef as any} position={[0, -1.8, 0]} center className="pointer-events-none">
          <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 shadow-lg">
            <span className="text-white text-sm font-bold tracking-wider uppercase whitespace-nowrap">
              {category.title}
            </span>
          </div>
        </Html>
      )}
    </group>
  );
};

export const SkillsGalaxy = () => {
  const groupRef = useRef<THREE.Group>(null);
  const colors = ["#9B30FF", "#7C3AED", "#8B5CF6", "#A78BFA", "#C4B5FD"];
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!groupRef.current || prefersReducedMotion) return;

    gsap.set(groupRef.current.position, { y: -20, z: -10 });
    gsap.set(groupRef.current.scale, { x: 0.1, y: 0.1, z: 0.1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#skills",
        start: "top bottom", 
        end: "center center",
        scrub: 1,
      }
    });

    tl.to(groupRef.current.position, {
      y: 0,
      z: -5,
      ease: "power2.out"
    }, 0);

    tl.to(groupRef.current.scale, {
      x: 1,
      y: 1,
      z: 1,
      ease: "power2.out"
    }, 0);

    const tlOut = gsap.timeline({
      scrollTrigger: {
        trigger: "#skills",
        start: "bottom center",
        end: "bottom top",
        scrub: 1,
      }
    });

    tlOut.to(groupRef.current.position, {
      y: 10,
      z: -15,
      ease: "power2.in"
    });

    return () => {
      tl.kill();
      tlOut.kill();
    };
  }, [prefersReducedMotion]);
  
  return (
    <group ref={groupRef}>
      <Sphere args={[2, 64, 64]}>
        <meshBasicMaterial color="#000000" />
      </Sphere>
      
      <pointLight position={[0, 0, 0]} intensity={2} color="#7C3AED" distance={10} />

      {skillCategories.map((cat, index) => {
        const radius = 5 + index * 2;
        const speed = 0.05 + Math.random() * 0.05;
        const height = (Math.random() - 0.5) * 4;
        
        return (
          <SkillPlanet
            key={cat.title}
            category={cat}
            position={[radius, height, 0]}
            orbitRadius={radius}
            orbitSpeed={speed}
            color={colors[index % colors.length]}
          />
        );
      })}
    </group>
  );
};
