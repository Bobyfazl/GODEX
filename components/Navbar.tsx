
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Menu, X, LogIn, User, LogOut, ChevronDown, Settings } from 'lucide-react';
import { TEXTS } from '../constants';
import * as ReactRouterDOM from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { useLenis } from '../app/providers';
import { useAuth } from '../context/AuthContext';

const { Link, useLocation } = ReactRouterDOM as any;

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  const lenis = useLenis();
  const { user, logout, isAuthenticated } = useAuth();
  
  const navRef = useRef<HTMLElement>(null);
  const isScrolledRef = useRef(false);

  useEffect(() => {
    const updateNavStyle = (scrollY: number) => {
        if (!navRef.current) return;
        
        const threshold = 20;
        const shouldBeScrolled = scrollY > threshold;

        if (shouldBeScrolled !== isScrolledRef.current) {
            const nav = navRef.current;
            if (shouldBeScrolled) {
                nav.classList.add('bg-white/80', 'dark:bg-[#020617]/80', 'backdrop-blur-xl', 'border-white/60', 'dark:border-white/5', 'shadow-sm', 'dark:shadow-none');
                nav.classList.remove('bg-transparent', 'border-transparent');
            } else {
                nav.classList.remove('bg-white/80', 'dark:bg-[#020617]/80', 'backdrop-blur-xl', 'border-white/60', 'dark:border-white/5', 'shadow-sm', 'dark:shadow-none');
                nav.classList.add('bg-transparent', 'border-transparent');
            }
            isScrolledRef.current = shouldBeScrolled;
        }
    };

    if (lenis) {
        lenis.on('scroll', ({ scroll }: { scroll: number }) => updateNavStyle(scroll));
        updateNavStyle(lenis.animatedScroll);
    } else {
        const handleScroll = () => updateNavStyle(window.scrollY);
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }

    return () => {};
  }, [lenis]);

  const handleSamePageNav = (path: string) => {
    if (pathname === path && lenis) {
        lenis.scrollTo(0, { 
            duration: 1.5, 
            easing: (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t) 
        });
    }
  };

  const MENU_ITEMS = [
    { label: TEXTS.NAV.LINKS[0], path: '/features' },
    { label: TEXTS.NAV.LINKS[1], path: '/use-cases' },
    { label: TEXTS.NAV.LINKS[2], path: '/demo' },
    { label: 'اشتراک‌ها', path: '/pricing' }, // Added Pricing Link
  ];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-apple border-b bg-transparent border-transparent py-4 gpu-layer will-change-[background-color,border-color]"
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between relative">
        <Link 
            to="/" 
            onClick={() => handleSamePageNav('/')}
            className="flex items-center gap-3 cursor-pointer group physics-interactive"
        >
          <div className="relative w-9 h-9 flex items-center justify-center">
            <div className="absolute inset-0 bg-blue-500 blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
            <Sparkles className="text-blue-600 dark:text-white w-6 h-6 relative z-10 transition-transform duration-600 group-hover:rotate-12 ease-apple" />
          </div>
          <span className="font-bold text-xl tracking-wide text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-200 transition-colors duration-300">
            {TEXTS.NAV.LOGO}
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {MENU_ITEMS.map((item, index) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={index}
                  to={item.path}
                  onClick={() => handleSamePageNav(item.path)}
                  className={`text-sm font-medium relative py-2 px-3 rounded-lg physics-interactive ${
                    isActive 
                        ? 'text-blue-600 dark:text-white [text-shadow:0_0_0.9px_currentColor]'
                        : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white hover:[text-shadow:0_0_0.9px_currentColor]'
                  }`}
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-white rounded-full origin-center transition-transform duration-500 ease-apple ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`} />
                </Link>
              );
            })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-6">
            <ThemeToggle />

            <div className="h-6 w-px bg-slate-200 dark:bg-white/10 hidden lg:block" />

            {isAuthenticated && user ? (
                 <div className="relative group">
                    <button className="flex items-center gap-3 px-2 py-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-300 physics-interactive">
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 dark:border-white/20">
                            {/* Eager loading for immediate avatar display */}
                            <img 
                                src={user.avatar} 
                                alt={user.name} 
                                className="w-full h-full object-cover" 
                                loading="eager"
                                decoding="sync"
                            />
                        </div>
                        <span className="font-bold text-sm text-slate-700 dark:text-slate-200 max-w-[100px] truncate">{user.name}</span>
                        <ChevronDown className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform duration-300" />
                    </button>

                    {/* Dropdown Menu - ANIMATION FIXED: TOP TO BOTTOM */}
                    <div className="absolute top-full left-0 mt-2 w-56 p-2 rounded-2xl bg-white/90 dark:bg-[#1e293b]/95 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-xl opacity-0 -translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 origin-top z-[110]">
                        <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 mb-2">
                             <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">حساب کاربری</p>
                             <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user.email}</p>
                        </div>
                        
                        <Link to="/console" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-blue-600 dark:hover:text-white transition-colors duration-200 text-sm font-medium">
                            <Settings className="w-4 h-4" />
                            {/* Ensure no transform on text to prevent jitter */}
                            <span>تنظیمات کنسول</span>
                        </Link>
                        
                        <button 
                            onClick={logout}
                            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors text-sm font-medium mt-1"
                        >
                            <LogOut className="w-4 h-4" />
                            خروج از حساب
                        </button>
                    </div>
                 </div>
            ) : (
                <Link 
                    to="/auth"
                    className="px-6 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2 physics-interactive"
                >
                    <LogIn className="w-4 h-4" />
                    <span>{TEXTS.NAV.CTA}</span>
                </Link>
            )}
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
            <ThemeToggle />
            
            <button 
                className="text-slate-900 dark:text-white p-2 rounded-lg physics-interactive"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-[#020617]/95 backdrop-blur-2xl border-b border-blue-100 dark:border-white/10 p-6 flex flex-col gap-4 shadow-2xl transition-all duration-500 ease-apple origin-top ${isMobileMenuOpen ? 'opacity-100 scale-y-100 translate-y-0' : 'opacity-0 scale-y-95 -translate-y-4 pointer-events-none'}`}>
          {isAuthenticated && user && (
              <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-white/10">
                   <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 dark:border-white/20">
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <p className="font-bold text-slate-900 dark:text-white">{user.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                    </div>
              </div>
          )}

          {MENU_ITEMS.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleSamePageNav(item.path);
              }}
              className="py-3 px-4 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 text-slate-800 dark:text-slate-200 font-bold physics-interactive"
            >
              {item.label}
            </Link>
          ))}

          {isAuthenticated && (
             <Link
                to="/console"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 px-4 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 text-slate-800 dark:text-slate-200 font-bold physics-interactive flex items-center gap-2"
             >
                <Settings className="w-5 h-5" />
                تنظیمات کنسول
             </Link>
          )}
          
          {isAuthenticated ? (
            <button 
                onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                }}
                className="py-3 px-4 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 font-bold flex items-center gap-2 physics-interactive mt-2"
            >
               <LogOut className="w-5 h-5" />
               خروج از حساب
            </button>
          ) : (
            <Link 
                to="/auth"
                className="py-3 px-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold flex items-center justify-center gap-2 physics-interactive mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
            >
                <LogIn className="w-5 h-5" />
                {TEXTS.NAV.CTA}
            </Link>
          )}
      </div>
    </nav>
  );
};
