
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLenis } from '../app/providers';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
        // Use Lenis internal state for smoother checks
        const onScroll = ({ scroll }: { scroll: number }) => {
            const shouldBeVisible = scroll > 400;
            // Only update state if value changes to avoid re-renders during scroll
            setIsVisible(prev => prev !== shouldBeVisible ? shouldBeVisible : prev);
        };
        lenis.on('scroll', onScroll);
        // Initial check
        setIsVisible(lenis.animatedScroll > 400);
        
        return () => {
            // Cleanup is implicit with lenis destruction, but good practice
        };
    } else {
        // Fallback for when lenis isn't ready or used
        let ticking = false;
        const toggleVisibility = () => {
          if (!ticking) {
            window.requestAnimationFrame(() => {
              const shouldBeVisible = window.scrollY > 400;
              setIsVisible(prev => prev !== shouldBeVisible ? shouldBeVisible : prev);
              ticking = false;
            });
            ticking = true;
          }
        };
        window.addEventListener('scroll', toggleVisibility, { passive: true });
        return () => window.removeEventListener('scroll', toggleVisibility);
    }
  }, [lenis]);

  const scrollToTop = useCallback(() => {
    if (lenis) {
      lenis.scrollTo(0, { 
          // Reduced duration from 1.5 to 1.0 to reduce rendering load duration
          duration: 1.0,
          easing: (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t) 
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [lenis]);

  return (
    <button
      onClick={scrollToTop}
      aria-label="برگشت به بالا"
      className={`fixed bottom-8 right-8 z-[90] p-3 md:p-4 rounded-full 
      bg-white/60 dark:bg-[#1e293b]/60 backdrop-blur-xl 
      border border-white/60 dark:border-white/10 
      text-slate-900 dark:text-white 
      shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_0_30px_rgba(0,0,0,0.3)] 
      hover:shadow-[0_10px_40px_rgba(59,130,246,0.3)] dark:hover:shadow-[0_0_40px_rgba(59,130,246,0.4)]
      hover:scale-110 hover:-translate-y-1
      group
      physics-interactive
      ${isVisible ? 'opacity-100 translate-y-0 cursor-pointer' : 'opacity-0 translate-y-10 pointer-events-none'}
      `}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      
      <ArrowUp className="w-6 h-6 relative z-10 stroke-[2.5px]" />
    </button>
  );
};
