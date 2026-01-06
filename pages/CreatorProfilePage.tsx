
import React, { useState } from 'react';
import { TEXTS } from '../constants';
import { ArrowRight, Quote, Linkedin, Github, Mail, Globe, Sparkles, Cpu } from 'lucide-react';
// Fix: Cast react-router-dom imports to avoid type errors
import * as ReactRouterDOM from 'react-router-dom';
import { ScrollReveal } from '../components/ScrollReveal';
const { Link } = ReactRouterDOM as any;

export const CreatorProfilePage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[80vh] bg-gradient-to-b from-blue-50/50 via-white/20 to-transparent dark:from-[#0f172a] dark:via-[#020617]/80 dark:to-transparent pointer-events-none -z-10" />
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-600/5 rounded-full blur-[120px] -z-10" />
      
      <div className="container mx-auto px-6">
        
        <ScrollReveal width="full">
            <div className="mb-10">
            <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors text-sm font-bold group"
            >
                <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                بازگشت به خانه
            </Link>
            </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <div className="lg:col-span-5">
                <ScrollReveal width="full" className="h-full">
                    <div className="flex flex-col h-full min-h-[500px] rounded-[2.5rem] bg-white/70 dark:bg-[#0f172a]/40 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-[0_20px_40px_-10px_rgba(59,130,246,0.15)] dark:shadow-none overflow-hidden hover:shadow-[0_30px_60px_-15px_rgba(59,130,246,0.25)] transition-all duration-500 group transform-gpu backface-hidden">
                        
                        <div className="relative w-full h-[350px] lg:h-[60%] shrink-0 overflow-hidden">
                            <img 
                                src={TEXTS.CREATOR_REVIEW.IMAGE}
                                alt="Araz Arghandehpour - GODEX Creator"
                                className={`w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                                loading="lazy"
                                decoding="async"
                                onLoad={() => setIsLoaded(true)}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent dark:from-[#0f172a]/60 dark:via-transparent dark:to-transparent" />
                        </div>
                        
                        <div className="relative flex-1 p-8 flex flex-col justify-center bg-white/40 dark:bg-white/5 backdrop-blur-md border-t border-white/50 dark:border-white/5">
                            
                            <div className="inline-flex self-start items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 dark:bg-blue-500/20 border border-blue-200 dark:border-blue-400/20 text-xs font-bold mb-4 text-blue-700 dark:text-blue-200">
                                <Sparkles className="w-3 h-3" />
                                <span>بنیان‌گذار</span>
                            </div>

                            <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                                {TEXTS.CREATOR.PROFILE.NAME}
                            </h1>
                            
                            <p className="text-slate-600 dark:text-blue-200/80 font-bold text-sm tracking-widest uppercase mb-8">
                                {TEXTS.CREATOR.PROFILE.ROLE}
                            </p>
                            
                            <div className="flex items-center gap-3 mt-auto">
                                {[
                                    { icon: Linkedin, href: "#" },
                                    { icon: Github, href: "#" },
                                    { icon: Mail, href: "#" },
                                    { icon: Globe, href: "#" }
                                ].map((social, idx) => (
                                    <a 
                                        key={idx}
                                        href={social.href}
                                        className="w-10 h-10 rounded-full bg-white dark:bg-white/10 hover:bg-blue-600 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 border border-slate-200 dark:border-white/10 flex items-center justify-center physics-interactive text-slate-600 dark:text-white"
                                    >
                                        <social.icon className="w-5 h-5" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>

            <div className="lg:col-span-7 flex flex-col">
                <ScrollReveal width="full" className="h-full">
                    <div className="h-full p-8 md:p-12 rounded-[2.5rem] bg-white/70 dark:bg-[#0f172a]/40 backdrop-blur-xl border border-white/60 dark:border-white/5 shadow-[0_10px_40px_-10px_rgba(59,130,246,0.1)] dark:shadow-none hover:bg-white/80 dark:hover:bg-[#0f172a]/60 transition-all duration-500 transform-gpu backface-hidden">
                        
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-200 text-sm font-bold mb-8 border border-blue-200/50 dark:border-blue-400/10 backdrop-blur-sm">
                            <Cpu className="w-4 h-4" />
                            <span>{TEXTS.CREATOR.PROFILE.BIO_TITLE}</span>
                        </div>

                        <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-6 leading-tight drop-shadow-sm">
                            طراحی آینده، یک خط کد در هر زمان
                        </h2>

                        <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-8 md:leading-9 font-medium text-justify mb-8 opacity-90">
                            {TEXTS.CREATOR.PROFILE.BIO_DESC}
                        </p>

                        <div className="mt-auto pt-8 border-t border-slate-200/60 dark:border-white/5 grid grid-cols-3 gap-2 md:gap-4 text-center">
                                <div>
                                <p className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-1">{TEXTS.CREATOR.PROFILE.STATS.EXPERIENCE}</p>
                                <p className="text-[10px] md:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">سابقه</p>
                                </div>
                                <div className="border-x border-slate-200/60 dark:border-white/5">
                                <p className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-1">{TEXTS.CREATOR.PROFILE.STATS.PROJECTS}</p>
                                <p className="text-[10px] md:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">پروژه</p>
                                </div>
                                <div>
                                <p className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-1">{TEXTS.CREATOR.PROFILE.STATS.IMPACT}</p>
                                <p className="text-[10px] md:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">تاثیر</p>
                                </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>

            <div className="lg:col-span-12 mt-4">
                <ScrollReveal width="full">
                    <div className="relative p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-white/80 to-blue-50/50 dark:from-[#1e293b]/60 dark:to-[#0f172a]/60 backdrop-blur-xl border border-white/60 dark:border-white/5 shadow-lg overflow-hidden group transform-gpu backface-hidden">
                        
                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[80px] -z-10 group-hover:bg-blue-500/10 transition-colors duration-700" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[60px] -z-10" />

                        <div className="flex flex-col lg:flex-row gap-12 items-center">
                            <div className="lg:w-2/3">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
                                        <Globe className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                                        {TEXTS.CREATOR.PROFILE.VISION_TITLE}
                                    </h3>
                                </div>
                                
                                <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-8 md:leading-9 font-medium text-justify mb-8">
                                    {TEXTS.CREATOR.PROFILE.VISION_DESC}
                                </p>
                                
                                <Link 
                                    to="/use-cases"
                                    className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-300 font-bold transition-colors duration-300"
                                >
                                    مشاهده کاربردهای عملی
                                    <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                                </Link>
                            </div>

                            <div className="lg:w-1/3 w-full">
                                <div className="relative p-8 rounded-3xl bg-white/50 dark:bg-black/20 border border-white/50 dark:border-white/5 backdrop-blur-sm">
                                    <Quote className="absolute -top-4 -right-2 w-10 h-10 text-blue-500/20 dark:text-white/10 rotate-180 fill-current" />
                                    <p className="text-lg md:text-xl font-serif italic text-slate-800 dark:text-slate-200 relative z-10 text-center leading-relaxed">
                                        "{TEXTS.CREATOR.PROFILE.QUOTE}"
                                    </p>
                                    <div className="mt-4 flex justify-center">
                                        <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-50" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>

        </div>
      </div>
    </div>
  );
};
