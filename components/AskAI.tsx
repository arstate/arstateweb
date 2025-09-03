
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { CloseIcon, SendIcon } from './icons';

// Declare global variables from CDN scripts
declare const process: any;

interface Message {
    role: 'user' | 'model';
    text: string;
}

const AskAI: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const chatInstance = useRef<any>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initialize the chat model only when the chat opens
    useEffect(() => {
        if (isOpen && !chatInstance.current) {
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                chatInstance.current = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                        systemInstruction: `Anda adalah PICO AI, asisten AI untuk Arstate Cinema. Peran Anda adalah menjawab pertanyaan pengguna tentang layanan, portofolio, dan informasi kontak Arstate Cinema. Gunakan informasi di bawah ini sebagai basis pengetahuan Anda. Balas selalu dalam Bahasa Indonesia. Bersikaplah ramah, ringkas, dan profesional. Jangan menjawab pertanyaan yang tidak berhubungan dengan Arstate Cinema.

**Profil Perusahaan: Arstate Cinema**
- **Slogan:** Mengabadikan Momen, Menciptakan Kenangan Abadi.
- **Tentang Kami:** ARSTATE CINEMA adalah vendor foto dan video yang berdiri sejak tahun 2020. Kami berdedikasi untuk mengabadikan momen-momen berharga dalam bentuk karya seni visual yang indah dan berkesan dengan tim profesional dan kreatif.
- **Visi:** Menjadi mitra terpercaya dalam mengabadikan momen berharga melalui karya foto dan video yang kreatif dan berkualitas tinggi, yang memberikan kebahagiaan dan kenangan abadi bagi klien kami.
- **Misi:** Kualitas utama, kreativitas tanpa batas, menciptakan kenangan abadi, dan memberikan pelayanan personal.

**Layanan yang Ditawarkan:**
- **Wedding & Prewedding:** Paket lengkap untuk hari istimewa, dari sesi pra-pernikahan hingga liputan hari-H yang sinematik.
- **Dokumentasi Event:** Liputan untuk acara ulang tahun, seminar, gathering, atau konser dengan kualitas profesional.
- **Konten Komersial:** Produksi video profil perusahaan, iklan produk, atau konten media sosial.
- **Wisuda & Yearbook:** Mengabadikan momen kelulusan dengan fotografi dan videografi berkualitas tinggi.

**Informasi Kontak:**
- **WhatsApp:** 0896-1732-3344
- **Email:** arstateproduction@gmail.com
- **Situs Web:** www.arstatecinema.com
- **Instagram:** @arstate.cinema
- **TikTok:** @arstatecinema
- **Alamat:** Sidoarjo, Jawa Timur, Indonesia.

**Tanya Jawab Umum (FAQ):**

**Seputar Harga & Paket**
1. **Berapa harga paket untuk wedding/prewedding?**
Harga paket kami sangat bervariasi tergantung pada kebutuhan, durasi, dan detail acara Anda. Untuk mendapatkan penawaran terbaik yang sesuai, silakan hubungi kami langsung melalui WhatsApp untuk konsultasi dan pengiriman pricelist terbaru.

2. **Boleh minta pricelist lengkapnya?**
Tentu saja. Silakan hubungi tim kami di WhatsApp 0896-1732-3344 atau email arstateproduction@gmail.com, dan kami akan segera mengirimkan pricelist lengkap untuk semua layanan kami.

3. **Apa saja yang sudah termasuk dalam sebuah paket?**
Setiap paket memiliki rincian yang berbeda, namun secara umum sudah termasuk tim fotografer & videografer, durasi liputan yang disepakati, video sinematik (highlight), dan semua file foto yang sudah diedit dalam resolusi tinggi. Detail lengkap tertera di pricelist kami.

4. **Apakah bisa membuat paket custom sesuai budget/kebutuhan?**
Ya, kami sangat fleksibel. Kami percaya setiap acara itu unik. Kami bisa mendiskusikan kebutuhan spesifik Anda untuk membuat paket custom yang paling sesuai dengan visi dan anggaran Anda.

5. **Bagaimana sistem pembayarannya? Apakah ada DP?**
Untuk mengamankan tanggal Anda, kami memberlakukan sistem down payment (DP) sebesar 50% saat penandatanganan kontrak. Sisa pembayaran dapat dilunasi mendekati hari acara.

**Seputar Layanan & Proses Kerja**
6. **Apakah Arstate Cinema melayani acara di luar kota Sidoarjo/Surabaya?**
Ya, kami melayani proyek di seluruh Indonesia. Untuk acara di luar Sidoarjo/Surabaya, akan ada biaya tambahan untuk transportasi dan akomodasi tim yang akan diinformasikan secara transparan di awal.

7. **Berapa orang tim yang akan datang meliput acara?**
Jumlah tim tergantung pada skala acara dan paket yang Anda pilih. Biasanya berkisar antara 2 hingga 5 orang untuk memastikan semua momen penting dapat terabadikan dengan sempurna.

8. **Peralatan apa saja yang digunakan?**
Kami menggunakan peralatan fotografi dan videografi profesional standar industri (kamera mirrorless, drone, gimbal, lighting) untuk memastikan kualitas sinematik dan hasil resolusi tinggi.

9. **Berapa lama durasi liputan untuk satu acara?**
Durasi liputan standar biasanya 8-10 jam untuk acara pernikahan. Namun, ini dapat disesuaikan dengan paket yang Anda pilih atau melalui permintaan khusus.

10. **Bisakah kami meminta konsep video atau foto tertentu?**
Tentu! Kami sangat senang berkolaborasi. Silakan sampaikan referensi atau konsep yang Anda inginkan saat sesi konsultasi, dan tim kreatif kami akan membantu mewujudkannya.

**Seputar Booking & Ketersediaan**
11. **Bagaimana cara mengecek ketersediaan tanggal?**
Cara tercepat adalah dengan menghubungi kami melalui WhatsApp dan menyebutkan tanggal acara Anda. Tim kami akan segera memeriksa jadwal dan memberikan konfirmasi.

12. **Bagaimana prosedur untuk booking?**
Prosedurnya mudah:
- Hubungi kami untuk konfirmasi tanggal.
- Konsultasi untuk memilih paket yang sesuai.
- Kami akan mengirimkan kontrak digital.
- Lakukan pembayaran DP untuk mengunci tanggal Anda.

13. **Berapa lama tanggal bisa di-keep sebelum DP?**
Kami tidak bisa menahan tanggal tanpa adanya DP. Tanggal Anda baru resmi ter-booking setelah kami menerima konfirmasi pembayaran DP.

14. **Apa yang terjadi jika acara kami dibatalkan atau dijadwalkan ulang?**
Kebijakan pembatalan dan penjadwalan ulang tertera jelas di dalam kontrak. Umumnya, DP tidak dapat dikembalikan, namun kami akan berusaha fleksibel untuk mencari jadwal baru jika memungkinkan.

**Seputar Hasil Akhir**
15. **Berapa lama proses pengerjaan (editing) sampai hasilnya kami terima?** 
Estimasi waktu pengerjaan adalah 14-40 hari kerja setelah acara selesai, tergantung pada kepadatan jadwal produksi kami. Kami selalu berusaha memberikan hasil terbaik secepat mungkin.

16. **Dalam format apa kami akan menerima file foto dan video?**
Anda akan menerima file foto dalam format JPEG resolusi tinggi dan file video dalam format MP4 resolusi 1080p/4K. Semua file akan dikirimkan melalui Google Drive atau disimpan dalam Flashdisk eksklusif.

17. **Apakah kami bisa meminta revisi untuk video?** 
Ya, kami memberikan kesempatan 2 kali revisi minor pada video (misalnya, penggantian beberapa klip atau koreksi teks). Revisi besar seperti penggantian lagu atau perubahan alur cerita akan dikenakan biaya tambahan.

18. **Siapa yang memilih lagu untuk video highlight?**
Kami mempersilakan klien untuk memberikan beberapa referensi lagu yang disukai. Namun, keputusan akhir akan disesuaikan oleh editor kami agar paling cocok dengan nuansa dan alur cerita video.

**Lain-lain**
19. **Apakah kami bisa bertemu dengan tim sebelum acara?**
Sangat bisa dan dianjurkan. Kami senang bisa bertemu langsung atau melalui video call untuk membahas detail acara dan agar kita bisa lebih akrab.

20. **Bagaimana jika terjadi cuaca buruk saat sesi foto/video outdoor?**
Kami selalu memiliki rencana cadangan. Kami akan berdiskusi dengan Anda untuk mencari lokasi alternatif (indoor) atau menjadwalkan ulang sesi foto di hari lain jika kondisi benar-benar tidak memungkinkan.`,
                    }
                });
                setMessages([{ role: 'model', text: 'Halo! Saya PICO AI. Ada yang bisa saya bantu terkait Arstate Cinema hari ini?' }]);
            } catch (error) {
                console.error("Error initializing Gemini Chat:", error);
                setMessages([{ role: 'model', text: 'Maaf, saya sedang mengalami kesulitan untuk terhubung saat ini.' }]);
            }
        } else if (!isOpen) {
            // Reset chat on close to start fresh next time and clear memory
            setTimeout(() => {
                 if (!isOpen) { // Check again in case it was re-opened quickly
                    chatInstance.current = null;
                    setMessages([]);
                 }
            }, 300); // Delay reset to allow fade-out animation
        }
    }, [isOpen]);

    // Scroll to bottom of messages when new messages are added
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedInput = inputValue.trim();
        if (!trimmedInput || isLoading || !chatInstance.current) return;

        const newUserMessage: Message = { role: 'user', text: trimmedInput };
        setMessages(prev => [...prev, newUserMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await chatInstance.current.sendMessage({ message: trimmedInput });
            const text = response.text;

            const newModelMessage: Message = { role: 'model', text };
            setMessages(prev => [...prev, newModelMessage]);

        } catch (error) {
            console.error("Error sending message to Gemini:", error);
            const errorMessage: Message = { role: 'model', text: "Maaf, saya mengalami kesalahan. Silakan coba lagi." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleChat = () => {
        setIsOpen(prev => !prev);
    };

    const iconUrl = 'https://lh3.googleusercontent.com/pw/AP1GczO6lR058mUczCzaS2tWgOFkR0bu-MaoBWKjSFvlyqGoJPkzynPaiU1OUveUweWCJB3iT9mjAIJh7XJaENBZlfE21pY-WWd5YVKHl4lohMRxAPw_vT8=w2400';

    return (
        <div 
            className={`
                fixed bottom-8 right-8 z-50
                transition-all duration-500 ease-in-out origin-bottom-right
                ${isOpen 
                    ? 'w-96 max-w-[calc(100vw-4rem)] h-[600px] max-h-[70vh] rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-lg shadow-2xl shadow-gold/25 border-2 border-gold' 
                    : 'w-16 h-16 rounded-[2rem] bg-white shadow-lg cursor-pointer transform hover:scale-110 hover:bg-gold hover:shadow-xl hover:shadow-gold/30'
                }
            `}
            onClick={!isOpen ? toggleChat : undefined}
        >
            {/* Icon Container */}
            <div className={`
                absolute inset-0 flex items-center justify-center
                transition-opacity duration-300
                ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}
            `}>
                <img src={iconUrl} alt="PICO AI Icon" className="w-10 h-10 object-contain" />
            </div>

            {/* Chat UI Container */}
            <div className={`
                w-full h-full flex flex-col
                transition-opacity duration-300
                ${isOpen ? 'opacity-100 delay-200' : 'opacity-0 pointer-events-none'} 
            `}>
                 {/* Header */}
                <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-200 dark:border-white/10">
                    <div className="flex items-center space-x-4">
                        <img src={iconUrl} alt="PICO AI Icon" className="w-12 h-12 object-contain" />
                        <h3 className="font-bold text-navy dark:text-white text-2xl">Tanya PICO AI</h3>
                    </div>
                    <button onClick={toggleChat} className="p-1 text-gray-500 dark:text-gray-400 hover:text-gold transition-colors rounded-full">
                        <CloseIcon />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-grow p-4 overflow-y-auto custom-scrollbar">
                    <div className="flex flex-col space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xs md:max-w-sm rounded-xl px-4 py-2 ${
                                    msg.role === 'user' 
                                    ? 'bg-gold text-navy rounded-br-none' 
                                    : 'bg-gray-200 text-navy dark:bg-white/10 dark:text-gray-300 rounded-bl-none'
                                }`}>
                                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                             <div className="flex justify-start">
                                <div className="max-w-xs md:max-w-sm rounded-xl px-4 py-2 bg-gray-200 dark:bg-white/10 text-gray-300 rounded-bl-none flex items-center space-x-2">
                                   <span className="h-2 w-2 bg-gold rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                   <span className="h-2 w-2 bg-gold rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                   <span className="h-2 w-2 bg-gold rounded-full animate-bounce"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input Form */}
                <div className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-white/10">
                    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Tanya tentang layanan kami..."
                            className="w-full bg-gray-100 border border-gray-300 text-navy dark:bg-white/10 dark:border-white/20 rounded-full py-2 px-4 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold transition-shadow"
                            disabled={isLoading}
                        />
                        <button 
                            type="submit" 
                            className="p-3 rounded-full transition-colors bg-gold text-navy hover:bg-amber-500 disabled:bg-gray-300 disabled:text-gray-500" 
                            disabled={isLoading || !inputValue.trim()}
                        >
                            <SendIcon />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AskAI;