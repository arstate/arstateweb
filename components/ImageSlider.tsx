
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

// A generic interface for items the slider can display
interface SlideItem {
  title: string;
  imageUrl: string;
  category?: string;
  year?: string;
}

interface ImageSliderProps {
  items: SlideItem[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ items }) => {
  if (!items || items.length === 0) {
    return <div className="text-center p-8 text-gray-500 dark:text-gray-400">Tidak ada karya untuk ditampilkan di kategori ini.</div>;
  }
  
  const originalLength = items.length;
  
  const getLoopedItems = () => {
      if (originalLength === 0) return [];
      // To ensure the looping effect works visually, we need at least 3 items in the array for the sides.
      let looped = [...items];
      while (looped.length < 5) {
        looped = [...looped, ...items];
      }
      return [...looped, ...looped, ...looped];
  };
  
  const [slides, setSlides] = useState(getLoopedItems());
  // The initial active index should point to the start of the *second* block in the tripled array
  const initialActiveIndex = slides.length / 3;
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  
  const [transitionDuration, setTransitionDuration] = useState(500);
  const autoplayRef = useRef<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Update slides and reset index if items prop changes
  useEffect(() => {
    const newSlides = getLoopedItems();
    setSlides(newSlides);
    setActiveIndex(newSlides.length / 3);
  }, [items]);

  const goToNext = () => {
    setActiveIndex((prevIndex) => prevIndex + 1);
  };

  const goToPrev = () => {
    setActiveIndex((prevIndex) => prevIndex - 1);
  };

  const goToSlide = (index: number) => {
    setActiveIndex(initialActiveIndex + index);
  };

  // Infinite loop logic
  useEffect(() => {
    if (originalLength <= 0) return;
    
    const isAtEnd = activeIndex >= initialActiveIndex + slides.length / 3;
    const isAtStart = activeIndex < initialActiveIndex;

    if (isAtEnd || isAtStart) {
      const timer = setTimeout(() => {
        setTransitionDuration(0);
        // The new index is calculated based on the original item list, then offset by the initial index.
        const newIndex = (activeIndex % originalLength) + initialActiveIndex;
        setActiveIndex(newIndex);
        
        setTimeout(() => {
          setTransitionDuration(500);
        }, 50);

      }, 500); // Must be equal to transition duration
      return () => clearTimeout(timer);
    }
  }, [activeIndex, originalLength, initialActiveIndex, slides.length]);

  // Autoplay logic
  useEffect(() => {
    const startAutoplay = () => {
      stopAutoplay(); // Clear any existing interval
      if (originalLength > 1) { // Don't autoplay if only one unique item
          autoplayRef.current = window.setInterval(goToNext, 4000);
      }
    };
  
    const stopAutoplay = () => {
      if (autoplayRef.current) {
        window.clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };

    if (!isPaused) {
      startAutoplay();
    } else {
      stopAutoplay();
    }
    return () => stopAutoplay();
  }, [activeIndex, isPaused, items]);

  return (
    <div className="w-full">
      <div 
        className="relative flex items-center justify-center h-[60vh]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {slides.map((project, index) => {
             const offset = index - activeIndex;
             const isCenter = index === activeIndex;

             // Don't render slides that are too far off-screen
             if (Math.abs(offset) > 3) return null;

             const transformStyle = {
               transform: `translateX(${offset * 90}%) scale(${isCenter ? 1 : 0.7})`,
               zIndex: slides.length - Math.abs(offset),
               opacity: 1,
               filter: isCenter ? 'blur(0px)' : 'blur(4px)',
               pointerEvents: isCenter ? 'auto' : 'none' as React.CSSProperties['pointerEvents'],
               transition: `all ${transitionDuration}ms ease-in-out`
             };

            return (
              <div
                key={index}
                className="absolute w-[60%] sm:w-[45%] md:w-[35%] lg:w-[25%] aspect-[2/3] max-w-[320px] cursor-pointer"
                style={transformStyle}
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
                    <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8`}>
                       <div className="transition-all duration-500" style={{ transform: `translateY(${isCenter ? '0%' : '100%'})`, opacity: isCenter ? 1 : 0}}>
                            {project.category && <p className="text-sm font-semibold text-gold">{project.category}</p>}
                            <h3 className="text-2xl font-bold text-white mt-1">{project.title}{project.year ? ` ${project.year}` : ''}</h3>
                       </div>
                       <div className="absolute inset-0 flex items-center justify-center transition-all duration-500" style={{opacity: isCenter ? 0 : 1 }}>
                           <h2 className="text-3xl font-bold text-white text-center">{project.title}</h2>
                       </div>
                    </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Navigation Controls */}
      {originalLength > 1 && (
        <div className="relative flex items-center justify-center mt-4 space-x-4 z-10">
            <button onClick={goToPrev} className="p-2 rounded-full text-navy dark:text-white bg-gray-200/50 dark:bg-white/10 hover:bg-gold hover:text-navy dark:hover:text-navy transition-colors duration-300" aria-label="Previous Slide">
                <ChevronLeftIcon />
            </button>
            <div className="flex items-center justify-center space-x-3">
            {items.map((_, index) => (
                <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${(activeIndex % originalLength) === index ? 'bg-gold scale-125' : 'bg-gray-400/50 dark:bg-white/20 hover:bg-white/40'}`}
                aria-label={`Go to slide ${index + 1}`}
                />
            ))}
            </div>
            <button onClick={goToNext} className="p-2 rounded-full text-navy dark:text-white bg-gray-200/50 dark:bg-white/10 hover:bg-gold hover:text-navy dark:hover:text-navy transition-colors duration-300" aria-label="Next Slide">
                <ChevronRightIcon />
            </button>
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
