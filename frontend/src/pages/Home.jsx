import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-cream to-white text-center relative">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center p-8 rounded-xl shadow-lg bg-white/90 border border-gold/30 mt-12">
        {/* Left: Hero text */}
        <div className="flex flex-col justify-center items-start md:items-start text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-primary mb-4 drop-shadow">Find Your Dream Property</h1>
          <p className="text-lg md:text-xl text-dark mb-8 font-medium">Elegant, classic, and scalable real estate marketplace for buyers and sellers. Discover luxury homes, affordable flats, and prime land with ABUHAY Agency.</p>
          <Link to="/listings" className="inline-block bg-gold text-primary px-8 py-3 rounded-full font-bold text-lg shadow hover:bg-gold/90 hover:scale-105 transition-all">Browse Listings</Link>
        </div>
        {/* Right: Hero images */}
        <div className="flex flex-col gap-4 items-center">
          <div className="flex gap-4">
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Luxury Duplex" className="w-40 h-40 rounded-xl shadow-lg border-4 border-gold object-cover parallax" />
            <img src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80" alt="Modern Flat" className="w-40 h-40 rounded-xl shadow-lg border-4 border-primary object-cover parallax" />
          </div>
          <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" alt="Prime Land" className="w-80 h-32 rounded-xl shadow-lg border-4 border-accent object-cover parallax" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
    </section>
  );
}

export default Home;
