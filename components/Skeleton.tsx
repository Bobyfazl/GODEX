
import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'rect' | 'circle' | 'text';
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "", variant = 'rect' }) => {
  const baseClasses = "animate-pulse bg-slate-200/50 dark:bg-slate-800/50 backdrop-blur-sm";
  
  let variantClasses = "";
  if (variant === 'circle') variantClasses = "rounded-full";
  else if (variant === 'text') variantClasses = "rounded-md h-4 w-full";
  else variantClasses = "rounded-[2rem]"; // Default for our cards

  return (
    <div className={`${baseClasses} ${variantClasses} ${className}`} aria-hidden="true" />
  );
};

export const CardSkeleton: React.FC = () => (
  <div className="relative h-full p-10 rounded-[2rem] bg-white/40 dark:bg-[#0f172a]/20 border border-white/40 dark:border-white/5 overflow-hidden">
     {/* Shimmer effect */}
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent z-10" />
    
    <div className="flex flex-col items-center">
        <Skeleton variant="circle" className="w-16 h-16 mb-8" />
        <Skeleton variant="text" className="w-3/4 h-8 mb-4" />
        <Skeleton variant="text" className="w-full h-4 mb-2" />
        <Skeleton variant="text" className="w-5/6 h-4 mb-8" />
        <Skeleton variant="text" className="w-1/3 h-5" />
    </div>
  </div>
);
