
'use client';

import React, { useRef, useEffect, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  threshold?: number;
  delay?: number;
  className?: string;
  width?: "full" | "auto";
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  threshold = 0.01, 
  delay = 0,
  className = "",
  width = "full"
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        threshold,
        rootMargin: "100px 0px"
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.disconnect();
    };
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`reveal-base ${isVisible ? 'reveal-visible' : ''} ${width === 'full' ? 'w-full' : ''} ${className}`}
      style={{
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};
