
'use client';

import React, { useRef, useEffect, useState, createContext, useContext } from 'react';
import { ThemeProvider, useTheme } from 'next-themes';
import Lenis from 'lenis';

export const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

const AmbientBackground = React.memo(() => {
    // next-themes provides 'resolvedTheme' which handles system preferences correctly
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch by waiting for mount
    useEffect(() => {
        setMounted(true);
    }, []);

    // Default to dark logic if not mounted to prevent flash (or assume matched SSR)
    const isDark = mounted ? resolvedTheme === 'dark' : true; 

    return (
        <div className="fixed inset-0 z-0 pointer-events-none fixed-layer will-change-transform" aria-hidden="true" style={{ contain: 'strict', transform: 'translate3d(0,0,0)' }}>
            <div 
                className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                style={{ opacity: isDark ? 1 : 0 }}
            >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1e1b4b] via-[#020617] to-[#000000]" />
                <div className="absolute top-[-10%] left-[10%] w-[50vw] h-[50vw] bg-indigo-600/20 rounded-full blur-[100px] opacity-60" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[45vw] h-[45vw] bg-purple-600/15 rounded-full blur-[100px] opacity-50" />
                <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
            </div>

            <div 
                className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                style={{ opacity: isDark ? 0 : 1 }}
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-white via-indigo-50/50 to-blue-50/30" />
                <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-indigo-400/15 rounded-full blur-[100px] opacity-70" />
                <div className="absolute bottom-[-10%] left-[20%] w-[40vw] h-[40vw] bg-purple-400/10 rounded-full blur-[100px] opacity-70" />
                <div className="absolute inset-0 opacity-[0.025] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
            </div>
        </div>
    );
});

export function Providers({ children }: { children?: React.ReactNode }) {
    const [lenis, setLenis] = useState<Lenis | null>(null);
    const rafHandleRef = useRef<number | null>(null);

    useEffect(() => {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }

        const lenisInstance = new Lenis({
            duration: 0.9,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1.2, 
            touchMultiplier: 1.5, // Reduced from 2.0 to 1.5 for better stability
            infinite: false,
        });

        setLenis(lenisInstance);
        (window as any).lenis = lenisInstance;

        const update = (time: number) => {
            lenisInstance.raf(time);
            rafHandleRef.current = requestAnimationFrame(update);
        };

        rafHandleRef.current = requestAnimationFrame(update);

        return () => {
            if (rafHandleRef.current) {
                cancelAnimationFrame(rafHandleRef.current);
            }
            lenisInstance.destroy();
            setLenis(null);
            (window as any).lenis = null;
        };
    }, []);

    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <LenisContext.Provider value={lenis}>
                <AmbientBackground />
                {children}
            </LenisContext.Provider>
        </ThemeProvider>
    );
}
