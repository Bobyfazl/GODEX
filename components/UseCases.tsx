
'use client';

import React, { useEffect, useState } from 'react';
import { Code2, Microscope, PenTool, Briefcase, GraduationCap, TrendingUp, ShieldCheck, Database, ArrowLeft } from 'lucide-react';
import { TEXTS } from '../constants';
import { api } from '../services/dataService';
import { UseCaseItem } from '../types';
import { ScrollReveal } from './ScrollReveal';
import { GlassCard } from './GlassCard';

// Extended icon set
const ICONS = [Code2, Microscope, PenTool, Briefcase, GraduationCap, TrendingUp, ShieldCheck, Database];

export const UseCases: React.FC = () => {
  const [cases, setCases] = useState<UseCaseItem[]>([]);

  useEffect(() => {
    const data = api.getUseCasesSync ? api.getUseCasesSync() : [];
    // Doubled the slice from 4 to 8
    if(data.length) setCases(data.slice(0, 8));
    else api.getUseCases().then(d => setCases(d.slice(0, 8)));
  }, []);

  return (
    <section className="container mx-auto px-6 md:px-12 relative z-10">
      <div className="text-center mb-20 md:mb-24">
        <ScrollReveal width="full">
            <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 dark:from-indigo-300 dark:via-purple-200 dark:to-blue-300 mb-6 tracking-tight pb-2">
                {TEXTS.USE_CASES.TITLE}
            </h2>
            <p className="text-slate-600 dark:text-indigo-200/60 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                {TEXTS.USE_CASES.SUBTITLE}
            </p>
        </ScrollReveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {cases.map((useCase, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            return (
                <ScrollReveal key={idx} delay={idx * 100} className="h-full">
                    <GlassCard 
                        as="link"
                        to={`/use-cases/${useCase.id}`}
                        gradientColor="purple"
                        className="rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row items-center md:items-start gap-8 h-full"
                    >
                        <div className="shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-white to-purple-50 dark:from-white/10 dark:to-white/5 border border-white/60 dark:border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-[1000ms] ease-apple shadow-sm">
                            <Icon className="w-8 h-8 text-purple-600 dark:text-purple-300 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-300 transition-colors duration-700" />
                        </div>
                        
                        <div className="text-center md:text-right flex-1 w-full">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors duration-700">
                                {useCase.title}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 text-base leading-7 font-medium opacity-90 mb-6 group-hover:text-slate-900 dark:group-hover:text-slate-300 transition-colors duration-700">
                                {useCase.desc}
                            </p>
                            
                            <span className="inline-flex items-center gap-2 text-sm font-bold text-purple-600 dark:text-purple-300 transition-colors duration-300 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-300">
                                بیشتر بخوانید
                                <ArrowLeft className="w-4 h-4 transition-transform duration-300 ease-out group-hover:-translate-x-1" />
                            </span>
                        </div>
                    </GlassCard>
                </ScrollReveal>
            );
        })}
      </div>
    </section>
  );
};
