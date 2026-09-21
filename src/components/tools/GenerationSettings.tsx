import React from 'react';
import { Sliders, Check } from 'lucide-react';
import { GenerationType, GenerationSettings as SettingsType } from '../../types';

interface GenerationSettingsProps {
  type: GenerationType;
  settings: SettingsType;
  onChange: (newSettings: SettingsType) => void;
  disabled?: boolean;
}

export const GenerationSettings: React.FC<GenerationSettingsProps> = ({
  type,
  settings,
  onChange,
  disabled = false,
}) => {
  const updateSetting = <K extends keyof SettingsType>(key: K, value: SettingsType[K]) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <div className="w-full flex flex-col gap-5 p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-300">
        <Sliders className="w-4 h-4 text-cyan-400" />
        <span>Generation Parameters</span>
      </div>

      {/* TEXT GENERATOR SETTINGS */}
      {type === 'text' && (
        <div className="space-y-4 text-left">
          {/* Content Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Content Type
            </label>
            <select
              disabled={disabled}
              value={settings.contentType || 'General'}
              onChange={(e) => updateSetting('contentType', e.target.value as any)}
              className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
            >
              {['General', 'Blog', 'Social Media', 'Email', 'Advertisement', 'Product Description'].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Tone */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Tone of Voice
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {['Professional', 'Friendly', 'Persuasive', 'Creative', 'Formal', 'Casual'].map((tone) => {
                const isSelected = (settings.tone || 'Professional') === tone;
                return (
                  <button
                    key={tone}
                    type="button"
                    disabled={disabled}
                    onClick={() => updateSetting('tone', tone as any)}
                    className={`px-2 py-1.5 text-xs rounded-lg border font-medium transition-all ${
                      isSelected
                        ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-300'
                        : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {tone}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Length & Language */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Output Length
              </label>
              <select
                disabled={disabled}
                value={settings.length || 'Medium'}
                onChange={(e) => updateSetting('length', e.target.value as any)}
                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
              >
                {['Short', 'Medium', 'Long'].map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Language
              </label>
              <select
                disabled={disabled}
                value={settings.language || 'English'}
                onChange={(e) => updateSetting('language', e.target.value)}
                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
              >
                {['English', 'Hindi', 'Marathi'].map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* IMAGE GENERATOR SETTINGS */}
      {type === 'image' && (
        <div className="space-y-4 text-left">
          {/* Aspect Ratio */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Aspect Ratio
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: '1:1', desc: 'Square' },
                { label: '16:9', desc: 'Landscape' },
                { label: '9:16', desc: 'Portrait' },
                { label: '4:3', desc: 'Classic' },
              ].map((ratio) => {
                const isSelected = (settings.aspectRatio || '1:1') === ratio.label;
                return (
                  <button
                    key={ratio.label}
                    type="button"
                    disabled={disabled}
                    onClick={() => updateSetting('aspectRatio', ratio.label as any)}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-purple-500/20 border-purple-500/60 text-purple-300'
                        : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="text-xs font-bold">{ratio.label}</span>
                    <span className="text-[10px] opacity-70">{ratio.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Visual Style */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Visual Style
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {['Realistic', 'Cinematic', 'Illustration', '3D', 'Anime', 'Minimal'].map((st) => {
                const isSelected = (settings.style || 'Realistic') === st;
                return (
                  <button
                    key={st}
                    type="button"
                    disabled={disabled}
                    onClick={() => updateSetting('style', st as any)}
                    className={`px-2 py-1.5 text-xs rounded-lg border font-medium transition-all ${
                      isSelected
                        ? 'bg-purple-500/20 border-purple-500/60 text-purple-300'
                        : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quality & Batch Count */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Image Quality
              </label>
              <select
                disabled={disabled}
                value={settings.quality || 'High'}
                onChange={(e) => updateSetting('quality', e.target.value as any)}
                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
              >
                {['Standard', 'High'].map((q) => (
                  <option key={q} value={q}>{q}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Batch Count
              </label>
              <select
                disabled={disabled}
                value={settings.numImages || 1}
                onChange={(e) => updateSetting('numImages', parseInt(e.target.value, 10) as any)}
                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
              >
                {[1, 2, 4].map((num) => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Image' : 'Images'}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* VOICE GENERATOR SETTINGS */}
      {type === 'voice' && (
        <div className="space-y-4 text-left">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Voice Model
              </label>
              <select
                disabled={disabled}
                value={settings.voice || 'Studio Natural (US)'}
                onChange={(e) => updateSetting('voice', e.target.value)}
                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                {['Studio Natural (US)', 'Narrator Deep (UK)', 'Conversational Female', 'Dynamic Male', 'Soft Ambient'].map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Language
              </label>
              <select
                disabled={disabled}
                value={settings.language || 'English (US)'}
                onChange={(e) => updateSetting('language', e.target.value)}
                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                {['English (US)', 'English (UK)', 'Hindi', 'Marathi', 'Spanish', 'French'].map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Speed slider */}
          <div>
            <div className="flex justify-between items-center mb-1 text-xs">
              <span className="font-semibold text-slate-300">Pacing Speed</span>
              <span className="font-mono text-emerald-400">{settings.speed || 1.0}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              disabled={disabled}
              value={settings.speed || 1.0}
              onChange={(e) => updateSetting('speed', parseFloat(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* Pitch slider */}
          <div>
            <div className="flex justify-between items-center mb-1 text-xs">
              <span className="font-semibold text-slate-300">Vocal Pitch</span>
              <span className="font-mono text-emerald-400">{settings.pitch || 0}</span>
            </div>
            <input
              type="range"
              min="-10"
              max="10"
              step="1"
              disabled={disabled}
              value={settings.pitch || 0}
              onChange={(e) => updateSetting('pitch', parseInt(e.target.value, 10))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* VIDEO GENERATOR SETTINGS */}
      {type === 'video' && (
        <div className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Aspect Ratio
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['16:9 (Landscape)', '9:16 (Vertical)', '1:1 (Square)'].map((ratio) => {
                const isSelected = (settings.aspectRatio || '16:9') === ratio.split(' ')[0];
                return (
                  <button
                    key={ratio}
                    type="button"
                    disabled={disabled}
                    onClick={() => updateSetting('aspectRatio', ratio.split(' ')[0] as any)}
                    className={`p-2 text-xs rounded-xl border font-medium text-center transition-all ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-500/60 text-amber-300'
                        : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {ratio}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Target Duration
              </label>
              <select
                disabled={disabled}
                value={settings.duration || '5s'}
                onChange={(e) => updateSetting('duration', e.target.value as any)}
                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                {['5s', '10s'].map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Resolution
              </label>
              <select
                disabled={disabled}
                value={settings.resolution || '1080p'}
                onChange={(e) => updateSetting('resolution', e.target.value as any)}
                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                {['720p', '1080p'].map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Motion & Style
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {['Cinematic', 'Hyper-realistic', 'Motion Graphic'].map((vst) => {
                const isSelected = (settings.videoStyle || 'Cinematic') === vst;
                return (
                  <button
                    key={vst}
                    type="button"
                    disabled={disabled}
                    onClick={() => updateSetting('videoStyle', vst as any)}
                    className={`px-2 py-1.5 text-xs rounded-lg border font-medium transition-all ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-500/60 text-amber-300'
                        : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {vst}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
