
import React from 'react';
// Fix: Cast react-router-dom imports to avoid type errors
import * as ReactRouterDOM from 'react-router-dom';
const { useParams, Link, Navigate } = ReactRouterDOM as any;

import { api } from '../services/dataService';
import { ArrowRight, CheckCircle, Rocket, TrendingUp, Layers, Share2, AlertTriangle, Lightbulb } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';

export const UseCaseDetailPage: React.FC = () => {
  const { id } = useParams();
  // Sync fetch: Instant render
  const useCase = id ? api.getUseCaseByIdSync(id) : null;
  const [showToast, setShowToast] = React.useState(false);

  if (!useCase) {
      return <Navigate to="/use-cases" replace />;
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000); 
    } catch (err) {
      console.error('Failed to copy link', err);
    }
  };

  return (
    <div className="relative min-h-screen pt-32 pb-24">
      <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-purple-50/50 via-white/20 to-transparent dark:from-purple-900/10 dark:via-[#020617]/50 dark:to-transparent pointer-events-none -z-10" />
      
      <div className="container mx-auto px-6 max-w-7xl">
        
        <ScrollReveal width="full">
            <div className="mb-10">
            <Link 
                to="/use-cases" 
                className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-white transition-colors text-sm font-bold group"
            >
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                بازگشت به موارد استفاده
            </Link>
            </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-20">
            <div className="lg:col-span-8">
                <ScrollReveal width="full">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100/50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-200 text-sm font-bold mb-6 border border-purple-200/50 dark:border-purple-400/10 backdrop-blur-sm">
                        <Rocket className="w-4 h-4" />
                        <span>راهکار صنعتی</span>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white mb-8 leading-tight tracking-tight drop-shadow-sm">
                        {useCase.title}
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-200 leading-relaxed font-medium mb-12">
                        {useCase.intro}
                    </p>

                     <div className="space-y-8">
                        {useCase.comprehensiveAnalysis?.map((paragraph, index) => (
                            <p key={index} className="text-lg leading-9 text-slate-600 dark:text-slate-400 text-justify">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </ScrollReveal>
            </div>
             
            <div className="lg:col-span-4 flex flex-col items-end gap-8">
                 <ScrollReveal width="auto">
                    <button 
                        onClick={handleShare}
                        className="w-14 h-14 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center physics-interactive hover:scale-110 text-slate-600 dark:text-white shadow-lg hover:shadow-purple-500/20"
                        aria-label="کپی لینک"
                    >
                        <Share2 className="w-6 h-6" />
                    </button>
                 </ScrollReveal>

                 {useCase.challengesAndSolutions && (
                    <ScrollReveal width="full">
                        <div className="w-full space-y-4">
                            {useCase.challengesAndSolutions.map((item, idx) => (
                                <div key={idx} className="p-5 rounded-2xl bg-white/60 dark:bg-[#1e293b]/40 border border-slate-200 dark:border-white/5 backdrop-blur-sm">
                                    <div className="flex items-start gap-3 mb-2">
                                        <AlertTriangle className="w-4 h-4 text-orange-500 mt-1 shrink-0" />
                                        <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">{item.challenge}</p>
                                    </div>
                                    <div className="flex items-start gap-3 pl-2 border-r-2 border-purple-500 pr-3 mr-1">
                                         <p className="text-slate-600 dark:text-slate-400 text-xs leading-5">{item.solution}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                 )}
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-20">
            
            <div className="lg:col-span-7 space-y-8">
                
                <ScrollReveal width="full">
                    <div className="p-8 md:p-10 rounded-[2.5rem] bg-white/60 dark:bg-[#0f172a]/40 backdrop-blur-xl border border-white/60 dark:border-white/5 shadow-sm transform-gpu backface-hidden">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                            <TrendingUp className="w-6 h-6 text-purple-500" />
                            مزایای استراتژیک
                        </h3>
                        <div className="grid gap-4">
                            {useCase.benefits?.map((benefit, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="w-2 h-2 rounded-full bg-purple-500 mt-2.5 shrink-0" />
                                    <span className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                                        {benefit}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>

                {useCase.implementationSteps && (
                  <ScrollReveal width="full">
                      <div className="p-8 md:p-10 rounded-[2.5rem] bg-white/40 dark:bg-[#0f172a]/20 backdrop-blur-md border border-white/40 dark:border-white/5 transform-gpu backface-hidden">
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                              <Layers className="w-6 h-6 text-purple-500" />
                              نقشه راه پیاده‌سازی
                          </h3>
                          <div className="space-y-6 relative">
                              <div className="absolute top-4 right-[19px] bottom-4 w-0.5 bg-slate-200 dark:bg-white/10" />
                              
                              {useCase.implementationSteps.map((step, i) => (
                                  <div key={i} className="relative flex items-center gap-6">
                                      <div className="relative z-10 w-10 h-10 rounded-full bg-white dark:bg-slate-800 border-2 border-purple-500 flex items-center justify-center font-bold text-purple-600 dark:text-purple-400 shrink-0 shadow-lg">
                                          {i + 1}
                                      </div>
                                      <div className="p-4 rounded-2xl bg-white/50 dark:bg-white/5 border border-white/50 dark:border-white/5 flex-1 hover:bg-white/80 dark:hover:bg-white/10 transition-colors duration-300">
                                          <span className="text-slate-700 dark:text-slate-200 font-medium">{step}</span>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </div>
                  </ScrollReveal>
                )}
            </div>

            <div className="lg:col-span-5">
                <div className="sticky top-32">
                    <ScrollReveal width="full">
                        <div className="relative p-8 rounded-[2.5rem] bg-gradient-to-br from-purple-600 to-indigo-700 dark:from-purple-900/80 dark:to-indigo-900/80 backdrop-blur-xl text-white shadow-2xl overflow-hidden transform-gpu backface-hidden">
                            
                            <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
                            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />

                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-white/90">
                                    <TrendingUp className="w-6 h-6" />
                                    تأثیرات کمی (ROI)
                                </h3>

                                <div className="grid grid-cols-1 gap-6">
                                    {useCase.impactStats && Object.entries(useCase.impactStats).map(([key, value], i) => (
                                        <div key={i} className="bg-white/10 rounded-2xl p-5 border border-white/10 backdrop-blur-sm">
                                            <p className="text-blue-100/80 text-sm font-bold mb-2">{key}</p>
                                            <p className="text-3xl font-black tracking-tight">{value}</p>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="mt-8 pt-6 border-t border-white/20">
                                    <p className="text-sm text-white/70 leading-relaxed">
                                        * آمار فوق بر اساس میانگین نتایج پروژه‌های پایلوت سازمانی (Enterprise Beta) در بازه زمانی ۳ ماهه استخراج شده است.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </div>

        <div 
            className={`fixed top-32 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) transform ${
                showToast 
                ? 'translate-y-0 opacity-100 scale-100' 
                : '-translate-y-4 opacity-0 scale-95 pointer-events-none'
            }`}
        >
             <div className="flex items-center gap-4 px-6 py-3.5 rounded-full bg-white/60 dark:bg-slate-900/70 backdrop-blur-2xl border border-white/60 dark:border-white/20 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)] ring-1 ring-white/50 dark:ring-white/20">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-emerald-400 to-green-500 flex items-center justify-center shadow-lg shadow-green-500/40">
                   <CheckCircle className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                </div>
                <span className="text-slate-800 dark:text-white font-bold text-sm tracking-wide">لینک کپی شد</span>
             </div>
        </div>

      </div>
    </div>
  );
};
