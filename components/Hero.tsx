
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { TEXTS } from '../constants';
import { generateSlogan } from '../services/geminiService';
import { ChevronDown, ArrowLeft } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { useLenis } from '../app/providers';

export const Hero: React.FC = () => {
  const [slogan, setSlogan] = useState<{line1: string, line2: string} | null>(null);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    generateSlogan().then((data) => {
        setSlogan(data);
        // Trigger subtitle reveal shortly after slogan loads for a cascading effect
        setTimeout(() => setShowSubtitle(true), 400);
    });
  }, []);

  const handleScrollDown = useCallback(() => {
    const target = document.getElementById('about-section');
    
    if (target && lenis) {
        lenis.scrollTo(target, { 
            offset: -40,
            duration: 1.5, 
        });
    } else if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
  }, [lenis]);

  if (!slogan) {
    return (
         <section className="relative pt-40 md:pt-60 px-6 container mx-auto flex flex-col items-center min-h-screen">
            <div className="max-w-6xl mx-auto text-center relative z-10 mb-24 opacity-0"></div>
        </section>
    );
  }

  return (
    <section className="relative pt-40 md:pt-52 px-6 container mx-auto flex flex-col items-center min-h-screen">
      
      <div className="max-w-5xl mx-auto text-center relative z-10 mb-20">
        <h1 className="flex flex-col items-center justify-center w-full mb-8 drop-shadow-sm dark:drop-shadow-2xl opacity-0 animate-fade-in-up" dir="rtl">
            <div className="flex flex-col items-center gpu-layer">
                <div className="block text-slate-900 dark:text-white mb-2 md:mb-4 text-4xl md:text-7xl font-black opacity-95 tracking-tight min-h-[1.2em] px-4 transition-all duration-300">
                    {slogan.line1}
                </div>
                <div className="block min-h-[1.3em] px-4">
                     <span className="inline-block leading-normal py-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 dark:from-indigo-300 dark:via-purple-200 dark:to-blue-300 text-4xl md:text-7xl font-black tracking-tight">
                        {slogan.line2}
                     </span>
                </div>
            </div>
        </h1>
        
        <div 
            className="gpu-layer transition-all duration-1000 ease-apple"
            style={{
                opacity: showSubtitle ? 1 : 0,
                transform: showSubtitle ? 'translate3d(0, 0, 0)' : 'translate3d(0, 40px, 0)'
            }}
        >
            <h2 className="text-xl md:text-2xl font-medium text-slate-600 dark:text-indigo-100/80 mb-8 tracking-wide max-w-3xl mx-auto leading-relaxed">
                {TEXTS.HERO.SUBTITLE}
            </h2>
            
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-12 leading-8 font-light">
                {TEXTS.HERO.DESC}
            </p>

            <div className="flex flex-col items-center gap-12">
                <GlassCard 
                    as="link"
                    to="/features"
                    className="rounded-full px-12 py-5 flex items-center justify-center group bg-white/80 dark:bg-white/10"
                    hoverEffect={true}
                >
                     <span className="relative text-slate-900 dark:text-white font-bold text-lg flex items-center gap-3">
                        {TEXTS.HERO.CTA_PRIMARY}
                        <ArrowLeft className="w-5 h-5 transition-transform duration-300 ease-out group-hover:-translate-x-1" />
                    </span>
                </GlassCard>

                <button
                    onClick={handleScrollDown}
                    className="p-4 rounded-full bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/40 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/10 animate-float cursor-pointer text-slate-400 dark:text-slate-500 hover:text-indigo-500 dark:hover:text-white physics-interactive"
                    aria-label="اسکرول به توضیحات"
                >
                    <ChevronDown className="w-6 h-6" />
                </button>
            </div>
        </div>
      </div>

      <div 
        id="about-section"
        className="w-full max-w-5xl mx-auto relative z-10 gpu-layer"
        style={{
            opacity: showSubtitle ? 1 : 0,
            transform: showSubtitle ? 'translate3d(0, 0, 0)' : 'translate3d(0, 60px, 0)',
            transition: 'opacity 1s ease-apple 0.3s, transform 1s ease-apple 0.3s'
        }}
      >
          <GlassCard className="rounded-[2.5rem] p-10 md:p-20 text-center" hoverEffect={false}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-indigo-400/50 dark:via-indigo-400/30 to-transparent" />
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-10 tracking-tight">
               {TEXTS.ABOUT.TITLE}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-9 md:leading-[3rem] text-lg md:text-2xl font-light text-justify md:text-center opacity-90 max-w-4xl mx-auto">
              {TEXTS.ABOUT.DESC}
            </p>
          </GlassCard>
      </div>

    </section>
  );
};
