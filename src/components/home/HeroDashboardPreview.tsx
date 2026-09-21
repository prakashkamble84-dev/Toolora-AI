import React, { useState } from 'react';
import {
  FileText,
  Image as ImageIcon,
  Video,
  Mic,
  Sparkles,
  Play,
  Volume2,
  Copy,
  Download,
  Sliders,
  Check,
  Zap,
} from 'lucide-react';

export const HeroDashboardPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'text' | 'image' | 'video' | 'voice'>('image');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-12 rounded-[16px] border border-[#263044] bg-[#101522] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden text-left">
      {/* Subtle top ambient glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-36 bg-[#7C3AED]/20 blur-3xl pointer-events-none" />

      {/* Mock Studio App Window Header */}
      <div className="h-12 px-4 bg-[#080B14] border-b border-[#263044] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#EF4444]/70" />
          <div className="w-3 h-3 rounded-full bg-[#F59E0B]/70" />
          <div className="w-3 h-3 rounded-full bg-[#22C55E]/70" />
          <span className="ml-3 text-[12px] font-medium text-[#64748B] hidden sm:inline">
            toolora.ai/workspace/studio
          </span>
        </div>

        {/* Tab Switcher: Text, Image, Video, Voice */}
        <div className="flex items-center gap-1 bg-[#141A2A] p-1 rounded-[8px] border border-[#263044]">
          <button
            onClick={() => setActiveTab('text')}
            className={`px-3 py-1 rounded-[6px] text-[12px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'text'
                ? 'bg-[#1A2235] text-[#22D3EE] font-semibold'
                : 'text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            <FileText className="w-3 h-3" />
            <span>AI Text</span>
          </button>
          <button
            onClick={() => setActiveTab('image')}
            className={`px-3 py-1 rounded-[6px] text-[12px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'image'
                ? 'bg-[#1A2235] text-[#7C3AED] font-semibold'
                : 'text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            <ImageIcon className="w-3 h-3" />
            <span>AI Image</span>
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={`px-3 py-1 rounded-[6px] text-[12px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'video'
                ? 'bg-[#1A2235] text-[#2563EB] font-semibold'
                : 'text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            <Video className="w-3 h-3" />
            <span>AI Video</span>
          </button>
          <button
            onClick={() => setActiveTab('voice')}
            className={`px-3 py-1 rounded-[6px] text-[12px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'voice'
                ? 'bg-[#1A2235] text-[#22C55E] font-semibold'
                : 'text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            <Mic className="w-3 h-3" />
            <span>AI Voice</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-[4px] bg-[#141A2A] text-[#22C55E] border border-[#22C55E]/30 hidden sm:inline">
            Active Workspace
          </span>
        </div>
      </div>

      {/* Main Preview Body */}
      <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Side: Mock Prompt & Configuration (4 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4 rounded-[12px] bg-[#141A2A] border border-[#263044] p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[12px] text-[#94A3B8]">
              <span className="font-semibold uppercase tracking-wider text-[#64748B]">Generation Prompt</span>
              <span className="text-[#7C3AED] font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Prompt Optimized
              </span>
            </div>

            {/* Prompt textarea preview */}
            <div className="p-3 rounded-[10px] bg-[#101522] border border-[#263044] text-[13px] text-[#F8FAFC] leading-relaxed">
              {activeTab === 'image' &&
                'A sleek, minimalist electric hypercar speeding along a futuristic coastal highway at twilight, cinematic lighting, 8k resolution.'}
              {activeTab === 'text' &&
                'Write an authoritative SaaS launch email announcing multimodal AI generation capabilities with compelling bullet points.'}
              {activeTab === 'video' &&
                'Cinematic drone camera sweep over mist-shrouded mountain peaks at golden sunrise, 4k ultra-detailed volumetric lighting.'}
              {activeTab === 'voice' &&
                'Welcome to Toolora AI. Experience the future of text, image, voice, and video creation unified in a single workspace.'}
            </div>

            {/* Controls */}
            <div className="grid grid-cols-2 gap-2 text-[12px]">
              <div className="p-2 rounded-[8px] bg-[#101522] border border-[#263044]">
                <span className="text-[#64748B] block text-[11px]">Model Engine</span>
                <span className="text-[#F8FAFC] font-semibold">
                  {activeTab === 'video' ? 'Veo 3.1 Fast' : activeTab === 'image' ? 'Gemini 3.1 Flash' : 'Gemini 3.5 Flash'}
                </span>
              </div>
              <div className="p-2 rounded-[8px] bg-[#101522] border border-[#263044]">
                <span className="text-[#64748B] block text-[11px]">Format / Ratio</span>
                <span className="text-[#F8FAFC] font-semibold">
                  {activeTab === 'voice' ? 'Studio 48kHz' : activeTab === 'text' ? 'Markdown' : '16:9 Landscape'}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <div className="w-full py-2.5 rounded-[10px] bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white text-[14px] font-semibold flex items-center justify-center gap-2 shadow-md shadow-[#7C3AED]/20">
              <Zap className="w-4 h-4 fill-current" />
              <span>Generate Output</span>
            </div>
          </div>
        </div>

        {/* Right Side: Realistic Generation Result Preview (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-[12px] bg-[#141A2A] border border-[#263044] p-4 min-h-[300px]">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#263044]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
              <span className="text-[13px] font-semibold text-[#F8FAFC]">Rendered Output</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-[6px] bg-[#101522] border border-[#263044] text-[#94A3B8] hover:text-[#F8FAFC] transition-colors cursor-pointer"
                title="Copy"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <button
                className="p-1.5 rounded-[6px] bg-[#101522] border border-[#263044] text-[#94A3B8] hover:text-[#F8FAFC] transition-colors cursor-pointer"
                title="Download"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Dynamic Content based on Active Tab */}
          <div className="py-4 flex-1 flex items-center justify-center">
            {activeTab === 'image' && (
              <div className="relative w-full h-56 rounded-[10px] overflow-hidden border border-[#263044] bg-[#080B14] group">
                <img
                  src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80"
                  alt="AI Generated Hypercar"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-[6px] bg-[#080B14]/80 backdrop-blur-sm border border-[#263044] text-[11px] font-semibold text-[#22D3EE]">
                  Gemini 3.1 Flash • 16:9 • 1080p
                </div>
              </div>
            )}

            {activeTab === 'video' && (
              <div className="relative w-full h-56 rounded-[10px] overflow-hidden border border-[#263044] bg-[#080B14] group">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
                  alt="AI Video Render"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#7C3AED]/90 flex items-center justify-center text-white shadow-lg cursor-pointer hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 ml-0.5 fill-current" />
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-[6px] bg-[#080B14]/80 backdrop-blur-sm border border-[#263044] text-[11px] font-semibold text-[#2563EB]">
                  Veo 3.1 Fast Video • 24 FPS • 5.0s
                </div>
              </div>
            )}

            {activeTab === 'text' && (
              <div className="w-full h-56 rounded-[10px] p-4 bg-[#101522] border border-[#263044] overflow-y-auto text-left text-[13px] leading-relaxed text-[#94A3B8] space-y-2">
                <p className="text-[#F8FAFC] font-semibold text-[14px]">Subject: Introducing Toolora AI — High-Velocity Multimodal Studio</p>
                <p>Hello Alex,</p>
                <p>We are thrilled to unveil <strong className="text-[#F8FAFC]">Toolora AI</strong>, engineered to synthesize articles, marketing campaigns, photorealistic visuals, and Veo 3 video clips seamlessly from a single dashboard.</p>
                <ul className="list-disc list-inside space-y-1 text-[#F8FAFC]">
                  <li>Instant multimodal generation with Gemini 3.5 & Veo 3</li>
                  <li>Unified credits and real-time generation telemetry</li>
                  <li>Commercial licenses on all exports</li>
                </ul>
              </div>
            )}

            {activeTab === 'voice' && (
              <div className="w-full h-56 rounded-[10px] p-6 bg-[#101522] border border-[#263044] flex flex-col justify-center items-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center text-[#22C55E]">
                  <Volume2 className="w-7 h-7" />
                </div>
                {/* Audio Waveform visualization */}
                <div className="flex items-center gap-1 h-10 w-full max-w-xs justify-center">
                  {[40, 65, 30, 85, 95, 45, 70, 90, 50, 80, 100, 60, 40, 75, 55, 90, 35, 60, 80, 50, 30].map(
                    (height, i) => (
                      <div
                        key={i}
                        className="w-1 rounded-full bg-[#22C55E] opacity-80"
                        style={{ height: `${height}%` }}
                      />
                    )
                  )}
                </div>
                <div className="text-[12px] text-[#94A3B8]">
                  Generated Voiceover • Natural Studio Pace (0:14)
                </div>
              </div>
            )}
          </div>

          {/* Footer Metadata */}
          <div className="pt-3 border-t border-[#263044] flex items-center justify-between text-[12px] text-[#64748B]">
            <span>Latency: 1.42s</span>
            <span className="text-[#22D3EE] font-medium">Render Quality: 100% Precision</span>
          </div>
        </div>
      </div>
    </div>
  );
};
