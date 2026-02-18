import React from 'react';
import { Link } from 'react-router-dom';
import { dummyProperties } from '../dummyData';

export default function Listings() {
  const properties = dummyProperties;
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-4xl font-extrabold mb-10 text-primary text-center tracking-tight drop-shadow">Featured Properties</h2>
      <div className="grid md:grid-cols-3 gap-10">
        {properties.map(p => (
          <div key={p._id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all overflow-hidden border-2 border-gold/20 group">
            {p.status === 'sold' && (
              <div className="absolute inset-0 bg-gray-900/60 z-20 flex items-center justify-center backdrop-blur-[2px]">
                <span className="text-red-500 font-black text-5xl border-8 border-red-500 px-6 py-2 -rotate-12 bg-white/10 tracking-widest">SOLD</span>
              </div>
            )}
            {p.images && p.images[0] && (
              <img src={p.images[0]} alt={p.title} className="w-full h-40 object-cover object-center group-hover:opacity-90 transition" style={{maxHeight:'180px'}} />
            )}
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold text-primary group-hover:text-gold transition truncate">{p.title}</h3>
                {p.isVerified && (
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full ml-2 flex-shrink-0">VERIFIED</span>
                )}
              </div>
              <div className="text-gold font-bold mb-1 text-lg">{p.subCategory}</div>
              <div className="text-gray-600 mb-1">{p.location?.city}, {p.location?.state}</div>
              <div className="text-dark font-bold mb-2 text-lg">₦{p.price?.toLocaleString()}</div>
              <div className="text-xs text-gray-500 mb-2">{p.type?.toUpperCase()} | {p.category}</div>
              <Link to={`/property/${p._id}`} className="inline-block mt-2 text-accent hover:underline font-semibold">View Details</Link>
            </div>
          </div>
        ))}
      </div>
      {properties.length === 0 && <div className="text-center text-gray-500">No properties found.</div>}
    </div>
  );
}
