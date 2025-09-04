
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
import GalleryPage from './components/GalleryPage';
import ItemDetailPage from './components/ItemDetailPage';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [page, setPage] = useState<'home' | 'about' | 'gallery' | 'itemDetail'>('home');
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<string | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [scrollToSection, setScrollToSection] = useState<string | null>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const smoothScrollTo = (id: string, duration = 1500) => {
    const targetElement = document.getElementById(id);
    if (!targetElement) {
        if (id === 'home') { // Special case for top of the page
             window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
    }

    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const nextScrollPosition = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, nextScrollPosition);
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        } else {
            window.scrollTo(0, targetPosition);
        }
    };

    requestAnimationFrame(animation);
  };


  // Effect to handle scrolling to a section after the page has changed to 'home'
  useEffect(() => {
    if (page === 'home' && scrollToSection) {
      const timer = setTimeout(() => { // Timeout allows the home page components to render first
        smoothScrollTo(scrollToSection);
        setScrollToSection(null); // Reset after scrolling
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [page, scrollToSection]);


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

  const handleNavigateToGallery = (category: string) => {
    setSelectedGalleryCategory(category);
    setPage('gallery');
  }

  const handleNavigateToItemDetail = (itemId: number) => {
    setSelectedItemId(itemId);
    setPage('itemDetail');
  };
  
  const renderPage = () => {
    switch(page) {
      case 'home':
        return (
          <>
            <Hero smoothScrollTo={smoothScrollTo}/>
            <TrustedBy />
            <Services onNavigateToGallery={handleNavigateToGallery} />
            <FeaturedWork />
            <Qualities isDarkMode={isDarkMode} />
            <Contact onNavigateToAbout={() => setPage('about')} />
          </>
        );
      case 'about':
        return <AboutPage isDarkMode={isDarkMode} />;
      case 'gallery':
        return <GalleryPage 
                  categoryKey={selectedGalleryCategory!} 
                  onNavigateBack={() => setPage('home')}
                  onNavigateToItemDetail={handleNavigateToItemDetail}
                  isDarkMode={isDarkMode}
               />
      case 'itemDetail':
        return <ItemDetailPage
                  itemId={selectedItemId!}
                  onNavigateBack={() => setPage('gallery')}
                />
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen text-gray-700 dark:text-gray-300 font-sans bg-white dark:bg-navy transition-colors duration-1000">
      <Header 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode}
        page={page}
        setPage={setPage}
        setScrollToSection={setScrollToSection}
        smoothScrollTo={smoothScrollTo}
      />
      <main>
        {renderPage()}
      </main>
      <Footer smoothScrollTo={smoothScrollTo} setPage={setPage} setScrollToSection={setScrollToSection}/>
      <AskAI />
    </div>
  );
};

export default App;
