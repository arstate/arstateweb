import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { CloseIcon, SendIcon, SparklesIcon } from './icons';

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
                        systemInstruction: "Anda adalah asisten yang membantu untuk Arstate Cinema, sebuah agensi kreatif yang berspesialisasi dalam fotografi, videografi, dan desain web. Peran Anda adalah menjawab pertanyaan pengguna tentang layanan, portofolio, dan informasi kontak Arstate Cinema. Balas selalu dalam Bahasa Indonesia. Bersikaplah ramah, ringkas, dan profesional. Jangan menjawab pertanyaan yang tidak berhubungan dengan Arstate Cinema.",
                    }
                });
                setMessages([{ role: 'model', text: 'Halo! Ada yang bisa saya bantu terkait Arstate Cinema hari ini?' }]);
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
                    ? 'w-96 max-w-[calc(100vw-4rem)] h-[600px] max-h-[70vh] rounded-2xl bg-navy-card shadow-2xl border border-white/10' 
                    : 'w-16 h-16 rounded-[2rem] bg-gold shadow-lg cursor-pointer transform hover:scale-110'
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
                <img src={iconUrl} alt="Ask AI Icon" className="w-10 h-10 object-contain" />
            </div>

            {/* Chat UI Container */}
            <div className={`
                w-full h-full flex flex-col
                transition-opacity duration-300
                ${isOpen ? 'opacity-100 delay-200' : 'opacity-0 pointer-events-none'} 
            `}>
                 {/* Header */}
                <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-white/10">
                    <div className="flex items-center space-x-2">
                        <SparklesIcon className="w-6 h-6 text-gold" />
                        <h3 className="font-bold text-white">Tanya Arstate AI</h3>
                    </div>
                    <button onClick={toggleChat} className="p-1 text-gray-400 hover:text-white transition-colors rounded-full">
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
                                    : 'bg-white/10 text-gray-300 rounded-bl-none'
                                }`}>
                                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                             <div className="flex justify-start">
                                <div className="max-w-xs md:max-w-sm rounded-xl px-4 py-2 bg-white/10 text-gray-300 rounded-bl-none flex items-center space-x-2">
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
                <div className="flex-shrink-0 p-4 border-t border-white/10">
                    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Tanya tentang layanan kami..."
                            className="w-full bg-white/10 border border-white/20 rounded-full py-2 px-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold transition-shadow"
                            disabled={isLoading}
                        />
                        <button type="submit" className="p-3 bg-gold text-navy rounded-full hover:bg-amber-500 disabled:bg-gold/50 transition-colors" disabled={isLoading || !inputValue.trim()}>
                            <SendIcon />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AskAI;