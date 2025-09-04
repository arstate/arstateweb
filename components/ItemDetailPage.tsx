
import React, { useState, useEffect, useCallback } from 'react';
import { portfolioItems } from './portfolioData';
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from './icons';

interface ItemDetailPageProps {
  itemId: number;
  onNavigateBack: () => void;
}

const ItemDetailPage: React.FC<ItemDetailPageProps> = ({ itemId, onNavigateBack }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const item = portfolioItems.find(p => p.id === itemId);
  const galleryImages = (item?.gallery && item.gallery.length > 0) ? item.gallery : (item ? [item.imageUrl] : []);
  
  const openPreview = (index: number) => {
    setSelectedImageIndex(index);
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
    setSelectedImageIndex(null);
  };
  
  const goToNextImage = useCallback(() => {
    if (selectedImageIndex === null) return;
    const nextIndex = (selectedImageIndex + 1) % galleryImages.length;
    setSelectedImageIndex(nextIndex);
  }, [selectedImageIndex, galleryImages.length]);

  const goToPreviousImage = useCallback(() => {
    if (selectedImageIndex === null) return;
    const prevIndex = (selectedImageIndex - 1 + galleryImages.length) % galleryImages.length;
    setSelectedImageIndex(prevIndex);
  }, [selectedImageIndex, galleryImages.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPreviewOpen) return;
      if (e.key === 'ArrowRight') {
        goToNextImage();
      } else if (e.key === 'ArrowLeft') {
        goToPreviousImage();
      } else if (e.key === 'Escape') {
        closePreview();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPreviewOpen, goToNextImage, goToPreviousImage]);

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-3xl font-bold text-navy dark:text-white mb-4">Item Tidak Ditemukan</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">Karya yang Anda cari tidak dapat ditemukan.</p>
        <button onClick={onNavigateBack} className="flex items-center px-6 py-2 text-gold border border-gold rounded-full hover:bg-gold hover:text-navy transition-colors duration-300 group">
          <ChevronLeftIcon />
          <span className="ml-2 font-semibold group-hover:underline">Kembali</span>
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen animate-fadeIn">
      <style>{`
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-fadeIn {
            animation: fadeIn 0.6s ease-in-out;
        }
      `}</style>
      
      <main className="container mx-auto px-6 py-24">
        <div className="pt-12">
            <button onClick={onNavigateBack} className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gold transition-colors duration-300 mb-8 group">
                <ChevronLeftIcon />
                <span className="ml-2 font-semibold group-hover:underline">Kembali ke Galeri</span>
            </button>

            <div className="w-full max-w-7xl mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-navy dark:text-white mb-2">{item.title}</h1>
                    <p className="text-xl text-gold">{item.subCategory}</p>
                </div>
                
                <div className="columns-2 md:columns-3 lg:columns-4 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
                    {galleryImages.map((imgUrl, index) => (
                        <div key={index} className="break-inside-avoid cursor-pointer" onClick={() => openPreview(index)}>
                            <img 
                                src={imgUrl} 
                                alt={`${item.title} - Galeri ${index + 1}`} 
                                className="w-full h-auto object-cover rounded-lg shadow-lg hover:shadow-xl hover:shadow-gold/30 transition-all duration-300 transform hover:-translate-y-1"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>

            </div>
        </div>
      </main>
      
      {/* Lightbox / Preview Modal */}
      {isPreviewOpen && selectedImageIndex !== null && (
        <div 
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center animate-fadeIn"
            onClick={closePreview}
            aria-modal="true"
            role="dialog"
        >
            <style>{`
                @keyframes scaleUp {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-scaleUp {
                    animation: scaleUp 0.3s ease-in-out;
                }
            `}</style>

            <button 
                className="absolute top-4 right-4 text-white hover:text-gold transition-colors z-[120] p-2 bg-black/20 rounded-full"
                onClick={closePreview}
                aria-label="Close image preview"
            >
                <CloseIcon />
            </button>

            <button 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gold transition-colors z-[120] p-3 bg-black/20 rounded-full"
                onClick={(e) => { e.stopPropagation(); goToPreviousImage(); }}
                aria-label="Previous image"
            >
                <ChevronLeftIcon />
            </button>
            
            <div 
                className="relative max-w-[90vw] max-h-[90vh] animate-scaleUp"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image itself
            >
                <img 
                    src={galleryImages[selectedImageIndex]} 
                    alt={`${item.title} - Preview ${selectedImageIndex + 1}`} 
                    className="w-auto h-auto max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />
            </div>
            
            <button 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gold transition-colors z-[120] p-3 bg-black/20 rounded-full"
                onClick={(e) => { e.stopPropagation(); goToNextImage(); }}
                aria-label="Next image"
            >
                <ChevronRightIcon />
            </button>
        </div>
      )}
    </div>
  );
};

export default ItemDetailPage;
