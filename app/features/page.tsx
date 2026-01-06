
'use client';

import React from 'react';
import { api } from '../../services/dataService';
import { BrainCircuit, Layers, Maximize2, Shield, Zap, Code2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ScrollReveal } from '../../components/ScrollReveal';

const ICONS = [Maximize2, BrainCircuit, Layers, Shield, Zap, Code2];

export default function FeaturesPage() {
  const features = api.getFeaturesSync();

  return (
    <div className="container mx-auto px-6 pt-32 pb-20 relative z-10 min-h-screen">
      <ScrollReveal width="full">
        <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 drop-shadow-sm dark:drop-shadow-2xl transition-colors duration-500">
                ویژگی‌های پیشرفته
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium transition-colors duration-500">
            بررسی عمیق معماری، قابلیت‌های تکنیکال و قدرت پردازشی Gemini 3 Pro
            </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
        {features.map((feature, idx) => {
          const Icon = ICONS[idx % ICONS.length];
          return (
            <ScrollReveal key={idx} delay={idx * 30} className="h-full">
                <Link 
                href={`/features/${feature.id}`}
                className="group relative block h-full transform-gpu backface-hidden transition-transform duration-[800ms] ease-apple hover:scale-[1.03] hover:-translate-y-2 z-0 hover:z-10"
                >
                <div className="relative h-full p-8 md:p-10 rounded-[2rem] overflow-hidden border border-white/60 dark:border-white/5 transition-colors duration-[800ms] ease-apple hover:border-blue-200/50 dark:hover:border-blue-500/20">
                    
                    <div className="absolute inset-0 bg-white/85 dark:bg-[#0f172a]/40 backdrop-blur-md transition-opacity duration-[800ms] ease-apple" />
                    <div className="absolute inset-0 bg-white/95 dark:bg-[#0f172a]/60 backdrop-blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-[800ms] ease-apple" />
                    
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[800ms] ease-apple shadow-[0_25px_50px_-12px_rgba(59,130,246,0.2)] dark:shadow-[0_25px_50px_-12px_rgba(59,130,246,0.15)] rounded-[2rem]" />

                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-[radial-gradient(closest-side,rgba(59,130,246,0.15),transparent)] dark:bg-[radial-gradient(closest-side,rgba(59,130,246,0.18),transparent)] opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-110 transition-all duration-[1000ms] ease-apple pointer-events-none" />

                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-start justify-between mb-6">
                            <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-white to-blue-50 dark:from-white/10 dark:to-white/0 border border-white dark:border-white/10 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-[600ms] ease-apple">
                                <Icon className="w-7 h-7 text-blue-600 dark:text-blue-300 drop-shadow-sm" />
                            </div>
                            <div className="w-8 h-8 rounded-full border border-blue-100 dark:border-white/10 flex items-center justify-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-[600ms] ease-apple delay-75">
                                <ArrowLeft className="w-4 h-4 text-blue-500 dark:text-white" />
                            </div>
                        </div>
                        
                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-700 dark:group-hover:text-blue-200 transition-colors duration-[500ms]">
                            {feature.title}
                        </h3>
                        
                        <p className="text-slate-600 dark:text-slate-400 leading-7 text-sm font-medium opacity-90 transition-colors duration-[500ms] flex-grow">
                        {feature.desc}
                        </p>

                        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                        <span className="text-sm font-bold text-blue-600 dark:text-blue-300 flex items-center gap-2 transition-colors duration-300 group-hover:text-blue-700 dark:group-hover:text-blue-200">
                            مشاهده جزئیات
                            <ArrowLeft className="w-4 h-4 transition-transform duration-300 ease-out group-hover:-translate-x-1" />
                        </span>
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
