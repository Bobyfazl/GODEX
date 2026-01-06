
'use client';

import React from 'react';
import { TEXTS } from '../constants';
import { ArrowLeft } from 'lucide-react';
import { GlassCard } from './GlassCard';
import * as ReactRouterDOM from 'react-router-dom';

// Import Link from react-router-dom to handle client-side routing properly
const { Link } = ReactRouterDOM as any;

export const Footer: React.FC = () => {
  return (
    <footer className="container mx-auto px-6 mt-20 md:mt-32 mb-12 relative z-10">
      
      <GlassCard className="rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-24 text-center" hoverEffect={false}>
        <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-indigo-500/10 dark:bg-indigo-600/20 blur-[150px] rounded-full animate-pulse z-0 pointer-events-none" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-blue-500/10 dark:bg-blue-600/20 blur-[130px] rounded-full z-0 pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 md:mb-8 tracking-tight drop-shadow-sm leading-tight">
            {TEXTS.FOOTER.MAIN_CTA_TITLE}
          </h2>
          <p className="text-slate-600 dark:text-indigo-100/80 mb-8 md:mb-12 text-base md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
            {TEXTS.FOOTER.MAIN_CTA_DESC}
          </p>
          <a 
            href="https://gemini.google.com/app"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 md:px-12 md:py-5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-indigo-600 dark:hover:bg-indigo-50 font-bold text-base md:text-lg shadow-xl shadow-slate-900/10 dark:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-500 ease-apple hover:scale-105 inline-flex items-center justify-center gap-3 md:gap-4 mx-auto gpu-layer group whitespace-nowrap"
          >
            {TEXTS.FOOTER.BUTTON}
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 ease-out group-hover:-translate-x-1" />
          </a>
        </div>
      </GlassCard>

      <div className="py-8 md:py-12 border-t border-slate-200 dark:border-white/5 mt-16 md:mt-24 flex flex-col-reverse md:flex-row justify-between items-center gap-6 text-slate-500 dark:text-slate-400 text-xs md:text-sm font-medium tracking-wide text-center md:text-right">
        <p>{TEXTS.FOOTER.COPYRIGHT}</p>
        <div className="flex gap-8">
            <Link 
                to="/privacy" 
                className="hover:text-indigo-600 dark:hover:text-white transition-colors duration-300 physics-interactive"
            >
                حریم خصوصی
            </Link>
            <Link 
                to="/terms" 
                className="hover:text-indigo-600 dark:hover:text-white transition-colors duration-300 physics-interactive"
            >
                شرایط استفاده
            </Link>
        </div>
      </div>
    </footer>
  );
};
