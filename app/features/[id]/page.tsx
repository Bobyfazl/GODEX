'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '../../../services/dataService';
import { ArrowRight, CheckCircle, Fingerprint, Cpu, FileText, Share2 } from 'lucide-react';
import Link from 'next/link';

const FeatureTitle = ({ title }: { title: string }) => {
  const parts = title.match(/^(.*?)\s*\((.*?)\)$/);

  if (parts) {
    const persianPart = parts[1].trim();
    const englishPart = parts[2].trim();

    return (
      <div className="flex flex-col items-start gap-1 mb-8 w-full">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.3] tracking-tight break-words w-full">
          {persianPart}
        </h1>
        <div 
          dir="ltr" 
          className="flex items-center gap-3 text-lg md:text-2xl font-bold text-blue-600 dark:text-blue-300 font-sans tracking-wide opacity-90 mt-1"
        >
           <span className="h-px w-8 bg-blue-600/50 dark:bg-blue-300/50 hidden md:block rounded-full"></span>
           <span>{englishPart}</span>
        </div>
      </div>
    );
  }

  return (
    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-8 leading-[1.4] tracking-tight drop-shadow-sm break-words">
        {title}
    </h1>
  );
};

export default function FeatureDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const feature = id ? api.getFeatureByIdSync(id) : null;
  const [showToast, setShowToast] = React.useState(false);
  const router = useRouter();

  if (!feature) {
    if (typeof window !== 'undefined') router.replace('/features');
    return null;
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
    <div className="relative min-h-screen pt-32 pb-24 animate-fade-in-up">
      <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-blue-50/50 via-white/20 to-transparent dark:from-blue-900/10 dark:via-[#020617]/50 dark:to-transparent pointer-events-none -z-10" />
      
      <div className="container mx-auto px-6">
        
        <div className="mb-10">
          <Link 
            href="/features" 
            className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors text-sm font-bold group"
          >
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            بازگشت به لیست ویژگی‌ها
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-20">
            <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-200 text-sm font-bold mb-6 border border-blue-200/50 dark:border-blue-400/10 backdrop-blur-sm">
                    <Cpu className="w-4 h-4" />
                    <span>تکنولوژی نسل ۳</span>
                </div>
                
                <FeatureTitle title={feature.title} />
                
                <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                    {feature.intro}
                </p>
            </div>
            
            <div className="lg:col-span-4 flex lg:justify-end">
                 <button 
                    onClick={handleShare}
                    className="w-14 h-14 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center physics-interactive hover:scale-110 text-slate-600 dark:text-white shadow-lg hover:shadow-blue-500/20 group relative"
                    aria-label="کپی لینک"
                 >
                    <Share2 className="w-6 h-6" />
                 </button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            <div className="lg:col-span-7">
                <div className="p-8 md:p-10 rounded-[2.5rem] bg-white/60 dark:bg-[#0f172a]/40 backdrop-blur-xl border border-white/60 dark:border-white/5 shadow-sm transform-gpu backface-hidden">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                        <FileText className="w-6 h-6 text-blue-500" />
                        کاربردها و مزایا
                    </h3>
                    
                    <div className="grid gap-4">
                        {feature.benefits?.map((benefit, i) => (
                            <div 
                                key={i} 
                                className="group flex items-start gap-5 p-5 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:border-blue-200 dark:hover:border-blue-500/30 transition-all duration-300"
                            >
                                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                                </div>
                                <span className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                                    {benefit}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="lg:col-span-5">
                <div className="sticky top-32">
                    <div className="relative p-8 rounded-[2.5rem] bg-white/80 dark:bg-[#1e293b]/60 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] dark:shadow-2xl overflow-hidden group transition-colors duration-500 transform-gpu backface-hidden">
                        
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500" />
                        
                        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.15] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none transition-opacity duration-500" />
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/10 dark:bg-blue-500/30 blur-[80px] rounded-full group-hover:scale-125 transition-transform duration-700" />

                        <div className="relative z-10">
                            <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-slate-900 dark:text-white transition-colors duration-300">
                                <Fingerprint className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                مشخصات فنی
                            </h3>

                            <div className="space-y-6">
                                {feature.specs && Object.entries(feature.specs).map(([key, value], i) => (
                                    <div key={i} className="flex flex-col gap-2 pb-5 border-b border-slate-100 dark:border-white/5 last:border-0 last:pb-0 transition-colors duration-300">
                                        <span className="text-slate-500 dark:text-slate-400 text-sm font-bold tracking-wide uppercase transition-colors duration-300">{key}</span>
                                        <span className="text-slate-900 dark:text-blue-100 font-mono text-lg dir-ltr text-right drop-shadow-sm font-bold transition-colors duration-300">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
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
}