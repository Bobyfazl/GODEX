
import React from 'react';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { DemoSection } from '../components/DemoSection';
import { UseCases } from '../components/UseCases';
import { CreatorReview } from '../components/CreatorReview';
import { ScrollReveal } from '../components/ScrollReveal';

export default function HomePage() {
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
}
