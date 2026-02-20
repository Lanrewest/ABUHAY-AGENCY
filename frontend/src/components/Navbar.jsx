
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-gray-300 shadow-lg sticky top-0 z-50 border-b-4 border-yellow-500">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-extrabold tracking-tight flex items-center gap-3">
            <span className="bg-yellow-500 rounded-full w-10 h-10 flex items-center justify-center text-gray-900 font-black text-2xl shadow-md">A</span>
            <span className="ml-1 tracking-widest text-white font-light">ABUHAY Agency</span>
          </Link>
          <div className="hidden md:flex gap-8 text-lg font-medium">
            <Link to="/listings" className="hover:text-yellow-400 transition">Listings</Link>
            <Link to="/about" className="hover:text-yellow-400 transition">About</Link>
            <Link to="/contact" className="hover:text-yellow-400 transition">Contact</Link>
            
          </div>
          <div className="hidden md:flex gap-3">
            <Link to="/login" className="bg-yellow-500 text-gray-900 px-5 py-2 rounded-full font-bold hover:bg-yellow-400 shadow-sm transition text-sm">Login</Link>
            <Link to="/register" className="border border-yellow-500 text-yellow-500 px-5 py-2 rounded-full font-bold hover:bg-yellow-500 hover:text-gray-900 shadow-sm transition text-sm">Sign Up</Link>
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-yellow-500 focus:outline-none">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-4 pb-4">
            <Link to="/listings" className="hover:text-yellow-400 transition" onClick={() => setIsOpen(false)}>Listings</Link>
            <Link to="/about" className="hover:text-yellow-400 transition" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/contact" className="hover:text-yellow-400 transition" onClick={() => setIsOpen(false)}>Contact</Link>
            <div className="flex flex-col gap-3 mt-2">
              <Link to="/login" className="bg-yellow-500 text-gray-900 px-5 py-2 rounded-full font-bold hover:bg-yellow-400 shadow-sm transition text-sm text-center" onClick={() => setIsOpen(false)}>Login</Link>
              <Link to="/register" className="border border-yellow-500 text-yellow-500 px-5 py-2 rounded-full font-bold hover:bg-yellow-500 hover:text-gray-900 shadow-sm transition text-sm text-center" onClick={() => setIsOpen(false)}>Sign Up</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
