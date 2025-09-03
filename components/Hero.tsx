import React from 'react';

const Hero: React.FC = () => {
  return (
    <section 
      className="relative h-screen flex flex-col items-center justify-end text-center text-white overflow-hidden pb-32"
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <iframe
          className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-w-[177.77vh] min-h-[100vh] -translate-x-1/2 -translate-y-1/2 scale-150"
          src="https://www.youtube.com/embed/1CYQXV68xpI?autoplay=1&mute=1&loop=1&playlist=1CYQXV68xpI&controls=0&showinfo=0&rel=0&playsinline=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="absolute inset-0 bg-navy bg-opacity-70"></div>
      <div className="relative z-10 flex flex-col items-center px-4">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gold mb-4">
            Arstate Cinema
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-gray-300 mb-8">
            Kami adalah partner kreatif Anda dalam fotografi, videografi, dan desain web, mengubah setiap detik berharga menjadi sebuah karya sinematik yang tak terlupakan.
          </p>
          <a
            href="#karya-pilihan"
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