
import React, { useState, useRef } from 'react';
import { MoonIcon, SunIcon, MenuIcon } from './icons';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: (event: React.MouseEvent<HTMLButtonElement>) => void;
  page: 'home' | 'about' | 'gallery' | 'itemDetail';
  setPage: (page: 'home' | 'about' | 'gallery') => void;
  setScrollToSection: (sectionId: string | null) => void;
  smoothScrollTo: (id: string) => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode, page, setPage, setScrollToSection, smoothScrollTo }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const [magicLineStyle, setMagicLineStyle] = useState({
    opacity: 0,
    width: 0,
    height: 0,
    transform: 'translateX(0px)',
  });


  const navLinks = [
    { name: 'Beranda', href: '#home' },
    { name: 'Layanan', href: '#layanan' },
    { name: 'Portofolio', href: '#karya-pilihan' },
    { name: 'Tentang Kami', href: '/about' },
  ];

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (href === '/about') {
      setPage('about');
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }
    
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      if (page === 'home') {
        smoothScrollTo(targetId);
      } else {
        setPage('home');
        setScrollToSection(targetId);
      }
    }
  };
  
  const handleLinkHover = (e: React.MouseEvent<HTMLElement>) => {
    if (!navRef.current) return;
    const linkEl = e.currentTarget;
    setMagicLineStyle({
      opacity: 1,
      width: linkEl.offsetWidth,
      height: linkEl.offsetHeight,
      transform: `translateX(${linkEl.offsetLeft}px)`,
    });
  };

  const handleNavLeave = () => {
    setMagicLineStyle(prev => ({ ...prev, opacity: 0 }));
  };


  return (
    <header className="theme-transition-header sticky top-0 left-0 right-0 z-50 bg-gold/95 dark:bg-navy/80 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#home" onClick={(e) => handleNavigation(e, '#home')} className="text-2xl font-bold text-navy dark:text-white whitespace-nowrap transition-colors duration-300">
            Arstate <span className="text-navy dark:text-gold" style={{ filter: 'url(#scribble-filter)' }}>Cinema</span>
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            <nav 
              ref={navRef}
              onMouseLeave={handleNavLeave}
              className="relative flex items-center space-x-6 lg:space-x-8"
            >
              <span
                className={`absolute rounded-full pointer-events-none ${isDarkMode ? 'bg-gold' : 'bg-navy'}`}
                style={{
                  ...magicLineStyle,
                  transition: 'all 300ms ease-in-out',
                }}
              />
              {navLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  onMouseEnter={handleLinkHover}
                  onClick={(e) => handleNavigation(e, link.href)}
                  className="relative z-10 text-navy dark:text-white hover:bg-transparent hover:text-white dark:hover:bg-transparent dark:hover:text-navy rounded-full transition-colors duration-300 py-1 px-3"
                >
                  {link.name}
                </a>
              ))}
               <a
                href="#contact"
                onMouseEnter={handleLinkHover}
                onClick={(e) => handleNavigation(e, '#contact')}
                className="relative z-10 px-5 py-2 text-navy dark:text-white border border-navy dark:border-gold rounded-full hover:bg-transparent hover:text-white dark:hover:bg-transparent dark:hover:text-navy dark:hover:border-transparent transition-colors duration-300"
              >
                Hubungi Kami
              </a>
              <button
                onMouseEnter={handleLinkHover}
                onClick={toggleDarkMode}
                className="relative z-10 p-2 flex items-center justify-center rounded-full text-navy dark:text-gold hover:text-white dark:hover:text-navy focus:outline-none transition-colors duration-300"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <SunIcon /> : <MoonIcon />}
              </button>
            </nav>
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="flex items-center md:hidden space-x-2">
             <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-navy dark:text-gold focus:outline-none"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <SunIcon /> : <MoonIcon />}
              </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-navy dark:text-white hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold"
              aria-label="Toggle mobile menu"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Dropdown Menu */}
      <div className={`
        absolute top-full left-0 w-full bg-gold/95 dark:bg-navy/95 backdrop-blur-md md:hidden
        transition-all duration-300 ease-in-out overflow-hidden
        ${isMobileMenuOpen ? 'max-h-96 shadow-lg' : 'max-h-0'}
      `}>
          <div className="px-6 py-4 flex flex-col space-y-4">
              {navLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavigation(e, link.href)}
                  className="text-navy dark:text-white hover:text-white/80 dark:hover:text-gold transition-colors duration-300 py-2 text-center"
                >
                  {link.name}
                </a>
              ))}
               <a
                href="#contact"
                onClick={(e) => handleNavigation(e, '#contact')}
                className="w-full text-center mt-2 px-5 py-2 text-navy dark:text-white border border-navy dark:border-gold rounded-full hover:bg-navy hover:text-white dark:hover:bg-gold dark:hover:text-navy transition-colors duration-300"
              >
                Hubungi Kami
              </a>
          </div>
      </div>
    </header>
  );
};

export default Header;
