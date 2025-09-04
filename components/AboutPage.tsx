import React, { useState } from 'react';

interface AboutPageProps {
  isDarkMode: boolean;
}

const teamMembers = [
  {
    name: 'Andi Pratama',
    role: 'Founder & Lead Videographer',
    bio: 'Dengan passion mendalam pada sinematografi, Andi memimpin setiap proyek dengan visi artistik yang kuat untuk menangkap emosi dalam setiap frame.',
    img: 'https://picsum.photos/seed/andi_team/400/400'
  },
  {
    name: 'Rina Wijayanti',
    role: 'Creative Director & Photographer',
    bio: 'Keahlian Rina dalam komposisi dan cahaya mengubah momen biasa menjadi karya fotografi yang abadi dan penuh cerita.',
    img: 'https://picsum.photos/seed/rina_team/400/400'
  },
    {
    name: 'Budi Santoso',
    role: 'Web Designer & Developer',
    bio: 'Budi adalah arsitek digital kami, menciptakan pengalaman web yang imersif dan fungsional yang melengkapi cerita visual klien kami.',
    img: 'https://picsum.photos/seed/budi_team/400/400'
  }
];

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


const AboutPage: React.FC<AboutPageProps> = ({ isDarkMode }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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

        <section className="mt-20 mb-20">
            <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="order-1">
                    <h2 className="text-3xl font-bold text-gold mb-4">Cerita Kami</h2>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-4 transition-colors duration-1000">
                        Arstate Cinema lahir dari kecintaan pada seni visual dan kekuatan sebuah cerita. Didirikan pada tahun 2020, kami memulai perjalanan dengan sebuah kamera dan mimpi besar: mengubah momen-momen berharga menjadi mahakarya sinematik yang dapat dikenang selamanya.
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed transition-colors duration-1000">
                        Kini, kami telah berkembang menjadi sebuah tim kreatif yang solid, terdiri dari para videografer, fotografer, dan desainer web berbakat. Namun, semangat kami tetap sama—mendedikasikan keahlian kami untuk menangkap esensi dari setiap momen dan menghadirkannya dalam format visual yang memukau.
                    </p>
                </div>
                 <div className="order-2 flex justify-center md:justify-end">
                    <div>
                        <h2 className="text-3xl font-bold text-gold mb-4 text-center md:text-left">Filosofi Kami</h2>
                        <div className="w-full flex flex-col md:flex-row md:justify-start md:h-[180px] gap-2">
                            {philosophies.map((p, index) => {
                                const isActive = index === activeIndex;
                                return (
                                <div
                                    key={p.title}
                                    onClick={() => setActiveIndex(index)}
                                    className={`
                                        relative rounded-2xl p-4 overflow-hidden cursor-pointer
                                        border 
                                        transition-all duration-700 ease-in-out
                                        
                                        w-full ${isActive ? 'h-52' : 'h-16'}
                                        md:h-full ${isActive ? 'md:w-[380px]' : 'md:w-[80px]'}

                                        ${
                                            isActive 
                                            ? 'bg-gray-50 dark:bg-navy-card border-gold shadow-[0_0_15px_5px_rgba(255,193,7,0.3)]' 
                                            : 'bg-gray-100/50 dark:bg-navy-card/50 hover:bg-gray-100/80 dark:hover:bg-navy-card/80 border-gray-300/50 dark:border-blue-500/50'
                                        }
                                    `}
                                >
                                    <div className="w-full md:w-[330px] h-full flex flex-col justify-start">
                                        <h3 className="text-2xl font-bold text-navy dark:text-white mb-3 whitespace-nowrap transition-colors duration-1000">{p.title}</h3>
                                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-base transition-colors duration-1000">{p.description}</p>
                                    </div>
                                </div>
                            )})}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="mb-12">
            <h2 className="text-3xl font-bold text-gold mb-12 text-center">Tim Kreatif Kami</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {teamMembers.map(member => (
                    <div key={member.name} className="text-center flex flex-col items-center">
                        <div className="relative w-40 h-40 mb-4">
                            <img src={member.img} alt={member.name} className="rounded-full w-full h-full object-cover border-4 border-gold/50" />
                        </div>
                        <h3 className="text-xl font-bold text-navy dark:text-white transition-colors duration-1000">{member.name}</h3>
                        <p className="text-gold font-semibold mb-2">{member.role}</p>
                        <p className="text-gray-500 dark:text-gray-400 max-w-xs transition-colors duration-1000">{member.bio}</p>
                    </div>
                ))}
            </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;