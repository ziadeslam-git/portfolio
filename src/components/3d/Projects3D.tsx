import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Box } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/lib/data';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface ProjectMonolithProps {
  project: typeof projects[0];
  position: [number, number, number];
}

const ProjectMonolith = ({ project, position }: ProjectMonolithProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const portalRef = useRef<HTMLElement | null>(null);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    portalRef.current = document.getElementById('r3f-html-portal');
  }, []);

  useFrame((state) => {
    if (prefersReducedMotion) return;
    
    if (meshRef.current && !active) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    } else if (meshRef.current && active) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, 0.1);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0, 0.1);
    }
  });

  return (
    <group position={position}>
      <Box
        ref={meshRef}
        args={[3, 4, 0.5]}
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
          color={hovered || active ? "#7C3AED" : "#1a1a2e"}
          emissive="#7C3AED"
          emissiveIntensity={hovered || active ? 0.5 : 0.1}
          metalness={0.8}
          roughness={0.2}
          wireframe={!active && !hovered}
        />
      </Box>

      {!active && portalRef.current && (
        <Html portal={portalRef as any} position={[0, -2.5, 0]} center className="pointer-events-none">
          <div className="bg-black/80 backdrop-blur-md px-4 py-2 rounded-lg border border-primary/30 shadow-lg">
            <h3 className="text-white font-bold whitespace-nowrap">{project.title}</h3>
          </div>
        </Html>
      )}

      {portalRef.current && (
        <Html
          portal={portalRef as any}
          position={[0, 0, 1]}
          center
          zIndexRange={[100, 0]}
          className={`transition-all duration-500 ${active ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
        >
          <div className="w-[90vw] max-w-[800px] bg-black/95 backdrop-blur-xl border border-primary/30 rounded-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(124,58,237,0.3)] flex flex-col md:flex-row gap-8">
            
            <div className="w-full md:w-1/2">
              <div className="relative rounded-xl overflow-hidden aspect-video border border-white/10 bg-black/50">
                {project.imageName && (
                  <img 
                    src={`${import.meta.env.BASE_URL}uploads/${project.imageName}`} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.techStack.map((tech, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5">
                    <span className={`w-1.5 h-1.5 rounded-full ${tech.color}`}></span>
                    <span className="text-white/80 text-xs font-medium">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <div className="inline-flex px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-[10px] font-bold tracking-widest uppercase mb-4 w-fit">
                {project.badge}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                {project.title}
              </h3>

              <div className="space-y-3 mb-8 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {project.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-white/70 text-sm leading-relaxed">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {project.githubUrl !== "#" && (
                  <Button variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">Code</a>
                  </Button>
                )}
                {project.liveUrl !== "#" && (
                  <Button variant="outline" className="bg-transparent border-primary/50 text-primary hover:bg-primary/10" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live</a>
                  </Button>
                )}
                {project.detailsUrl !== "#" && (
                  <Button className="bg-primary hover:bg-primary/90 text-white" asChild>
                    <Link to={project.detailsUrl}>Details</Link>
                  </Button>
                )}
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
    </group>
  );
};

export const Projects3D = () => {
  const groupRef = useRef<THREE.Group>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!groupRef.current || prefersReducedMotion) return;

    gsap.set(groupRef.current.position, { y: -20, z: -20 });
    gsap.set(groupRef.current.rotation, { x: -Math.PI / 4 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#projects",
        start: "top bottom", 
        end: "center center",
        scrub: 1,
      }
    });

    tl.to(groupRef.current.position, {
      y: 0,
      z: -8,
      ease: "power2.out"
    }, 0);

    tl.to(groupRef.current.rotation, {
      x: 0,
      ease: "power2.out"
    }, 0);

    const tlOut = gsap.timeline({
      scrollTrigger: {
        trigger: "#projects",
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
      {projects.map((project, index) => {
        const x = (index - 2) * 4;
        const z = -Math.abs(index - 2) * 1.5;
        return (
          <ProjectMonolith 
            key={project.id} 
            project={project} 
            position={[x, 0, z]} 
          />
        );
      })}
    </group>
  );
};
