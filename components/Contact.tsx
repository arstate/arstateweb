
import React from 'react';
import { MailIcon, PhoneIcon, InstagramIcon, FacebookIcon, TwitterIcon } from './icons';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-navy">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Hubungi Kami
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Punya proyek atau ide? Kami ingin sekali mendengarnya. Hubungi kami untuk memulai kolaborasi.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Informasi Kontak</h3>
              <p className="text-gray-400">
                Jangan ragu untuk menghubungi kami melalui detail di bawah ini atau kirimkan pesan melalui formulir.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="bg-white/10 p-3 rounded-full text-gold"><MailIcon /></div>
                <div>
                  <h4 className="font-semibold text-white">Email</h4>
                  <a href="mailto:hello@arstatecinema.com" className="text-gray-400 hover:text-gold transition-colors">hello@arstatecinema.com</a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-white/10 p-3 rounded-full text-gold"><PhoneIcon /></div>
                <div>
                  <h4 className="font-semibold text-white">Telepon</h4>
                  <a href="tel:+621234567890" className="text-gray-400 hover:text-gold transition-colors">+62 123 4567 890</a>
                </div>
              </div>
            </div>
             <div className="pt-4">
              <h4 className="font-semibold text-white mb-4">Follow Kami</h4>
              <div className="flex space-x-4">
                <a href="#" className="p-3 bg-white/10 rounded-full text-gray-400 hover:text-gold hover:bg-white/20 transition-all"><InstagramIcon /></a>
                <a href="#" className="p-3 bg-white/10 rounded-full text-gray-400 hover:text-gold hover:bg-white/20 transition-all"><FacebookIcon /></a>
                <a href="#" className="p-3 bg-white/10 rounded-full text-gray-400 hover:text-gold hover:bg-white/20 transition-all"><TwitterIcon /></a>
              </div>
            </div>
          </div>
          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <form>
              <div className="mb-6">
                <label htmlFor="name" className="block text-white mb-2">Nama</label>
                <input type="text" id="name" name="name" className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-gold transition-shadow" placeholder="Nama Lengkap Anda" />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-white mb-2">Email</label>
                <input type="email" id="email" name="email" className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-gold transition-shadow" placeholder="alamat@email.com" />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-white mb-2">Pesan</label>
                <textarea id="message" name="message" rows={5} className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-gold transition-shadow" placeholder="Tulis pesan Anda di sini..."></textarea>
              </div>
              <button type="submit" className="w-full bg-gold text-navy font-bold px-8 py-3 rounded-full uppercase tracking-wider hover:bg-amber-500 transform hover:scale-105 transition-all duration-300">
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
