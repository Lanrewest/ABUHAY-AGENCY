import React from 'react';
import { useParams } from 'react-router-dom';
import { dummyProperties } from '../dummyData';

export default function Property() {
  const { id } = useParams();
  // Use dummy data for preview
  const property = dummyProperties.find(p => p._id === id) || dummyProperties[0];

  return (
    <div className="container mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
      {/* Property Images & Info */}
      <div>
        {property.images && property.images.length > 0 ? (
          <div className="mb-4 grid grid-cols-2 gap-2">
            {property.images.map((img, idx) => (
              <img key={idx} src={img} alt={property.title + ' ' + (idx+1)} className="w-full h-48 object-cover rounded shadow border-4 border-gold" />
            ))}
          </div>
        ) : (
          <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded mb-4">No image</div>
        )}
        <h2 className="text-3xl font-bold text-primary mb-2">{property.title}</h2>
        <div className="text-gold font-bold text-sm mb-1">{property.subCategory}</div>
        <div className="text-gray-600 mb-2">{property.location?.city}, {property.location?.state}</div>
        <div className="text-xl font-bold text-dark mb-2">₦{property.price?.toLocaleString()}</div>
        <div className="text-xs text-gray-500 mb-2">{property.type?.toUpperCase()} | {property.category} | {property.subCategory}</div>
        <div className="mb-4 text-gray-700">{property.description}</div>
        {property.isFeatured && <span className="inline-block bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">Featured</span>}
        {property.isVerified && <span className="inline-block bg-green-200 text-green-800 px-2 py-1 rounded text-xs font-semibold ml-2">Verified</span>}
      </div>
      {/* Lead/Interest Form (disabled for demo) */}
      <div>
        <div className="bg-white rounded shadow p-6">
          <h3 className="text-xl font-bold mb-4 text-primary">Express Interest</h3>
          <div className="text-gray-500 text-center">Demo preview: Lead form disabled</div>
        </div>
      </div>
    </div>
  );
}
