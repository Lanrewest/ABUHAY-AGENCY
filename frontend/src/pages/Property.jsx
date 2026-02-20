import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { dummyProperties } from '../dummyData';

export default function Property() {
  const { id } = useParams();
  // Use dummy data for preview
  const property = dummyProperties.find(p => p._id === id);

  // TODO: Replace with real auth check (e.g., from Context or localStorage)
  const isLoggedIn = false; 

  if (!property) {
    return <div className="container mx-auto text-center py-20 text-2xl font-bold text-primary">Property not found.</div>;
  }
  
  return (
    <div className="container mx-auto px-4 py-8 grid md:grid-cols-2 gap-8 relative">
      {property.status === 'sold' && (
        <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
          <span className="text-red-600 font-black text-6xl md:text-8xl border-8 border-red-600 px-10 py-4 -rotate-12 bg-white/80 opacity-90">SOLD</span>
        </div>
      )}
      {/* Property Images & Info */}
      <div>
        {property.images && property.images.length > 0 ? (
          <div className="mb-4 grid grid-cols-2 gap-2">
            {property.images.map((img, idx) => (
              <img key={idx} src={img} alt={property.title + ' ' + (idx+1)} className="w-full h-48 object-cover rounded-lg shadow border-2 border-white" />
            ))}
          </div>
        ) : (
          <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded mb-4">No image</div>
        )}
        <h2 className="text-3xl font-bold text-blue-800 mb-2">{property.title}</h2>
        <div className="text-blue-600 font-bold text-sm mb-1">{property.subCategory}</div>
        <div className="text-gray-600 mb-2">{property.location?.city}, {property.location?.state}</div>
        <div className="text-2xl font-bold text-gray-900 mb-2">₦{property.price?.toLocaleString()}</div>
        <div className="text-xs text-gray-500 mb-2">{property.type?.toUpperCase()} | {property.category} | {property.subCategory}</div>
        <div className="mb-4 text-gray-700">{property.description}</div>
        {property.isFeatured && <span className="inline-block bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">Featured</span>}
        {property.isVerified && <span className="inline-block bg-green-200 text-green-800 px-2 py-1 rounded text-xs font-semibold ml-2">Verified</span>}
      </div>
      {/* Lead/Interest Form (disabled for demo) */}
      <div>
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-xl font-bold mb-4 text-blue-800">Express Interest</h3>
          {isLoggedIn ? (
            <form className="space-y-4">
              <textarea className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" rows="4" placeholder="I am interested in this property. Please contact me..."></textarea>
              <button type="button" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition shadow-md">
                Send Message
              </button>
            </form>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-600 mb-4 font-medium">Log in to view seller details and send messages.</p>
              <Link to="/login" className="inline-block bg-yellow-500 text-gray-900 font-bold px-8 py-3 rounded-lg hover:bg-yellow-400 transition shadow-sm">
                Log In to Contact
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
