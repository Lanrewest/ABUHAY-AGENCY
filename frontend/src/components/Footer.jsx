import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-dark text-cream py-10 mt-16 border-t-4 border-gold">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-xl font-extrabold tracking-widest flex items-center gap-2">
          <span className="bg-gold rounded-full w-8 h-8 flex items-center justify-center text-primary font-black text-lg shadow">A</span>
          <span>ABUHAY Agency</span>
        </div>
        <div className="text-sm text-cream/80">&copy; {new Date().getFullYear()} ABUHAY Agency. All rights reserved.</div>
        <div className="flex gap-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition">Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition">Instagram</a>
          <a href="/contact" className="hover:text-gold transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}
