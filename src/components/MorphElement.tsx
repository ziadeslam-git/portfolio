import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

type MorphType = 'scale' | 'slide-left' | 'slide-right' | 'slide-up' | 'rotate-y';

interface MorphElementProps {
  children: React.ReactNode;
  type?: MorphType;
  delay?: number;
  className?: string;
  duration?: number;
}

export const MorphElement = ({ 
  children, 
  type = 'slide-up', 
  delay = 0,
  className = '',
  duration = 0.8
}: MorphElementProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!elementRef.current || prefersReducedMotion) return;

    const el = elementRef.current;
    
    // Set initial state based on type
    let fromState: gsap.TweenVars = { opacity: 0 };
    
    switch (type) {
      case 'scale':
        fromState = { ...fromState, scale: 0.8 };
        break;
      case 'slide-left':
        fromState = { ...fromState, x: -50 };
        break;
      case 'slide-right':
        fromState = { ...fromState, x: 50 };
        break;
      case 'slide-up':
        fromState = { ...fromState, y: 50 };
        break;
      case 'rotate-y':
        fromState = { ...fromState, rotationY: -45, transformPerspective: 1000 };
        break;
    }

    // Prepare elements
    gsap.set(el, fromState);

    // Create ScrollTrigger animation
    const tween = gsap.to(el, {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotationY: 0,
      duration: duration,
      delay: delay,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%", // Trigger slightly before it comes into view fully
        toggleActions: "play reverse play reverse", // Play on enter, reverse on leave
      }
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [type, delay, prefersReducedMotion, duration]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};
