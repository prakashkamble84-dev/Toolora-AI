/**
 * Toolora AI — Core Type Definitions
 * Phase 1 SaaS Architecture & Data Models
 */

export type PlanType = 'FREE' | 'STARTER' | 'PRO' | 'BUSINESS';

export type GenerationType = 'text' | 'image' | 'voice' | 'video' | 'chat';

export type GenerationStatus = 'QUEUED' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

export type TransactionType = 'GRANT' | 'USAGE' | 'REFUND' | 'ADJUSTMENT' | 'PURCHASE';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  photoURL?: string;
  plan: PlanType;
  credits: number;
  monthlyCredits: number;
  creditsUsed: number;
  billingPeriodStart?: string;
  billingPeriodEnd?: string;
  createdAt: string;
  updatedAt: string;
  role?: 'user' | 'admin';
}

export interface GenerationSettings {
  // Text settings
  contentType?: 'Blog' | 'Social Media' | 'Email' | 'Advertisement' | 'Product Description' | 'General';
  tone?: 'Professional' | 'Friendly' | 'Persuasive' | 'Creative' | 'Formal' | 'Casual';
  length?: 'Short' | 'Medium' | 'Long';
  language?: string;

  // Image settings
  aspectRatio?: '1:1' | '16:9' | '9:16' | '4:3';
  quality?: 'Standard' | 'High';
  numImages?: 1 | 2 | 4;
  style?: 'Realistic' | 'Cinematic' | 'Illustration' | '3D' | 'Anime' | 'Minimal';

  // Voice settings
  voice?: string;
  speakingStyle?: string;
  speed?: number;
  pitch?: number;

  // Video settings
  duration?: '5s' | '10s';
  resolution?: '720p' | '1080p';
  videoStyle?: 'Cinematic' | 'Hyper-realistic' | 'Motion Graphic';
}

export interface GenerationRecord {
  id: string;
  userId: string;
  type: GenerationType;
  prompt: string;
  settings: GenerationSettings;
  result?: string;
  storagePath?: string;
  downloadUrl?: string;
  providerJobId?: string;
  status: GenerationStatus;
  creditsUsed: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreditTransaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  source: string;
  generationId?: string;
  createdAt: string;
}

export interface PricingPlan {
  id: PlanType;
  name: string;
  tagline: string;
  priceMonthly: number;
  priceAnnual: number;
  credits: number;
  features: string[];
  highlight?: boolean;
  badge?: string;
  ctaText: string;
}

export interface ToolConfig {
  id: GenerationType;
  title: string;
  tagline: string;
  description: string;
  creditCost: number;
  path: string;
  iconName: string;
  gradient: string;
  accentColor: string;
}

export interface SystemSettings {
  textGenerationCost: number;
  imageGenerationCost: number;
  voiceGenerationCost: number;
  videoGenerationCost: number;
  defaultStarterCredits: number;
}
