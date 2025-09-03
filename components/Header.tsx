
import React, { useState } from 'react';
import { MoonIcon, SunIcon, MenuIcon } from './icons';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Beranda', href: '#' },
    { name: 'Layanan', href: '#layanan' },
    { name: 'Portofolio', href: '#karya-pilihan' },
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-navy/80 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="text-2xl font-bold text-white whitespace-nowrap">
            Arstate <span className="text-gold" style={{ filter: 'url(#scribble-filter)' }}>Cinema</span>
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <nav className="flex items-center space-x-6 lg:space-x-8">
              {navLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white hover:text-gold transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="flex items-center space-x-4">
              <a
                href="#contact"
                className="px-5 py-2 text-white border border-gold rounded-full hover:bg-gold hover:text-navy transition-colors duration-300"
              >
                Hubungi Kami
              </a>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-gold focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-50"
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
                className="p-2 rounded-full text-gold focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-50"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <SunIcon /> : <MoonIcon />}
              </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-white hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold"
              aria-label="Toggle mobile menu"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Dropdown Menu */}
      <div className={`
        absolute top-full left-0 w-full bg-navy/95 backdrop-blur-md md:hidden
        transition-all duration-300 ease-in-out overflow-hidden
        ${isMobileMenuOpen ? 'max-h-96 shadow-lg' : 'max-h-0'}
      `}>
          <div className="px-6 py-4 flex flex-col space-y-4">
              {navLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="text-white hover:text-gold transition-colors duration-300 py-2 text-center"
                >
                  {link.name}
                </a>
              ))}
               <a
                href="#contact"
                onClick={handleLinkClick}
                className="w-full text-center mt-2 px-5 py-2 text-white border border-gold rounded-full hover:bg-gold hover:text-navy transition-colors duration-300"
              >
                Hubungi Kami
              </a>
          </div>
      </div>
    </header>
  );
};

export default Header;
