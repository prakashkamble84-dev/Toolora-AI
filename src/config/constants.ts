/**
 * Toolora AI — Centralized Configuration & Constants
 * All generation credit costs and plan defaults are managed here.
 */

import { SystemSettings, PricingPlan, ToolConfig } from '../types';

export const SYSTEM_CONFIG: SystemSettings = {
  textGenerationCost: 1,
  imageGenerationCost: 5,
  voiceGenerationCost: 3,
  videoGenerationCost: 20,
  defaultStarterCredits: 50,
};

export const TOOL_CONFIGS: Record<string, ToolConfig> = {
  text: {
    id: 'text',
    title: 'AI Text',
    tagline: 'Write blogs, emails, ads and social content in seconds.',
    description: 'Write blogs, emails, ads and social content in seconds.',
    creditCost: SYSTEM_CONFIG.textGenerationCost,
    path: '/dashboard/text',
    iconName: 'FileText',
    gradient: 'from-blue-600/20 via-cyan-500/10 to-transparent',
    accentColor: 'text-[#22D3EE] border-[#22D3EE]/30',
  },
  image: {
    id: 'image',
    title: 'AI Image',
    tagline: 'Turn your ideas into stunning visuals.',
    description: 'Turn your ideas into stunning visuals.',
    creditCost: SYSTEM_CONFIG.imageGenerationCost,
    path: '/dashboard/image',
    iconName: 'Image',
    gradient: 'from-violet-600/20 via-indigo-600/10 to-transparent',
    accentColor: 'text-[#7C3AED] border-[#7C3AED]/30',
  },
  voice: {
    id: 'voice',
    title: 'AI Voice',
    tagline: 'Transform text into natural-sounding speech.',
    description: 'Transform text into natural-sounding speech.',
    creditCost: SYSTEM_CONFIG.voiceGenerationCost,
    path: '/dashboard/voice',
    iconName: 'Mic',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    accentColor: 'text-[#22C55E] border-[#22C55E]/30',
  },
  video: {
    id: 'video',
    title: 'AI Video',
    tagline: 'Generate engaging videos from simple prompts.',
    description: 'Generate engaging videos from simple prompts.',
    creditCost: SYSTEM_CONFIG.videoGenerationCost,
    path: '/dashboard/video',
    iconName: 'Video',
    gradient: 'from-blue-600/20 via-indigo-500/10 to-transparent',
    accentColor: 'text-[#2563EB] border-[#2563EB]/30',
  },
  chat: {
    id: 'chat',
    title: 'Gemini Chat',
    tagline: 'Multi-turn conversational intelligence.',
    description: 'Conversational reasoning, code generation, and brainstorming with Gemini 3.5 & 3.1 Pro.',
    creditCost: 1,
    path: '/dashboard/chat',
    iconName: 'MessageSquare',
    gradient: 'from-violet-600/20 via-indigo-600/10 to-transparent',
    accentColor: 'text-[#7C3AED] border-[#7C3AED]/30',
  },
};

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'FREE',
    name: 'Free Starter',
    tagline: 'Explore all 4 generative studios with zero commitment.',
    priceMonthly: 0,
    priceAnnual: 0,
    credits: 50,
    features: [
      '50 Initial Starter Credits',
      'All 4 AI Studios (Text, Image, Voice, Video)',
      'Gemini 3.5 Flash Chat queries',
      'Standard 720p resolution exports',
      '7-day generation history archive',
      'Community & documentation support',
    ],
    highlight: false,
    ctaText: 'Get Started Free',
  },
  {
    id: 'STARTER',
    name: 'Creator Starter',
    tagline: 'Accessible entry point for solo creators, bloggers, and freelancers.',
    priceMonthly: 12,
    priceAnnual: 9, // $9/mo billed annually
    credits: 500,
    features: [
      '500 Monthly Generation Credits',
      'Full access to all 4 AI Studios',
      'Gemini 3.5 Flash & 3.1 Pro Chat',
      'High-speed generation queue',
      'Unused credits rollover (up to 1,000)',
      'Commercial usage rights included',
      '30-day generation cloud archive',
    ],
    highlight: false,
    badge: 'Best For Solo Creators',
    ctaText: 'Start Creator ($9/mo)',
  },
  {
    id: 'PRO',
    name: 'Pro Studio',
    tagline: 'Our flagship plan. Complete multimodal creation for high-output power users.',
    priceMonthly: 24,
    priceAnnual: 19, // $19/mo billed annually
    credits: 1500,
    features: [
      '1,500 Monthly Generation Credits',
      'Priority GPU Processing Queue (Fast Lane)',
      'Full HD 1080p Video & 4K Image Exports',
      'Image-to-Video & Photo Animation',
      'Unused credits rollover (up to 3,000)',
      'Unlimited Gemini 3.1 Pro Chat Sessions',
      'Full Commercial & Resale Rights',
      'Priority Email & Live Chat Support',
    ],
    highlight: true,
    badge: 'Most Popular • 81% Savings vs Separate Tools',
    ctaText: 'Upgrade to Pro Studio',
  },
  {
    id: 'BUSINESS',
    name: 'Business Scale',
    tagline: 'For marketing teams, agencies, and high-velocity digital production.',
    priceMonthly: 59,
    priceAnnual: 49, // $49/mo billed annually
    credits: 5000,
    features: [
      '5,000 Monthly Generation Credits',
      'Dedicated GPU Cluster (Instant Queuing)',
      'Ultra HD 4K Video Exports & Extended Lengths',
      'Developer REST API & Webhook Access',
      'Team Seats (Up to 5 Collaborative Members)',
      'Custom Brand Voices & Fine-Tuned Prompts',
      'Rollover credits up to 10,000',
      'Dedicated Account Manager & 99.9% SLA',
    ],
    highlight: false,
    badge: 'Agency & Enterprise',
    ctaText: 'Start Business Scale',
  },
];

