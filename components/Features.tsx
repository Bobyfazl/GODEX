
'use client';

import React, { useEffect, useState } from 'react';
import { BrainCircuit, Layers, Maximize2, ArrowLeft, Shield, Zap, Code2, Layout, Activity } from 'lucide-react';
import { TEXTS } from '../constants';
import { api } from '../services/dataService';
import { FeatureItem } from '../types';
import { ScrollReveal } from './ScrollReveal';
import { GlassCard } from './GlassCard';

// Extended icon set to handle more items including new ones (Layout for UI, Activity for Bio)
const ICONS = [Layout, Activity, Maximize2, BrainCircuit, Layers, Shield, Zap, Code2];

export const Features: React.FC = () => {
  const [features, setFeatures] = useState<FeatureItem[]>([]);

  useEffect(() => {
    const data = api.getFeaturesSync ? api.getFeaturesSync() : [];
    // Show only 3 items on the main page as requested
    if(data.length) setFeatures(data.slice(0, 3));
    else api.getFeatures().then(d => setFeatures(d.slice(0, 3)));
  }, []);

  return (
    <section id="features" className="container mx-auto px-6 md:px-12 relative z-10">
      <div className="text-center mb-20 md:mb-24">
        <ScrollReveal width="full">
            <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 dark:from-indigo-300 dark:via-purple-200 dark:to-blue-300 mb-6 tracking-tight pb-2">
                {TEXTS.FEATURES.TITLE}
            </h2>
            <p className="text-slate-600 dark:text-indigo-200/60 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                {TEXTS.FEATURES.SUBTITLE}
            </p>
        </ScrollReveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            return (
                <ScrollReveal key={idx} delay={idx * 100} className="h-full">
                    <GlassCard 
                        as="link" 
                        to={`/features/${feature.id}`} 
                        gradientColor="blue"
                        className="rounded-[2.5rem] h-full p-8 md:p-10 flex flex-col items-center text-center"
                    >
                        <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-white to-blue-50 dark:from-white/10 dark:to-white/5 border border-white/60 dark:border-white/10 flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-[1000ms] ease-apple">
                            <Icon className="w-8 h-8 text-indigo-600 dark:text-indigo-300 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors duration-700" />
                        </div>
                        
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-200 transition-colors duration-700">
                            {feature.title}
                        </h3>
                        
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base font-medium opacity-90 mb-8 flex-grow group-hover:text-slate-900 dark:group-hover:text-slate-300 transition-colors duration-700">
                            {feature.desc}
                        </p>

                        <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-300 font-bold text-sm mt-auto group-hover:text-blue-600 dark:group-hover:text-blue-200 transition-colors duration-300">
                            مشاهده جزئیات
                            <ArrowLeft className="w-4 h-4 transition-transform duration-300 ease-out group-hover:-translate-x-1" />
                        </div>
                    </GlassCard>
                </ScrollReveal>
            );
        })}
      </div>
    </section>
  );
};
