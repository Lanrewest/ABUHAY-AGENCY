import React from 'react';
export default function Home() {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-cream to-white text-center relative">
      <div className="max-w-2xl mx-auto p-8 rounded-xl shadow-lg bg-white/80 border border-gold/30 mt-12">
        <h1 className="text-4xl md:text-6xl font-extrabold text-primary mb-4 drop-shadow">Find Your Dream Property</h1>
        <p className="text-lg md:text-xl text-dark mb-8 font-medium">Elegant, classic, and scalable real estate marketplace for buyers and sellers.</p>
        <a href="/listings" className="inline-block bg-gold text-primary px-8 py-3 rounded-full font-bold text-lg shadow hover:bg-gold/90 hover:scale-105 transition-all">Browse Listings</a>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
    </section>
  );
}
