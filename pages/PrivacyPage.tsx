
import React, { useState } from 'react';
import { TEXTS } from '../constants';
import { Shield, Lock, Eye, Server, ArrowRight, Database, UserCheck, Key } from 'lucide-react';
import * as ReactRouterDOM from 'react-router-dom';
import { ScrollReveal } from '../components/ScrollReveal';

const { Link } = ReactRouterDOM as any;

const ICONS = [Database, Eye, Lock, UserCheck, Server, Key];

export const PrivacyPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<number | null>(0);

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[80vh] bg-gradient-to-b from-emerald-50/50 via-white/20 to-transparent dark:from-emerald-900/10 dark:via-[#020617]/80 dark:to-transparent pointer-events-none -z-10" />
      
      <div className="container mx-auto px-6 max-w-5xl">
        <ScrollReveal width="full">
            <div className="mb-10">
                <Link 
                    to="/" 
                    className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-sm font-bold group"
                >
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                    بازگشت به خانه
                </Link>
            </div>
        </ScrollReveal>

        <ScrollReveal width="full">
            <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-6 shadow-lg shadow-emerald-500/20">
                    <Shield className="w-8 h-8" />
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
                    {TEXTS.LEGAL.PRIVACY.TITLE}
                </h1>
                <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-8">
                    {TEXTS.LEGAL.PRIVACY.LAST_UPDATED}
                </p>
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium">
                    {TEXTS.LEGAL.PRIVACY.INTRO}
                </p>
            </div>
        </ScrollReveal>

        <div className="grid gap-6">
            {TEXTS.LEGAL.PRIVACY.SECTIONS.map((section, idx) => {
                const Icon = ICONS[idx % ICONS.length];
                const isActive = activeSection === idx;

                return (
                    <ScrollReveal key={idx} width="full" delay={idx * 50}>
                        <div 
                            className={`group relative p-8 rounded-[2rem] border transition-all duration-500 ease-apple cursor-pointer overflow-hidden ${
                                isActive 
                                ? 'bg-white dark:bg-[#1e293b]/60 border-emerald-500 dark:border-emerald-500/50 shadow-xl shadow-emerald-500/10' 
                                : 'bg-white/60 dark:bg-[#0f172a]/40 border-slate-200 dark:border-white/5 hover:border-emerald-300 dark:hover:border-emerald-500/30'
                            }`}
                            onClick={() => setActiveSection(isActive ? null : idx)}
                        >
                            <div className="flex items-start gap-6">
                                <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-500 ${
                                    isActive 
                                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' 
                                    : 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                }`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                                        isActive ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-400'
                                    }`}>
                                        {section.title}
                                    </h3>
                                    <div className={`grid transition-all duration-500 ease-apple ${
                                        isActive ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-60'
                                    }`}>
                                        <div className="overflow-hidden">
                                            <p className="text-slate-600 dark:text-slate-400 leading-8 text-justify">
                                                {section.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                );
            })}
        </div>

        <div className="mt-16 p-8 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-center">
            <p className="text-slate-600 dark:text-slate-400 mb-4 font-medium">
                سوالی درباره حریم خصوصی دارید؟
            </p>
            <a href="mailto:privacy@godex.ai" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline text-lg">
                privacy@godex.ai
            </a>
        </div>
      </div>
    </div>
  );
};
