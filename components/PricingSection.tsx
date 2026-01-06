
'use client';

import React from 'react';
import { CheckCircle, Zap, Shield, Crown, ArrowLeft } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { ScrollReveal } from './ScrollReveal';

export const PricingSection: React.FC = () => {
  const plans = [
    {
      title: "پایه",
      price: "رایگان",
      desc: "برای شروع و آشنایی با قابلیت‌های اصلی",
      icon: Zap,
      features: ["دسترسی به مدل GPT-3.5", "سرعت پاسخگویی استاندارد", "محدودیت ۱۰ پیام در روز", "پشتیبانی ایمیلی"],
      color: "slate",
      cta: "شروع کنید"
    },
    {
      title: "حرفه‌ای",
      price: "۲۹۹,۰۰۰",
      period: "/ ماهانه",
      desc: "برای متخصصان و استفاده روزمره",
      icon: Crown,
      features: ["دسترسی به مدل Gemini Pro", "سرعت پاسخگویی بالا", "پیام نامحدود", "دسترسی به ابزارهای تصویرسازی", "پشتیبانی اولویت‌دار"],
      color: "purple",
      cta: "انتخاب پلن حرفه‌ای",
      popular: true
    },
    {
      title: "سازمانی",
      price: "تماس بگیرید",
      desc: "برای تیم‌ها و شرکت‌های بزرگ",
      icon: Shield,
      features: ["API اختصاصی", "مدل‌های Fine-tune شده", "امنیت داده سازمانی", "مدیریت دسترسی کاربران", "قرارداد SLA"],
      color: "blue",
      cta: "تماس با فروش"
    }
  ];

  return (
    <section id="pricing" className="container mx-auto px-6 md:px-12 relative z-10 scroll-mt-32">
      <div className="text-center mb-16">
        <ScrollReveal width="full">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                پلن‌های اشتراک
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg font-medium max-w-2xl mx-auto">
                بهترین گزینه را متناسب با نیاز خود انتخاب کنید و قدرت واقعی هوش مصنوعی را آزاد کنید.
            </p>
        </ScrollReveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, idx) => (
          <ScrollReveal key={idx} delay={idx * 100} className="h-full">
            <GlassCard 
                className={`h-full p-8 rounded-[2.5rem] flex flex-col items-center text-center relative overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
                    plan.popular ? 'border-purple-500/50 dark:border-purple-500/30 bg-purple-50/50 dark:bg-purple-900/10' : ''
                }`}
                hoverEffect={true}
                gradientColor={plan.color as any}
            >
                {/* Gradient line removed here */}
                
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                    plan.color === 'purple' ? 'bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300' :
                    plan.color === 'blue' ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300' :
                    'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}>
                    <plan.icon className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{plan.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 min-h-[40px]">{plan.desc}</p>

                <div className="mb-8">
                    <span className="text-4xl font-black text-slate-900 dark:text-white">{plan.price}</span>
                    {plan.period && <span className="text-slate-500 text-sm font-bold mr-1">{plan.period}</span>}
                    {plan.price !== 'رایگان' && plan.price !== 'تماس بگیرید' && <span className="text-xs text-slate-400 block mt-1">تومان</span>}
                </div>

                <div className="space-y-4 mb-10 w-full text-right">
                    {plan.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <CheckCircle className={`w-5 h-5 shrink-0 ${
                                plan.color === 'purple' ? 'text-purple-500' : 
                                plan.color === 'blue' ? 'text-blue-500' : 'text-slate-400'
                            }`} />
                            <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">{feat}</span>
                        </div>
                    ))}
                </div>

                <button className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all mt-auto ${
                    plan.popular 
                    ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/30' 
                    : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200'
                }`}>
                    {plan.cta}
                    <ArrowLeft className="w-4 h-4" />
                </button>
            </GlassCard>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};
