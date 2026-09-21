import React, { useState, useRef } from 'react';
import {
  Image as ImageIcon,
  Upload,
  Download,
  Maximize2,
  Trash2,
  Sliders,
  Coins,
  Sparkles,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Modal } from '../components/common/Modal';

interface ImageGeneratorPageProps {
  onNavigate: (path: string) => void;
}

export const ImageGeneratorPage: React.FC<ImageGeneratorPageProps> = ({ onNavigate }) => {
  const { user, deductCredits } = useAuth();
  const { showToast } = useToast();

  const [mode, setMode] = useState<'create' | 'edit'>('create');
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState('gemini-3.1-flash-image-preview');
  const [style, setStyle] = useState('Photorealistic Cinematic');
  const [aspectRatio, setAspectRatio] = useState<string>('1:1');
  const [quality, setQuality] = useState('High Definition');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedMimeType, setUploadedMimeType] = useState<string>('image/png');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const aspectRatios = [
    { label: 'Square', value: '1:1' },
    { label: 'Landscape', value: '16:9' },
    { label: 'Portrait', value: '9:16' },
    { label: 'Classic', value: '4:3' },
    { label: 'Vertical', value: '3:4' },
  ];

  const samplePrompts = [
    'Editorial fashion portrait in golden hour natural lighting, cinematic 85mm f/1.4 depth of field',
    'Modern minimalist architectural pavilion overlooking a misty alpine forest with warm wooden slats',
    'Commercial studio product photography of a luxury frosted glass bottle on wet stone with citrus accents',
  ];

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('Please upload an image file (PNG, JPG, WEBP)', 'error');
      return;
    }
    setUploadedMimeType(file.type);
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result as string);
      showToast('Reference image loaded. Enter your edit instructions.', 'success');
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    const cleanPrompt = prompt.trim();
    if (!cleanPrompt) {
      showToast('Please enter an image prompt.', 'warning');
      return;
    }

    if (mode === 'edit' && !uploadedImage) {
      showToast('Please upload an image to edit or switch to Text to Image.', 'warning');
      return;
    }

    if ((user?.credits ?? 0) < 5) {
      showToast('Insufficient credits (5 required). Please upgrade your plan.', 'error');
      onNavigate('/pricing');
      return;
    }

    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: cleanPrompt,
          image: mode === 'edit' ? uploadedImage : undefined,
          mimeType: uploadedMimeType,
          aspectRatio,
          model,
          style,
          quality,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image');
      }

      setGeneratedImage(data.imageUrl);
      deductCredits(5);
      showToast('Image generated successfully!', 'success');
    } catch (err: any) {
      console.error('Image generation error:', err);
      showToast(err.message || 'Error generating image', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const a = document.createElement('a');
    a.href = generatedImage;
    a.download = `toolora-image-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('Download started', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-left">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5DED4]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[28px] font-bold text-[#172033] tracking-tight font-display flex items-center gap-2.5">
              <span className="w-10 h-10 rounded-[12px] bg-[#FFF0EB] flex items-center justify-center text-[#FF5A36]">
                <ImageIcon className="w-5 h-5" />
              </span>
              <span>AI Image Studio</span>
            </h1>
            <span className="px-2.5 py-0.5 rounded-[6px] text-[11px] font-bold bg-[#FAF7F2] text-[#FF5A36] border border-[#E5DED4]">
              gemini-3.1-flash
            </span>
          </div>
          <p className="text-[14px] text-[#5F6878] mt-1">
            Turn your ideas into striking visual artwork and high-res photography.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-[10px] bg-white border border-[#E5DED4] text-[#172033] text-[13px] font-semibold shadow-xs">
          <Coins className="w-4 h-4 text-[#FF5A36]" />
          <span>5 Credits per generation</span>
        </div>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Prompt and Settings (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Mode Tabs (Create / Edit) */}
          <div className="flex items-center p-1 rounded-[12px] bg-[#FAF7F2] border border-[#E5DED4]">
            <button
              onClick={() => setMode('create')}
              className={`flex-1 py-2 rounded-[9px] text-[13px] font-semibold transition-all cursor-pointer ${
                mode === 'create'
                  ? 'bg-white text-[#172033] shadow-sm font-bold'
                  : 'text-[#5F6878] hover:text-[#172033]'
              }`}
            >
              Text to Image
            </button>
            <button
              onClick={() => setMode('edit')}
              className={`flex-1 py-2 rounded-[9px] text-[13px] font-semibold transition-all cursor-pointer ${
                mode === 'edit'
                  ? 'bg-white text-[#172033] shadow-sm font-bold'
                  : 'text-[#5F6878] hover:text-[#172033]'
              }`}
            >
              Upload &amp; Edit
            </button>
          </div>

          {/* Reference Image Upload (When Edit mode active) */}
          {mode === 'edit' && (
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-[#172033]">
                Reference Image
              </label>
              {uploadedImage ? (
                <div className="relative rounded-[14px] overflow-hidden border border-[#E5DED4] bg-white p-3 flex items-center gap-3">
                  <img
                    src={uploadedImage}
                    alt="Upload"
                    className="w-16 h-16 rounded-[10px] object-cover border border-[#E5DED4]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold text-[#172033] truncate">Image Loaded</p>
                    <p className="text-[12px] text-[#5F6878]">Ready for generative transformation</p>
                  </div>
                  <button
                    onClick={() => setUploadedImage(null)}
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
                  <p className="text-[12px] text-[#5F6878] mt-0.5">PNG, JPG, WEBP up to 10MB</p>
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
                {mode === 'create' ? 'Prompt' : 'Edit Instructions'}
              </label>
              <span className="text-[11px] text-[#8F97A3]">{prompt.length} / 1000</span>
            </div>
            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={
                mode === 'create'
                  ? 'Describe your visual idea in detail (subject, environment, lighting, composition)...'
                  : 'Describe changes to make to the uploaded image...'
              }
              className="w-full rounded-[14px] bg-white border border-[#E5DED4] p-3.5 text-[14px] text-[#172033] placeholder-[#8F97A3] focus:outline-none focus:border-[#FF5A36] focus:ring-2 focus:ring-[#FF5A36]/20 transition-all leading-[1.6]"
            />

            {/* Quick Prompts */}
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

          {/* Settings & Configuration Card */}
          <div className="p-6 rounded-[20px] bg-white border border-[#E5DED4] space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-[13px] font-bold text-[#172033]">
              <Sliders className="w-4 h-4 text-[#FF5A36]" />
              <span>Generation Settings</span>
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
                  <option>gemini-3.1-flash-image-preview</option>
                  <option>imagen-3.0-generate-002</option>
                </select>
              </div>

              {/* Style Selection */}
              <div>
                <label className="block text-[12px] font-semibold text-[#5F6878] mb-1.5">
                  Visual Style
                </label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full rounded-[10px] bg-[#FAF7F2] border border-[#E5DED4] p-2.5 text-[13px] text-[#172033] focus:outline-none focus:border-[#FF5A36] cursor-pointer"
                >
                  <option>Photorealistic Cinematic</option>
                  <option>Minimalist 3D Render</option>
                  <option>Digital Art Illustration</option>
                  <option>Anime &amp; Manga Studio</option>
                  <option>Vintage Film Aesthetic</option>
                </select>
              </div>

              {/* Aspect Ratio */}
              <div>
                <label className="block text-[12px] font-semibold text-[#5F6878] mb-1.5">
                  Aspect Ratio
                </label>
                <select
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value)}
                  className="w-full rounded-[10px] bg-[#FAF7F2] border border-[#E5DED4] p-2.5 text-[13px] text-[#172033] focus:outline-none focus:border-[#FF5A36] cursor-pointer"
                >
                  {aspectRatios.map((ar) => (
                    <option key={ar.value} value={ar.value}>
                      {ar.label} ({ar.value})
                    </option>
                  ))}
                </select>
              </div>

              {/* Quality */}
              <div>
                <label className="block text-[12px] font-semibold text-[#5F6878] mb-1.5">
                  Quality Profile
                </label>
                <select
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  className="w-full rounded-[10px] bg-[#FAF7F2] border border-[#E5DED4] p-2.5 text-[13px] text-[#172033] focus:outline-none focus:border-[#FF5A36] cursor-pointer"
                >
                  <option>High Definition (1080p)</option>
                  <option>Ultra 4K Clarity</option>
                  <option>Fast Standard</option>
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
                <span>Generating Image...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Image (5 Credits)</span>
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

              {generatedImage && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsZoomOpen(true)}
                    className="p-2 rounded-[10px] bg-[#FAF7F2] border border-[#E5DED4] text-[#5F6878] hover:text-[#172033] transition-colors cursor-pointer"
                    title="Zoom Preview"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleDownload}
                    leftIcon={<Download className="w-3.5 h-3.5" />}
                  >
                    Download PNG
                  </Button>
                </div>
              )}
            </div>

            {/* Canvas Body */}
            <div className="my-auto py-6 flex items-center justify-center">
              {isGenerating ? (
                <div className="text-center space-y-3 py-16">
                  <div className="w-9 h-9 ai-loading-ring mx-auto" />
                  <div className="space-y-1">
                    <p className="text-[15px] font-bold text-[#172033]">
                      Creating your result...
                    </p>
                    <p className="text-[13px] text-[#5F6878]">
                      This may take a few moments.
                    </p>
                  </div>
                </div>
              ) : generatedImage ? (
                <div className="relative w-full max-w-lg rounded-[16px] overflow-hidden border border-[#E5DED4] bg-[#FAF7F2] group shadow-md">
                  <img
                    src={generatedImage}
                    alt="AI Generated Visual"
                    className="w-full h-auto object-cover max-h-[460px] mx-auto cursor-pointer"
                    onClick={() => setIsZoomOpen(true)}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-[8px] bg-white/90 backdrop-blur-sm border border-[#E5DED4] text-[11px] font-bold text-[#172033] shadow-sm">
                    {aspectRatio} • {quality}
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-3 py-16 max-w-sm mx-auto">
                  <div className="w-12 h-12 rounded-[12px] bg-[#FAF7F2] border border-[#E5DED4] flex items-center justify-center mx-auto text-[#FF5A36]">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-[18px] font-bold text-[#172033] font-display">
                    No creations yet
                  </h3>
                  <p className="text-[14px] text-[#5F6878] leading-relaxed">
                    Your generated visual assets will render in full resolution here.
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
              <span>Ratio: {aspectRatio}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Zoom Modal */}
      {isZoomOpen && generatedImage && (
        <Modal
          isOpen={isZoomOpen}
          onClose={() => setIsZoomOpen(false)}
          title="Generated Visual Preview"
          size="xl"
        >
          <div className="relative rounded-[14px] overflow-hidden bg-[#FAF7F2] flex items-center justify-center border border-[#E5DED4]">
            <img
              src={generatedImage}
              alt="Fullscreen AI Render"
              className="max-h-[75vh] w-auto object-contain mx-auto"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="mt-5 flex items-center justify-between">
            <span className="text-[13px] text-[#5F6878]">
              Format: PNG • Aspect Ratio: {aspectRatio}
            </span>
            <Button
              variant="primary"
              size="sm"
              onClick={handleDownload}
              leftIcon={<Download className="w-4 h-4" />}
            >
              Download Full Resolution
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};
