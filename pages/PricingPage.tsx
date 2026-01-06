
import React from 'react';
import { CheckCircle, Zap, Shield, Crown, ArrowLeft } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { ScrollReveal } from '../components/ScrollReveal';
import { api } from '../services/dataService';
import * as ReactRouterDOM from 'react-router-dom';

const { Link } = ReactRouterDOM as any;

export const PricingPage: React.FC = () => {
  const plans = api.getPricingPlans();

  const getIcon = (id: string) => {
      switch(id) {
          case 'pro': return Crown;
          case 'enterprise': return Shield;
          default: return Zap;
      }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
            <ScrollReveal width="full">
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                    پلن‌های اشتراک
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                    بهترین گزینه را متناسب با نیاز خود انتخاب کنید و قدرت واقعی هوش مصنوعی را آزاد کنید.
                </p>
            </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, idx) => {
            const Icon = getIcon(plan.id);
            const isPopular = plan.id === 'pro';
            const isBasic = plan.id === 'basic';
            
            return (
                <ScrollReveal key={idx} delay={idx * 100} className="h-full">
                    <GlassCard 
                        as="div"
                        className={`h-full p-8 rounded-[2.5rem] flex flex-col items-center text-center relative overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
                            isPopular ? 'border-purple-500/50 dark:border-purple-500/30 bg-purple-50/50 dark:bg-purple-900/10' : ''
                        }`}
                        hoverEffect={true}
                        gradientColor={plan.color as any}
                    >
                        <Link to={`/pricing/${plan.id}`} className="w-full flex flex-col items-center flex-1 group/content">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover/content:scale-110 ${
                                plan.color === 'purple' ? 'bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300' :
                                plan.color === 'blue' ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300' :
                                'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                            }`}>
                                <Icon className="w-8 h-8" />
                            </div>

                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{plan.title}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 min-h-[40px]">{plan.desc}</p>

                            <div className="mb-8">
                                <span className="text-4xl font-black text-slate-900 dark:text-white">{plan.price}</span>
                                {plan.period && <span className="text-slate-500 text-sm font-bold mr-1">{plan.period}</span>}
                                {plan.price !== 'رایگان' && plan.price !== 'تماس بگیرید' && <span className="text-xs text-slate-400 block mt-1">تومان</span>}
                            </div>

                            <div className="space-y-4 mb-10 w-full text-right">
                                {/* Show only first 4 features on card */}
                                {plan.features[0].items.slice(0, 4).map((feat, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <CheckCircle className={`w-5 h-5 shrink-0 ${
                                            plan.color === 'purple' ? 'text-purple-500' : 
                                            plan.color === 'blue' ? 'text-blue-500' : 'text-slate-400'
                                        }`} />
                                        <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">{feat}</span>
                                    </div>
                                ))}
                                {plan.features[0].items.length > 4 && (
                                    <p className="text-xs text-slate-400 text-center pt-2">و بیشتر...</p>
                                )}
                            </div>
                        </Link>

                        {isBasic ? (
                            <a 
                                href="https://gemini.google.com/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all mt-auto bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200`}
                            >
                                {plan.cta}
                                <ArrowLeft className="w-4 h-4" />
                            </a>
                        ) : (
                            <Link 
                                to={`/pricing/${plan.id}`}
                                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all mt-auto ${
                                    isPopular 
                                    ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/30' 
                                    : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200'
                                }`}
                            >
                                {plan.cta}
                                <ArrowLeft className="w-4 h-4" />
                            </Link>
                        )}
                    </GlassCard>
                </ScrollReveal>
            );
            })}
        </div>
      </div>
    </div>
  );
};
