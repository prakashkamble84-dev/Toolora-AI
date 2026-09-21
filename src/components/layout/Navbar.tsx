import React, { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const navLinks = [
    { label: 'AI Tools', href: '#ai-tools', path: '/#ai-tools' },
    { label: 'Solutions', href: '#solutions', path: '/#solutions' },
    { label: 'Pricing', href: '/pricing', path: '/pricing' },
    { label: 'Resources', href: '#showcase', path: '/#showcase' },
  ];

  const handleLinkClick = (path: string) => {
    if (path.startsWith('/#')) {
      if (currentPath !== '/') {
        onNavigate('/');
        setTimeout(() => {
          const element = document.querySelector(path.replace('/', ''));
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      } else {
        const element = document.querySelector(path.replace('/', ''));
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      onNavigate(path);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      id="app-public-header"
      className="sticky top-0 z-40 w-full border-b border-[#E5DED4] bg-[#FAF7F2]/90 backdrop-blur-md transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Logo
          size="md"
          showTagline={false}
          variant="light"
          onClick={() => onNavigate('/')}
        />

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-[#5F6878]">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.path)}
              className={`transition-colors hover:text-[#172033] cursor-pointer ${
                currentPath === link.path ? 'text-[#172033] font-bold' : 'text-[#5F6878]'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTA Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onNavigate('/dashboard')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Dashboard
            </Button>
          ) : (
            <>
              <button
                onClick={() => onNavigate('/login')}
                className="text-[14px] font-semibold text-[#172033] hover:text-[#FF5A36] px-3 py-2 transition-colors cursor-pointer"
              >
                Login
              </button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => onNavigate('/signup')}
              >
                START CREATING
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-[#172033] hover:text-[#FF5A36] rounded-[8px] hover:bg-[#F1ECE4] transition-colors"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-[#E5DED4] bg-[#FAF7F2] px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.path)}
                className="text-left py-2.5 px-3 rounded-[8px] text-[15px] font-medium text-[#5F6878] hover:text-[#172033] hover:bg-[#F1ECE4]"
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="pt-3 border-t border-[#E5DED4] flex flex-col gap-2">
            {isAuthenticated ? (
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavigate('/dashboard');
                }}
              >
                Dashboard
              </Button>
            ) : (
              <>
                <Button
                  variant="secondary"
                  size="md"
                  className="w-full"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate('/login');
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate('/signup');
                  }}
                >
                  START CREATING
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
