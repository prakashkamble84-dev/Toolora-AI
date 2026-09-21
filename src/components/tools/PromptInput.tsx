import React from 'react';
import { Sparkles, Trash2 } from 'lucide-react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  maxLength?: number;
  examples?: string[];
  onSelectExample?: (example: string) => void;
  rows?: number;
  disabled?: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({
  value,
  onChange,
  label = 'Prompt',
  placeholder = 'Describe what you want to create...',
  maxLength = 1500,
  examples = [],
  onSelectExample,
  rows = 4,
  disabled = false,
}) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>{label}</span>
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-xs text-slate-400 hover:text-red-400 flex items-center gap-1 transition-colors"
          >
            <Trash2 className="w-3 h-3" />
            <span>Clear</span>
          </button>
        )}
      </div>

      <div className="relative">
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={disabled}
          className="w-full rounded-2xl bg-slate-900/90 border border-slate-800 p-4 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60 resize-none transition-all leading-relaxed"
        />
        <div className="absolute bottom-3 right-3 text-[11px] font-mono text-slate-500 pointer-events-none">
          {value.length}/{maxLength}
        </div>
      </div>

      {/* Examples suggestion pills */}
      {examples.length > 0 && (
        <div className="flex flex-col gap-1.5 pt-1">
          <span className="text-[11px] font-medium text-slate-400">Try an example:</span>
          <div className="flex flex-wrap gap-1.5">
            {examples.map((ex, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onSelectExample ? onSelectExample(ex) : onChange(ex)}
                className="text-left text-xs bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-cyan-300 px-3 py-1.5 rounded-xl border border-slate-700/70 transition-all truncate max-w-full"
              >
                "{ex}"
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
