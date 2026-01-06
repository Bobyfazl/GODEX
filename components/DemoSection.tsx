
'use client';

import React, { useState, memo } from 'react';
import { Play, ExternalLink } from 'lucide-react';
import { TEXTS } from '../constants';
import { ScrollReveal } from './ScrollReveal';

const DEMO_VIDEOS = [
  { id: '98DcoXwGX6I', title: 'دموی تعاملی اصلی' },
  { id: 'UQsJIo46ZR8', title: 'Gemini 1.5 Pro' },
  { id: 'ti6Z3zMLsNA', title: 'پروژه Astra: آینده AI' },
  { id: 'meUr8fjy8lQ', title: 'قدرت استدلال' },
  { id: '5njF8J0mQ1k', title: 'Gemini Cloud' },
  { id: 'Avx2m5Igugo', title: 'تولید ویدیو با Veo' },
  { id: 'YQwqoEm_xis', title: 'عصر جدید Gemini' },
  { id: 'Zphax4f6Rls', title: 'Gemini Flash' },
];

// Optimized VideoItem
const VideoItem = memo(({ video }: { video: typeof DEMO_VIDEOS[0] }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <a 
            href={`https://www.youtube.com/watch?v=${video.id}`} 
            target="_blank" 
            rel="noopener noreferrer"
            // Important: draggable="false" prevents the browser from trying to drag the card element 
            // when the user is just trying to scroll. This is the #1 cause of scroll jank on cards.
            draggable="false"
            className="group relative block w-full aspect-video p-2 rounded-[2.5rem] bg-white/20 dark:bg-white/5 border border-white/40 dark:border-white/10 transition-all duration-[1000ms] ease-apple hover:scale-[1.02] hover:bg-white/30 dark:hover:bg-white/10 hover:border-indigo-300/50 dark:hover:border-indigo-500/30 transform-gpu backface-hidden"
            aria-label={`Watch ${video.title}`}
            style={{
                // Enforce GPU layer
                transform: 'translate3d(0, 0, 0)',
                WebkitTransform: 'translate3d(0, 0, 0)',
                contain: 'paint layout'
            }}
        >
            {/* Inner Container: Clips the image and handles internal layout */}
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-slate-900 isolate mask-image-rounded">
                
                {/* 1. Placeholder / Loading State */}
                <div 
                    className="absolute inset-0 bg-slate-800 animate-pulse transition-opacity duration-500"
                    style={{ opacity: isLoaded ? 0 : 1 }} 
                />

                {/* 2. Image Layer - Hardware Accelerated Scaling */}
                <div className="absolute inset-0 transition-transform duration-[1000ms] ease-apple group-hover:scale-105 will-change-transform">
                    <img 
                        src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                        alt={video.title}
                        draggable="false" // CRITICAL: Prevents ghost dragging image
                        className={`w-full h-full object-cover transition-opacity duration-700 select-none ${isLoaded ? 'opacity-90 group-hover:opacity-100' : 'opacity-0'}`}
                        onLoad={() => setIsLoaded(true)}
                        loading="lazy"
                        decoding="async"
                    />
                </div>

                {/* 3. Gradient Overlay - Optimized: No blur, just gradient opacity */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-[1000ms] pointer-events-none" />

                {/* 4. Interactive Elements Layer */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
                    
                    {/* Play Button */}
                    <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full 
                        bg-white/10 backdrop-blur-sm border border-white/30 shadow-lg
                        transition-all duration-[1000ms] ease-apple
                        group-hover:scale-110 group-hover:rotate-3 group-hover:bg-white/20 group-hover:border-white/50"
                    >
                        <Play className="w-6 h-6 md:w-8 md:h-8 ml-1 text-white fill-white transition-transform duration-[1000ms] ease-apple group-hover:scale-110" />
                    </div>
                    
                    {/* Title Pill */}
                    <div className="absolute bottom-8 px-5 py-2 rounded-full flex items-center gap-2
                        bg-black/50 backdrop-blur-md border border-white/10 
                        transition-all duration-[1000ms] ease-apple
                        translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                    >
                        <span className="font-medium text-white tracking-wide text-xs md:text-sm truncate max-w-[200px]">
                            {video.title}
                        </span>
                        <ExternalLink className="w-3 h-3 text-white/80 shrink-0" />
                    </div>

                </div>
            </div>
        </a>
    );
});

VideoItem.displayName = 'VideoItem';

export const DemoSection: React.FC = () => {
  return (
    <section className="container mx-auto px-6 relative z-10" id="demo-section">
      <div className="text-center mb-20 md:mb-24">
        <ScrollReveal width="full">
            <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 dark:from-indigo-300 dark:via-purple-200 dark:to-blue-300 mb-6 tracking-tight py-2 leading-[1.4]">
                {TEXTS.DEMO.TITLE}
            </h2>
            <p className="text-slate-600 dark:text-indigo-200/60 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                {TEXTS.DEMO.SUBTITLE}
            </p>
        </ScrollReveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
        {DEMO_VIDEOS.map((video, index) => (
          <ScrollReveal key={video.id} width="full" delay={index < 4 ? index * 50 : 0} className="will-change-transform">
             <VideoItem video={video} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};
