
import React from 'react';
import './globals.css';
import { Providers } from './providers';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { BackToTop } from '../components/BackToTop';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GODEX',
  description: 'A high-fidelity, responsive landing page for the GODEX AI model.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className="lenis lenis-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=no" />
        <script src="https://cdn.tailwindcss.com"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                darkMode: 'class',
                theme: {
                  extend: {
                    fontFamily: {
                      sans: ['Vazirmatn', 'sans-serif'],
                    },
                    colors: {},
                    transitionTimingFunction: {
                      'apple': 'cubic-bezier(0.16, 1, 0.3, 1)', 
                      'fluid': 'cubic-bezier(0.32, 0.72, 0, 1)',
                      'press': 'cubic-bezier(0.4, 0, 0.2, 1)', 
                      'soft': 'cubic-bezier(0.25, 0.8, 0.25, 1)',
                    },
                    backgroundImage: {
                      'glass-gradient-light': 'linear-gradient(to bottom, rgba(255,255,255,0.85), rgba(255,255,255,0.5))',
                      'glass-gradient-dark': 'linear-gradient(to bottom, rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.4))',
                    },
                    keyframes: {
                      fadeInUp: {
                        '0%': { opacity: '0', transform: 'translate3d(0, 30px, 0) scale(0.98)', filter: 'blur(4px)' },
                        '100%': { opacity: '1', transform: 'translate3d(0, 0, 0) scale(1)', filter: 'blur(0px)' },
                      },
                      float: {
                        '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
                        '50%': { transform: 'translate3d(0, -10px, 0)' },
                      }
                    },
                    animation: {
                      'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                      'float': 'float 6s ease-in-out infinite',
                    }
                  }
                }
              }
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100;300;400;500;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white selection:bg-indigo-500/30">
        <Providers>
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-1">
              {children}
            </div>
            <Footer />
            <BackToTop />
          </div>
        </Providers>
      </body>
    </html>
  );
}
