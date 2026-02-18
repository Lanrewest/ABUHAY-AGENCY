import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar({ open, onClose }) {
  return (
    <aside className={`fixed md:relative top-0 left-0 h-full min-h-screen w-64 bg-gray-900 text-white shadow-xl z-40 transform ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 flex flex-col`}>
      <div className="flex items-center justify-between px-6 py-6 border-b border-gray-800 bg-gray-900">
        <span className="text-xl font-extrabold tracking-tight text-gold">ABUHAY <span className="text-white">Agency</span></span>
        <button onClick={onClose} className="text-gold text-2xl font-bold">&times;</button>
      </div>
      <nav className="flex flex-col gap-1 px-4 py-6 flex-1">
        <Link to="/dashboard" className="hover:bg-gray-800 hover:text-gold px-4 py-3 rounded-lg transition font-medium flex items-center gap-3">Overview</Link>
        <Link to="/dashboard/add-property" className="hover:bg-gray-800 hover:text-gold px-4 py-3 rounded-lg transition font-medium flex items-center gap-3">Add Property</Link>
        <Link to="/dashboard/my-listings" className="hover:bg-gray-800 hover:text-gold px-4 py-3 rounded-lg transition font-medium flex items-center gap-3">My Listings</Link>
        <Link to="/dashboard/leads" className="hover:bg-gray-800 hover:text-gold px-4 py-3 rounded-lg transition font-medium flex items-center gap-3">Leads</Link>
        <Link to="/dashboard/profile" className="hover:bg-gray-800 hover:text-gold px-4 py-3 rounded-lg transition font-medium flex items-center gap-3">Profile</Link>
      </nav>
      <div className="p-6 border-t border-gray-800 text-xs text-gray-500 text-center">
        &copy; Abuhay Agency
      </div>
    </aside>
  );
}
