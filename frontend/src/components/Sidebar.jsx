import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, this would clear the auth token and user state
    navigate('/login');
  };

  return (
    <aside className={`fixed md:relative top-0 left-0 h-full min-h-screen w-64 bg-gray-900 text-white shadow-xl z-40 transform ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 flex flex-col`}>
      <div className="flex items-center justify-between px-6 py-6 border-b border-gray-800 bg-gray-900">
        <span className="text-xl font-extrabold tracking-tight text-gold">ABUHAY <span className="text-white">Agency</span></span>
        <button onClick={onClose} className="text-gold text-2xl font-bold">&times;</button>
      </div>
      <nav className="flex flex-col gap-1 px-4 py-6 flex-1">
        <Link to="/dashboard" className="hover:bg-gray-800 hover:text-gold px-4 py-3 rounded-lg transition font-medium flex items-center gap-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
          Overview
        </Link>
        <Link to="/dashboard/add-property" className="hover:bg-gray-800 hover:text-gold px-4 py-3 rounded-lg transition font-medium flex items-center gap-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
          Add Property
        </Link>
        <Link to="/dashboard/my-listings" className="hover:bg-gray-800 hover:text-gold px-4 py-3 rounded-lg transition font-medium flex items-center gap-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
          My Listings
        </Link>
        <Link to="/dashboard/leads" className="hover:bg-gray-800 hover:text-gold px-4 py-3 rounded-lg transition font-medium flex items-center gap-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          Leads
        </Link>
        <Link to="/dashboard/profile" className="hover:bg-gray-800 hover:text-gold px-4 py-3 rounded-lg transition font-medium flex items-center gap-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          Profile
        </Link>
      </nav>
      <div className="px-4 py-4 border-t border-gray-800">
        <button onClick={handleLogout} className="w-full hover:bg-gray-800 text-gray-400 hover:text-red-500 px-4 py-3 rounded-lg transition font-medium flex items-center gap-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          Logout
        </button>
      </div>
    </aside>
  );
}
