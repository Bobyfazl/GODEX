
import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, ArrowLeft, Fingerprint, RefreshCw, CheckCircle, ArrowRight, AlertCircle, TriangleAlert, Check } from 'lucide-react';
import * as ReactRouterDOM from 'react-router-dom';
import { ScrollReveal } from '../components/ScrollReveal';
import { useAuth } from '../context/AuthContext';

const { Link, useNavigate } = ReactRouterDOM as any;

type AuthMode = 'login' | 'signup' | 'forgot';
type RecoveryStage = 'email' | 'otp' | 'new_password';
type StatusMessage = { type: 'error' | 'success', msg: string } | null;

// --- Animated Checkbox Component ---
const AnimatedCheckbox = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: (checked: boolean) => void }) => (
    <label className="flex items-center gap-2.5 cursor-pointer group select-none">
        <div className="relative w-5 h-5">
            <input 
                type="checkbox" 
                className="peer appearance-none w-full h-full rounded-md border-2 border-slate-300 dark:border-slate-600 checked:border-blue-500 dark:checked:border-blue-500 checked:bg-blue-500 transition-all duration-300 cursor-pointer"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            <div className={`absolute inset-0 flex items-center justify-center pointer-events-none text-white transition-all duration-300 ${checked ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
        </div>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
            {label}
        </span>
    </label>
);

const InputField = ({ icon: Icon, type, placeholder, id, value, onChange, error, disabled }: any) => (
    <div className="flex flex-col gap-1 w-full">
        <div className={`relative group ${error ? 'animate-shake' : ''}`}>
            {/* Left Icon (Error Icon) */}
            {error && (
                <div className="absolute top-0 bottom-0 left-4 flex items-center justify-center text-red-500 z-10">
                    <AlertCircle className="w-5 h-5" />
                </div>
            )}
            
            {/* Right Icon (Field Icon) */}
            <div className={`absolute top-0 bottom-0 right-4 flex items-center justify-center transition-colors duration-300 pointer-events-none z-10 ${error ? 'text-red-400' : 'text-slate-400 group-focus-within:text-blue-500'}`}>
                <Icon className="w-5 h-5" />
            </div>

            <input 
                type={type} 
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`
                    w-full 
                    bg-white/50 dark:bg-[#1e293b]/50 
                    border 
                    rounded-2xl py-4 pr-12 pl-12 
                    text-slate-800 dark:text-slate-200 
                    placeholder:text-slate-500 dark:placeholder:text-slate-500 
                    outline-none 
                    transition-colors duration-300 text-sm font-medium
                    ${error 
                        ? 'border-red-500/50 focus:border-red-500 bg-red-500/5 dark:bg-red-500/5' 
                        : 'border-slate-300 dark:border-white/10 focus:border-blue-500/50 focus:bg-white/80 dark:focus:bg-[#1e293b]/80'
                    }
                `}
                disabled={disabled}
            />
        </div>
    </div>
);

export const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [recoveryStage, setRecoveryStage] = useState<RecoveryStage>('email');
  const navigate = useNavigate();
  
  const { login, signup, sendRecoveryEmail, verifyOtp, resetPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Form Data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    otp: '',
    newPassword: ''
  });
  const [rememberMe, setRememberMe] = useState(false);

  // Validation State
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  // Single source of truth for messages (Error or Success) displayed INLINE
  const [statusMessage, setStatusMessage] = useState<StatusMessage>(null);

  // Reset scroll on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const resetForm = () => {
    setErrors({});
    setStatusMessage(null);
    setFormData({ name: '', email: '', password: '', otp: '', newPassword: '' });
  };

  const handleModeChange = (newMode: AuthMode) => {
    setMode(newMode);
    setRecoveryStage('email');
    resetForm();
  };

  const validate = (field: string, value: string): string => {
    if (!value.trim()) {
        return 'required'; 
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setStatusMessage(null);
    
    // Validation Logic
    const newErrors: {[key:string]: string} = {};
    
    if (mode === 'login') {
        newErrors.email = validate('email', formData.email);
        newErrors.password = validate('password', formData.password);
    } else if (mode === 'signup') {
        newErrors.name = validate('name', formData.name);
        newErrors.email = validate('email', formData.email);
        newErrors.password = validate('password', formData.password);
    } else if (mode === 'forgot') {
        if (recoveryStage === 'email') newErrors.email = validate('email', formData.email);
        if (recoveryStage === 'otp') newErrors.otp = validate('otp', formData.otp);
        if (recoveryStage === 'new_password') newErrors.newPassword = validate('newPassword', formData.newPassword);
    }

    // Filter out empty errors
    Object.keys(newErrors).forEach(key => {
        if (!newErrors[key]) delete newErrors[key];
    });

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        if (mode === 'login' || mode === 'signup') {
             setStatusMessage({ type: 'error', msg: 'لطفا اطلاعات را تکمیل کنید.' });
        }
        return;
    }

    setIsLoading(true);

    try {
        if (mode === 'login') {
            await login(formData.email, formData.password);
            setStatusMessage({ type: 'success', msg: 'خوش آمدید! در حال انتقال...' });
            setTimeout(() => navigate('/'), 1000);
        } else if (mode === 'signup') {
            await signup(formData.name, formData.email, formData.password);
            setStatusMessage({ type: 'success', msg: 'حساب کاربری با موفقیت ساخته شد.' });
            setTimeout(() => navigate('/'), 1000);
        } else if (mode === 'forgot') {
            if (recoveryStage === 'email') {
                await sendRecoveryEmail(formData.email);
                setRecoveryStage('otp');
                setStatusMessage({ type: 'success', msg: 'کد تایید به ایمیل ارسال شد. (کد: 1234)' });
            } else if (recoveryStage === 'otp') {
                await verifyOtp(formData.email, formData.otp);
                setRecoveryStage('new_password');
                setStatusMessage({ type: 'success', msg: 'کد تایید شد.' });
            } else if (recoveryStage === 'new_password') {
                await resetPassword(formData.email, formData.newPassword);
                setStatusMessage({ type: 'success', msg: 'رمز عبور تغییر کرد. وارد شوید.' });
                setTimeout(() => handleModeChange('login'), 1500);
            }
        }
    } catch (error: any) {
        if (mode === 'login' && error.message === 'NOT_FOUND') {
            // 1. Show Red Error INLINE
            setStatusMessage({ type: 'error', msg: 'حساب کاربری با این ایمیل یافت نشد.' });
            
            // 2. Wait, then replace with Green Success INLINE
            setTimeout(() => {
                setStatusMessage({ type: 'success', msg: 'به بخش ثبت نام منتقل میشوید.' });
                setTimeout(() => {
                     // 3. Switch to Signup
                     setMode('signup');
                     // Clear message after switch so signup form is clean
                     setStatusMessage(null);
                }, 700);
            }, 1000);
        } else {
            setStatusMessage({ type: 'error', msg: error.message || 'خطایی رخ داد' });
        }
    } finally {
        setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear global message on input
    if (statusMessage) setStatusMessage(null);
    if (errors[field]) {
        const newErrors = { ...errors };
        delete newErrors[field];
        setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-[100dvh] relative flex items-center justify-center p-0 md:p-4 overflow-hidden bg-slate-50 dark:bg-[#020617]">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Main Container: Fixed width differentiation. Tablet (md) now shares the max-w-lg size with Desktop */}
      <div className="w-full md:max-w-lg relative z-10 transition-all duration-300">
        
        <ScrollReveal width="full">
            <div className="relative p-0 md:p-1 rounded-none md:rounded-[2.5rem] bg-gradient-to-b from-white/40 to-white/10 dark:from-white/10 dark:to-transparent shadow-none md:shadow-2xl">
                <div className="bg-white/80 dark:bg-[#1e293b]/80 backdrop-blur-xl border-0 md:border border-white/60 dark:border-white/5 rounded-none md:rounded-[2.4rem] p-8 md:p-12 relative overflow-hidden transition-colors duration-500 min-h-[100dvh] md:min-h-0 flex flex-col justify-center">
                    
                    {/* Back Button - Docked Inside, Top-Right */}
                    <div className="absolute top-6 right-6 z-20">
                         <Link to="/" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors flex items-center gap-2 text-xs font-bold bg-white/50 dark:bg-white/5 px-3 py-2 rounded-full backdrop-blur-sm border border-slate-200/50 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 shadow-sm">
                            <ArrowRight className="w-4 h-4" />
                            <span className="hidden md:inline">صفحه اصلی</span>
                            <span className="md:hidden">خانه</span>
                         </Link>
                    </div>

                    <div className="transition-all duration-500 ease-apple pt-4">
                        
                        {/* ---------------- LOGIN VIEW ---------------- */}
                        {mode === 'login' && (
                            <form onSubmit={handleSubmit} className="animate-fade-in-up">
                                <div className="flex flex-col items-center mb-8 text-center">
                                    <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-blue-50 to-white dark:from-white/10 dark:to-white/5 border border-blue-100 dark:border-white/10 flex items-center justify-center mb-6 shadow-xl text-blue-600 dark:text-blue-500">
                                        <Fingerprint className="w-10 h-10" />
                                    </div>
                                    <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">خوش آمدید</h1>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">برای ادامه وارد حساب شوید</p>
                                </div>

                                {/* INLINE STATUS MESSAGE AREA */}
                                {statusMessage && (
                                    <div 
                                        key={statusMessage.msg} // Key ensures animation restarts on message change
                                        className={`w-full rounded-2xl p-4 mb-6 flex items-center gap-3 animate-fade-in-up ${
                                            statusMessage.type === 'error' 
                                            ? 'bg-red-500/10 border border-red-500/30' 
                                            : 'bg-emerald-500/10 border border-emerald-500/30'
                                        }`}
                                    >
                                        {statusMessage.type === 'error' ? (
                                            <TriangleAlert className="w-5 h-5 text-red-500 shrink-0" />
                                        ) : (
                                            <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                                        )}
                                        <p className={`text-xs font-bold leading-5 ${
                                            statusMessage.type === 'error' ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'
                                        }`}>
                                            {statusMessage.msg}
                                        </p>
                                    </div>
                                )}

                                <div className="space-y-4 mb-6">
                                    <InputField 
                                        icon={Mail} 
                                        type="email" 
                                        placeholder="ایمیل" 
                                        id="email" 
                                        value={formData.email} 
                                        onChange={(e: any) => handleInputChange('email', e.target.value)}
                                        error={errors.email}
                                        disabled={isLoading}
                                    />
                                    <InputField 
                                        icon={Lock} 
                                        type="password" 
                                        placeholder="رمز عبور" 
                                        id="password" 
                                        value={formData.password} 
                                        onChange={(e: any) => handleInputChange('password', e.target.value)}
                                        error={errors.password}
                                        disabled={isLoading}
                                    />
                                </div>

                                <div className="flex items-center justify-between mb-8">
                                    <AnimatedCheckbox 
                                        label="مرا به خاطر بسپار" 
                                        checked={rememberMe} 
                                        onChange={setRememberMe} 
                                    />
                                    <button type="button" onClick={() => handleModeChange('forgot')} className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                        فراموشی رمز عبور؟
                                    </button>
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={isLoading}
                                    className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            ورود به حساب
                                            <ArrowLeft className="w-5 h-5" />
                                        </>
                                    )}
                                </button>

                                <div className="mt-8 text-center">
                                    <span className="text-slate-500 text-sm font-medium">حساب کاربری ندارید؟ </span>
                                    <button type="button" onClick={() => handleModeChange('signup')} className="text-slate-900 dark:text-white font-bold text-sm hover:underline decoration-blue-500 underline-offset-4 decoration-2 transition-all">
                                        ثبت نام کنید
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* ---------------- FORGOT PASSWORD VIEW ---------------- */}
                        {mode === 'forgot' && (
                            <form onSubmit={handleSubmit} className="animate-fade-in-up">
                                <div className="flex flex-col items-center mb-8 text-center">
                                    <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-blue-50 to-white dark:from-white/10 dark:to-white/5 border border-blue-100 dark:border-white/10 flex items-center justify-center mb-6 shadow-xl text-blue-600 dark:text-blue-500">
                                        <RefreshCw className="w-10 h-10" />
                                    </div>
                                    <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">بازیابی رمز</h1>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                                        {recoveryStage === 'email' && 'ایمیل خود را وارد کنید'}
                                        {recoveryStage === 'otp' && 'کد تایید ارسال شده را وارد کنید'}
                                        {recoveryStage === 'new_password' && 'رمز عبور جدید خود را وارد کنید'}
                                    </p>
                                </div>

                                {statusMessage && (
                                    <div 
                                        key={statusMessage.msg}
                                        className={`w-full rounded-2xl p-4 mb-6 flex items-center gap-3 animate-fade-in-up ${
                                            statusMessage.type === 'error' 
                                            ? 'bg-red-500/10 border border-red-500/30' 
                                            : 'bg-emerald-500/10 border border-emerald-500/30'
                                        }`}
                                    >
                                        {statusMessage.type === 'error' ? (
                                            <TriangleAlert className="w-5 h-5 text-red-500 shrink-0" />
                                        ) : (
                                            <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                                        )}
                                        <p className={`text-xs font-bold leading-5 ${
                                            statusMessage.type === 'error' ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'
                                        }`}>
                                            {statusMessage.msg}
                                        </p>
                                    </div>
                                )}

                                {recoveryStage === 'email' && (
                                    <>
                                        <div className="space-y-4 mb-8">
                                            <InputField 
                                                icon={Mail} 
                                                type="email" 
                                                placeholder="ایمیل" 
                                                id="email" 
                                                value={formData.email} 
                                                onChange={(e: any) => handleInputChange('email', e.target.value)}
                                                error={errors.email}
                                                disabled={isLoading}
                                            />
                                        </div>
                                        <button type="submit" disabled={isLoading} className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                                            {isLoading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'دریافت کد تایید'}
                                        </button>
                                    </>
                                )}

                                {recoveryStage === 'otp' && (
                                    <>
                                        <div className="space-y-4 mb-8">
                                            <InputField 
                                                icon={Fingerprint} 
                                                type="text" 
                                                placeholder="کد تایید (۱۲۳۴)" 
                                                id="otp" 
                                                value={formData.otp} 
                                                onChange={(e: any) => handleInputChange('otp', e.target.value)}
                                                error={errors.otp}
                                                disabled={isLoading}
                                            />
                                        </div>
                                        <button type="submit" disabled={isLoading} className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                                            {isLoading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'بررسی کد'}
                                        </button>
                                    </>
                                )}

                                {recoveryStage === 'new_password' && (
                                    <>
                                        <div className="space-y-4 mb-8">
                                            <InputField 
                                                icon={Lock} 
                                                type="password" 
                                                placeholder="رمز عبور جدید" 
                                                id="newPassword" 
                                                value={formData.newPassword} 
                                                onChange={(e: any) => handleInputChange('newPassword', e.target.value)}
                                                error={errors.newPassword}
                                                disabled={isLoading}
                                            />
                                        </div>
                                        <button type="submit" disabled={isLoading} className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                                            {isLoading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'تغییر رمز عبور'}
                                        </button>
                                    </>
                                )}

                                <div className="mt-8 text-center">
                                    <button type="button" onClick={() => handleModeChange('login')} className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white font-medium text-sm flex items-center justify-center gap-2 mx-auto transition-colors">
                                        بازگشت به صفحه ورود
                                        <ArrowLeft className="w-4 h-4 rotate-180" />
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* ---------------- SIGNUP VIEW ---------------- */}
                        {mode === 'signup' && (
                            <form onSubmit={handleSubmit} className="animate-fade-in-up">
                                <div className="flex flex-col items-center mb-8 text-center">
                                    <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-blue-50 to-white dark:from-white/10 dark:to-white/5 border border-blue-100 dark:border-white/10 flex items-center justify-center mb-6 shadow-xl text-blue-600 dark:text-blue-500">
                                        <User className="w-10 h-10" />
                                    </div>
                                    <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">ایجاد حساب</h1>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">به خانواده لومینا بپیوندید</p>
                                </div>

                                {statusMessage && (
                                    <div 
                                        key={statusMessage.msg}
                                        className={`w-full rounded-2xl p-4 mb-6 flex items-center gap-3 animate-fade-in-up ${
                                            statusMessage.type === 'error' 
                                            ? 'bg-red-500/10 border border-red-500/30' 
                                            : 'bg-emerald-500/10 border border-emerald-500/30'
                                        }`}
                                    >
                                        {statusMessage.type === 'error' ? (
                                            <TriangleAlert className="w-5 h-5 text-red-500 shrink-0" />
                                        ) : (
                                            <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                                        )}
                                        <p className={`text-xs font-bold leading-5 ${
                                            statusMessage.type === 'error' ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'
                                        }`}>
                                            {statusMessage.msg}
                                        </p>
                                    </div>
                                )}

                                <div className="space-y-4 mb-8">
                                    <InputField 
                                        icon={User} 
                                        type="text" 
                                        placeholder="نام کامل" 
                                        id="name" 
                                        value={formData.name} 
                                        onChange={(e: any) => handleInputChange('name', e.target.value)}
                                        error={errors.name}
                                        disabled={isLoading}
                                    />
                                    <InputField 
                                        icon={Mail} 
                                        type="email" 
                                        placeholder="ایمیل" 
                                        id="email" 
                                        value={formData.email} 
                                        onChange={(e: any) => handleInputChange('email', e.target.value)}
                                        error={errors.email}
                                        disabled={isLoading}
                                    />
                                    <InputField 
                                        icon={Lock} 
                                        type="password" 
                                        placeholder="رمز عبور" 
                                        id="password" 
                                        value={formData.password} 
                                        onChange={(e: any) => handleInputChange('password', e.target.value)}
                                        error={errors.password}
                                        disabled={isLoading}
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={isLoading}
                                    className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            ایجاد حساب
                                            <ArrowLeft className="w-5 h-5" />
                                        </>
                                    )}
                                </button>

                                <div className="mt-8 text-center">
                                    <button type="button" onClick={() => handleModeChange('login')} className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white font-medium text-sm flex items-center justify-center gap-2 mx-auto transition-colors">
                                        بازگشت به صفحه ورود
                                        <ArrowLeft className="w-4 h-4 rotate-180" />
                                    </button>
                                </div>
                            </form>
                        )}

                    </div>
                </div>
            </div>
        </ScrollReveal>
      </div>
    </div>
  );
};
