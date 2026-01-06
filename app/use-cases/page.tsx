
'use client';

import React from 'react';
import { api } from '../../services/dataService';
import { Code2, Microscope, PenTool, Briefcase, GraduationCap, TrendingUp, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ScrollReveal } from '../../components/ScrollReveal';

const ICONS = [Code2, Microscope, PenTool, Briefcase, GraduationCap, TrendingUp, ArrowLeft];

export default function UseCasesPage() {
  const cases = api.getUseCasesSync();

  return (
    <div className="container mx-auto px-6 pt-32 pb-20 relative z-10 min-h-screen">
      <ScrollReveal width="full">
        <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 drop-shadow-sm dark:drop-shadow-2xl transition-colors duration-500">
                موارد استفاده
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium transition-colors duration-500">
            چگونه Gemini 3 Pro صنایع مختلف را متحول می‌کند؟
            </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto pb-10">
        {cases.map((item, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            return (
                <ScrollReveal key={idx} delay={idx * 30} width="full" className="h-full">
                    <Link 
                    href={`/use-cases/${item.id}`}
                    className="group relative block w-full h-full transform-gpu backface-hidden transition-transform duration-[800ms] ease-apple hover:scale-[1.02] hover:-translate-y-2 z-0 hover:z-10"
                    >
                    <div className="relative p-8 rounded-[2.5rem] overflow-hidden border border-white/60 dark:border-white/5 bg-white/85 dark:bg-[#0f172a]/40 backdrop-blur-md transition-colors duration-[800ms] ease-apple hover:border-purple-300/50 dark:hover:border-purple-500/20">
                        
                        <div className="absolute inset-0 bg-white/95 dark:bg-[#0f172a]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-[800ms] ease-apple" />
                        
                        <div className="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-[800ms] ease-apple shadow-[0_25px_50px_-12px_rgba(147,51,234,0.15)] dark:shadow-[0_25px_50px_-12px_rgba(147,51,234,0.25)]" />

                        <div className="absolute -top-10 -left-10 w-80 h-80 bg-[radial-gradient(closest-side,rgba(147,51,234,0.15),transparent)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-[1000ms] ease-apple" />
                        
                        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
                            <div className="shrink-0 w-16 h-16 rounded-2xl bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center border border-purple-200 dark:border-purple-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-[700ms] ease-apple">
                                <Icon className="w-8 h-8 text-purple-600 dark:text-purple-300" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-[600ms]">
                                    {item.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 text-lg leading-8 font-medium opacity-90 transition-colors mb-4">
                                {item.desc}
                                </p>
                                <div className="inline-flex items-center gap-2 text-sm font-bold text-purple-600 dark:text-purple-300 transition-colors duration-300">
                                اطلاعات بیشتر
                                <ArrowLeft className="w-4 h-4 transition-transform duration-300 ease-out group-hover:-translate-x-1" />
                                </div>
                            </div>
                        </div>
                    </div>
                    </Link>
                </ScrollReveal>
            );
        })}
      </div>
    </div>
  );
}