export interface CompetitorTool {
  id: string;
  name: string;
  monthlyCost: number;
  focus: string;
  includedInToolora: string;
  annualCost: number;
}

export const COMPETITOR_TOOLS: CompetitorTool[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT Plus / Claude Pro',
    monthlyCost: 20,
    annualCost: 240,
    focus: 'Conversational AI & basic text/code',
    includedInToolora: 'Gemini 3.5 & 3.1 Pro Chat + AI Text Copywriter',
  },
  {
    id: 'midjourney',
    name: 'Midjourney Standard',
    monthlyCost: 30,
    annualCost: 360,
    focus: 'Image generation only (Discord-based)',
    includedInToolora: 'AI Image Studio with Imagen models & styles',
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs Creator',
    monthlyCost: 22,
    annualCost: 264,
    focus: 'Voice synthesis only (100k char cap)',
    includedInToolora: 'AI Voice Studio with neural voiceover voices',
  },
  {
    id: 'runway',
    name: 'Runway Gen-3 Standard',
    monthlyCost: 28,
    annualCost: 336,
    focus: 'Video generation only (625 credits/mo)',
    includedInToolora: 'AI Video Studio with text-to-video & image-to-video',
  },
];

export interface CreditPack {
  id: string;
  name: string;
  credits: number;
  price: number;
  bonus: string;
  popular?: boolean;
}

export const CREDIT_PACKS: CreditPack[] = [
  {
    id: 'pack-250',
    name: 'Quick Booster',
    credits: 250,
    price: 6,
    bonus: 'Perfect for a single project rush',
  },
  {
    id: 'pack-750',
    name: 'Creator Pack',
    credits: 750,
    price: 15,
    bonus: '+50 bonus credits included',
    popular: true,
  },
  {
    id: 'pack-2000',
    name: 'Studio Pro Pack',
    credits: 2000,
    price: 35,
    bonus: '+200 bonus credits • Best value',
  },
];

export const APP_INFO = {
  name: 'Toolora AI',
  tagline: 'Create. Generate. Automate.',
  heroHeading: 'Create Anything With AI',
  heroSubheading: 'Generate text, images, voice and video from one powerful AI workspace.',
};
