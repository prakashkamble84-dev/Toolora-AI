import React, { useState, useRef, useEffect } from 'react';
import {
  Video,
  Upload,
  Sparkles,
  Download,
  Trash2,
  Sliders,
  Coins,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface VideoGeneratorPageProps {
  onNavigate: (path: string) => void;
}

export const VideoGeneratorPage: React.FC<VideoGeneratorPageProps> = ({ onNavigate }) => {
  const { user, deductCredits } = useAuth();
  const { showToast } = useToast();

  const [mode, setMode] = useState<'text' | 'image'>('text');
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [model, setModel] = useState('veo-3.1-fast-generate-preview');
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [uploadedMimeType, setUploadedMimeType] = useState<string>('image/png');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pollingStatus, setPollingStatus] = useState<string>('');
  const [pollingElapsed, setPollingElapsed] = useState<number>(0);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const pollingTimerRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (pollingTimerRef.current) clearInterval(pollingTimerRef.current);
      if (generatedVideoUrl) URL.revokeObjectURL(generatedVideoUrl);
    };
  }, [generatedVideoUrl]);

  const samplePrompts = [
    'Cinematic aerial drone flight sweeping over misty alpine pine ridges at sunrise, 4k 60fps',
    'Modern sports car drifting smoothly across wet coastal curves under golden afternoon sun',
    'Macro lens tracking slow raindrops splashing onto fresh emerald monstera leaves with natural lighting',
  ];

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('Please upload an image file (PNG, JPG, WEBP)', 'error');
      return;
    }
    setUploadedMimeType(file.type);
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedPhoto(reader.result as string);
      showToast('Photo uploaded successfully. Ready to animate into video.', 'success');
    };
    reader.readAsDataURL(file);
  };

  const handleStartGeneration = async () => {
    if (mode === 'text' && !prompt.trim()) {
      showToast('Please enter a video prompt description.', 'warning');
      return;
    }

    if (mode === 'image' && !uploadedPhoto) {
      showToast('Please upload a photo to animate.', 'warning');
      return;
    }

    if ((user?.credits ?? 0) < 20) {
      showToast('Insufficient credits (20 required). Please upgrade your plan.', 'error');
      onNavigate('/pricing');
      return;
    }

    setIsSubmitting(true);
    setPollingStatus('Initiating generation queue...');
    setPollingElapsed(0);
    setGeneratedVideoUrl(null);

    try {
      const response = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt.trim() || undefined,
          image: mode === 'image' ? uploadedPhoto : undefined,
          mimeType: uploadedMimeType,
          aspectRatio,
          model,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to start video generation');
      }

      deductCredits(20);
      showToast('Veo video generation initiated...', 'info');
      startPolling(data.operationName);
    } catch (err: any) {
      console.error('Video error:', err);
      showToast(err.message || 'Error initiating video', 'error');
      setIsSubmitting(false);
      setPollingStatus('');
    }
  };

  const startPolling = (opName: string) => {
    let seconds = 0;
    setPollingStatus('Rendering scene dynamics and motion vectors...');

    pollingTimerRef.current = setInterval(async () => {
      seconds += 4;
      setPollingElapsed(seconds);

      if (seconds > 16 && seconds <= 32) {
        setPollingStatus('Synthesizing temporal frame coherence...');
      } else if (seconds > 32) {
        setPollingStatus('Finalizing video encoding and compression...');
      }

      try {
        const checkRes = await fetch('/api/video-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ operationName: opName }),
        });

        const checkData = await checkRes.json();

        if (checkData.done) {
          clearInterval(pollingTimerRef.current);
          setPollingStatus('Rendering finished. Loading stream...');
          await downloadFinishedVideo(opName);
        }
      } catch (pollErr) {
        console.warn('Polling check failed, retrying...', pollErr);
      }
    }, 4000);
  };

  const downloadFinishedVideo = async (opName: string) => {
    try {
      const res = await fetch('/api/video-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operationName: opName }),
      });

      if (!res.ok) {
        throw new Error('Failed to retrieve video stream');
      }

      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      setGeneratedVideoUrl(blobUrl);
      setIsSubmitting(false);
      setPollingStatus('');
      showToast('Veo video ready to play!', 'success');
    } catch (err: any) {
      console.error('Download error:', err);
      showToast(err.message || 'Failed to download video stream', 'error');
      setIsSubmitting(false);
      setPollingStatus('');
    }
  };

  const handleDownloadFile = () => {
    if (!generatedVideoUrl) return;
    const a = document.createElement('a');
    a.href = generatedVideoUrl;
    a.download = `toolora-video-${Date.now()}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('Video download started', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-left">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5DED4]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[28px] font-bold text-[#172033] tracking-tight font-display flex items-center gap-2.5">
              <span className="w-10 h-10 rounded-[12px] bg-[#FFF0EB] flex items-center justify-center text-[#FF5A36]">
                <Video className="w-5 h-5" />
              </span>
              <span>AI Video Studio</span>
            </h1>
            <span className="px-2.5 py-0.5 rounded-[6px] text-[11px] font-bold bg-[#FAF7F2] text-[#FF5A36] border border-[#E5DED4]">
              veo-3.1-fast
            </span>
          </div>
          <p className="text-[14px] text-[#5F6878] mt-1">
            Generate cinematic, broadcast-grade video from text descriptions or still photography.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-[10px] bg-white border border-[#E5DED4] text-[#172033] text-[13px] font-semibold shadow-xs">
          <Coins className="w-4 h-4 text-[#FF5A36]" />
          <span>20 Credits per generation</span>
        </div>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Prompt and Settings (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Mode Switcher */}
          <div className="flex items-center p-1 rounded-[12px] bg-[#FAF7F2] border border-[#E5DED4]">
            <button
              onClick={() => setMode('text')}
              disabled={isSubmitting}
              className={`flex-1 py-2 rounded-[9px] text-[13px] font-semibold transition-all cursor-pointer ${
                mode === 'text'
                  ? 'bg-white text-[#172033] shadow-sm font-bold'
                  : 'text-[#5F6878] hover:text-[#172033]'
              }`}
            >
              Text to Video
            </button>
            <button
              onClick={() => setMode('image')}
              disabled={isSubmitting}
              className={`flex-1 py-2 rounded-[9px] text-[13px] font-semibold transition-all cursor-pointer ${
                mode === 'image'
                  ? 'bg-white text-[#172033] shadow-sm font-bold'
                  : 'text-[#5F6878] hover:text-[#172033]'
              }`}
            >
              Animate Photo
            </button>
          </div>

          {/* Photo upload input when Animate mode */}
          {mode === 'image' && (
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-[#172033]">
                Starting Keyframe Photo
              </label>
              {uploadedPhoto ? (
                <div className="relative rounded-[14px] overflow-hidden border border-[#E5DED4] bg-white p-3 flex items-center gap-3">
                  <img
                    src={uploadedPhoto}
                    alt="Uploaded photo"
                    className="w-16 h-16 rounded-[10px] object-cover border border-[#E5DED4]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold text-[#172033] truncate">Photo Loaded</p>
                    <p className="text-[12px] text-[#5F6878]">Ready for Veo animation</p>
                  </div>
                  <button
                    onClick={() => setUploadedPhoto(null)}
                    className="p-2 text-[#5F6878] hover:text-[#D64545] rounded-[8px] hover:bg-[#F1ECE4] transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-[14px] border-2 border-dashed border-[#E5DED4] hover:border-[#FF5A36] bg-white p-6 text-center cursor-pointer transition-colors"
                >
                  <Upload className="w-6 h-6 text-[#FF5A36] mx-auto mb-2" />
                  <p className="text-[13px] font-bold text-[#172033]">Click to upload photo</p>
                  <p className="text-[12px] text-[#5F6878] mt-0.5">PNG or JPG up to 10MB</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                  />
                </div>
              )}
            </div>
          )}

          {/* Large Prompt Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[13px] font-bold text-[#172033]">
                {mode === 'text' ? 'Scene Prompt' : 'Motion Instructions'}
              </label>
              <span className="text-[11px] text-[#8F97A3]">{prompt.length} / 1000</span>
            </div>
            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={
                mode === 'text'
                  ? 'Describe cinematic camera movement, lighting, subjects, action, and atmosphere...'
                  : 'Describe camera push, wind motion, or parallax animation...'
              }
              className="w-full rounded-[14px] bg-white border border-[#E5DED4] p-3.5 text-[14px] text-[#172033] placeholder-[#8F97A3] focus:outline-none focus:border-[#FF5A36] focus:ring-2 focus:ring-[#FF5A36]/20 transition-all leading-[1.6]"
            />

            {/* Quick Prompts */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-bold text-[#8F97A3] uppercase tracking-wider font-display">
                Sample Cinematic Prompts:
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
              <span>Video Settings</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Model */}
              <div>
                <label className="block text-[12px] font-semibold text-[#5F6878] mb-1.5">
                  Model Engine
                </label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full rounded-[10px] bg-[#FAF7F2] border border-[#E5DED4] p-2.5 text-[13px] text-[#172033] focus:outline-none focus:border-[#FF5A36] cursor-pointer"
                >
                  <option>veo-3.1-fast-generate-preview</option>
                </select>
              </div>

              {/* Aspect Ratio */}
              <div>
                <label className="block text-[12px] font-semibold text-[#5F6878] mb-1.5">
                  Aspect Ratio
                </label>
                <select
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value as '16:9' | '9:16')}
                  className="w-full rounded-[10px] bg-[#FAF7F2] border border-[#E5DED4] p-2.5 text-[13px] text-[#172033] focus:outline-none focus:border-[#FF5A36] cursor-pointer"
                >
                  <option value="16:9">Landscape (16:9)</option>
                  <option value="9:16">Portrait (9:16)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={handleStartGeneration}
            disabled={isSubmitting}
            className="w-full h-12 rounded-[12px] bg-[#FF5A36] text-white text-[15px] font-semibold hover:bg-[#E84C28] shadow-[0_4px_16px_rgba(255,90,54,0.25)] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 ai-loading-ring shrink-0" />
                <span>Generating Video...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Video (20 Credits)</span>
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

              {generatedVideoUrl && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleDownloadFile}
                  leftIcon={<Download className="w-3.5 h-3.5" />}
                >
                  Download MP4
                </Button>
              )}
            </div>

            {/* Canvas Body */}
            <div className="my-auto py-6 flex items-center justify-center">
              {isSubmitting ? (
                <div className="text-center space-y-3 py-16">
                  <div className="w-9 h-9 ai-loading-ring mx-auto" />
                  <div className="space-y-1">
                    <p className="text-[15px] font-bold text-[#172033]">
                      Creating your video render...
                    </p>
                    <p className="text-[13px] text-[#5F6878]">
                      {pollingStatus || 'This may take a few moments.'} ({pollingElapsed}s)
                    </p>
                  </div>
                </div>
              ) : generatedVideoUrl ? (
                <div className="w-full max-w-xl rounded-[16px] overflow-hidden border border-[#E5DED4] bg-black shadow-lg">
                  <video
                    src={generatedVideoUrl}
                    controls
                    autoPlay
                    loop
                    className="w-full h-auto max-h-[460px] mx-auto"
                  />
                </div>
              ) : (
                <div className="text-center space-y-3 py-16 max-w-sm mx-auto">
                  <div className="w-12 h-12 rounded-[12px] bg-[#FAF7F2] border border-[#E5DED4] flex items-center justify-center mx-auto text-[#FF5A36]">
                    <Video className="w-6 h-6" />
                  </div>
                  <h3 className="text-[18px] font-bold text-[#172033] font-display">
                    No video rendered yet
                  </h3>
                  <p className="text-[14px] text-[#5F6878] leading-relaxed">
                    Generated videos will stream and play with full transport controls here.
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
              <span>Format: MP4 ({aspectRatio})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
