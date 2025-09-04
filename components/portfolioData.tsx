
export interface PortfolioItem {
  id: number;
  category: 'wedding' | 'event' | 'commercial' | 'graduation';
  subCategory: string;
  title: string;
  imageUrl: string;
}

export const portfolioItems: PortfolioItem[] = [
  // Wedding & Prewedding
  { id: 1, category: 'wedding', subCategory: 'Wedding', title: 'The Vow of Sarah & David', imageUrl: 'https://picsum.photos/seed/wedding1/600/800' },
  { id: 2, category: 'wedding', subCategory: 'Wedding', title: 'Eternal Love in Bali', imageUrl: 'https://picsum.photos/seed/wedding2/600/800' },
  { id: 3, category: 'wedding', subCategory: 'Wedding', title: 'A Jakarta Fairytale', imageUrl: 'https://picsum.photos/seed/wedding3/600/800' },
  { id: 4, category: 'wedding', subCategory: 'Wedding', title: 'Garden Party Celebration', imageUrl: 'https://picsum.photos/seed/wedding4/600/800' },
  { id: 5, category: 'wedding', subCategory: 'Prewedding', title: 'Bromo Mountain Serenade', imageUrl: 'https://picsum.photos/seed/prewed1/600/800' },
  { id: 6, category: 'wedding', subCategory: 'Prewedding', title: 'Whispers in the Savannah', imageUrl: 'https://picsum.photos/seed/prewed2/600/800' },
  { id: 7, category: 'wedding', subCategory: 'Prewedding', title: 'Urban Romance', imageUrl: 'https://picsum.photos/seed/prewed3/600/800' },

  // Dokumentasi Event
  { id: 8, category: 'event', subCategory: 'Event', title: 'Grand Corporate Gathering 2023', imageUrl: 'https://picsum.photos/seed/event1/600/800' },
  { id: 9, category: 'event', subCategory: 'Event', title: 'Annual Seminar Series', imageUrl: 'https://picsum.photos/seed/event2/600/800' },
  { id: 10, category: 'event', subCategory: 'Ulang Tahun', title: 'Sweet Seventeen Party', imageUrl: 'https://picsum.photos/seed/bday1/600/800' },
  { id: 11, category: 'event', subCategory: 'Ulang Tahun', title: 'Golden Anniversary Celebration', imageUrl: 'https://picsum.photos/seed/bday2/600/800' },
  { id: 12, category: 'event', subCategory: 'Konser', title: 'Indie Fest Night', imageUrl: 'https://picsum.photos/seed/concert1/600/800' },
  { id: 13, category: 'event', subCategory: 'Konser', title: 'Acoustic Charity Night', imageUrl: 'https://picsum.photos/seed/concert2/600/800' },
  { id: 14, category: 'event', subCategory: 'Konser', title: 'Rock The Stage', imageUrl: 'https://picsum.photos/seed/concert3/600/800' },
  
  // Konten Komersial
  { id: 15, category: 'commercial', subCategory: 'Video Profil', title: 'Startup Vision: The Tech Story', imageUrl: 'https://picsum.photos/seed/profile1/600/800' },
  { id: 16, category: 'commercial', subCategory: 'Video Profil', title: 'The Artisan\'s Craft', imageUrl: 'https://picsum.photos/seed/profile2/600/800' },
  { id: 17, category: 'commercial', subCategory: 'Iklan Produk', title: 'Fresh Brew Coffee Ad', imageUrl: 'https://picsum.photos/seed/ad1/600/800' },
  { id: 18, category: 'commercial', subCategory: 'Iklan Produk', title: 'Luxury Watch Commercial', imageUrl: 'https://picsum.photos/seed/ad2/600/800' },
  { id: 19, category: 'commercial', subCategory: 'Short Movie', title: 'The Last Letter', imageUrl: 'https://picsum.photos/seed/movie1/600/800' },
  { id: 20, category: 'commercial', subCategory: 'Short Movie', title: 'Crossroads', imageUrl: 'https://picsum.photos/seed/movie2/600/800' },
  { id: 21, category: 'commercial', subCategory: 'Short Movie', title: 'Echoes of The Past', imageUrl: 'https://picsum.photos/seed/movie3/600/800' },

  // Wisuda & Yearbook
  { id: 22, category: 'graduation', subCategory: 'Event Wisuda', title: 'University Grand Ceremony', imageUrl: 'https://picsum.photos/seed/grad1/600/800' },
  { id: 23, category: 'graduation', subCategory: 'Event Wisuda', title: 'Graduation Day Highlights', imageUrl: 'https://picsum.photos/seed/grad2/600/800' },
  { id: 24, category: 'graduation', subCategory: 'Personal Wisuda', title: 'A Doctor\'s Journey', imageUrl: 'https://picsum.photos/seed/grad3/600/800' },
  { id: 25, category: 'graduation', subCategory: 'Personal Wisuda', title: 'Future Architect', imageUrl: 'https://picsum.photos/seed/grad4/600/800' },
  { id: 26, category: 'graduation', subCategory: 'Yearbook', title: 'Class of 2024 Memories', imageUrl: 'https://picsum.photos/seed/yb1/600/800' },
  { id: 27, category: 'graduation', subCategory: 'Yearbook', title: 'High School Throwback', imageUrl: 'https://picsum.photos/seed/yb2/600/800' },
  { id: 28, category: 'graduation', subCategory: 'Video Angkatan', title: 'Our Legacy: The Movie', imageUrl: 'https://picsum.photos/seed/batchvid1/600/800' },
  { id: 29, category: 'graduation', subCategory: 'Video Angkatan', title: 'The Journey of Us', imageUrl: 'https://picsum.photos/seed/batchvid2/600/800' },
];
