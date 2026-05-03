import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Globe, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLang = () => {
    const next = lang === 'en' ? 'hi' : lang === 'hi' ? 'bn' : 'en';
    setLang(next);
    if (window.trackEvent) window.trackEvent('language_switch', 'engagement', next);
  };

  const navLinks = [
    { path: '/register', label: t('nav.register') },
    { path: '/learn', label: t('nav.learn') },
    { path: '/navigate', label: t('nav.navigate') }
  ];

  return (
    <header
      role="banner"
      className="sticky top-0 z-50 bg-[rgba(10,14,26,0.6)] backdrop-blur-[20px] border-b border-white/5 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" aria-label="GlobalElect Home" className="text-xl font-display font-bold tracking-tighter">
          <span className="text-white">GLOBAL</span>
          <span className="text-[#f59e0b]">ELECT</span>
        </Link>

        {/* Desktop Nav */}
        <nav role="navigation" aria-label="Main navigation" className="hidden md:flex items-center gap-8 text-sm font-body font-medium text-slate-300">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#f59e0b] focus:ring-offset-2 focus:ring-offset-transparent rounded-sm">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleLang}
            aria-label={`Switch language, current: ${lang}`}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#f59e0b]/50 hover:bg-[#f59e0b]/10 transition-colors text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#f59e0b]"
          >
            <Globe size={14} aria-hidden="true" />
            <span className="uppercase">{lang}</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#f59e0b] rounded"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          role="navigation"
          aria-label="Mobile navigation"
          className="md:hidden absolute top-16 left-0 w-full bg-navy border-b border-white/10 p-4 flex flex-col gap-4 shadow-xl"
        >
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className="text-slate-300 hover:text-white text-lg font-medium focus:outline-none focus:text-[#f59e0b]"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-4 pt-4 border-t border-white/10 mt-2">
            <button
              onClick={toggleLang}
              aria-label={`Switch language, current: ${lang}`}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300"
            >
              <Globe size={14} aria-hidden="true" /> <span className="uppercase">{lang}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
