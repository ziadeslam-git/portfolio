import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Preload } from '@react-three/drei';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SceneContextProps {
  children: React.ReactNode;
}

export const SceneContext: React.FC<SceneContextProps> = ({ children }) => {
  const [contextLost, setContextLost] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      console.warn('WebGL context lost');
      setContextLost(true);
    };

    const handleContextRestored = () => {
      console.log('WebGL context restored');
      setContextLost(false);
    };

    const canvasElements = document.querySelectorAll('canvas');
    canvasElements.forEach(canvas => {
      canvas.addEventListener('webglcontextlost', handleContextLost);
      canvas.addEventListener('webglcontextrestored', handleContextRestored);
    });

    return () => {
      canvasElements.forEach(canvas => {
        canvas.removeEventListener('webglcontextlost', handleContextLost);
        canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      });
    };
  }, []);

  if (contextLost) {
    return (
      <div className="fixed inset-0 z-0 bg-black flex items-center justify-center pointer-events-none">
        <div className="text-primary/50 font-mono text-sm border border-primary/20 px-4 py-2 rounded-lg bg-black/50 backdrop-blur-sm">
          [WebGL Context Lost - Displaying 2D Fallback]
        </div>
      </div>
    );
  }

  // To allow DOM clicking while capturing 3D events, we position the canvas fixed in the background (z-index: 0),
  // set pointerEvents: 'none' on its container, but tell R3F to listen to events on the root DOM element.
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={prefersReducedMotion ? 1 : [1, 2]} // Lower DPR for reduced motion/mobile
        gl={{ 
          powerPreference: "high-performance",
          antialias: !prefersReducedMotion,
          alpha: true
        }}
        eventSource={document.getElementById('root') as HTMLElement}
        eventPrefix="client"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#9B30FF" />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#7C3AED" />
          <Environment preset="city" />
          
          {children}
          
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};
