
import React from 'react';
import { Hero } from './Hero';
import { Features } from './Features';
import { DemoSection } from './DemoSection';
import { UseCases } from './UseCases';
import { CreatorReview } from './CreatorReview';
import { ScrollReveal } from './ScrollReveal';

export const Home: React.FC = () => {
  return (
    <main className="flex flex-col gap-32 pb-32">
      <Hero />
      
      <ScrollReveal threshold={0.2} width="full">
        <CreatorReview />
      </ScrollReveal>

      <ScrollReveal threshold={0.1} width="full">
        <Features />
      </ScrollReveal>

      <ScrollReveal threshold={0.1} width="full">
        <DemoSection />
      </ScrollReveal>

      <ScrollReveal threshold={0.1} width="full">
        <UseCases />
      </ScrollReveal>
    </main>
  );
};
