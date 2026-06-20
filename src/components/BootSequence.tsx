import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence = ({ onComplete }: BootSequenceProps) => {
  const [lines, setLines] = useState<string[]>([]);
  const prefersReducedMotion = useReducedMotion();

  const bootText = [
    "Initializing Experience...",
    "Loading Projects...",
    "Connecting To Portfolio...",
    "System Ready."
  ];

  useEffect(() => {
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex < bootText.length) {
        setLines(prev => [...prev, bootText[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
        
        // Fade out
        gsap.to(".boot-container", {
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => {
            onComplete();
          }
        });
      }
    }, 600);

    return () => clearInterval(interval);
  }, [prefersReducedMotion, onComplete]);

  if (prefersReducedMotion) return null;

  return (
    <div className="boot-container fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center font-mono">
      <div className="w-full max-w-md p-8">
        {lines.map((line, index) => (
          <div key={index} className="text-primary text-sm sm:text-base mb-2 animate-pulse-fast drop-shadow-[0_0_8px_rgba(124,58,237,0.8)]">
            {">"} {line}
          </div>
        ))}
        {lines.length < bootText.length && (
          <div className="w-4 h-5 bg-primary animate-ping mt-4"></div>
        )}
      </div>
    </div>
  );
};

export default BootSequence;
