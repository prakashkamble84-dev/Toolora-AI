import React from 'react';
import { ArrowRight, Image as ImageIcon, Video, Mic, FileText, Play } from 'lucide-react';

interface EditorialToolsSectionProps {
  onNavigate: (path: string) => void;
}

export const EditorialToolsSection: React.FC<EditorialToolsSectionProps> = ({ onNavigate }) => {
  return (
    <section id="ai-tools" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      <div className="max-w-3xl mb-16">
        <span className="text-[12px] font-bold uppercase tracking-wider text-[#FF5A36] font-display">
          Unified Multi-Modal Engine
        </span>
        <h2 className="text-[36px] sm:text-[48px] font-bold text-[#172033] tracking-tight leading-[1.08] mt-2 mb-4 font-display">
          One Workspace. Endless Possibilities.
        </h2>
        <p className="text-[17px] text-[#5F6878] leading-[1.6]">
          Stop juggling disconnected subscriptions. Toolora brings generative image, motion video, studio voiceover, and editorial text together under one intuitive canvas.
        </p>
      </div>

      {/* 4 Large Editorial Cards with Asymmetric Layouts */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* CARD 1: IMAGE (Spans 7 cols on desktop) */}
        <div className="md:col-span-7 rounded-[24px] bg-white border border-[#E5DED4] p-6 sm:p-8 shadow-[0_12px_35px_rgba(23,32,51,0.06)] flex flex-col justify-between group hover:-translate-y-1 transition-transform">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-[12px] bg-[#FFF0EB] flex items-center justify-center text-[#FF5A36]">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[12px] font-bold uppercase tracking-wider text-[#FF5A36] font-display">
                  AI Image
                </span>
                <h3 className="text-[26px] font-bold text-[#172033] font-display">Imagine it.</h3>
              </div>
            </div>
            <button
              onClick={() => onNavigate('/dashboard/image')}
              className="text-[13px] font-bold text-[#172033] group-hover:text-[#FF5A36] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Launch Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[15px] text-[#5F6878] mb-6 leading-relaxed">
            Turn a simple prompt into striking visuals. Produce cinematic fashion portraits, architectural renders, luxury product mockups, and vibrant digital illustrations in seconds.
          </p>

          {/* Photographic Preview */}
          <div className="relative aspect-[16/10] rounded-[16px] overflow-hidden border border-[#E5DED4]">
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85"
              alt="Architectural minimal interior"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-[8px] bg-white/90 backdrop-blur-md text-[11px] font-semibold text-[#172033] shadow-sm">
              Model: Gemini 3.1 Flash Image • 16:9 Cinema
            </div>
          </div>
        </div>

        {/* CARD 2: VIDEO (Spans 5 cols on desktop) */}
        <div className="md:col-span-5 rounded-[24px] bg-white border border-[#E5DED4] p-6 sm:p-8 shadow-[0_12px_35px_rgba(23,32,51,0.06)] flex flex-col justify-between group hover:-translate-y-1 transition-transform">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-[12px] bg-[#FFF0EB] flex items-center justify-center text-[#FF5A36]">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[12px] font-bold uppercase tracking-wider text-[#FF5A36] font-display">
                  AI Video
                </span>
                <h3 className="text-[26px] font-bold text-[#172033] font-display">Bring it to life.</h3>
              </div>
            </div>
            <button
              onClick={() => onNavigate('/dashboard/video')}
              className="text-[13px] font-bold text-[#172033] group-hover:text-[#FF5A36] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Launch Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[15px] text-[#5F6878] mb-6 leading-relaxed">
            Generate fluid video scenes and cinematic motion from text prompts or reference images using Google&apos;s breakthrough Veo 3.1 video engine.
          </p>

          {/* Cinematic Thumbnail with Play Overlay */}
          <div className="relative aspect-[16/11] rounded-[16px] overflow-hidden border border-[#E5DED4] bg-[#172033]">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
              alt="Cinematic coastal video frame"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out opacity-90"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/25">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#FF5A36] shadow-lg pl-0.5">
                <Play className="w-5 h-5 fill-[#FF5A36]" />
              </div>
            </div>
            <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-[8px] bg-black/70 backdrop-blur-md text-[11px] font-mono text-white">
              Veo 3.1 • 1080p Motion
            </div>
          </div>
        </div>

        {/* CARD 3: VOICE (Spans 5 cols on desktop) */}
        <div className="md:col-span-5 rounded-[24px] bg-white border border-[#E5DED4] p-6 sm:p-8 shadow-[0_12px_35px_rgba(23,32,51,0.06)] flex flex-col justify-between group hover:-translate-y-1 transition-transform">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-[12px] bg-[#FFF0EB] flex items-center justify-center text-[#FF5A36]">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[12px] font-bold uppercase tracking-wider text-[#FF5A36] font-display">
                  AI Voice
                </span>
                <h3 className="text-[26px] font-bold text-[#172033] font-display">Give it a voice.</h3>
              </div>
            </div>
            <button
              onClick={() => onNavigate('/dashboard/voice')}
              className="text-[13px] font-bold text-[#172033] group-hover:text-[#FF5A36] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Launch Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[15px] text-[#5F6878] mb-6 leading-relaxed">
            Synthesize studio-grade voiceovers with lifelike cadence, emotional nuance, and pristine audio waveforms across multiple global dialects.
          </p>

          {/* Voice Waveform Visual Card */}
          <div className="p-6 rounded-[16px] bg-[#FAF7F2] border border-[#E5DED4]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[13px] font-bold text-[#172033]">Neural Speech Synthesis</span>
              <span className="text-[12px] font-mono text-[#FF5A36] font-semibold">48 kHz Master</span>
            </div>
            <div className="flex items-center gap-1.5 h-16 px-2 bg-white rounded-[12px] border border-[#E5DED4]">
              {[30, 60, 90, 45, 80, 100, 70, 40, 85, 95, 65, 35, 75, 90, 50, 85, 60, 30].map(
                (h, idx) => (
                  <span
                    key={idx}
                    style={{ height: `${h}%` }}
                    className={`flex-1 rounded-full transition-all ${
                      idx < 10 ? 'bg-[#FF5A36]' : 'bg-[#FFB547]'
                    }`}
                  />
                )
              )}
            </div>
            <p className="text-[12px] text-[#5F6878] mt-3 italic text-center">
              &ldquo;Transform scripts into broadcast-ready voice tracks with single-click pitch tuning.&rdquo;
            </p>
          </div>
        </div>

        {/* CARD 4: TEXT (Spans 7 cols on desktop) */}
        <div className="md:col-span-7 rounded-[24px] bg-white border border-[#E5DED4] p-6 sm:p-8 shadow-[0_12px_35px_rgba(23,32,51,0.06)] flex flex-col justify-between group hover:-translate-y-1 transition-transform">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-[12px] bg-[#FFF0EB] flex items-center justify-center text-[#FF5A36]">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[12px] font-bold uppercase tracking-wider text-[#FF5A36] font-display">
                  AI Text
                </span>
                <h3 className="text-[26px] font-bold text-[#172033] font-display">Say it better.</h3>
              </div>
            </div>
            <button
              onClick={() => onNavigate('/dashboard/text')}
              className="text-[13px] font-bold text-[#172033] group-hover:text-[#FF5A36] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Launch Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[15px] text-[#5F6878] mb-6 leading-relaxed">
            Craft persuasive editorial copy, product launches, long-form newsletters, and social campaigns with tailored tone, cadence, and semantic depth powered by Gemini 3.5 &amp; 3.1 Pro.
          </p>

          {/* Typeset Content Preview */}
          <div className="p-6 rounded-[16px] bg-[#FAF7F2] border border-[#E5DED4] text-left">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-[6px] bg-[#238B6F]/15 text-[#238B6F] text-[11px] font-bold">
                Editorial Prose
              </span>
              <span className="text-[12px] text-[#8F97A3]">Generated in 0.8s • 412 Words</span>
            </div>
            <h4 className="text-[17px] font-bold text-[#172033] mb-2 font-display">
              The Architecture of Autonomous Brand Storytelling
            </h4>
            <p className="text-[14px] text-[#5F6878] leading-relaxed line-clamp-3">
              When visual craft synchronizes with evocative prose, products cease to be simple commodities. Toolora weaves generative intelligence directly into creative strategy, giving creators boundless expressive bandwidth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
