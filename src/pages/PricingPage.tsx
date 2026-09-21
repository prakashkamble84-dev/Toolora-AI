import React, { useState } from 'react';
import {
  ShieldCheck,
  Zap,
  Sparkles,
  TrendingDown,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Coins,
  ArrowRight,
  Layers,
  Flame,
  Check,
  Clock,
  Lock,
} from 'lucide-react';
import { PRICING_PLANS, COMPETITOR_TOOLS, CREDIT_PACKS, CreditPack } from '../config/constants';
import { PricingCard } from '../components/cards/PricingCard';
import { PricingPlan } from '../types';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface PricingPageProps {
  onNavigate: (path: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  const [isAnnual, setIsAnnual] = useState(true);
  const { user, changePlan, updateCredits } = useAuth();
  const { showToast } = useToast();

  // Interactive Competitor Cost Calculator State
  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>([
    'chatgpt',
    'midjourney',
    'elevenlabs',
    'runway',
  ]);

  const toggleCompetitor = (id: string) => {
    setSelectedCompetitors((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const competitorMonthlyTotal = COMPETITOR_TOOLS.filter((c) =>
    selectedCompetitors.includes(c.id)
  ).reduce((sum, c) => sum + c.monthlyCost, 0);

  const competitorAnnualTotal = competitorMonthlyTotal * 12;
  const tooloraProAnnualCost = 19 * 12; // $228/yr
  const annualSavings = Math.max(0, competitorAnnualTotal - tooloraProAnnualCost);
  const savingsPercent =
    competitorAnnualTotal > 0
      ? Math.round((annualSavings / competitorAnnualTotal) * 100)
      : 0;

  const handleSelectPlan = (plan: PricingPlan) => {
    if (plan.id === user?.plan) {
      showToast(`You are currently on the ${plan.name}.`, 'info');
      return;
    }

    if (plan.id === 'FREE') {
      changePlan('FREE', 50);
      showToast('Switched to Free Starter plan with 50 credits.', 'info');
      onNavigate('/dashboard');
      return;
    }

    // Activate selected plan
    changePlan(plan.id, plan.credits);
    showToast(
      `🎉 Upgraded to ${plan.name}! ${plan.credits.toLocaleString()} credits added to your workspace.`,
      'success'
    );
  };

  const handleBuyPack = (pack: CreditPack) => {
    updateCredits(pack.credits);
    showToast(
      `⚡ Added ${pack.credits.toLocaleString()} top-up credits to your account!`,
      'success'
    );
  };

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Why is Toolora AI significantly more affordable than buying tools separately?',
      a: 'Individual AI apps build single-purpose wrappers with high individual profit margins, requiring you to pay $20-$30 per tool across 4 different platforms ($100+/mo). Toolora utilizes high-efficiency unified Google Gemini 3.5 & Imagen infrastructure with consolidated GPU clustering. By sharing computing pools across text, image, voice, and video, we pass tremendous cost savings directly to creators.',
    },
    {
      q: 'Do unused generation credits roll over into the next month?',
      a: 'Yes! Unlike single-purpose platforms where your monthly quota vanishes on day 30, all paid Toolora AI plans feature automatic credit rollover. Creator Starter rolls over up to 1,000 credits, Pro Studio rolls over up to 3,000 credits, and Business Scale rolls over up to 10,000 credits.',
    },
    {
      q: 'Can I use generated text, images, voices, and videos for commercial client work?',
      a: 'Absolutely. All paid tiers (Creator Starter, Pro Studio, and Business Scale) grant full, unrestricted commercial ownership rights. You are free to publish, sell, monetize, and distribute all generated assets for client campaigns, YouTube channels, advertisements, and SaaS products.',
    },
    {
      q: 'What happens if I exhaust my monthly credits before the billing cycle ends?',
      a: 'You never get locked out. You can either upgrade your plan with prorated billing or purchase on-demand Pay-As-You-Go Credit Top-Up Packs starting at just $6 without altering your monthly subscription.',
    },
    {
      q: 'What is the refund and cancellation policy?',
      a: 'We offer a no-questions-asked 14-day money-back guarantee on all first-time subscriptions. You can cancel your subscription at any time with a single click inside Workspace Settings—no phone calls, no retention hoops.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20 text-center">
      {/* 1. HERO HEADER */}
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF0EB] border border-[#FF5A36]/30 text-[#FF5A36] text-xs font-bold uppercase tracking-wider font-display">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Fair, Transparent & Reasonable AI Pricing</span>
        </div>

        <h1 className="text-[36px] sm:text-[50px] font-bold text-[#172033] tracking-tight leading-[1.08] font-display">
          All 4 AI Studios. One Unified Plan.{' '}
          <span className="text-[#FF5A36]">Up to 81% Less.</span>
        </h1>

        <p className="text-[16px] text-[#5F6878] leading-relaxed max-w-2xl mx-auto">
          Stop juggling 4 fragmented subscriptions for text, image, voice, and video.
          Get everything in one intuitive creative studio starting at just{' '}
          <strong className="text-[#172033]">$9/month</strong>.
        </p>

        {/* Annual / Monthly Toggle */}
        <div className="pt-4 flex items-center justify-center">
          <div className="inline-flex items-center p-1 rounded-[14px] bg-white border border-[#E5DED4] shadow-xs">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2.5 rounded-[10px] text-[13px] font-bold transition-all cursor-pointer font-display ${
                !isAnnual
                  ? 'bg-[#172033] text-white shadow-xs'
                  : 'text-[#5F6878] hover:text-[#172033]'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-5 py-2.5 rounded-[10px] text-[13px] font-bold transition-all flex items-center gap-2 cursor-pointer font-display ${
                isAnnual
                  ? 'bg-[#172033] text-white shadow-xs'
                  : 'text-[#5F6878] hover:text-[#172033]'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E8F5E9] text-[#238B6F] font-extrabold border border-[#238B6F]/20">
                SAVE UP TO 25%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. PRICING CARDS GRID (4 TIERS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {PRICING_PLANS.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            isAnnual={isAnnual}
            onSelect={handleSelectPlan}
            isCurrent={user?.plan === plan.id}
          />
        ))}
      </div>

      {/* 3. VALUE COMPARISON CALCULATOR (TOOLORA VS FRAGMENTED STACK) */}
      <div className="rounded-[24px] bg-gradient-to-b from-white to-[#FAF7F2] border-2 border-[#E5DED4] p-8 sm:p-10 text-left shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-[#E5DED4]">
          <div className="max-w-xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[8px] bg-[#FFF0EB] text-[#FF5A36] text-[11px] font-bold uppercase tracking-wider font-display">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>Direct Market Price Comparison</span>
            </div>
            <h2 className="text-[26px] sm:text-[32px] font-bold text-[#172033] font-display tracking-tight">
              Compare Toolora AI vs. Buying Individual Apps
            </h2>
            <p className="text-[14px] text-[#5F6878] leading-relaxed">
              Select the apps you currently pay for (or would need to buy separately) to see how much you save with Toolora AI:
            </p>
          </div>

          {/* Savings Highlight Box */}
          <div className="bg-[#172033] text-white rounded-[18px] p-6 text-center lg:text-right shrink-0 min-w-[280px] shadow-lg">
            <span className="text-[11px] font-bold text-[#FFB547] uppercase tracking-wider block mb-1 font-display">
              Estimated Annual Savings
            </span>
            <div className="text-[38px] font-extrabold text-white font-display tracking-tight leading-none">
              ${annualSavings.toLocaleString()}
              <span className="text-[16px] font-semibold text-[#8F97A3]">/yr</span>
            </div>
            <span className="inline-block mt-2 text-[11px] font-bold px-2.5 py-1 rounded-[6px] bg-[#238B6F] text-white">
              {savingsPercent}% Lower Cost with Toolora Pro
            </span>
          </div>
        </div>

        {/* Interactive Selector */}
        <div className="pt-8 space-y-6">
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#172033] block font-display">
            Tap to toggle apps in your current stack:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {COMPETITOR_TOOLS.map((tool) => {
              const isSelected = selectedCompetitors.includes(tool.id);
              return (
                <button
                  key={tool.id}
                  onClick={() => toggleCompetitor(tool.id)}
                  className={`p-4 rounded-[16px] border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white border-[#FF5A36] shadow-sm ring-1 ring-[#FF5A36]/30'
                      : 'bg-[#FAF7F2] border-[#E5DED4] opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-sm font-bold text-[#172033] font-display">
                      {tool.name}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-[#FF5A36] text-white'
                          : 'border border-[#CBD5E1] bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                  <div className="text-[11px] text-[#5F6878] mb-3 leading-snug">
                    {tool.focus}
                  </div>
                  <div className="pt-2 border-t border-[#E5DED4] flex items-center justify-between text-xs">
                    <span className="text-[#8F97A3]">Separate price:</span>
                    <strong className="text-[#172033] font-mono font-bold">
                      ${tool.monthlyCost}/mo
                    </strong>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Comparison Breakdown Bar */}
          <div className="p-5 rounded-[16px] bg-white border border-[#E5DED4] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[10px] bg-[#FFF0EB] border border-[#FF5A36]/20 flex items-center justify-center text-[#FF5A36] shrink-0">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-[#172033] block text-sm font-display">
                  Separate stack total: ${competitorMonthlyTotal}/mo (${competitorAnnualTotal}/yr) across {selectedCompetitors.length} logins
                </span>
                <span className="text-[#5F6878]">
                  Toolora Pro gives you all 4 studios + Gemini Chat for just $19/mo ($228/yr) with shared credits!
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                const proPlan = PRICING_PLANS.find((p) => p.id === 'PRO');
                if (proPlan) handleSelectPlan(proPlan);
              }}
              className="px-5 py-2.5 rounded-[10px] bg-[#FF5A36] text-white font-bold hover:bg-[#E84C28] transition-all cursor-pointer whitespace-nowrap shadow-xs flex items-center gap-1.5 font-display"
            >
              <span>Get Toolora Pro ($19/mo)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. HEAD-TO-HEAD FEATURE & COMPETITOR MATRIX TABLE */}
      <div className="pt-4 text-left max-w-6xl mx-auto space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-[28px] font-bold text-[#172033] font-display">
            Comprehensive Platform Comparison
          </h2>
          <p className="text-[14px] text-[#5F6878]">
            See how Toolora AI compares across modalities, pricing, and infrastructure
          </p>
        </div>

        <div className="rounded-[20px] border border-[#E5DED4] bg-white overflow-hidden overflow-x-auto shadow-xs">
          <table className="w-full text-[13px] text-left">
            <thead>
              <tr className="border-b border-[#E5DED4] bg-[#FAF7F2] text-[#172033] font-bold">
                <th className="p-4 pl-6 min-w-[200px]">Capability / Feature</th>
                <th className="p-4 text-center bg-[#FFF0EB]/50 border-x border-[#FF5A36]/20 text-[#FF5A36] min-w-[140px]">
                  Toolora AI (All-in-One)
                </th>
                <th className="p-4 text-center min-w-[130px]">ChatGPT Plus</th>
                <th className="p-4 text-center min-w-[130px]">Midjourney</th>
                <th className="p-4 text-center min-w-[130px]">ElevenLabs</th>
                <th className="p-4 text-center min-w-[130px]">Runway Gen-3</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5DED4] text-[#5F6878]">
              <tr>
                <td className="p-4 pl-6 font-semibold text-[#172033]">Starting Price</td>
                <td className="p-4 text-center font-mono font-bold text-[#238B6F] bg-[#FFF0EB]/20 border-x border-[#FF5A36]/10">
                  $0 Free / $9 mo
                </td>
                <td className="p-4 text-center font-mono">$20 / mo</td>
                <td className="p-4 text-center font-mono">$30 / mo</td>
                <td className="p-4 text-center font-mono">$22 / mo</td>
                <td className="p-4 text-center font-mono">$28 / mo</td>
              </tr>
              <tr>
                <td className="p-4 pl-6 font-semibold text-[#172033]">Modalities Included</td>
                <td className="p-4 text-center font-bold text-[#172033] bg-[#FFF0EB]/20 border-x border-[#FF5A36]/10">
                  All 4 + Gemini Chat
                </td>
                <td className="p-4 text-center text-[#5F6878]">Chat + DALL-E only</td>
                <td className="p-4 text-center text-[#5F6878]">Image only</td>
                <td className="p-4 text-center text-[#5F6878]">Voice only</td>
                <td className="p-4 text-center text-[#5F6878]">Video only</td>
              </tr>
              <tr>
                <td className="p-4 pl-6 font-semibold text-[#172033]">AI Copywriting Studio</td>
                <td className="p-4 text-center bg-[#FFF0EB]/20 border-x border-[#FF5A36]/10">
                  <CheckCircle2 className="w-4 h-4 text-[#238B6F] mx-auto" />
                </td>
                <td className="p-4 text-center">
                  <CheckCircle2 className="w-4 h-4 text-[#238B6F] mx-auto" />
                </td>
                <td className="p-4 text-center">
                  <XCircle className="w-4 h-4 text-[#D64545]/60 mx-auto" />
                </td>
                <td className="p-4 text-center">
                  <XCircle className="w-4 h-4 text-[#D64545]/60 mx-auto" />
                </td>
                <td className="p-4 text-center">
                  <XCircle className="w-4 h-4 text-[#D64545]/60 mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="p-4 pl-6 font-semibold text-[#172033]">Photorealistic Image Studio</td>
                <td className="p-4 text-center bg-[#FFF0EB]/20 border-x border-[#FF5A36]/10">
                  <CheckCircle2 className="w-4 h-4 text-[#238B6F] mx-auto" />
                </td>
                <td className="p-4 text-center text-xs text-[#8F97A3]">Basic DALL-E</td>
                <td className="p-4 text-center">
                  <CheckCircle2 className="w-4 h-4 text-[#238B6F] mx-auto" />
                </td>
                <td className="p-4 text-center">
                  <XCircle className="w-4 h-4 text-[#D64545]/60 mx-auto" />
                </td>
                <td className="p-4 text-center">
                  <XCircle className="w-4 h-4 text-[#D64545]/60 mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="p-4 pl-6 font-semibold text-[#172033]">Neural Voiceover Studio</td>
                <td className="p-4 text-center bg-[#FFF0EB]/20 border-x border-[#FF5A36]/10">
                  <CheckCircle2 className="w-4 h-4 text-[#238B6F] mx-auto" />
                </td>
                <td className="p-4 text-center text-xs text-[#8F97A3]">Voice chat only</td>
                <td className="p-4 text-center">
                  <XCircle className="w-4 h-4 text-[#D64545]/60 mx-auto" />
                </td>
                <td className="p-4 text-center">
                  <CheckCircle2 className="w-4 h-4 text-[#238B6F] mx-auto" />
                </td>
                <td className="p-4 text-center">
                  <XCircle className="w-4 h-4 text-[#D64545]/60 mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="p-4 pl-6 font-semibold text-[#172033]">Cinematic AI Video Studio</td>
                <td className="p-4 text-center bg-[#FFF0EB]/20 border-x border-[#FF5A36]/10">
                  <CheckCircle2 className="w-4 h-4 text-[#238B6F] mx-auto" />
                </td>
                <td className="p-4 text-center">
                  <XCircle className="w-4 h-4 text-[#D64545]/60 mx-auto" />
                </td>
                <td className="p-4 text-center">
                  <XCircle className="w-4 h-4 text-[#D64545]/60 mx-auto" />
                </td>
                <td className="p-4 text-center">
                  <XCircle className="w-4 h-4 text-[#D64545]/60 mx-auto" />
                </td>
                <td className="p-4 text-center">
                  <CheckCircle2 className="w-4 h-4 text-[#238B6F] mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="p-4 pl-6 font-semibold text-[#172033]">Unified Shared Credit Pool</td>
                <td className="p-4 text-center font-bold text-[#238B6F] bg-[#FFF0EB]/20 border-x border-[#FF5A36]/10">
                  Yes (Shared 100%)
                </td>
                <td className="p-4 text-center text-xs">N/A</td>
                <td className="p-4 text-center text-xs text-[#D64545]">Siloed</td>
                <td className="p-4 text-center text-xs text-[#D64545]">Siloed</td>
                <td className="p-4 text-center text-xs text-[#D64545]">Siloed</td>
              </tr>
              <tr>
                <td className="p-4 pl-6 font-semibold text-[#172033]">Unused Credits Rollover</td>
                <td className="p-4 text-center font-bold text-[#238B6F] bg-[#FFF0EB]/20 border-x border-[#FF5A36]/10">
                  Yes (Up to 10k)
                </td>
                <td className="p-4 text-center text-xs">No</td>
                <td className="p-4 text-center text-xs text-[#D64545]">Expires monthly</td>
                <td className="p-4 text-center text-xs text-[#D64545]">Expires monthly</td>
                <td className="p-4 text-center text-xs text-[#D64545]">Expires monthly</td>
              </tr>
              <tr>
                <td className="p-4 pl-6 font-semibold text-[#172033]">Commercial Usage Rights</td>
                <td className="p-4 text-center font-bold text-[#238B6F] bg-[#FFF0EB]/20 border-x border-[#FF5A36]/10">
                  Full Commercial
                </td>
                <td className="p-4 text-center text-xs">Included</td>
                <td className="p-4 text-center text-xs">Paid tiers only</td>
                <td className="p-4 text-center text-xs">Paid tiers only</td>
                <td className="p-4 text-center text-xs">Standard terms</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. PAY-AS-YOU-GO ON-DEMAND CREDIT TOP-UPS */}
      <div className="pt-6 text-left max-w-5xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[8px] bg-[#E8F5E9] text-[#238B6F] text-[11px] font-bold uppercase tracking-wider font-display">
            <Coins className="w-3.5 h-3.5" />
            <span>No Subscription Commitment Required</span>
          </div>
          <h2 className="text-[28px] font-bold text-[#172033] font-display">
            Need Extra Credits? Pay-As-You-Go Top-Up Packs
          </h2>
          <p className="text-[14px] text-[#5F6878] max-w-xl mx-auto">
            Top-up packs never expire. Perfect for high-intensity campaign rushes or testing without a recurring monthly charge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CREDIT_PACKS.map((pack) => (
            <div
              key={pack.id}
              className={`rounded-[20px] p-6 bg-white border text-left flex flex-col justify-between transition-all shadow-xs ${
                pack.popular
                  ? 'border-[#FF5A36] ring-1 ring-[#FF5A36]/30 shadow-md'
                  : 'border-[#E5DED4] hover:border-[#D4C9BC]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-[17px] font-bold text-[#172033] font-display">{pack.name}</h4>
                  {pack.popular && (
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-[5px] bg-[#FF5A36] text-white uppercase font-display">
                      Popular
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-1.5 mb-2">
                  <span className="text-[32px] font-extrabold text-[#172033] font-mono">
                    ${pack.price}
                  </span>
                  <span className="text-xs text-[#5F6878]">one-time purchase</span>
                </div>

                <div className="p-3 rounded-[12px] bg-[#FAF7F2] border border-[#E5DED4] text-xs space-y-1 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[#5F6878]">Credits:</span>
                    <strong className="font-mono text-[#172033] font-bold">
                      +{pack.credits.toLocaleString()} Credits
                    </strong>
                  </div>
                  <div className="text-[11px] text-[#238B6F] font-semibold">{pack.bonus}</div>
                </div>
              </div>

              <button
                onClick={() => handleBuyPack(pack)}
                className="w-full py-2.5 rounded-[10px] bg-[#172033] text-white text-xs font-bold hover:bg-[#232F48] transition-all cursor-pointer flex items-center justify-center gap-1.5 font-display"
              >
                <Zap className="w-3.5 h-3.5 text-[#FFB547]" />
                <span>Instant Top-Up (${pack.price})</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 6. CONVERSION TRUST BADGES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto text-left">
        <div className="p-4 rounded-[16px] bg-white border border-[#E5DED4] flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-[10px] bg-[#E8F5E9] text-[#238B6F] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#172033] block font-display">14-Day Guarantee</span>
            <span className="text-[11px] text-[#5F6878]">100% money-back guarantee</span>
          </div>
        </div>

        <div className="p-4 rounded-[16px] bg-white border border-[#E5DED4] flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-[10px] bg-[#FFF0EB] text-[#FF5A36] flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#172033] block font-display">Cancel Anytime</span>
            <span className="text-[11px] text-[#5F6878]">1-click online cancellation</span>
          </div>
        </div>

        <div className="p-4 rounded-[16px] bg-white border border-[#E5DED4] flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-[10px] bg-[#FFF8E1] text-[#D97706] flex items-center justify-center shrink-0">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#172033] block font-display">Credits Rollover</span>
            <span className="text-[11px] text-[#5F6878]">Unused credits stay with you</span>
          </div>
        </div>

        <div className="p-4 rounded-[16px] bg-white border border-[#E5DED4] flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-[10px] bg-[#EAE8FD] text-[#6366F1] flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#172033] block font-display">Commercial License</span>
            <span className="text-[11px] text-[#5F6878]">Full resale & usage rights</span>
          </div>
        </div>
      </div>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <div className="pt-6 text-left max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-[28px] font-bold text-[#172033] font-display">
            Frequently Asked Questions
          </h2>
          <p className="text-[14px] text-[#5F6878]">
            Everything you need to know about our plans, billing, and credit models
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-[16px] bg-white border border-[#E5DED4] overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-[#FAF7F2] transition-colors"
                >
                  <span className="text-sm font-bold text-[#172033] font-display flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-[#FF5A36] shrink-0" />
                    {faq.q}
                  </span>
                  <span className="text-lg font-bold text-[#8F97A3] shrink-0">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-[13px] text-[#5F6878] leading-relaxed border-t border-[#FAF7F2]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 8. FINAL HIGH-CONVERTING CTA BANNER */}
      <div className="rounded-[24px] bg-[#172033] text-white p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6 shadow-xl">
        <span className="text-xs font-bold uppercase tracking-wider text-[#FF5A36] font-display">
          Risk-Free Trial
        </span>
        <h3 className="text-[30px] sm:text-[40px] font-bold tracking-tight font-display text-white">
          Start Creating with 50 Free Credits Today.
        </h3>
        <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
          No credit card required to begin. Test the text writer, image generator, voice synthesizer, and video creator in seconds.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('/signup')}
            className="w-full sm:w-auto h-12 px-8 rounded-[12px] bg-[#FF5A36] text-white text-sm font-bold hover:bg-[#E84C28] shadow-[0_4px_16px_rgba(255,90,54,0.3)] transition-all cursor-pointer flex items-center justify-center gap-2 font-display"
          >
            <span>Create Free Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              const creatorPlan = PRICING_PLANS.find((p) => p.id === 'STARTER');
              if (creatorPlan) handleSelectPlan(creatorPlan);
            }}
            className="w-full sm:w-auto h-12 px-7 rounded-[12px] bg-white/10 text-white text-sm font-semibold hover:bg-white/20 transition-all cursor-pointer font-display border border-white/15"
          >
            Start Creator Plan ($9/mo)
          </button>
        </div>
      </div>
    </div>
  );
};
