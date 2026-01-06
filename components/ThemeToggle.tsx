'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { flushSync } from 'react-dom';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting until mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = async (e: React.MouseEvent) => {
    // Basic fallback logic
    const isDark = resolvedTheme === 'dark';
    const newTheme = isDark ? 'light' : 'dark';

    // Check if View Transitions API is supported
    // @ts-ignore
    if (!document.startViewTransition) {
      setTheme(newTheme);
      return;
    }

    // --- Advanced Circular Reveal Logic ---
    
    // 1. Calculate the center of the button (the click event coordinates)
    const x = e.clientX;
    const y = e.clientY;

    // 2. Calculate the distance to the farthest corner to ensure circle covers the screen
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // 3. Start the transition
    // @ts-ignore
    const transition = document.startViewTransition(() => {
      // 4. Force strict React update inside the transition callback
      flushSync(() => {
        setTheme(newTheme);
      });
    });

    // 5. Animate the circular clip-path on the "new" snapshot
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`
          ],
        },
        {
          duration: 700,
          easing: "cubic-bezier(0.25, 1, 0.5, 1)", // Custom ease for a premium feel
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  if (!mounted) {
     // Return a skeleton or null to avoid layout shift, but keep same dimensions
     return (
       <div className="w-[42px] h-[42px] rounded-full bg-slate-200/20 animate-pulse border border-white/10" />
     );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full bg-white/40 dark:bg-[#1e293b]/60 backdrop-blur-md border border-white/60 dark:border-white/10 shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 group overflow-hidden physics-interactive"
      aria-label="Toggle Theme"
    >
      <div className="relative w-6 h-6 flex items-center justify-center pointer-events-none">
        <Sun 
            className={`absolute w-5 h-5 text-amber-500 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                !isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
            }`} 
        />
        <Moon 
            className={`absolute w-5 h-5 text-blue-300 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                isDark ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'
            }`} 
        />
      </div>
      
      {/* Subtle hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
    </button>
  );
};