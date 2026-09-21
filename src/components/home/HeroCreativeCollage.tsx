import React from 'react';
import { Play, Sparkles, Volume2, Image, Video, Mic, FileText, CheckCircle2 } from 'lucide-react';

export const HeroCreativeCollage: React.FC = () => {
  return (
    <div className="relative w-full max-w-2xl mx-auto lg:max-w-none">
      {/* Background Soft Glow */}
      <div className="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-[#FFB547]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-80 h-80 rounded-full bg-[#FF5A36]/15 blur-3xl pointer-events-none" />

      {/* Main Collage Container */}
      <div className="relative grid grid-cols-12 gap-4 p-2 sm:p-4">
        {/* 1. Large AI-Generated Creative Image (approx 60% of visual area) */}
        <div className="col-span-12 sm:col-span-8 relative rounded-[20px] overflow-hidden shadow-[0_20px_50px_rgba(23,32,51,0.12)] border border-[#E5DED4] bg-white group">
          <div className="aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85"
              alt="Editorial AI portrait photography"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#172033]/80 via-transparent to-black/10" />

            {/* Prompt Tag Overlay */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <span className="px-3 py-1.5 rounded-[8px] bg-white/90 backdrop-blur-md text-[11px] font-bold text-[#172033] tracking-wide uppercase shadow-sm">
                Generated with Toolora AI
              </span>
              <span className="px-2.5 py-1 rounded-[6px] bg-[#FF5A36] text-white text-[11px] font-semibold">
                8K Ultra
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-left">
              <p className="text-[11px] uppercase tracking-wider text-[#FFB547] font-semibold mb-1 font-display">
                Prompt Prompted 1.2s ago
              </p>
              <p className="text-[13px] text-white/95 font-medium line-clamp-2 leading-snug">
                &ldquo;Editorial fashion portrait in golden hour natural lighting, cinematic 85mm f/1.4 depth of field.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Right Stack Cards (Spans 4 cols on tablet/desktop) */}
        <div className="col-span-12 sm:col-span-4 flex flex-col gap-4 justify-between">
          {/* 2. Video Preview Card */}
          <div className="rounded-[18px] overflow-hidden border border-[#E5DED4] bg-white p-3 shadow-[0_12px_30px_rgba(23,32,51,0.08)] text-left hover:-translate-y-1 transition-transform">
            <div className="relative aspect-[16/10] rounded-[12px] overflow-hidden mb-2 bg-[#172033]">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
                alt="AI Video generation frame"
                className="w-full h-full object-cover opacity-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#FF5A36] shadow-md pl-0.5">
                  <Play className="w-4 h-4 fill-[#FF5A36]" />
                </div>
              </div>
              <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/70 text-white text-[10px] font-mono font-bold">
                0:05
              </span>
            </div>
            <div className="flex items-center justify-between text-[12px]">
              <span className="font-bold text-[#172033] font-display">Veo 3.1 Motion</span>
              <span className="text-[#FF5A36] font-semibold text-[11px]">60 fps</span>
            </div>
          </div>

          {/* 3. Voice Waveform Card */}
          <div className="rounded-[18px] border border-[#E5DED4] bg-white p-3.5 shadow-[0_12px_30px_rgba(23,32,51,0.08)] text-left hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#FFF0EB] flex items-center justify-center text-[#FF5A36]">
                  <Volume2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-[#172033] font-display">Studio Voiceover</p>
                  <p className="text-[10px] text-[#5F6878]">Alloy • English (US)</p>
                </div>
              </div>
              <span className="text-[11px] font-mono text-[#5F6878]">1:24</span>
            </div>

            {/* Audio Waveform Graphic */}
            <div className="flex items-center gap-1 h-7 px-1 pt-1">
              {[40, 65, 85, 45, 95, 75, 100, 60, 80, 50, 90, 70, 45, 85, 60, 30].map((h, i) => (
                <span
                  key={i}
                  style={{ height: `${h}%` }}
                  className={`flex-1 rounded-full transition-all ${
                    i < 8 ? 'bg-[#FF5A36]' : 'bg-[#E5DED4]'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* 4. Text Generation Card */}
          <div className="rounded-[18px] border border-[#E5DED4] bg-white p-3.5 shadow-[0_12px_30px_rgba(23,32,51,0.08)] text-left hover:-translate-y-1 transition-transform">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#238B6F]" />
              <span className="text-[11px] font-bold text-[#172033] uppercase tracking-wider font-display">
                Creative Copy
              </span>
            </div>
            <p className="text-[12px] text-[#5F6878] italic line-clamp-3 leading-snug">
              &ldquo;Where imagination leaves the sketchbook and takes form in light, sound, and motion.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Floating Minimal Tool Badges (Section 7) */}
      {/* Floating Card 1: IMAGE */}
      <div className="hidden sm:flex items-center gap-2.5 absolute -top-4 -left-6 z-20 px-3.5 py-2 rounded-[14px] bg-white border border-[#E5DED4] shadow-[0_10px_25px_rgba(23,32,51,0.1)] hover:scale-105 transition-all">
        <div className="w-7 h-7 rounded-[8px] bg-[#FFF0EB] flex items-center justify-center text-[#FF5A36]">
          <Image className="w-3.5 h-3.5" />
        </div>
        <div className="text-left">
          <p className="text-[11px] font-bold text-[#172033] font-display">IMAGE</p>
          <p className="text-[10px] text-[#5F6878]">Create visuals</p>
        </div>
      </div>

      {/* Floating Card 2: VIDEO */}
      <div className="hidden sm:flex items-center gap-2.5 absolute top-1/3 -right-6 z-20 px-3.5 py-2 rounded-[14px] bg-white border border-[#E5DED4] shadow-[0_10px_25px_rgba(23,32,51,0.1)] hover:scale-105 transition-all">
        <div className="w-7 h-7 rounded-[8px] bg-[#FFF0EB] flex items-center justify-center text-[#FF5A36]">
          <Video className="w-3.5 h-3.5" />
        </div>
        <div className="text-left">
          <p className="text-[11px] font-bold text-[#172033] font-display">VIDEO</p>
          <p className="text-[10px] text-[#5F6878]">Generate motion</p>
        </div>
      </div>

      {/* Floating Card 3: VOICE */}
      <div className="hidden sm:flex items-center gap-2.5 absolute -bottom-5 left-10 z-20 px-3.5 py-2 rounded-[14px] bg-white border border-[#E5DED4] shadow-[0_10px_25px_rgba(23,32,51,0.1)] hover:scale-105 transition-all">
        <div className="w-7 h-7 rounded-[8px] bg-[#FFF0EB] flex items-center justify-center text-[#FF5A36]">
          <Mic className="w-3.5 h-3.5" />
        </div>
        <div className="text-left">
          <p className="text-[11px] font-bold text-[#172033] font-display">VOICE</p>
          <p className="text-[10px] text-[#5F6878]">Bring words to life</p>
        </div>
      </div>

      {/* Floating Card 4: TEXT */}
      <div className="hidden sm:flex items-center gap-2.5 absolute -bottom-4 right-8 z-20 px-3.5 py-2 rounded-[14px] bg-white border border-[#E5DED4] shadow-[0_10px_25px_rgba(23,32,51,0.1)] hover:scale-105 transition-all">
        <div className="w-7 h-7 rounded-[8px] bg-[#FFF0EB] flex items-center justify-center text-[#FF5A36]">
          <FileText className="w-3.5 h-3.5" />
        </div>
        <div className="text-left">
          <p className="text-[11px] font-bold text-[#172033] font-display">TEXT</p>
          <p className="text-[10px] text-[#5F6878]">Write anything</p>
        </div>
      </div>
    </div>
  );
};
