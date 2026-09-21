import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  Download,
  Copy,
  Check,
  Coins,
  Sliders,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface TextGeneratorPageProps {
  onNavigate: (path: string) => void;
}

export const TextGeneratorPage: React.FC<TextGeneratorPageProps> = ({ onNavigate }) => {
  const { user, deductCredits } = useAuth();
  const { showToast } = useToast();

  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState('Gemini 3.5 Flash');
  const [contentType, setContentType] = useState('Marketing Copy');
  const [tone, setTone] = useState('Professional');
  const [length, setLength] = useState('Medium (~400 words)');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const samplePrompts = [
    'Write a high-converting announcement email launching Toolora AI creative workspace',
    'Draft an engaging LinkedIn post explaining multimodal AI creation for founders and designers',
    'Write a detailed guide on structuring video scripts with generative AI for commercial campaigns',
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      showToast('Please enter your prompt requirements.', 'warning');
      return;
    }

    if ((user?.credits ?? 0) < 1) {
      showToast('Insufficient credits. Please upgrade your plan.', 'error');
      onNavigate('/pricing');
      return;
    }

    setIsGenerating(true);
    setGeneratedText('');

    try {
      const response = await fetch('/api/generate-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          contentType,
          tone,
          length,
          model,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate text');
      }

      setGeneratedText(data.text);
      deductCredits(1);
      showToast('Content successfully created with Gemini!', 'success');
    } catch (err: any) {
      console.error('Text generation error:', err);
      showToast(err.message || 'Error generating content', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!generatedText) return;
    navigator.clipboard.writeText(generatedText);
    setIsCopied(true);
    showToast('Copied to clipboard', 'info');
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!generatedText) return;
    const blob = new Blob([generatedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `toolora-text-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Downloaded document', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-left">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5DED4]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[28px] font-bold text-[#172033] tracking-tight font-display flex items-center gap-2.5">
              <span className="w-10 h-10 rounded-[12px] bg-[#FFF0EB] flex items-center justify-center text-[#FF5A36]">
                <FileText className="w-5 h-5" />
              </span>
              <span>AI Text Studio</span>
            </h1>
            <span className="px-2.5 py-0.5 rounded-[6px] text-[11px] font-bold bg-[#FAF7F2] text-[#FF5A36] border border-[#E5DED4]">
              Gemini 3.5
            </span>
          </div>
          <p className="text-[14px] text-[#5F6878] mt-1">
            Write blogs, newsletters, ads, and persuasive campaigns in seconds.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-[10px] bg-white border border-[#E5DED4] text-[#172033] text-[13px] font-semibold shadow-xs">
          <Coins className="w-4 h-4 text-[#FF5A36]" />
          <span>1 Credit per generation</span>
        </div>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Prompt and Settings (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Prompt Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[13px] font-bold text-[#172033]">
                Prompt Requirements
              </label>
              <span className="text-[11px] text-[#8F97A3]">
                {prompt.length} / 2000
              </span>
            </div>

            <textarea
              rows={5}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="What would you like to write? Describe your objective, audience, and key points..."
              className="w-full rounded-[14px] bg-white border border-[#E5DED4] p-3.5 text-[14px] text-[#172033] placeholder-[#8F97A3] focus:outline-none focus:border-[#FF5A36] focus:ring-2 focus:ring-[#FF5A36]/20 transition-all leading-[1.6]"
            />

            {/* Quick Inspiration Prompts */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-bold text-[#8F97A3] uppercase tracking-wider font-display">
                Sample Prompts:
              </span>
              <div className="space-y-1.5">
                {samplePrompts.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPrompt(sample)}
                    className="w-full text-left p-2.5 rounded-[10px] bg-white hover:bg-[#FAF7F2] border border-[#E5DED4] text-[12px] text-[#5F6878] hover:text-[#172033] transition-colors cursor-pointer truncate block shadow-xs"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Parameters & Settings Card */}
          <div className="p-6 rounded-[20px] bg-white border border-[#E5DED4] space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-[13px] font-bold text-[#172033]">
              <Sliders className="w-4 h-4 text-[#FF5A36]" />
              <span>Settings &amp; Configuration</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Model Selection */}
              <div>
                <label className="block text-[12px] font-semibold text-[#5F6878] mb-1.5">
                  Model Engine
                </label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full rounded-[10px] bg-[#FAF7F2] border border-[#E5DED4] p-2.5 text-[13px] text-[#172033] focus:outline-none focus:border-[#FF5A36] cursor-pointer"
                >
                  <option>Gemini 3.5 Flash</option>
                  <option>Gemini 3.1 Pro</option>
                </select>
              </div>

              {/* Style / Tone Selection */}
              <div>
                <label className="block text-[12px] font-semibold text-[#5F6878] mb-1.5">
                  Style / Tone
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full rounded-[10px] bg-[#FAF7F2] border border-[#E5DED4] p-2.5 text-[13px] text-[#172033] focus:outline-none focus:border-[#FF5A36] cursor-pointer"
                >
                  <option>Professional</option>
                  <option>Direct &amp; Minimalist</option>
                  <option>High Energy &amp; Persuasive</option>
                  <option>Authoritative &amp; Analytical</option>
                  <option>Conversational</option>
                </select>
              </div>

              {/* Format Selection */}
              <div>
                <label className="block text-[12px] font-semibold text-[#5F6878] mb-1.5">
                  Format
                </label>
                <select
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                  className="w-full rounded-[10px] bg-[#FAF7F2] border border-[#E5DED4] p-2.5 text-[13px] text-[#172033] focus:outline-none focus:border-[#FF5A36] cursor-pointer"
                >
                  <option>Marketing Copy</option>
                  <option>Blog Article</option>
                  <option>LinkedIn Post</option>
                  <option>Email Newsletter</option>
                  <option>Product Description</option>
                </select>
              </div>

              {/* Length Selection */}
              <div>
                <label className="block text-[12px] font-semibold text-[#5F6878] mb-1.5">
                  Output Length
                </label>
                <select
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full rounded-[10px] bg-[#FAF7F2] border border-[#E5DED4] p-2.5 text-[13px] text-[#172033] focus:outline-none focus:border-[#FF5A36] cursor-pointer"
                >
                  <option>Short (~150 words)</option>
                  <option>Medium (~400 words)</option>
                  <option>Comprehensive (~800 words)</option>
                </select>
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
                <span>Writing Content...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Text (1 Credit)</span>
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
                <span>Result Preview</span>
              </span>

              {generatedText && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1.5 rounded-[10px] bg-[#FAF7F2] border border-[#E5DED4] text-[#172033] hover:bg-[#F1ECE4] transition-colors cursor-pointer flex items-center gap-1.5 text-[12px] font-semibold"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-[#238B6F]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Copied' : 'Copy'}</span>
                  </button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleDownload}
                    leftIcon={<Download className="w-3.5 h-3.5" />}
                  >
                    Download
                  </Button>
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="my-auto py-6">
              {isGenerating ? (
                <div className="text-center space-y-3 py-16">
                  <div className="w-9 h-9 ai-loading-ring mx-auto" />
                  <div className="space-y-1">
                    <p className="text-[15px] font-bold text-[#172033]">
                      Drafting copy with Gemini...
                    </p>
                    <p className="text-[13px] text-[#5F6878]">
                      This takes just a couple seconds.
                    </p>
                  </div>
                </div>
              ) : generatedText ? (
                <div className="rounded-[16px] p-6 bg-[#FAF7F2] border border-[#E5DED4] text-[15px] text-[#172033] leading-relaxed whitespace-pre-wrap select-text max-h-[460px] overflow-y-auto">
                  {generatedText}
                </div>
              ) : (
                <div className="text-center space-y-3 py-16 max-w-sm mx-auto">
                  <div className="w-12 h-12 rounded-[12px] bg-[#FAF7F2] border border-[#E5DED4] flex items-center justify-center mx-auto text-[#FF5A36]">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h3 className="text-[18px] font-bold text-[#172033] font-display">
                    No creations yet
                  </h3>
                  <p className="text-[14px] text-[#5F6878] leading-relaxed">
                    Your generated copy will format and display here ready for export.
                  </p>
                  <button
                    onClick={() => setPrompt(samplePrompts[0])}
                    className="text-[13px] font-bold text-[#FF5A36] hover:underline cursor-pointer"
                  >
                    Load Sample Prompt
                  </button>
                </div>
              )}
            </div>

            {/* Preview Footer */}
            <div className="pt-4 border-t border-[#E5DED4] flex items-center justify-between text-[12px] text-[#5F6878]">
              <span>Engine: {model}</span>
              <span>
                {generatedText ? `${generatedText.split(/\s+/).filter(Boolean).length} words` : 'Ready to generate'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
