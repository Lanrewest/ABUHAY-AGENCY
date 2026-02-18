import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-100 py-10 mt-16 border-t-4 border-yellow-400">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-xl font-extrabold tracking-widest flex items-center gap-2">
          <span className="bg-yellow-400 rounded-full w-8 h-8 flex items-center justify-center text-blue-700 font-black text-lg shadow">A</span>
          <span>ABUHAY Agency</span>
        </div>
        <div className="text-sm text-gray-300">&copy; {new Date().getFullYear()} ABUHAY Agency. All rights reserved.</div>
        <div className="flex gap-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition">Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition">Instagram</a>
          <Link to="/contact" className="hover:text-yellow-400 transition">Contact</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
