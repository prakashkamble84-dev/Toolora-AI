import React from 'react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'DESCRIBE',
      subhead: 'Tell Toolora what you want.',
      description:
        'Type your prompt in natural language, adjust tone or aspect ratio, or upload a reference image to anchor your aesthetic direction.',
      visual: (
        <div className="p-4 rounded-[14px] bg-[#FAF7F2] border border-[#E5DED4] text-left text-[12px] font-mono text-[#5F6878]">
          <span className="text-[#FF5A36] font-bold">&gt;</span> &ldquo;Minimalist Scandinavian interior with morning sun streaming through floor-to-ceiling glass...&rdquo;
        </div>
      ),
    },
    {
      number: '02',
      title: 'CREATE',
      subhead: 'AI transforms your idea.',
      description:
        'Specialized generative models generate your output in real time—whether that is an 8K image, a Veo motion video, or a studio voiceover.',
      visual: (
        <div className="p-4 rounded-[14px] bg-[#FAF7F2] border border-[#E5DED4] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 ai-loading-ring" />
            <span className="text-[12px] font-semibold text-[#172033]">Synthesizing high-res frame...</span>
          </div>
          <span className="text-[11px] font-bold text-[#FF5A36]">94%</span>
        </div>
      ),
    },
    {
      number: '03',
      title: 'REFINE',
      subhead: 'Edit, regenerate and download.',
      description:
        'Inspect full resolution results, tweak prompts, regenerate subtle variations, and export studio-ready assets with commercial rights.',
      visual: (
        <div className="p-4 rounded-[14px] bg-[#FAF7F2] border border-[#E5DED4] flex items-center justify-between text-[12px]">
          <span className="font-semibold text-[#238B6F] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#238B6F]" />
            Asset Export Ready
          </span>
          <span className="px-2.5 py-1 rounded-[6px] bg-[#172033] text-white font-bold text-[11px]">
            Download HD
          </span>
        </div>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      <div className="max-w-3xl mb-16">
        <span className="text-[12px] font-bold uppercase tracking-wider text-[#FF5A36] font-display">
          Effortless Workflow
        </span>
        <h2 className="text-[36px] sm:text-[48px] font-bold text-[#172033] tracking-tight leading-[1.08] mt-2 mb-4 font-display">
          Three steps from thought to masterpiece.
        </h2>
        <p className="text-[17px] text-[#5F6878]">
          No complex coding or model deployment required. Toolora handles the compute so you can focus entirely on creative vision.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step) => (
          <div
            key={step.number}
            className="rounded-[22px] bg-white border border-[#E5DED4] p-8 shadow-[0_12px_35px_rgba(23,32,51,0.06)] flex flex-col justify-between hover:-translate-y-1 transition-transform"
          >
            <div>
              <span className="text-[44px] font-black text-[#E5DED4] tracking-tight block font-display mb-2">
                {step.number}
              </span>
              <span className="text-[12px] font-bold uppercase tracking-wider text-[#FF5A36] font-display">
                {step.title}
              </span>
              <h3 className="text-[20px] font-bold text-[#172033] mt-1 mb-3 font-display">
                {step.subhead}
              </h3>
              <p className="text-[14px] text-[#5F6878] leading-relaxed mb-6">
                {step.description}
              </p>
            </div>

            {/* Visual Example Beside Step */}
            <div className="pt-2">{step.visual}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
