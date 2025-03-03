
import { useEffect, useState, useRef, RefObject } from 'react';

// Custom hook to check if an element is in the viewport
export function useInView(ref: RefObject<HTMLElement>, options = {}) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, {
      threshold: 0.1,
      ...options,
    });
    
    observer.observe(ref.current);
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return isInView;
}

// Function to apply staggered animation to children
export function applyStaggeredAnimation(
  parent: HTMLElement | null, 
  childSelector: string, 
  animationClass: string, 
  delayIncrement: number = 0.05
) {
  if (!parent) return;
  
  const children = parent.querySelectorAll(childSelector);
  
  children.forEach((child, index) => {
    const element = child as HTMLElement;
    element.style.opacity = '0';
    element.style.animation = `none`;
    
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.animation = '';
      element.style.animationDelay = `${index * delayIncrement}s`;
      element.classList.add(animationClass);
    }, 100);
  });
}

// Parallax effect
export function useParallax(speed: number = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const scrollY = window.scrollY;
      ref.current.style.transform = `translateY(${scrollY * speed}px)`;
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);
  
  return ref;
}

// Type for animation properties
export type AnimationProps = {
  animation?: 'fade-in' | 'fade-up' | 'slide-in-right' | 'blur-in' | 'none';
  duration?: string;
  delay?: string;
};

// Function to get animation class names
export function getAnimationClasses({ animation = 'fade-in', duration = '0.8s', delay = '0s' }: AnimationProps) {
  if (animation === 'none') return '';
  
  return `animate-${animation} [animation-duration:${duration}] [animation-delay:${delay}] [animation-fill-mode:both]`;
}
