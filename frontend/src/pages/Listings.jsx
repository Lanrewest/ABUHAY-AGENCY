import React from 'react';
import { Link } from 'react-router-dom';
import { dummyProperties } from '../dummyData';

export default function Listings() {
  const properties = dummyProperties;
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-gray-200 pb-4">
        <div>
          <h2 className="text-3xl font-extrabold text-blue-800 tracking-tight">Properties</h2>
          <p className="text-gray-500 text-sm mt-1">Find your perfect home from our exclusive listings.</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0 w-full md:w-auto">
           <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white w-1/2 md:w-auto">
              <option>All Types</option>
              <option>For Sale</option>
              <option>For Rent</option>
              <option>Short Let</option>
           </select>
           <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white w-1/2 md:w-auto">
              <option>Sort: Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
           </select>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-10">
        {properties.map(p => (
          <div key={p._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all overflow-hidden border border-gray-200/80 group">
            {p.status === 'sold' && (
              <div className="absolute inset-0 bg-gray-900/60 z-20 flex items-center justify-center backdrop-blur-[2px]">
                <span className="text-red-500 font-black text-5xl border-8 border-red-500 px-6 py-2 -rotate-12 bg-white/10 tracking-widest">SOLD</span>
              </div>
            )}
            {p.images && p.images[0] && (
              <img src={p.images[0]} alt={p.title} className="w-full h-48 object-cover object-center group-hover:opacity-90 transition" />
            )}
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition truncate">{p.title}</h3>
                {p.isVerified && (
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full ml-2 flex-shrink-0">VERIFIED</span>
                )}
              </div>
              <div className="text-blue-600 font-bold mb-1 text-sm">{p.subCategory}</div>
              <div className="text-gray-600 mb-1">{p.location?.city}, {p.location?.state}</div>
              <div className="text-gray-900 font-bold mb-2 text-lg">₦{p.price?.toLocaleString()}</div>
              <div className="text-xs text-gray-500 mb-2">{p.type?.toUpperCase()} | {p.category}</div>
              <Link to={`/property/${p._id}`} className="inline-block mt-2 text-blue-600 hover:underline font-semibold">View Details</Link>
            </div>
          </div>
        ))}
      </div>
      {properties.length === 0 && <div className="text-center text-gray-500">No properties found.</div>}
    </div>
  );
}
