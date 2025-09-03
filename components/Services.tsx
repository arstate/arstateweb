
import React from 'react';
import { HeartIcon, DocumentIcon, CommercialIcon, GraduationCapIcon } from './icons';

const services = [
  {
    icon: <HeartIcon />,
    title: 'Wedding & Prewedding',
    description: 'Paket lengkap untuk hari istimewa Anda, dari sesi pra-pernikahan yang romantis hingga liputan hari-H yang sinematik.',
  },
  {
    icon: <DocumentIcon />,
    title: 'Dokumentasi Event',
    description: 'Liputan acara ulang tahun, seminar, gathering, atau konser dengan kualitas video dan foto yang profesional.',
  },
  {
    icon: <CommercialIcon />,
    title: 'Konten Komersial',
    description: 'Produksi video profil perusahaan, iklan produk, atau konten media sosial untuk meningkatkan brand Anda.',
  },
  {
    icon: <GraduationCapIcon />,
    title: 'Wisuda & Yearbook',
    description: 'Kami mengabadikan momen spesial kelulusan Anda dengan fotografi dan videografi berkualitas tinggi.',
  },
];

const Services: React.FC = () => {
  return (
    <section id="layanan" className="py-20 bg-gray-50 dark:bg-navy/50 transition-colors duration-1000">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-navy dark:text-white mb-4 transition-colors duration-1000">
          Layanan Profesional Kami
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-16 transition-colors duration-1000">
          Dari pernikahan yang sakral hingga acara perusahaan yang meriah, kami siap menangkap esensi dari setiap momen Anda.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-navy-card rounded-2xl p-8 border border-gray-200 dark:border-blue-500 flex flex-col items-center text-center transition-all duration-300 hover:border-gold hover:-translate-y-2 hover:shadow-xl hover:shadow-gold/20"
            >
              <div className="mb-6 text-gold">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-navy dark:text-white mb-3 transition-colors duration-1000">{service.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 flex-grow mb-6 transition-colors duration-1000">{service.description}</p>
              <a
                href="#"
                className="mt-auto px-6 py-2 text-gold border border-gold rounded-full hover:bg-gold hover:text-navy transition-colors duration-300"
              >
                Lihat Galeri
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;