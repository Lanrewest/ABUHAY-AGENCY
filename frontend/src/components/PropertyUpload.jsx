import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProperty } from '../api';

export default function PropertyUpload() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    type: 'sale',
    category: 'house',
    subCategory: 'Flat',
    bedrooms: '',
    bathrooms: '',
    location: {
      city: '',
      state: '',
    },
  });
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'city' || name === 'state') {
      setFormData({
        ...formData,
        location: { ...formData.location, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
    // Create previews
    const files = Array.from(e.target.files);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(prev => {
       // Revoke old object URLs to avoid memory leaks
       prev.forEach(url => URL.revokeObjectURL(url));
       return newPreviews;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Basic validation
      if (!formData.title || !formData.price || !formData.location.city) {
        throw new Error('Please fill in all required fields.');
      }

      // Create FormData object for file upload
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('price', formData.price);
      data.append('type', formData.type);
      data.append('category', formData.category);
      data.append('subCategory', formData.subCategory);
      data.append('bedrooms', formData.bedrooms);
      data.append('bathrooms', formData.bathrooms);
      data.append('location[city]', formData.location.city);
      data.append('location[state]', formData.location.state);
      for (let i = 0; i < images.length; i++) {
        data.append('images', images[i]);
      }

      const response = await createProperty(data);
      setSuccess('Property created successfully! Redirecting...');
      setTimeout(() => {
        navigate(`/property/${response.data._id}`);
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to create property.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Property Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g., Modern 3-Bedroom Flat" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price (₦)</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="e.g., 50000000" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="4" placeholder="Describe the property..." className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select name="type" value={formData.type} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white">
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white">
              <option value="house">House</option>
              <option value="land">Land</option>
              <option value="shop">Shop</option>
            </select>
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700">Sub-Category</label>
            <input type="text" name="subCategory" value={formData.subCategory} onChange={handleChange} placeholder="e.g., Duplex, Bungalow" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div>
            <label className="block text-sm font-medium text-gray-700">Bedrooms</label>
            <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} placeholder="e.g., 3" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700">Bathrooms</label>
            <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} placeholder="e.g., 4" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input type="text" name="city" value={formData.location.city} onChange={handleChange} placeholder="e.g., Lagos" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input type="text" name="state" value={formData.location.state} onChange={handleChange} placeholder="e.g., Lagos" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Images</label>
          <input type="file" multiple onChange={handleImageChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
          <div className="mt-4 flex gap-4 overflow-x-auto">
            {previews.map((src, idx) => (
              <img key={idx} src={src} alt={`Preview ${idx}`} className="h-24 w-24 object-cover rounded-lg border border-gray-200" />
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-200">
          <button type="submit" className="bg-blue-600 text-white py-2 px-8 rounded-lg font-bold hover:bg-blue-700 transition shadow-md" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Property'}
          </button>
        </div>

        {error && <div className="text-red-600 text-center pt-4">{error}</div>}
        {success && <div className="text-green-700 text-center pt-4">{success}</div>}
      </form>
    </div>
  );
}