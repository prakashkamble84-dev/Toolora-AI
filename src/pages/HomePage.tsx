import React, { useState } from 'react';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { PRICING_PLANS } from '../config/constants';
import { PricingCard } from '../components/cards/PricingCard';
import { PricingPlan } from '../types';
import { HeroCreativeCollage } from '../components/home/HeroCreativeCollage';
import { EditorialToolsSection } from '../components/home/EditorialToolsSection';
import { CreatorCategoriesSection } from '../components/home/CreatorCategoriesSection';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { CreativeShowcaseGallery } from '../components/home/CreativeShowcaseGallery';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isAnnual, setIsAnnual] = useState(false);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleSelectPlan = (plan: PricingPlan) => {
    if (plan.id === 'FREE') {
      onNavigate('/signup');
    } else {
      onNavigate('/pricing');
    }
  };

  const faqs = [
    {
      q: 'What makes Toolora AI different from single-tool AI generators?',
      a: 'Toolora unifies high-end generative models for image, video, voice, and text into one seamless creative suite. Instead of maintaining 4 different subscriptions and fragmented files, you can ideate, write, voice, and animate assets in a single workspace.',
    },
    {
      q: 'Which foundational AI models power Toolora?',
      a: 'Toolora connects to leading foundation models: Google Gemini 3.5 & Gemini 3.1 Pro for text synthesis, Gemini 3.1 Flash Image for rapid visual ideation, Google Veo 3.1 for cinematic motion video, and neural acoustic models for expressive voiceovers.',
    },
    {
      q: 'Do I own the commercial rights to generated content?',
      a: 'Yes. All text, imagery, voiceovers, and videos produced on Toolora carry complete commercial licensing rights for agency, enterprise, and creator use without watermarks.',
    },
    {
      q: 'How does the monthly credit allocation work?',
      a: 'Credits reflect computational intensity: Text costs 1 credit, Voice costs 3 credits, Images cost 5 credits, and Veo Video rendering costs 20 credits. Free accounts receive 50 starter credits upon signup.',
    },
  ];

  return (
    <div className="w-full bg-[#FAF7F2] text-[#172033] selection:bg-[#FF5A36]/20 selection:text-[#172033]">
      {/* 1. HERO SECTION (EDITORIAL SPLIT: LEFT 48% / RIGHT 52%) */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* LEFT 48% (Spans 6 cols on lg desktop) */}
            <div className="lg:col-span-6 text-left space-y-6">
              {/* Small Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5DED4] text-[11px] font-bold uppercase tracking-wider text-[#FF5A36] shadow-sm font-display">
                <span className="w-2 h-2 rounded-full bg-[#FF5A36]" />
                <span>AI CREATIVE WORKSPACE</span>
              </div>

              {/* Headline */}
              <h1 className="text-[44px] sm:text-[60px] lg:text-[72px] font-extrabold text-[#172033] tracking-[-0.03em] leading-[0.98] font-display">
                Turn Ideas Into{' '}
                <span className="text-[#FF5A36] block sm:inline">
                  Something Extraordinary.
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-[18px] text-[#5F6878] max-w-xl leading-[1.6] font-normal">
                Create images, videos, voices and content from one beautifully simple AI workspace.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('/signup')}
                  className="h-[52px] px-8 rounded-[12px] bg-[#FF5A36] text-white text-[16px] font-semibold hover:bg-[#E84C28] shadow-[0_6px_22px_rgba(255,90,54,0.3)] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>START CREATING</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('ai-tools');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="h-[52px] px-8 rounded-[12px] bg-white border-1.5 border-[#172033] text-[#172033] text-[16px] font-semibold hover:bg-[#F1ECE4] transition-all cursor-pointer flex items-center justify-center"
                >
                  EXPLORE TOOLS
                </button>
              </div>

              {/* Social Proof Note */}
              <div className="pt-4 flex items-center gap-4 text-[13px] text-[#5F6878]">
                <div className="flex -space-x-2">
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="Creator"
                    referrerPolicy="no-referrer"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                    alt="Creator"
                    referrerPolicy="no-referrer"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
                    alt="Creator"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span>50 Free Credits • No Credit Card Required</span>
              </div>
            </div>

            {/* RIGHT 52% (Spans 6 cols on lg desktop) */}
            <div className="lg:col-span-6">
              <HeroCreativeCollage />
            </div>
          </div>
        </div>
      </section>

      {/* 2. EDITORIAL AI TOOLS (4 ASYMMETRIC CARDS) */}
      <EditorialToolsSection onNavigate={onNavigate} />

      {/* 3. MADE FOR PEOPLE WHO CREATE (FEATURE CATEGORIES) */}
      <CreatorCategoriesSection />

      {/* 4. THREE-STEP EDITORIAL WORKFLOW */}
      <HowItWorksSection />

      {/* 5. CREATIVE SHOWCASE GALLERY (MADE WITH TOOLORA) */}
      <CreativeShowcaseGallery />

      {/* 6. PRICING PREVIEW */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="max-w-2xl mx-auto mb-12">
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#FF5A36] font-display">
            Predictable & Reasonable Plans
          </span>
          <h2 className="text-[36px] sm:text-[48px] font-bold text-[#172033] tracking-tight leading-[1.08] mt-2 mb-4 font-display">
            4 AI Studios. Up to 81% Lower Cost.
          </h2>
          <p className="text-[17px] text-[#5F6878]">
            Why pay $100+/mo for ChatGPT, Midjourney, ElevenLabs, and Runway separately? Start free or unlock full studio power from just <strong className="text-[#172033]">$9/mo</strong>.
          </p>

          {/* Toggle */}
          <div className="pt-6">
            <div className="inline-flex items-center p-1 rounded-[12px] bg-[#F1ECE4] border border-[#E5DED4]">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-4 py-2 rounded-[9px] text-[13px] font-semibold transition-all cursor-pointer ${
                  !isAnnual ? 'bg-white text-[#172033] shadow-sm font-bold' : 'text-[#5F6878] hover:text-[#172033]'
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-4 py-2 rounded-[9px] text-[13px] font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isAnnual ? 'bg-white text-[#172033] shadow-sm font-bold' : 'text-[#5F6878] hover:text-[#172033]'
                }`}
              >
                <span>Annual Billing</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-[4px] bg-[#238B6F]/20 text-[#238B6F] font-bold">
                  Save Up to 25%
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {PRICING_PLANS.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              isAnnual={isAnnual}
              onSelect={handleSelectPlan}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => onNavigate('/pricing')}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#FF5A36] hover:text-[#E84C28] uppercase tracking-wider font-display cursor-pointer"
          >
            <span>View Full Market Breakdown & Feature Matrix →</span>
          </button>
        </div>
      </section>

      {/* 7. DARK SECTION (HIGH-IMPACT CLOSING CTA) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#172033] text-white text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#FF5A36] font-display">
            Ready to Begin?
          </span>
          <h2 className="text-[40px] sm:text-[56px] font-extrabold text-white tracking-tight leading-[1.04] font-display">
            Turn Your Creative Vision Into Reality.
          </h2>
          <p className="text-[18px] text-[#94A3B8] leading-[1.6] max-w-xl mx-auto">
            Experience high-velocity creative generation across image, video, voice, and text from one intuitive platform.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('/signup')}
              className="w-full sm:w-auto h-[52px] px-8 rounded-[12px] bg-[#FF5A36] text-white text-[16px] font-semibold hover:bg-[#E84C28] shadow-[0_6px_22px_rgba(255,90,54,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>START CREATING FREE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('/pricing')}
              className="w-full sm:w-auto h-[52px] px-8 rounded-[12px] bg-transparent border border-white/30 text-white text-[16px] font-semibold hover:bg-white/10 transition-all cursor-pointer"
            >
              VIEW ALL PLANS
            </button>
          </div>
        </div>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS */}
      <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-left">
        <div className="text-center mb-12">
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#FF5A36] font-display">
            Clear Answers
          </span>
          <h2 className="text-[32px] sm:text-[40px] font-bold text-[#172033] tracking-tight font-display mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-[16px] bg-white border border-[#E5DED4] overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-display font-bold text-[17px] text-[#172033] hover:text-[#FF5A36] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#5F6878] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#FF5A36]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-[15px] text-[#5F6878] leading-relaxed border-t border-[#E5DED4]/60 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
