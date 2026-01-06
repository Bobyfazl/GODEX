
import React from 'react';
import { TEXTS } from '../constants';
import { FileText, CheckCircle, AlertTriangle, Scale, Copyright, Ban, ArrowRight, Gavel } from 'lucide-react';
import * as ReactRouterDOM from 'react-router-dom';
import { ScrollReveal } from '../components/ScrollReveal';

const { Link } = ReactRouterDOM as any;

const ICONS = [CheckCircle, Ban, Copyright, AlertTriangle, Scale, Gavel];

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[80vh] bg-gradient-to-b from-indigo-50/50 via-white/20 to-transparent dark:from-indigo-900/10 dark:via-[#020617]/80 dark:to-transparent pointer-events-none -z-10" />
      
      <div className="container mx-auto px-6 max-w-5xl">
        <ScrollReveal width="full">
            <div className="mb-10">
                <Link 
                    to="/" 
                    className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm font-bold group"
                >
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                    بازگشت به خانه
                </Link>
            </div>
        </ScrollReveal>

        <ScrollReveal width="full">
            <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mb-6 shadow-lg shadow-indigo-500/20">
                    <FileText className="w-8 h-8" />
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
                    {TEXTS.LEGAL.TERMS.TITLE}
                </h1>
                <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-8">
                    {TEXTS.LEGAL.TERMS.LAST_UPDATED}
                </p>
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium">
                    {TEXTS.LEGAL.TERMS.INTRO}
                </p>
            </div>
        </ScrollReveal>

        <div className="grid gap-8">
            {TEXTS.LEGAL.TERMS.SECTIONS.map((section, idx) => {
                const Icon = ICONS[idx % ICONS.length];
                return (
                    <ScrollReveal key={idx} width="full" delay={idx * 50}>
                        <div className="flex gap-6 md:gap-8 p-8 rounded-[2rem] bg-white/60 dark:bg-[#0f172a]/40 border border-slate-200 dark:border-white/5 hover:bg-white dark:hover:bg-[#1e293b]/60 transition-colors duration-500">
                            <div className="shrink-0 hidden md:flex w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 items-center justify-center">
                                <Icon className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="flex items-center gap-3 text-xl font-bold text-slate-900 dark:text-white mb-4">
                                    <span className="md:hidden text-indigo-600 dark:text-indigo-400"><Icon className="w-6 h-6" /></span>
                                    {section.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-8 text-justify font-medium">
                                    {section.content}
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>
                );
            })}
        </div>

        <div className="mt-16 text-center">
             <p className="text-slate-500 dark:text-slate-400 text-sm leading-7 max-w-2xl mx-auto">
                ما تمام تلاش خود را می‌کنیم تا محیطی امن و شفاف برای کاربران فراهم کنیم. اگر احساس می‌کنید حقوق شما در این پلتفرم نقض شده است، لطفاً با تیم حقوقی ما تماس بگیرید.
             </p>
        </div>
      </div>
    </div>
  );
};
