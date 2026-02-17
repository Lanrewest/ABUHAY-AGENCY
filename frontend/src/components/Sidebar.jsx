import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar({ open, onClose }) {
  return (
    <aside className={`fixed top-0 left-0 h-full w-64 bg-primary text-white shadow-lg z-40 transform ${open ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300`}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-gold">
        <span className="text-xl font-extrabold tracking-tight">ABUHAY Agency</span>
        <button onClick={onClose} className="text-gold text-2xl font-bold">&times;</button>
      </div>
      <nav className="flex flex-col gap-2 px-6 py-4">
        <Link to="/dashboard" className="hover:text-gold py-2">Dashboard</Link>
        <Link to="/dashboard/add-property" className="hover:text-gold py-2">Add Property</Link>
        <Link to="/dashboard/my-listings" className="hover:text-gold py-2">My Listings</Link>
        <Link to="/dashboard/leads" className="hover:text-gold py-2">Leads</Link>
        <Link to="/dashboard/profile" className="hover:text-gold py-2">Profile</Link>
      </nav>
    </aside>
  );
}
