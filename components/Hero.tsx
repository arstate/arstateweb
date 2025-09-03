import React, { useRef, useEffect, useState } from 'react';

interface HeroProps {
  smoothScrollTo: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ smoothScrollTo }) => {
  const videoRef = useRef<HTMLIFrameElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [fontClass, setFontClass] = useState('font-sans');
  const fontList = [
    'font-playfair',
    'font-oswald',
    'font-roboto-slab',
    'font-dancing-script',
    'font-lobster',
    'font-pacifico',
    'font-anton',
    'font-caveat',
    'font-bebas-neue',
    'font-sans', // Return to default
  ];

  const fontIndexRef = useRef(0);
  useEffect(() => {
    const swapInterval = window.setInterval(() => {
      // Set the font class based on the current index
      setFontClass(fontList[fontIndexRef.current]);
      // Increment the index, and loop back to 0 if it reaches the end
      fontIndexRef.current = (fontIndexRef.current + 1) % fontList.length;
    }, 250); // Slower, continuous swap speed

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(swapInterval);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount


  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Parallax for the background video (slower speed)
      if (videoRef.current) {
        const videoOffsetY = scrollY * 0.4;
        videoRef.current.style.transform = `translate(-50%, calc(-50% + ${videoOffsetY}px)) scale(1.5)`;
      }

      // Parallax for the foreground content (medium speed)
      if (contentRef.current) {
        const contentOffsetY = scrollY * 0.9; // Further reduced parallax effect from 0.8
        contentRef.current.style.transform = `translateY(${contentOffsetY}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Set initial position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <section 
      id="home"
      className="relative h-screen flex flex-col items-center justify-end text-center text-white overflow-hidden pb-32"
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <iframe
          ref={videoRef}
          className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-w-[177.77vh] min-h-[100vh]"
          src="https://www.youtube.com/embed/1CYQXV68xpI?autoplay=1&mute=1&loop=1&playlist=1CYQXV68xpI&controls=0&showinfo=0&rel=0&playsinline=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="absolute inset-0 bg-navy bg-opacity-70"></div>
      <div ref={contentRef} className="relative z-10 flex flex-col items-center px-4">
        <div className="max-w-3xl">
          <h1 className={`text-4xl md:text-5xl font-bold text-gold mb-4 transition-all duration-100 ease-in-out ${fontClass}`}>
            Arstate Cinema
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-gray-300 mb-8">
            Kami adalah partner kreatif Anda dalam fotografi, videografi, dan desain web, mengubah setiap detik berharga menjadi sebuah karya sinematik yang tak terlupakan.
          </p>
          <a
            href="#karya-pilihan"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo('karya-pilihan');
            }}
            className="inline-block bg-gold text-navy font-bold px-8 py-3 rounded-full uppercase tracking-wider hover:bg-amber-500 transform hover:scale-105 transition-all duration-300"
          >
            Lihat Karya Kami
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;