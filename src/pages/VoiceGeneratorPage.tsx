import React, { useState, useEffect } from 'react';
import {
  Mic,
  Volume2,
  Sparkles,
  Play,
  Pause,
  Sliders,
  Coins,
  Copy,
  Check,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface VoiceGeneratorPageProps {
  onNavigate: (path: string) => void;
}

export const VoiceGeneratorPage: React.FC<VoiceGeneratorPageProps> = ({ onNavigate }) => {
  const { user, deductCredits } = useAuth();
  const { showToast } = useToast();

  const [script, setScript] = useState('');
  const [voiceName, setVoiceName] = useState('Studio Natural (US)');
  const [voiceTone, setVoiceTone] = useState('Professional & Clear');
  const [speed, setSpeed] = useState<number>(1.0);
  const [pitch, setPitch] = useState<number>(1.0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVoiceResult, setGeneratedVoiceResult] = useState<{
    text: string;
    voice: string;
    tone: string;
    speed: number;
  } | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isCopied, setIsCopied] = useState(false);

  // Speech synthesis reference
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const updateVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          setAvailableVoices(voices);
        }
      };
      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  const sampleScripts = [
    'Welcome to Toolora AI. The unified generative studio crafted for high-performance marketing and creative teams.',
    'In this tutorial, you will discover how to generate high-conversion ad copy, photorealistic visuals, and broadcast voiceovers in seconds.',
    'Accelerate your creative pipeline with unified AI generation from one centralized workspace.',
  ];

  const handleGenerate = async () => {
    if (!script.trim()) {
      showToast('Please enter a voiceover script.', 'warning');
      return;
    }

    if ((user?.credits ?? 0) < 3) {
      showToast('Insufficient credits (3 required). Please upgrade your plan.', 'error');
      onNavigate('/pricing');
      return;
    }

    setIsGenerating(true);
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }

    setTimeout(() => {
      setGeneratedVoiceResult({
        text: script,
        voice: voiceName,
        tone: voiceTone,
        speed,
      });
      deductCredits(3);
      setIsGenerating(false);
      showToast('AI Voice synthesized successfully!', 'success');
    }, 1200);
  };

  const handlePlayAudio = () => {
    if (!generatedVoiceResult || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(generatedVoiceResult.text);
    utterance.rate = generatedVoiceResult.speed;
    utterance.pitch = pitch;

    // Pick selected voice if available
    if (availableVoices.length > 0) {
      const matched = availableVoices.find((v) =>
        v.name.toLowerCase().includes(voiceName.toLowerCase())
      ) || availableVoices[0];
      if (matched) utterance.voice = matched;
    }

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopyScript = () => {
    if (!generatedVoiceResult) return;
    navigator.clipboard.writeText(generatedVoiceResult.text);
    setIsCopied(true);
    showToast('Script copied to clipboard', 'info');
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-left">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5DED4]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[28px] font-bold text-[#172033] tracking-tight font-display flex items-center gap-2.5">
              <span className="w-10 h-10 rounded-[12px] bg-[#FFF0EB] flex items-center justify-center text-[#FF5A36]">
                <Mic className="w-5 h-5" />
              </span>
              <span>AI Voice Studio</span>
            </h1>
            <span className="px-2.5 py-0.5 rounded-[6px] text-[11px] font-bold bg-[#FAF7F2] text-[#FF5A36] border border-[#E5DED4]">
              Neural TTS
            </span>
          </div>
          <p className="text-[14px] text-[#5F6878] mt-1">
            Transform text into natural-sounding, expressive speech in any tone.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-[10px] bg-white border border-[#E5DED4] text-[#172033] text-[13px] font-semibold shadow-xs">
          <Coins className="w-4 h-4 text-[#FF5A36]" />
          <span>3 Credits per generation</span>
        </div>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Prompt and Settings (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Script Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[13px] font-bold text-[#172033]">
                Voiceover Script
              </label>
              <span className="text-[11px] text-[#8F97A3]">{script.length} / 2500</span>
            </div>
            <textarea
              rows={5}
              value={script}
              onChange={(e) => setScript(e.target.value)}
              placeholder="Enter or paste the script you want converted into broadcast-quality speech..."
              className="w-full rounded-[14px] bg-white border border-[#E5DED4] p-3.5 text-[14px] text-[#172033] placeholder-[#8F97A3] focus:outline-none focus:border-[#FF5A36] focus:ring-2 focus:ring-[#FF5A36]/20 transition-all leading-[1.6]"
            />

            {/* Quick Sample Prompts */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-bold text-[#8F97A3] uppercase tracking-wider font-display">
                Sample Scripts:
              </span>
              <div className="space-y-1.5">
                {sampleScripts.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => setScript(sample)}
                    className="w-full text-left p-2.5 rounded-[10px] bg-white hover:bg-[#FAF7F2] border border-[#E5DED4] text-[12px] text-[#5F6878] hover:text-[#172033] transition-colors cursor-pointer truncate block shadow-xs"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Voice Settings Card */}
          <div className="p-6 rounded-[20px] bg-white border border-[#E5DED4] space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-[13px] font-bold text-[#172033]">
              <Sliders className="w-4 h-4 text-[#FF5A36]" />
              <span>Voice Parameters</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Voice Persona */}
              <div>
                <label className="block text-[12px] font-semibold text-[#5F6878] mb-1.5">
                  Voice Persona
                </label>
                <select
                  value={voiceName}
                  onChange={(e) => setVoiceName(e.target.value)}
                  className="w-full rounded-[10px] bg-[#FAF7F2] border border-[#E5DED4] p-2.5 text-[13px] text-[#172033] focus:outline-none focus:border-[#FF5A36] cursor-pointer"
                >
                  <option>Studio Natural (US)</option>
                  <option>Deep Cinematic (UK)</option>
                  <option>Friendly Narrator (US)</option>
                  <option>Clear Executive (AU)</option>
                </select>
              </div>

              {/* Tone */}
              <div>
                <label className="block text-[12px] font-semibold text-[#5F6878] mb-1.5">
                  Delivery Tone
                </label>
                <select
                  value={voiceTone}
                  onChange={(e) => setVoiceTone(e.target.value)}
                  className="w-full rounded-[10px] bg-[#FAF7F2] border border-[#E5DED4] p-2.5 text-[13px] text-[#172033] focus:outline-none focus:border-[#FF5A36] cursor-pointer"
                >
                  <option>Professional &amp; Clear</option>
                  <option>High Energy &amp; Dynamic</option>
                  <option>Calm &amp; Reflective</option>
                  <option>Dramatic Storyteller</option>
                </select>
              </div>

              {/* Speed Slider */}
              <div className="sm:col-span-2 space-y-2 pt-2">
                <div className="flex items-center justify-between text-[12px] font-bold">
                  <span className="text-[#5F6878]">Speech Rate</span>
                  <span className="text-[#172033] font-display">{speed}x</span>
                </div>
                <input
                  type="range"
                  min="0.75"
                  max="1.5"
                  step="0.05"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full accent-[#FF5A36] cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full h-12 rounded-[12px] bg-[#FF5A36] text-white text-[15px] font-semibold hover:bg-[#E84C28] shadow-[0_4px_16px_rgba(255,90,54,0.25)] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 ai-loading-ring shrink-0" />
                <span>Synthesizing Voice...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Voice (3 Credits)</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Result Preview (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="rounded-[20px] bg-white border border-[#E5DED4] p-6 min-h-[520px] flex flex-col justify-between shadow-xs">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E5DED4]">
              <span className="text-[13px] font-bold text-[#172033] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#238B6F]" />
                <span>Audio Preview</span>
              </span>

              {generatedVoiceResult && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyScript}
                    className="px-3 py-1.5 rounded-[10px] bg-[#FAF7F2] border border-[#E5DED4] text-[#172033] hover:bg-[#F1ECE4] transition-colors cursor-pointer flex items-center gap-1.5 text-[12px] font-semibold"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-[#238B6F]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Copied' : 'Copy Script'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Canvas Body */}
            <div className="my-auto py-6">
              {isGenerating ? (
                <div className="text-center space-y-3 py-16">
                  <div className="w-9 h-9 ai-loading-ring mx-auto" />
                  <div className="space-y-1">
                    <p className="text-[15px] font-bold text-[#172033]">
                      Synthesizing audio wave...
                    </p>
                    <p className="text-[13px] text-[#5F6878]">
                      Preparing neural voice playback.
                    </p>
                  </div>
                </div>
              ) : generatedVoiceResult ? (
                <div className="space-y-6 max-w-lg mx-auto">
                  {/* Waveform Player Box */}
                  <div className="rounded-[16px] bg-[#FAF7F2] border border-[#E5DED4] p-6 text-center space-y-6 shadow-xs">
                    {/* Visualizer bars */}
                    <div className="flex items-center justify-center gap-1.5 h-16 px-4">
                      {[40, 65, 30, 85, 95, 60, 45, 75, 100, 55, 80, 40, 90, 70, 50, 85, 60, 35].map(
                        (height, i) => (
                          <div
                            key={i}
                            className={`w-1.5 rounded-full transition-all duration-200 ${
                              isPlaying
                                ? 'bg-gradient-to-t from-[#FF5A36] to-[#FFB547] animate-pulse'
                                : 'bg-[#E5DED4]'
                            }`}
                            style={{
                              height: isPlaying ? `${Math.max(15, (height * (i % 2 === 0 ? 1 : 0.7)))}%` : '20%',
                              animationDelay: `${i * 0.05}s`,
                            }}
                          />
                        )
                      )}
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-center gap-4">
                      <button
                        onClick={handlePlayAudio}
                        className="w-14 h-14 rounded-full bg-[#FF5A36] text-white flex items-center justify-center shadow-lg shadow-[#FF5A36]/30 hover:scale-105 hover:bg-[#E84C28] transition-all cursor-pointer"
                      >
                        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[12px] text-[#5F6878] border-t border-[#E5DED4] pt-3">
                      <span>Persona: {generatedVoiceResult.voice}</span>
                      <span>Rate: {generatedVoiceResult.speed}x</span>
                    </div>
                  </div>

                  {/* Transcript box */}
                  <div className="rounded-[12px] bg-white border border-[#E5DED4] p-4 text-[13px] text-[#5F6878] leading-relaxed shadow-xs">
                    <span className="text-[11px] font-bold text-[#8F97A3] block mb-1 uppercase tracking-wider font-display">
                      Transcript:
                    </span>
                    &ldquo;{generatedVoiceResult.text}&rdquo;
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-3 py-16 max-w-sm mx-auto">
                  <div className="w-12 h-12 rounded-[12px] bg-[#FAF7F2] border border-[#E5DED4] flex items-center justify-center mx-auto text-[#FF5A36]">
                    <Volume2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-[18px] font-bold text-[#172033] font-display">
                    No creations yet
                  </h3>
                  <p className="text-[14px] text-[#5F6878] leading-relaxed">
                    Synthesized speech with wave visualizer and audio playback controls will render here.
                  </p>
                  <button
                    onClick={() => setScript(sampleScripts[0])}
                    className="text-[13px] font-bold text-[#FF5A36] hover:underline cursor-pointer"
                  >
                    Load Sample Script
                  </button>
                </div>
              )}
            </div>

            {/* Preview Footer */}
            <div className="pt-4 border-t border-[#E5DED4] flex items-center justify-between text-[12px] text-[#5F6878]">
              <span>Engine: Neural Speech API</span>
              <span>
                {generatedVoiceResult ? 'Audio Ready' : 'Ready to synthesize'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
