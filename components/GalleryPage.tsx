
import React, { useEffect, useMemo } from 'react';
import { portfolioItems } from './portfolioData';
import { ChevronLeftIcon } from './icons';
import ImageSlider from './ImageSlider';

interface GalleryPageProps {
  categoryKey: string;
  onNavigateBack: () => void;
  isDarkMode: boolean;
}

const galleryConfig: { [key: string]: { title: string; description: string; subCategories: string[] } } = {
  wedding: {
    title: 'Galeri Wedding & Prewedding',
    description: 'Abadikan kisah cinta Anda dalam bingkai yang tak lekang oleh waktu. Dari tawa bahagia hingga air mata haru, setiap momen kami rekam dengan sentuhan sinematik yang romantis dan elegan.',
    subCategories: ['Wedding', 'Prewedding'],
  },
  event: {
    title: 'Galeri Dokumentasi Event',
    description: 'Setiap acara memiliki denyut dan energinya sendiri. Kami hadir untuk menangkap esensi dari setiap perayaan, pertemuan, dan pertunjukan dengan detail yang hidup dan dinamis.',
    subCategories: ['Event', 'Ulang Tahun', 'Konser'],
  },
  commercial: {
    title: 'Galeri Konten Komersial',
    description: 'Visual adalah kunci untuk bercerita tentang brand Anda. Kami memproduksi konten komersial yang tidak hanya menarik secara visual tetapi juga mampu menyampaikan pesan dan nilai brand Anda secara efektif.',
    subCategories: ['Video Profil', 'Iklan Produk', 'Short Movie'],
  },
  graduation: {
    title: 'Galeri Wisuda & Yearbook',
    description: 'Momen kelulusan adalah puncak dari sebuah perjuangan dan awal dari petualangan baru. Biarkan kami mengabadikan euforia dan kebersamaan Anda dalam foto dan video yang akan selalu Anda kenang.',
    subCategories: ['Event Wisuda', 'Personal Wisuda', 'Yearbook', 'Video Angkatan'],
  }
};

const GalleryPage: React.FC<GalleryPageProps> = ({ categoryKey, onNavigateBack, isDarkMode }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const config = galleryConfig[categoryKey];

  const groupedItems = useMemo(() => {
    const items = portfolioItems.filter(item => item.category === categoryKey);
    return config.subCategories.map(subCategory => ({
      title: subCategory,
      items: items.filter(item => item.subCategory === subCategory),
    })).filter(group => group.items.length > 0);
  }, [categoryKey, config.subCategories]);


  if (!config) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-3xl font-bold text-navy dark:text-white mb-4">Kategori Tidak Ditemukan</h1>
        <button onClick={onNavigateBack} className="px-6 py-2 text-gold border border-gold rounded-full hover:bg-gold hover:text-navy transition-colors duration-300">
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen animate-fadeIn overflow-hidden">
      <style>{`
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fadeIn {
                animation: fadeIn 0.6s ease-in-out;
            }
        `}</style>
      
      <main className="container mx-auto px-6 py-24">
        <section className="mb-20 pt-12">
           <button onClick={onNavigateBack} className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gold transition-colors duration-300 mb-6 group">
                <ChevronLeftIcon />
                <span className="ml-2 font-semibold group-hover:underline">Kembali ke Beranda</span>
            </button>
          <div className="text-center">
             <h1 className="text-4xl md:text-6xl font-bold text-navy dark:text-white mb-4 transition-colors duration-1000">
                {config.title}
             </h1>
             <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto transition-colors duration-1000">
                {config.description}
             </p>
          </div>
        </section>

        <div className="space-y-24">
          {groupedItems.map((group) => (
             <section key={group.title}>
                <h2 className="text-3xl md:text-4xl font-bold text-gold mb-4 text-center">{group.title}</h2>
                <ImageSlider 
                    items={group.items.map(item => ({
                        title: item.title,
                        imageUrl: item.imageUrl,
                        category: group.title
                    }))} 
                />
             </section>
          ))}
        </div>
      </main>
    </div>
  );
};

export default GalleryPage;
