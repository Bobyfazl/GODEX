
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { api } from '../services/dataService';
import { ArrowRight, CheckCircle, Shield, Zap, Crown, HelpCircle } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';

const { useParams, Link, Navigate } = ReactRouterDOM as any;

export const PlanDetailPage: React.FC = () => {
  const { id } = useParams();
  const plan = id ? api.getPlanById(id) : null;

  if (!plan) {
    return <Navigate to="/" replace />;
  }

  const Icon = plan.id === 'pro' ? Crown : plan.id === 'enterprise' ? Shield : Zap;
  const gradientClass = plan.id === 'pro' 
    ? 'from-purple-600 to-indigo-600' 
    : plan.id === 'enterprise' 
      ? 'from-blue-600 to-cyan-600' 
      : 'from-slate-600 to-gray-600';

  const bgClass = plan.id === 'pro' 
    ? 'bg-purple-50 dark:bg-purple-900/10 border-purple-200 dark:border-purple-500/20' 
    : plan.id === 'enterprise'
      ? 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-500/20'
      : 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700';

  const textClass = plan.id === 'pro' 
  ? 'text-purple-600 dark:text-purple-300' 
  : plan.id === 'enterprise'
    ? 'text-blue-600 dark:text-blue-300'
    : 'text-slate-600 dark:text-slate-300';


  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background Ambience */}
      <div className={`absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b ${
          plan.id === 'pro' ? 'from-purple-100/40 via-purple-50/10' : 
          plan.id === 'enterprise' ? 'from-blue-100/40 via-blue-50/10' : 
          'from-slate-100/40 via-slate-50/10'
      } to-transparent dark:from-[#0f172a] dark:to-transparent pointer-events-none -z-10`} />

      <div className="container mx-auto px-6 max-w-6xl">
        
        <ScrollReveal width="full">
            <div className="mb-10">
                <Link 
                    to="/pricing" 
                    className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm font-bold group"
                >
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    بازگشت به لیست پلن‌ها
                </Link>
            </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Header & Pricing Card */}
            <div className="lg:col-span-8">
                <ScrollReveal width="full">
                    <div className="flex items-center gap-4 mb-6">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${bgClass} ${textClass}`}>
                            <Icon className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-1">
                                پلن {plan.title}
                            </h1>
                            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">{plan.desc}</p>
                        </div>
                    </div>

                    <p className="text-xl leading-relaxed text-slate-700 dark:text-slate-300 font-medium mb-12">
                        {plan.intro}
                    </p>

                    {/* Features Grid */}
                    <div className="grid gap-8">
                        {plan.features.map((featureGroup, idx) => (
                            <div key={idx} className="p-8 rounded-[2rem] bg-white/60 dark:bg-[#1e293b]/40 border border-slate-200 dark:border-white/5 backdrop-blur-sm">
                                <h3 className={`text-xl font-bold mb-6 ${textClass}`}>
                                    {featureGroup.category}
                                </h3>
                                <div className="space-y-4">
                                    {featureGroup.items.map((item, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <CheckCircle className={`w-5 h-5 shrink-0 mt-1 ${
                                                plan.id === 'pro' ? 'text-purple-500' : 
                                                plan.id === 'enterprise' ? 'text-blue-500' : 'text-slate-400'
                                            }`} />
                                            <span className="text-slate-700 dark:text-slate-200 font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* FAQ */}
                    <div className="mt-16">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                            <HelpCircle className="w-6 h-6" />
                            پرسش‌های متداول
                        </h3>
                        <div className="grid gap-4">
                            {plan.faq.map((item, idx) => (
                                <div key={idx} className="p-6 rounded-2xl bg-white/40 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">{item.question}</h4>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-6">{item.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>
            </div>

            {/* Sidebar Sticky Card */}
            <div className="lg:col-span-4 sticky top-32">
                <ScrollReveal width="full" delay={200}>
                    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-white/10 shadow-xl overflow-hidden relative">
                        <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${gradientClass}`} />
                        
                        <div className="text-center mb-8">
                            <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">{plan.price}</span>
                            {plan.period && <span className="text-slate-500 font-bold mr-1 text-lg">{plan.period}</span>}
                            {plan.price !== 'رایگان' && plan.price !== 'تماس بگیرید' && <span className="text-sm text-slate-400 block mt-2">تومان</span>}
                        </div>

                        <div className="mb-8 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 text-center">
                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-2">مناسب برای</span>
                            <span className="text-slate-800 dark:text-slate-200 font-bold">{plan.targetAudience}</span>
                        </div>

                        <button className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] text-white bg-gradient-to-r ${gradientClass} shadow-${plan.color}-500/30`}>
                            {plan.cta}
                        </button>

                        <div className="mt-6 text-center">
                            <p className="text-xs text-slate-400 leading-5">
                                با خرید این پلن، شما با <Link to="/terms" className="underline hover:text-slate-600 dark:hover:text-slate-300">شرایط و قوانین</Link> موافقت می‌کنید.
                            </p>
                        </div>
                    </div>
                </ScrollReveal>
            </div>

        </div>
      </div>
    </div>
  );
};
