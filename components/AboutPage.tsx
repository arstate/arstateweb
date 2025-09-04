import React, { useState } from 'react';
import { ChevronDownIcon } from './icons';

interface AboutPageProps {
  isDarkMode: boolean;
}

const philosophies = [
    {
        title: 'Kolaborasi Kreatif',
        description: 'Kami percaya bahwa hasil terbaik lahir dari kolaborasi. Kami mendengarkan visi Anda dan bekerja bersama untuk mewujudkannya.'
    },
    {
        title: 'Kualitas Sinematik',
        description: 'Setiap proyek kami garap dengan standar kualitas tertinggi, menggunakan peralatan modern dan teknik penceritaan visual yang kuat.'
    },
    {
        title: 'Sentuhan Personal',
        description: 'Kami memahami bahwa setiap klien dan setiap momen adalah unik. Kami memberikan sentuhan personal untuk memastikan cerita Anda tersampaikan.'
    }
];

const AccordionItem: React.FC<{ title: string; children: React.ReactNode; isOpen: boolean; onClick: () => void }> = ({ title, children, isOpen, onClick }) => {
    return (
        <div className="border border-gold/30 dark:border-blue-500/50 rounded-xl overflow-hidden bg-white dark:bg-navy-card/50 transition-colors duration-300">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center p-6 text-left"
                aria-expanded={isOpen}
            >
                <h3 className="text-2xl font-bold text-gold">{title}</h3>
                <ChevronDownIcon
                    className={`transform transition-transform duration-300 text-gold ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            <div
                className={`transition-all duration-500 ease-in-out grid ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
                <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-0 text-gray-500 dark:text-gray-400">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

const AboutPage: React.FC<AboutPageProps> = ({ isDarkMode }) => {
    const [philosophyIndex, setPhilosophyIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [openAccordion, setOpenAccordion] = useState<string | null>(null);


    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handlePhilosophyClick = (index: number) => {
        if (isAnimating || index === philosophyIndex) {
            return;
        }
        setPhilosophyIndex(index);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 700);
    };
    
    const handleAccordionClick = (title: string) => {
        setOpenAccordion(openAccordion === title ? null : title);
    };

    const contactInfo = {
        title: 'Informasi Kontak',
        details: [
            { label: 'WhatsApp', value: '0896-1732-3344', href: 'https://wa.me/6289617323344' },
            { label: 'Email', value: 'arstateproduction@gmail.com', href: 'mailto:arstateproduction@gmail.com' },
            { label: 'Situs web', value: 'www.arstatecinema.my.id', href: 'http://www.arstatecinema.my.id' },
            { label: 'Instagram', value: '@arstate.cinema', href: 'https://instagram.com/arstate.cinema' },
            { label: 'TikTok', value: '@arstatecinema', href: 'https://tiktok.com/@arstatecinema' }
        ]
    };

  return (
    <div className="min-h-screen text-gray-700 dark:text-gray-300 font-sans bg-white dark:bg-navy animate-fadeIn transition-colors duration-1000">
        <style>{`
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .animate-fadeIn {
                animation: fadeIn 0.5s ease-in-out;
            }
        `}</style>
      
      <main className="container mx-auto px-6 py-24">
        <section className="text-center mb-20 pt-12">
          <h1 className="text-4xl md:text-6xl font-bold text-navy dark:text-white mb-4 transition-colors duration-1000">
            Tentang <span className="text-gold" style={{ filter: 'url(#scribble-filter)' }}>Arstate Cinema</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto transition-colors duration-1000">
            Kami bukan sekadar vendor, kami adalah partner Anda dalam merangkai dan mengabadikan cerita.
          </p>
        </section>

        <section className="max-w-7xl mx-auto mt-20 mb-20">
            <div className="grid md:grid-cols-2 gap-12">
                 <div className="flex justify-center md:justify-start">
                    <div className="flex flex-col h-full">
                        <h2 className="text-3xl font-bold text-gold mb-4 text-center md:text-left">Filosofi Kami</h2>
                        <div className="w-full flex flex-col md:flex-row md:justify-start flex-grow gap-2">
                            {philosophies.map((p, index) => {
                                const isActive = index === philosophyIndex;
                                return (
                                <div
                                    key={p.title}
                                    onClick={() => handlePhilosophyClick(index)}
                                    className={`
                                        relative rounded-2xl p-4 overflow-hidden
                                        border 
                                        transition-all duration-700 ease-in-out
                                        
                                        w-full ${isActive ? 'h-52' : 'h-16'}
                                        md:h-full ${isActive ? 'md:w-[380px]' : 'md:w-[80px]'}

                                        ${
                                            isActive 
                                            ? 'bg-gray-50 dark:bg-navy-card border-gold shadow-[0_0_15px_5px_rgba(255,193,7,0.3)]' 
                                            : 'bg-gray-100/50 dark:bg-navy-card/50 hover:bg-gray-100/80 dark:hover:bg-navy-card/80 border-gray-300/50 dark:border-blue-500/50'
                                        }
                                        ${isAnimating ? 'cursor-wait pointer-events-none' : 'cursor-pointer'}
                                    `}
                                >
                                    <div className="w-full md:w-[330px] h-full flex flex-col justify-start">
                                        <h3 className="text-2xl font-bold text-navy dark:text-white mb-3 whitespace-nowrap transition-colors duration-1000">{p.title}</h3>
                                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-xl transition-colors duration-1000">{p.description}</p>
                                    </div>
                                </div>
                            )})}
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-gold mb-4">Cerita Kami</h2>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-4 transition-colors duration-1000 text-justify">
                        Arstate Cinema lahir dari kecintaan pada seni visual dan kekuatan sebuah cerita. Didirikan pada tahun 2020, kami memulai perjalanan dengan sebuah kamera dan mimpi besar: mengubah momen-momen berharga menjadi mahakarya sinematik yang dapat dikenang selamanya.
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed transition-colors duration-1000 text-justify">
                        Kini, kami telah berkembang menjadi sebuah tim kreatif yang solid, terdiri dari para videografer, fotografer, dan desainer web berbakat. Namun, semangat kami tetap sama—mendedikasikan keahlian kami untuk menangkap esensi dari setiap momen dan menghadirkannya dalam format visual yang memukau.
                    </p>
                </div>
            </div>
        </section>

        <section className="max-w-7xl mx-auto space-y-4 my-20">
            <AccordionItem title="Visi" isOpen={openAccordion === 'Visi'} onClick={() => handleAccordionClick('Visi')}>
                <p className="text-xl">Menjadi mitra terpercaya dalam mengabadikan momen berharga melalui karya foto dan video yang kreatif dan berkualitas tinggi, yang memberikan kebahagiaan dan kenangan abadi bagi klien kami.</p>
            </AccordionItem>
            
            <AccordionItem title="Misi" isOpen={openAccordion === 'Misi'} onClick={() => handleAccordionClick('Misi')}>
                 <ul className="list-disc list-inside space-y-2 text-xl">
                    <li>Mengutamakan kualitas dalam setiap detail produksi.</li>
                    <li>Menghadirkan kreativitas tanpa batas untuk hasil yang unik.</li>
                    <li>Menciptakan kenangan abadi yang dapat dinikmati lintas generasi.</li>
                    <li>Memberikan pelayanan yang personal dan ramah kepada setiap klien.</li>
                </ul>
            </AccordionItem>
            
            <AccordionItem title="Layanan yang Ditawarkan" isOpen={openAccordion === 'Layanan'} onClick={() => handleAccordionClick('Layanan')}>
                 <ul className="list-disc list-inside space-y-2 text-xl">
                    <li>Wedding & Prewedding</li>
                    <li>Dokumentasi Event (Ulang Tahun, Seminar, Gathering, Konser)</li>
                    <li>Konten Komersial (Video Profil, Iklan Produk, Konten Media Sosial)</li>
                    <li>Wisuda & Yearbook</li>
                </ul>
            </AccordionItem>

            <AccordionItem title={contactInfo.title} isOpen={openAccordion === 'Kontak'} onClick={() => handleAccordionClick('Kontak')}>
                <div className="space-y-3">
                    {contactInfo.details.map(detail => (
                        <p key={detail.label} className="text-xl text-gray-600 dark:text-gray-300">
                            <strong className="font-semibold text-navy dark:text-white">{detail.label}:</strong>{' '}
                            <a href={detail.href} target="_blank" rel="noopener noreferrer" className="hover:text-gold hover:underline transition-colors">
                                {detail.value}
                            </a>
                        </p>
                    ))}
                </div>
            </AccordionItem>

            <AccordionItem title="Alamat Kantor" isOpen={openAccordion === 'Alamat'} onClick={() => handleAccordionClick('Alamat')}>
                 <p className="text-xl mb-4">Temukan kami di lokasi yang strategis di Sidoarjo, Jawa Timur, Indonesia.</p>
                 <div className="rounded-lg overflow-hidden border border-gold/20">
                     <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!m12!1m3!1d3956.521165055142!2d112.7769259!3d-7.407422800000003!2m3!1f0!2f0!3f0!3m2!1i1024!i768!4f13.1!3m3!1m2!1s0x8e6779b9f42426f7%3A0x1670c6e80b4d227c!2sfotografer%20videografer%20surabaya%20-%20arstate%20cinema!5e0!3m2!1sen!2sid!4v1756717075794!5m2!1sen!2sid"
                        className="w-full h-64 md:h-96"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                 </div>
            </AccordionItem>

        </section>

      </main>
    </div>
  );
};

export default AboutPage;