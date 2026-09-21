import React from 'react';

export const CreatorCategoriesSection: React.FC = () => {
  const categories = [
    {
      role: 'MARKETERS',
      tagline: 'Campaigns without the bottleneck.',
      description:
        'Launch multi-channel advertising, high-converting copy, product visuals, and video teasers in hours instead of weeks.',
      image:
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
      badge: 'Product & Ad Creative',
    },
    {
      role: 'CREATORS',
      tagline: 'From idea to finished content.',
      description:
        'Create bespoke YouTube thumbnails, TikTok video voiceovers, newsletter essays, and cover visuals from one workspace.',
      image:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      badge: 'Social Storytelling',
    },
    {
      role: 'DESIGNERS',
      tagline: 'Explore more directions in less time.',
      description:
        'Iterate on mood boards, concept art, architectural lighting variations, and stylistic treatments with instant AI rendering.',
      image:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      badge: 'Spatial & Concept Art',
    },
    {
      role: 'BUSINESSES',
      tagline: 'Create professional content faster.',
      description:
        'Scale brand assets across global teams with consistent aesthetic quality, enterprise security, and full commercial rights.',
      image:
        'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
      badge: 'Enterprise Brand Studio',
    },
  ];

  return (
    <section id="solutions" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-[12px] font-bold uppercase tracking-wider text-[#FF5A36] font-display">
          Purpose-Built Velocity
        </span>
        <h2 className="text-[36px] sm:text-[48px] font-bold text-[#172033] tracking-tight leading-[1.08] mt-2 mb-4 font-display">
          Made for people who create.
        </h2>
        <p className="text-[17px] text-[#5F6878]">
          Whether you lead agency campaigns, build independent media, or design digital experiences, Toolora adapts to your creative workflow.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.role}
            className="rounded-[20px] bg-white border border-[#E5DED4] overflow-hidden shadow-[0_12px_30px_rgba(23,32,51,0.06)] hover:-translate-y-1.5 transition-all duration-300 group flex flex-col"
          >
            {/* Photographic Header */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF7F2]">
              <img
                src={cat.image}
                alt={cat.role}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-[6px] bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-[#172033]">
                {cat.badge}
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold tracking-wider text-[#FF5A36] uppercase font-display block mb-1">
                  {cat.role}
                </span>
                <h3 className="text-[18px] font-bold text-[#172033] mb-2 font-display leading-snug">
                  {cat.tagline}
                </h3>
                <p className="text-[14px] text-[#5F6878] leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
