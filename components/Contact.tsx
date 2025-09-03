
import React from 'react';

interface ContactProps {
  onNavigateToAbout: () => void;
}

const Contact: React.FC<ContactProps> = ({ onNavigateToAbout }) => {

  const whatsappMessage = `Halo kakk
Saya menemukan jasa dari Arstate Cinema melalui instagram & website dan tertarik untuk menggunakan jasa fotografi/videografi.
Mohon informasinya mengenai paket dan pricelist yang sesuai.
Terima kasih.`;

  const whatsappUrl = `https://wa.me/6289617323344?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section id="contact" className="py-24 bg-white dark:bg-navy transition-colors duration-1000">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gold mb-4">
          Siap Mewujudkan Visi Anda?
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 transition-colors duration-1000">
          Jangan ragu untuk berdiskusi dengan kami. Mari kita rencanakan bagaimana cara terbaik untuk mengabadikan momen spesial Anda.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onNavigateToAbout();
            }}
            className="w-full sm:w-auto text-center px-8 py-3 text-gold border border-gold rounded-full hover:bg-gold hover:text-navy font-semibold transition-colors duration-300"
          >
            Info Selengkapnya
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-center px-8 py-3 bg-whatsapp-green text-white font-bold rounded-full hover:bg-gold hover:text-navy hover:shadow-lg hover:shadow-gold/50 transform hover:scale-105 transition-all duration-300"
          >
            Chat Via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;