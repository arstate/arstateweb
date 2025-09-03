
import React from 'react';
import { InstagramIcon, FacebookIcon, TwitterIcon } from './icons';

const Footer: React.FC = () => {
    return (
        <footer className="bg-navy/50 border-t border-white/10 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Brand Info */}
                    <div className="md:col-span-1">
                        <h3 className="text-2xl font-bold text-white">
                           Arstate <span className="text-gold">Cinema</span>
                        </h3>
                        <p className="text-gray-400 mt-4 max-w-xs">
                            Mengubah momen menjadi mahakarya sinematik.
                        </p>
                         <div className="flex space-x-4 mt-6">
                            <a href="#" aria-label="Instagram" className="p-2 bg-white/10 rounded-full text-gray-400 hover:text-gold hover:bg-white/20 transition-all"><InstagramIcon /></a>
                            <a href="#" aria-label="Facebook" className="p-2 bg-white/10 rounded-full text-gray-400 hover:text-gold hover:bg-white/20 transition-all"><FacebookIcon /></a>
                            <a href="#" aria-label="Twitter" className="p-2 bg-white/10 rounded-full text-gray-400 hover:text-gold hover:bg-white/20 transition-all"><TwitterIcon /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white tracking-wider">Navigasi</h4>
                        <ul className="mt-4 space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-gold transition-colors">Beranda</a></li>
                            <li><a href="#layanan" className="text-gray-400 hover:text-gold transition-colors">Layanan</a></li>
                            <li><a href="#karya-pilihan" className="text-gray-400 hover:text-gold transition-colors">Portofolio</a></li>
                            <li><a href="#contact" className="text-gray-400 hover:text-gold transition-colors">Hubungi Kami</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                     <div>
                        <h4 className="text-lg font-semibold text-white tracking-wider">Kontak</h4>
                        <ul className="mt-4 space-y-2 text-gray-400">
                           <li className="hover:text-gold transition-colors"><a href="mailto:hello@arstatecinema.com">hello@arstatecinema.com</a></li>
                           <li className="hover:text-gold transition-colors"><a href="tel:+621234567890">+62 123 4567 890</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Arstate Cinema. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;