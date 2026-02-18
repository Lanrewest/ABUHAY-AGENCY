
import React from 'react';
import { dummyProperties } from '../dummyData';

export default function Listings() {
  const properties = dummyProperties;
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-4xl font-extrabold mb-10 text-primary text-center tracking-tight drop-shadow">Featured Properties</h2>
      <div className="grid md:grid-cols-3 gap-10">
        {properties.map(p => (
          <div key={p._id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all overflow-hidden border-2 border-gold/20 group">
            {p.images && p.images[0] && (
              <img src={p.images[0]} alt={p.title} className="w-full h-40 object-cover object-center group-hover:opacity-90 transition" style={{maxHeight:'180px'}} />
            )}
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2 text-primary group-hover:text-gold transition">{p.title}</h3>
              <div className="text-gold font-bold mb-1 text-lg">{p.subCategory}</div>
              <div className="text-gray-600 mb-1">{p.location?.city}, {p.location?.state}</div>
              <div className="text-dark font-bold mb-2 text-lg">₦{p.price?.toLocaleString()}</div>
              <div className="text-xs text-gray-500 mb-2">{p.type?.toUpperCase()} | {p.category}</div>
              <a href={`/property/${p._id}`} className="inline-block mt-2 text-accent hover:underline font-semibold">View Details</a>
            </div>
          </div>
        ))}
      </div>
      {properties.length === 0 && <div className="text-center text-gray-500">No properties found.</div>}
    </div>
  );
}
