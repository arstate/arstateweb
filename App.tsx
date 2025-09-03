
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
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = (event: React.MouseEvent<HTMLButtonElement>) => {
    const header = document.querySelector('.theme-transition-header');
    
    // @ts-ignore - document.startViewTransition is a new API
    if (!document.startViewTransition || !header) {
      setIsDarkMode(prevMode => !prevMode);
      return;
    }

    const rect = header.getBoundingClientRect();
    const x = event.clientX;
    const y = event.clientY;

    const corners = [
      { x: rect.left, y: rect.top },
      { x: rect.right, y: rect.top },
      { x: rect.left, y: rect.bottom },
      { x: rect.right, y: rect.bottom },
    ];
    const endRadius = Math.max(...corners.map(corner => Math.hypot(corner.x - x, corner.y - y)));

    // @ts-ignore
    const transition = document.startViewTransition(() => {
      setIsDarkMode(prevMode => !prevMode);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x - rect.left}px ${y - rect.top}px)`,
            `circle(${endRadius}px at ${x - rect.left}px ${y - rect.top}px)`,
          ],
        },
        {
          duration: 1200,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(main-header)',
        }
      );
    });
  };

  return (
    <div className="min-h-screen text-gray-700 dark:text-gray-300 font-sans bg-white dark:bg-navy transition-colors duration-1000">
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