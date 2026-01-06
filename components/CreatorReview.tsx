
'use client';

import React, { useState } from 'react';
import { TEXTS } from '../constants';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { GlassCard } from './GlassCard';

export const CreatorReview: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section className="container mx-auto px-6 md:px-12 relative z-10">
      <div className="max-w-4xl mx-auto">
        <GlassCard 
            as="link" 
            to="/about"
            className="rounded-[2.5rem] block bg-white/40 dark:bg-[#0f172a]/30" 
        >
            <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                
                <div className="relative shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 via-purple-500 to-blue-500 rounded-full blur-2xl opacity-20 group-hover:opacity-50 transition-opacity duration-700 ease-apple" />
                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/40 dark:border-white/10 shadow-xl group-hover:scale-105 transition-transform duration-700 ease-apple bg-slate-100 dark:bg-slate-800">
                        <img 
                            src={TEXTS.CREATOR_REVIEW.IMAGE} 
                            alt={TEXTS.CREATOR_REVIEW.AUTHOR}
                            className={`w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-apple ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                            loading="eager"
                            onLoad={() => setIsLoaded(true)}
                        />
                    </div>
                    <div className="absolute bottom-1 right-1 bg-white dark:bg-slate-900 p-2.5 rounded-full shadow-lg border border-white/50 dark:border-white/10 text-indigo-600 dark:text-indigo-400 z-10">
                        <Sparkles className="w-5 h-5" />
                    </div>
                </div>

                <div className="flex-1 text-center md:text-right">
                    <div className="flex flex-col md:flex-row items-center gap-4 mb-6 justify-center md:justify-start">
                         <h4 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                            {TEXTS.CREATOR_REVIEW.AUTHOR}
                        </h4>
                        <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-indigo-500/50" />
                        <span className="text-indigo-600 dark:text-indigo-300 font-bold text-sm tracking-widest uppercase">
                            {TEXTS.CREATOR_REVIEW.ROLE}
                        </span>
                    </div>

                    <div className="relative mb-8">
                        <p className="text-xl md:text-2xl leading-relaxed text-slate-700 dark:text-slate-200 font-light italic relative z-10 opacity-90">
                            "{TEXTS.CREATOR_REVIEW.QUOTE}"
                        </p>
                    </div>

                    <span className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-indigo-50 dark:bg-white/5 text-slate-900 dark:text-white font-bold text-sm border border-indigo-100 dark:border-white/10 group-hover:bg-indigo-600 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-900 transition-all duration-500 ease-apple">
                        درباره من
                        <ArrowLeft className="w-4 h-4 transition-transform duration-300 ease-out group-hover:-translate-x-1" />
                    </span>
                </div>
            </div>
        </GlassCard>
      </div>
    </section>
  );
};
