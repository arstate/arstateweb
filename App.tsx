
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import Services from './components/Services';
import FeaturedWork from './components/FeaturedWork';
import Qualities from './components/Qualities';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AskAI from './components/AskAI';
import AboutPage from './components/AboutPage';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [page, setPage] = useState<'home' | 'about'>('home');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      document.body.classList.remove('light-mode');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      document.body.classList.add('light-mode');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div className="min-h-screen text-gray-300 font-sans bg-navy">
      {page === 'home' ? (
        <>
          <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          <main>
            <Hero />
            <TrustedBy />
            <Services />
            <FeaturedWork />
            <Qualities isDarkMode={isDarkMode} />
            <Contact onNavigateToAbout={() => setPage('about')} />
          </main>
          <Footer />
        </>
      ) : (
        <AboutPage onBack={() => setPage('home')} isDarkMode={isDarkMode} />
      )}
      <AskAI />
    </div>
  );
};

export default App;
