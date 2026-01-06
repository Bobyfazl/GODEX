
import { LucideIcon } from 'lucide-react';

export interface FeatureItem {
  id: string; // Unique identifier for routing
  title: string;
  desc: string;
  icon?: LucideIcon;
  // New fields for deep view
  intro: string; // A hook paragraph
  technicalDeepDive: string[]; // Array of long paragraphs
  architectureHighlights: { title: string; detail: string }[];
  faq: { question: string; answer: string }[];
  benefits: string[];
  specs: Record<string, string>;
}

export interface UseCaseItem {
  id: string; // Added ID for routing
  title: string;
  desc: string;
  icon?: LucideIcon;
  // New fields for deep view
  intro: string;
  comprehensiveAnalysis: string[]; // Long form content
  challengesAndSolutions: { challenge: string; solution: string }[];
  benefits: string[];
  impactStats: Record<string, string>; // e.g., "Efficiency: +40%"
  implementationSteps: string[];
}

export interface PricingFeatureGroup {
  category: string;
  items: string[];
}

export interface PricingPlan {
  id: string;
  title: string;
  price: string;
  period?: string;
  desc: string;
  intro: string;
  features: PricingFeatureGroup[];
  color: string;
  cta: string;
  popular?: boolean;
  targetAudience: string;
  faq: { question: string; answer: string }[];
}

export enum ChatStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}