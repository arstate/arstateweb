
import React, { useState } from 'react';
import { MoonIcon, SunIcon, MenuIcon } from './icons';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: (event: React.MouseEvent<HTMLButtonElement>) => void;
  page: 'home' | 'about';
  setPage: (page: 'home' | 'about') => void;
  setScrollToSection: (sectionId: string | null) => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode, page, setPage, setScrollToSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Beranda', href: '#' },
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

    if (href === '#') {
       if (page === 'home') {
           window.scrollTo({ top: 0, behavior: 'smooth' });
       } else {
           setPage('home');
       }
       return;
    }
    
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      if (page === 'home') {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        setPage('home');
        setScrollToSection(targetId);
      }
    }
  };


  return (
    <header className="theme-transition-header sticky top-0 left-0 right-0 z-50 bg-gold/95 dark:bg-navy/80 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#" onClick={(e) => handleNavigation(e, '#')} className="text-2xl font-bold text-navy dark:text-white whitespace-nowrap transition-colors duration-300">
            Arstate <span className="text-navy dark:text-gold" style={{ filter: 'url(#scribble-filter)' }}>Cinema</span>
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <nav className="flex items-center space-x-6 lg:space-x-8">
              {navLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavigation(e, link.href)}
                  className="text-navy dark:text-white hover:text-white/80 dark:hover:text-gold transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="flex items-center space-x-4">
              <a
                href="#contact"
                onClick={(e) => handleNavigation(e, '#contact')}
                className="px-5 py-2 text-navy dark:text-white border border-navy dark:border-gold rounded-full hover:bg-navy hover:text-white dark:hover:bg-gold dark:hover:text-navy transition-colors duration-300"
              >
                Hubungi Kami
              </a>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-navy dark:text-gold focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-50"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <SunIcon /> : <MoonIcon />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="flex items-center md:hidden space-x-2">
             <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-navy dark:text-gold focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-50"
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
