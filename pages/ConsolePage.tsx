
import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import * as ReactRouterDOM from 'react-router-dom';
import { 
    LayoutDashboard, User, Shield, Key, Bell, CreditCard, 
    Camera, LogOut, Save, Mail, AlertTriangle, CheckCircle, Lock, Upload 
} from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';

const { Navigate, Link } = ReactRouterDOM as any;

export const ConsolePage: React.FC = () => {
    const { user, isAuthenticated, updateProfile, logout } = useAuth();
    const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'billing'>('profile');
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState<{show: boolean, msg: string}>({ show: false, msg: '' });
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Profile Form State
    const [profileData, setProfileData] = useState({
        name: user?.name || '',
        bio: user?.bio || '',
    });

    // Security Form State (Dummy)
    const [securityData, setSecurityData] = useState({
        currentPassword: '',
        newPassword: ''
    });

    if (!isAuthenticated || !user) {
        return <Navigate to="/auth" />;
    }

    const showNotification = (msg: string) => {
        setToast({ show: true, msg });
        setTimeout(() => setToast({ show: false, msg: '' }), 3000);
    };

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await updateProfile(profileData);
            showNotification('تغییرات با موفقیت ذخیره شد.');
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSecurityUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setSecurityData({ currentPassword: '', newPassword: '' });
            showNotification('رمز عبور با موفقیت تغییر یافت.');
        }, 1000);
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Simple validation
        if (file.size > 2 * 1024 * 1024) { // 2MB limit
            alert('حجم فایل نباید بیشتر از ۲ مگابایت باشد.');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64String = reader.result as string;
            setIsLoading(true);
            try {
                await updateProfile({ avatar: base64String });
                showNotification('عکس پروفایل به‌روز شد.');
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        reader.readAsDataURL(file);
    };

    const tabs = [
        { id: 'profile', label: 'پروفایل کاربری', icon: User },
        { id: 'security', label: 'امنیت و ورود', icon: Shield },
        { id: 'billing', label: 'اشتراک و پرداخت', icon: CreditCard },
    ];

    return (
        <div className="min-h-screen pt-28 md:pt-32 pb-20 relative overflow-hidden">
             
             <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
                <ScrollReveal width="full">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                        
                        {/* --- SIDEBAR (Minimalist) --- */}
                        <div className="w-full lg:w-64 shrink-0 flex flex-col gap-6 lg:gap-8">
                            
                            {/* User Info */}
                            <div className="flex items-center gap-4 px-2">
                                <div className="relative">
                                    <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-sm">
                                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="font-bold text-slate-900 dark:text-white text-lg">{user.name}</h2>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{user.role || 'کاربر استاندارد'}</p>
                                </div>
                            </div>
                            
                            {/* Navigation - Responsive: Horizontal on mobile, Vertical on Desktop */}
                            <nav className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 lg:gap-0 lg:space-y-1 pb-2 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                                {tabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as any)}
                                        className={`shrink-0 lg:w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-none whitespace-nowrap ${
                                            activeTab === tab.id 
                                            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg shadow-slate-900/10 dark:shadow-white/10' 
                                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100/50 dark:bg-white/5 lg:bg-transparent'
                                        }`}
                                    >
                                        <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? '' : 'opacity-70'}`} />
                                        {tab.label}
                                    </button>
                                ))}
                            </nav>

                            {/* CTA Card - Hidden on Mobile/Tablet Portrait to save space */}
                            <div className="hidden md:block mt-2 lg:mt-4 px-4 py-6 rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-600/20 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
                                <h3 className="font-bold text-lg mb-1 relative z-10">پلن حرفه‌ای</h3>
                                <p className="text-indigo-100 text-xs mb-4 relative z-10 opacity-90 leading-5">دسترسی نامحدود به تمام قابلیت‌ها</p>
                                <Link to="/pricing" className="block w-full text-center py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl text-xs font-bold transition-colors">
                                    ارتقاء حساب
                                </Link>
                            </div>
                        </div>

                        {/* --- MAIN CONTENT (Clean, No Box) --- */}
                        <div className="flex-1 w-full min-w-0 pt-2">
                            
                            {/* Title */}
                            <div className="mb-8 lg:mb-10 pb-6 border-b border-slate-200/60 dark:border-white/5">
                                <h1 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white mb-2">
                                    {tabs.find(t => t.id === activeTab)?.label}
                                </h1>
                                <p className="text-sm lg:text-base text-slate-500 dark:text-slate-400 font-medium">
                                    تنظیمات مربوط به {tabs.find(t => t.id === activeTab)?.label} خود را در این بخش مدیریت کنید.
                                </p>
                            </div>

                            {/* TAB: PROFILE */}
                            {activeTab === 'profile' && (
                                <div className="space-y-10 animate-fade-in-up">
                                    
                                    {/* Avatar Row - Image Not Clickable */}
                                    <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
                                        <div className="relative shrink-0">
                                            <div className="w-24 h-24 rounded-[2rem] overflow-hidden border-2 border-slate-200 dark:border-white/10 shadow-lg">
                                                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">عکس پروفایل</h3>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 max-w-md leading-6">
                                                این تصویر در پروفایل عمومی شما نمایش داده می‌شود.
                                            </p>
                                            <div className="flex gap-3">
                                                <button 
                                                    type="button" 
                                                    onClick={handleAvatarClick}
                                                    className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"
                                                >
                                                    <Upload className="w-4 h-4" />
                                                    آپلود تصویر جدید
                                                </button>
                                                <input 
                                                    type="file" 
                                                    ref={fileInputRef} 
                                                    className="hidden" 
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Inputs - Styled to sit directly on background */}
                                    <form onSubmit={handleProfileUpdate} className="space-y-8 max-w-2xl">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">نام کامل</label>
                                                <input 
                                                    type="text" 
                                                    value={profileData.name}
                                                    onChange={(e) => setProfileData(prev => ({...prev, name: e.target.value}))}
                                                    className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-500/20 outline-none transition-all text-slate-900 dark:text-white font-medium"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">ایمیل</label>
                                                <div className="relative opacity-70">
                                                    <input 
                                                        type="email" 
                                                        value={user.email}
                                                        disabled
                                                        className="w-full px-5 py-4 pl-12 rounded-2xl bg-slate-100 dark:bg-white/5 border border-transparent text-slate-500 font-medium cursor-not-allowed"
                                                    />
                                                    <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">بیوگرافی کوتاه</label>
                                            <textarea 
                                                rows={4}
                                                value={profileData.bio}
                                                onChange={(e) => setProfileData(prev => ({...prev, bio: e.target.value}))}
                                                className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-500/20 outline-none transition-all text-slate-900 dark:text-white resize-none font-medium leading-7"
                                                placeholder="هنوز بیوگرافی نوشته نشده است."
                                            />
                                        </div>

                                        <div className="pt-4 flex flex-col-reverse md:flex-row items-center justify-end gap-4 border-t border-slate-200/60 dark:border-white/5">
                                            <button 
                                                type="button" 
                                                onClick={() => setProfileData({ name: user.name, bio: user.bio || '' })}
                                                className="w-full md:w-auto px-6 py-3 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white font-bold transition-colors"
                                            >
                                                انصراف
                                            </button>
                                            <button 
                                                type="submit" 
                                                disabled={isLoading}
                                                className="w-full md:w-auto px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                                            >
                                                {isLoading ? 'در حال ذخیره...' : (
                                                    <>
                                                        <Save className="w-4 h-4" />
                                                        ذخیره تغییرات
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                             {/* TAB: SECURITY */}
                            {activeTab === 'security' && (
                                <div className="space-y-8 animate-fade-in-up max-w-2xl">
                                    <div className="flex items-start gap-4 p-5 rounded-2xl bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 mb-8">
                                        <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center shrink-0 text-orange-600 dark:text-orange-400">
                                            <Key className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-orange-800 dark:text-orange-200 mb-1">توصیه امنیتی</h4>
                                            <p className="text-sm text-orange-700/80 dark:text-orange-200/70 leading-6">
                                                برای امنیت بیشتر، توصیه می‌شود رمز عبور خود را هر ۳ ماه یکبار تغییر دهید.
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <form onSubmit={handleSecurityUpdate} className="space-y-8">
                                        <div className="space-y-6">
                                            <div className="space-y-3">
                                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">رمز عبور فعلی</label>
                                                <input 
                                                    type="password" 
                                                    value={securityData.currentPassword}
                                                    onChange={(e) => setSecurityData(prev => ({...prev, currentPassword: e.target.value}))}
                                                    className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-500/20 outline-none transition-all" 
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">رمز عبور جدید</label>
                                                <input 
                                                    type="password" 
                                                    value={securityData.newPassword}
                                                    onChange={(e) => setSecurityData(prev => ({...prev, newPassword: e.target.value}))}
                                                    className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-500/20 outline-none transition-all" 
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between py-6 border-y border-slate-200/60 dark:border-white/5">
                                            <div>
                                                <h4 className="font-bold text-slate-900 dark:text-white text-sm">احراز هویت دو مرحله‌ای (2FA)</h4>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">افزایش امنیت حساب با کد تایید پیامکی.</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" />
                                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>

                                        <div className="flex flex-col-reverse md:flex-row items-center justify-end gap-4">
                                            <button 
                                                type="button" 
                                                onClick={() => setSecurityData({ currentPassword: '', newPassword: '' })}
                                                className="w-full md:w-auto px-6 py-3 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white font-bold transition-colors"
                                            >
                                                انصراف
                                            </button>
                                            <button 
                                                type="submit" 
                                                disabled={isLoading}
                                                className="w-full md:w-auto px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                                            >
                                                {isLoading ? 'در حال پردازش...' : (
                                                    <>
                                                        <Save className="w-4 h-4" />
                                                        تغییر رمز عبور
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                             {/* TAB: BILLING */}
                             {activeTab === 'billing' && (
                                <div className="animate-fade-in-up max-w-3xl">
                                    <div className="flex flex-col items-center justify-center py-20 px-8 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5">
                                        <div className="w-20 h-20 bg-white dark:bg-white/5 rounded-full flex items-center justify-center mb-6 shadow-sm border border-slate-100 dark:border-white/10">
                                            <CreditCard className="w-8 h-8 text-slate-400" />
                                        </div>
                                        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 text-center">هنوز تراکنشی ثبت نشده است</h3>
                                        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8 text-center leading-7">
                                            شما در حال استفاده از نسخه رایگان هستید. برای دسترسی به ویژگی‌های پیشرفته و مدل‌های قدرتمندتر، طرح خود را ارتقا دهید.
                                        </p>
                                        <Link 
                                            to="/pricing"
                                            className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-600/20 transition-all hover:-translate-y-1"
                                        >
                                            مشاهده پلن‌ها و ارتقاء
                                        </Link>
                                    </div>
                                </div>
                             )}

                        </div>
                    </div>
                </ScrollReveal>
             </div>

             {/* Dynamic Toast */}
             <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full shadow-2xl transition-all duration-300 z-50 ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
                 <div className="flex items-center gap-3">
                     <CheckCircle className="w-5 h-5 text-green-500" />
                     <span className="font-bold text-sm">{toast.msg}</span>
                 </div>
             </div>
        </div>
    );
};
