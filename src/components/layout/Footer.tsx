import React from 'react';
import { Logo } from '../common/Logo';
import { Twitter, Github, Linkedin, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer id="app-footer" className="border-t border-[#263044] bg-[#172033] text-white text-[14px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Logo size="md" showTagline={true} variant="dark" onClick={() => onNavigate('/')} />
            <p className="text-[#94A3B8] text-[15px] leading-[1.6] max-w-sm pt-2">
              The creative AI workspace for high-impact image, video, voice, and text generation. Built for creators, marketers, designers, and studios.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-[10px] bg-[#101522] border border-[#263044] flex items-center justify-center text-[#94A3B8] hover:text-[#FF5A36] hover:border-[#FF5A36] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-[10px] bg-[#101522] border border-[#263044] flex items-center justify-center text-[#94A3B8] hover:text-[#FF5A36] hover:border-[#FF5A36] transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-[10px] bg-[#101522] border border-[#263044] flex items-center justify-center text-[#94A3B8] hover:text-[#FF5A36] hover:border-[#FF5A36] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* AI Tools Col */}
          <div className="space-y-3">
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-white font-display">AI Tools</h4>
            <ul className="space-y-2.5 text-[14px] text-[#94A3B8]">
              <li>
                <button onClick={() => onNavigate('/dashboard/image')} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1">
                  <span>AI Image Studio</span>
                  <ArrowUpRight className="w-3 h-3 text-[#FF5A36]" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/dashboard/video')} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1">
                  <span>AI Video Studio</span>
                  <ArrowUpRight className="w-3 h-3 text-[#FF5A36]" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/dashboard/voice')} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1">
                  <span>AI Voice Studio</span>
                  <ArrowUpRight className="w-3 h-3 text-[#FF5A36]" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/dashboard/text')} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1">
                  <span>AI Text Studio</span>
                  <ArrowUpRight className="w-3 h-3 text-[#FF5A36]" />
                </button>
              </li>
            </ul>
          </div>

          {/* Solutions Col */}
          <div className="space-y-3">
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-white font-display">Solutions</h4>
            <ul className="space-y-2.5 text-[14px] text-[#94A3B8]">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('/#solutions')}>
                  For Marketers
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('/#solutions')}>
                  For Creators
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('/#solutions')}>
                  For Designers
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('/#solutions')}>
                  For Businesses
                </span>
              </li>
            </ul>
          </div>

          {/* Company & Resources */}
          <div className="space-y-3">
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-white font-display">Product</h4>
            <ul className="space-y-2.5 text-[14px] text-[#94A3B8]">
              <li>
                <button onClick={() => onNavigate('/pricing')} className="hover:text-white transition-colors cursor-pointer">
                  Pricing Plans
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('/#showcase')}>
                  Showcase
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('/#how-it-works')}>
                  How It Works
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('/#faq')}>
                  FAQ & Support
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-[#263044] flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[#94A3B8]">
          <div>
            © {new Date().getFullYear()} Toolora AI. All rights reserved. &ldquo;Create. Generate. Automate.&rdquo;
          </div>
          <div className="flex items-center gap-6 text-[#94A3B8]">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
