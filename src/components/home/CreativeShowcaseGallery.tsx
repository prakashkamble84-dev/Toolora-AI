import React, { useState } from 'react';
import { X, Sparkles, Copy, Check } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface ShowcaseItem {
  id: string;
  title: string;
  category: string;
  tool: 'AI Image' | 'AI Video' | 'AI Voice' | 'AI Text';
  prompt: string;
  image: string;
  aspect: string;
}

export const CreativeShowcaseGallery: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<ShowcaseItem | null>(null);
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const items: ShowcaseItem[] = [
    {
      id: 'item-1',
      title: 'Editorial High Fashion Portrait',
      category: 'Fashion & Portraiture',
      tool: 'AI Image',
      prompt:
        'Editorial fashion photography of a model in natural soft dusk lighting, 85mm f/1.4 lens, cinematic beige trench coat, warm palette, ultra high detail texture.',
      image:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85',
      aspect: 'aspect-[3/4]',
    },
    {
      id: 'item-2',
      title: 'Nordic Organic Architecture',
      category: 'Architecture & Spaces',
      tool: 'AI Image',
      prompt:
        'Contemporary architectural villa nestled against coastal pine forests, warm wood slat facades, floor-to-ceiling glass reflection, morning mist, 8k photographic rendering.',
      image:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=85',
      aspect: 'aspect-[4/3]',
    },
    {
      id: 'item-3',
      title: 'Luxury Botanical Fragrance',
      category: 'Product Advertising',
      tool: 'AI Image',
      prompt:
        'Commercial studio product advertisement of a minimalist frosted glass perfume bottle on wet volcanic stone, wild orange blossom accents, dramatic studio side lighting.',
      image:
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=85',
      aspect: 'aspect-[3/4]',
    },
    {
      id: 'item-4',
      title: 'Cinematic Mountain Expeditions',
      category: 'Travel & Documentary',
      tool: 'AI Video',
      prompt:
        'Veo motion cinematic sequence tracking across majestic mist-shrouded alpine summits at sunrise, 60fps steadycam glide, hyper-realistic volumetric atmosphere.',
      image:
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85',
      aspect: 'aspect-[16/10]',
    },
    {
      id: 'item-5',
      title: 'Minimalist Tokyo Interior Living',
      category: 'Interior Design',
      tool: 'AI Image',
      prompt:
        'Japandi aesthetic living room with low-profile oak furniture, linen curtains filtering midday sun, cast shadows on travertine floors, peaceful stillness.',
      image:
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=85',
      aspect: 'aspect-[4/3]',
    },
    {
      id: 'item-6',
      title: 'Artisanal Culinary Presentation',
      category: 'Culinary Art',
      tool: 'AI Image',
      prompt:
        'Fine dining gastronomic composition with microgreens, smoked beet emulsion on handmade dark ceramic tableware, macro food photography depth of field.',
      image:
        'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=85',
      aspect: 'aspect-[3/4]',
    },
    {
      id: 'item-7',
      title: 'Abstract Fluid Geometry',
      category: '3D Artwork',
      tool: 'AI Image',
      prompt:
        'Parametric undulating ribbons of clay and warm brass floating in void, physical material shader, soft global illumination, gallery sculpture mockup.',
      image:
        'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=85',
      aspect: 'aspect-[3/4]',
    },
    {
      id: 'item-8',
      title: 'Tropical Ocean Swell Motion',
      category: 'Motion Creative',
      tool: 'AI Video',
      prompt:
        'Veo 3.1 slow motion 120fps overhead drone shot tracking crystal clear turquoise reef waves curling into white seafoam against pristine warm sands.',
      image:
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=85',
      aspect: 'aspect-[16/10]',
    },
  ];

  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast('Prompt copied to clipboard', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="showcase" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-[12px] font-bold uppercase tracking-wider text-[#FF5A36] font-display">
          Creative Showcase
        </span>
        <h2 className="text-[36px] sm:text-[48px] font-bold text-[#172033] tracking-tight leading-[1.08] mt-2 mb-4 font-display">
          Made with Toolora
        </h2>
        <p className="text-[17px] text-[#5F6878]">
          Explore visual and cinematic studies generated across fashion, architecture, branding, and motion. Click any piece to inspect the prompt and engine parameters.
        </p>
      </div>

      {/* Masonry-Style Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group relative rounded-[18px] overflow-hidden border border-[#E5DED4] bg-white cursor-pointer shadow-[0_8px_25px_rgba(23,32,51,0.05)] hover:shadow-[0_16px_35px_rgba(23,32,51,0.12)] hover:-translate-y-1 transition-all duration-300"
          >
            <div className={`${item.aspect} w-full overflow-hidden relative bg-[#FAF7F2]`}>
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#172033]/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Tool Badge */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-[6px] bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-[#172033]">
                  {item.tool}
                </span>
              </div>

              {/* Hover Details */}
              <div className="absolute bottom-3 left-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-[11px] text-[#FFB547] font-semibold uppercase tracking-wider mb-0.5">
                  {item.category}
                </p>
                <h4 className="text-[14px] font-bold leading-tight font-display mb-1">{item.title}</h4>
                <p className="text-[11px] text-white/80 line-clamp-2 italic">&ldquo;{item.prompt}&rdquo;</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-3xl rounded-[24px] bg-white border border-[#E5DED4] overflow-hidden shadow-2xl text-left">
            <div className="flex items-center justify-between p-6 border-b border-[#E5DED4]">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF5A36] font-display">
                  {selectedItem.category} • {selectedItem.tool}
                </span>
                <h3 className="text-[20px] font-bold text-[#172033] font-display">{selectedItem.title}</h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 rounded-full hover:bg-[#F1ECE4] text-[#5F6878] hover:text-[#172033] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-7 rounded-[16px] overflow-hidden border border-[#E5DED4] bg-[#FAF7F2]">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-auto max-h-[360px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="md:col-span-5 flex flex-col justify-between">
                <div>
                  <h4 className="text-[12px] font-bold uppercase tracking-wider text-[#172033] font-display mb-2">
                    Generation Prompt
                  </h4>
                  <div className="p-4 rounded-[12px] bg-[#FAF7F2] border border-[#E5DED4] text-[13px] text-[#5F6878] leading-relaxed mb-4">
                    &ldquo;{selectedItem.prompt}&rdquo;
                  </div>

                  <div className="space-y-2 text-[12px] text-[#5F6878]">
                    <div className="flex justify-between py-1 border-b border-[#E5DED4]">
                      <span>Model Engine:</span>
                      <span className="font-semibold text-[#172033]">
                        {selectedItem.tool === 'AI Video' ? 'Google Veo 3.1' : 'Gemini 3.1 Flash Image'}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#E5DED4]">
                      <span>Resolution:</span>
                      <span className="font-semibold text-[#172033]">Ultra HD (Master)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Commercial License:</span>
                      <span className="font-semibold text-[#238B6F]">Included</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E5DED4] flex gap-3">
                  <button
                    onClick={() => handleCopyPrompt(selectedItem.prompt)}
                    className="flex-1 py-2.5 px-4 rounded-[10px] bg-[#FF5A36] text-white text-[13px] font-semibold hover:bg-[#E84C28] flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Copied Prompt</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Prompt</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="py-2.5 px-4 rounded-[10px] border border-[#E5DED4] text-[#172033] text-[13px] font-semibold hover:bg-[#F1ECE4] transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
