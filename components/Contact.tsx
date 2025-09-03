
import React from 'react';
import { ChatBubbleIcon } from './icons';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-navy">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gold mb-4">
          Siap Mewujudkan Visi Anda?
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
          Jangan ragu untuk berdiskusi dengan kami. Mari kita rencanakan bagaimana cara terbaik untuk mengabadikan momen spesial Anda.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#layanan"
            className="w-full sm:w-auto text-center px-8 py-3 text-gold border border-gold rounded-full hover:bg-gold hover:text-navy font-semibold transition-colors duration-300"
          >
            Info Selengkapnya
          </a>
          <a
            href="https://wa.me/621234567890" // Example WhatsApp link, replace with actual number
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center px-8 py-3 bg-gold text-navy font-bold rounded-full hover:bg-amber-500 transform hover:scale-105 transition-all duration-300"
          >
            <ChatBubbleIcon />
            Hubungi Kami Sekarang
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
