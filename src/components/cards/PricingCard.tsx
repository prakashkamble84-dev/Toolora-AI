import React from 'react';
import { Check } from 'lucide-react';
import { PricingPlan } from '../../types';
import { Button } from '../common/Button';

interface PricingCardProps {
  plan: PricingPlan;
  isAnnual: boolean;
  onSelect: (plan: PricingPlan) => void;
  isCurrent?: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  isAnnual,
  onSelect,
  isCurrent = false,
}) => {
  const price = isAnnual ? plan.priceAnnual : plan.priceMonthly;
  const annualSavings = (plan.priceMonthly - plan.priceAnnual) * 12;

  return (
    <div
      className={`relative rounded-[20px] p-7 flex flex-col justify-between transition-all duration-200 text-left bg-white ${
        plan.highlight
          ? 'border-2 border-[#FF5A36] shadow-[0_16px_40px_rgba(255,90,54,0.15)] ring-1 ring-[#FF5A36]/20'
          : 'border border-[#E5DED4] shadow-[0_8px_25px_rgba(23,32,51,0.05)] hover:border-[#D4C9BC]'
      }`}
    >
      {/* Badge (Most Popular or Specialty Badge) */}
      {(plan.badge || plan.highlight) && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span
            className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs font-display ${
              plan.highlight
                ? 'bg-[#FF5A36] text-white'
                : 'bg-[#172033] text-white'
            }`}
          >
            {plan.badge || 'MOST POPULAR'}
          </span>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[20px] font-bold text-[#172033] font-display">{plan.name}</h3>
          {isCurrent && (
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-[6px] bg-[#238B6F]/15 text-[#238B6F]">
              Current Plan
            </span>
          )}
        </div>

        <p className="text-[13px] text-[#5F6878] min-h-[40px] mb-5 leading-relaxed">
          {plan.tagline}
        </p>

        {/* Pricing Display */}
        <div className="flex items-baseline gap-1.5 mb-1">
          <span className="text-[38px] font-bold text-[#172033] font-display tracking-tight">
            ${price}
          </span>
          <span className="text-[13px] text-[#5F6878] font-medium">
            {price === 0 ? '/ forever' : `/ mo${isAnnual ? ' (billed annually)' : ''}`}
          </span>
        </div>

        {/* Annual discount or billing info */}
        <div className="h-5 mb-4">
          {isAnnual && annualSavings > 0 ? (
            <span className="text-[11px] font-semibold text-[#238B6F] bg-[#E8F5E9] px-2 py-0.5 rounded-[5px]">
              Save ${annualSavings}/year with annual billing
            </span>
          ) : price > 0 ? (
            <span className="text-[11px] text-[#8F97A3]">
              Billed monthly • Cancel anytime
            </span>
          ) : (
            <span className="text-[11px] text-[#238B6F] font-semibold">
              Free forever • No credit card required
            </span>
          )}
        </div>

        <div className="p-2.5 rounded-[10px] bg-[#FAF7F2] border border-[#E5DED4] text-[12px] text-[#FF5A36] font-semibold mb-6 flex items-center justify-between">
          <span>Monthly Allowance</span>
          <strong className="font-mono text-[#172033] font-bold">{plan.credits.toLocaleString()} Credits</strong>
        </div>

        <div className="h-px w-full bg-[#E5DED4] mb-5" />

        {/* Features List */}
        <div className="space-y-2.5 mb-8">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F97A3] block mb-2 font-display">
            Plan Specifications
          </span>
          {plan.features.map((feat, index) => (
            <div key={index} className="flex items-start gap-2.5 text-[13px]">
              <div className="w-4 h-4 rounded-full bg-[#238B6F]/15 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-2.5 h-2.5 text-[#238B6F]" />
              </div>
              <span className="leading-snug text-[#172033]">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Button
          variant={plan.highlight ? 'primary' : 'secondary'}
          size="md"
          className="w-full text-[14px]"
          onClick={() => onSelect(plan)}
          disabled={isCurrent}
        >
          {isCurrent ? 'Current Active Plan' : plan.ctaText}
        </Button>
      </div>
    </div>
  );
};
