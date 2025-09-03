import React from 'react';
import { MoonIcon, SunIcon } from './icons';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  const navLinks = [
    { name: 'Beranda', href: '#' },
    { name: 'Layanan', href: '#layanan' },
    { name: 'Portofolio', href: '#karya-pilihan' },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-navy/80 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="text-2xl font-bold text-white whitespace-nowrap">
            Arstate <span className="text-gold" style={{ filter: 'url(#scribble-filter)' }}>Cinema</span>
          </a>
          
          <div className="flex items-center space-x-6 lg:space-x-8">
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
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
        </div>
      </div>
    </header>
  );
};

export default Header;