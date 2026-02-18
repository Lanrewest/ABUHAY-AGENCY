
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="text-2xl font-extrabold tracking-tight flex items-center gap-3">
          <span className="bg-gold rounded-full w-10 h-10 flex items-center justify-center text-primary font-black text-2xl shadow">A</span>
          <span className="ml-1 tracking-widest">ABUHAY Agency</span>
        </Link>
        <div className="hidden md:flex gap-8 text-lg font-medium">
          <Link to="/listings" className="hover:text-gold transition">Listings</Link>
          <Link to="/about" className="hover:text-gold transition">About</Link>
          <Link to="/contact" className="hover:text-gold transition">Contact</Link>
          <Link to="/admin" className="hover:text-gold transition">Admin</Link>
        </div>
        <div className="flex gap-3">
          <Link to="/login" className="bg-gold text-primary px-5 py-2 rounded-full font-semibold hover:bg-gold/80 shadow transition">Login</Link>
          <Link to="/register" className="border border-gold text-gold px-5 py-2 rounded-full font-semibold hover:bg-gold hover:text-primary shadow transition">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
