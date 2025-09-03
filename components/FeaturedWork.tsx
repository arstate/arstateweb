
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

const featuredProjects = [
  {
    title: 'Bromo Serenade',
    category: 'Wedding',
    year: '2024',
    color: 'from-green-500/50 to-emerald-600/50',
    img: 'https://picsum.photos/seed/bromo/800/1200'
  },
  {
    title: 'Culinary Story',
    category: 'Commercial',
    year: '2023',
    color: 'from-amber-500/50 to-orange-600/50',
    img: 'https://picsum.photos/seed/culinary/800/1200'
  },
  {
    title: 'Graduation Gala',
    category: 'Event',
    year: '2025',
    color: 'from-indigo-500/50 to-purple-600/50',
    img: 'https://picsum.photos/seed/gala/800/1200'
  },
  {
    title: 'Andi & Rina',
    category: 'Wedding',
    year: '2024',
    color: 'from-blue-500/50 to-sky-600/50',
    img: 'https://picsum.photos/seed/andi/800/1200'
  },
  {
    title: 'Bali Escape',
    category: 'Videography',
    year: '2022',
    color: 'from-fuchsia-500/50 to-pink-600/50',
    img: 'https://picsum.photos/seed/bali/800/1200'
  },
  {
    title: 'City Lights',
    category: 'Event',
    year: '2023',
    color: 'from-cyan-500/50 to-teal-600/50',
    img: 'https://picsum.photos/seed/city/800/1200'
  },
];

const FeaturedWork: React.FC = () => {
  const originalLength = featuredProjects.length;
  const [slides, setSlides] = useState([...featuredProjects, ...featuredProjects, ...featuredProjects]);
  const [activeIndex, setActiveIndex] = useState(originalLength);
  const [transitionDuration, setTransitionDuration] = useState(500);
  const autoplayRef = useRef<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const goToNext = () => {
    setActiveIndex((prevIndex) => prevIndex + 1);
  };

  const goToPrev = () => {
    setActiveIndex((prevIndex) => prevIndex - 1);
  };

  const goToSlide = (index: number) => {
    setActiveIndex(originalLength + index);
  };

  useEffect(() => {
    if (activeIndex >= originalLength * 2 || activeIndex < originalLength) {
      const timer = setTimeout(() => {
        setTransitionDuration(0);
        const newIndex = (activeIndex % originalLength) + originalLength;
        setActiveIndex(newIndex);
        
        setTimeout(() => {
          setTransitionDuration(500);
        }, 50);

      }, 500); // Must be equal to transition duration
      return () => clearTimeout(timer);
    }
  }, [activeIndex]);

  const startAutoplay = () => {
    if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    autoplayRef.current = window.setInterval(goToNext, 4000);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) window.clearInterval(autoplayRef.current);
  };

  useEffect(() => {
    if (!isPaused) {
      startAutoplay();
    }
    return () => stopAutoplay();
  }, [activeIndex, isPaused]);
  

  return (
    <section id="karya-pilihan" className="pt-40 pb-20 bg-gray-50 dark:bg-navy/50 overflow-hidden transition-colors duration-1000">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-navy dark:text-white mb-4 transition-colors duration-1000">
          Karya Pilihan Kami
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-4 transition-colors duration-1000">
          Beberapa momen favorit yang telah kami abadikan. Setiap frame menceritakan sebuah kisah unik.
        </p>
      </div>

      <div 
        className="relative flex items-center justify-center h-[60vh] md:h-[70vh]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {slides.map((project, index) => {
             const offset = index - activeIndex;
             const isCenter = index === activeIndex;

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
                    <img src={project.img} alt={project.title} className="w-full h-full object-cover" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${project.color} flex flex-col justify-end p-8`}>
                       <div className="transition-all duration-500" style={{ transform: `translateY(${isCenter ? '0%' : '100%'})`, opacity: isCenter ? 1 : 0}}>
                            <p className="text-sm font-semibold text-gold">{project.category}</p>
                            <h3 className="text-2xl font-bold text-white mt-1">{project.title} {project.year}</h3>
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
      
      <div className="relative flex items-center justify-center -mt-4 space-x-4 z-10">
        <button onClick={goToPrev} className="p-2 rounded-full text-navy dark:text-white bg-gray-200/50 dark:bg-white/10 hover:bg-gold hover:text-navy dark:hover:text-navy transition-colors duration-300" aria-label="Previous Slide">
            <ChevronLeftIcon />
        </button>
        <div className="flex items-center justify-center space-x-3">
          {featuredProjects.map((_, index) => (
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

    </section>
  );
};

export default FeaturedWork;