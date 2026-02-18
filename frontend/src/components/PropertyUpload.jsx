import React, { useState, useEffect } from 'react';
import axios from 'axios';

const subCategoryOptions = {
  house: ['Apartment', 'Duplex', 'Flat', 'Bungalow', 'Terrace', 'Detached', 'Semi-detached', 'Penthouse'],
  land: ['Residential Land', 'Commercial Land', 'Industrial Land', 'Farmland', 'Mixed Use Land', 'Land'],
  shop: ['Shop', 'Office Space', 'Warehouse', 'Showroom', 'Plaza'],
  other: ['Other']
};

export default function PropertyUpload({ onSuccess }) {
  const [form, setForm] = useState({
    title: '', description: '', price: '', type: 'sale', category: 'house', subCategory: 'Apartment', state: '', city: '', area: ''
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleImages = e => setImages([...e.target.files].slice(0, 5));

  // Automatically update subCategory when category changes
  useEffect(() => {
    const options = subCategoryOptions[form.category] || [];
    if (!options.includes(form.subCategory)) {
      setForm(prev => ({ ...prev, subCategory: options[0] || '' }));
    }
  }, [form.category]);

  const currentSubCategories = subCategoryOptions[form.category] || [];

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess('');
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    images.forEach(img => data.append('images', img));
    try {
      await axios.post('/api/properties', data, { withCredentials: true });
      setSuccess('Property uploaded!');
      setForm({ title: '', description: '', price: '', type: 'sale', category: 'house', subCategory: 'Apartment', state: '', city: '', area: '' });
      setImages([]);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto border border-gray-100">
      <input name="title" value={form.title} onChange={handleChange} required placeholder="Title" className="w-full border px-3 py-2 rounded" />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border px-3 py-2 rounded" />
      <input name="price" value={form.price} onChange={handleChange} required type="number" placeholder="Price" className="w-full border px-3 py-2 rounded" />
      <div className="grid grid-cols-2 gap-4">
        <select name="type" value={form.type} onChange={handleChange} className="w-full border px-3 py-2 rounded bg-gray-50">
          <option value="sale">For Sale</option>
          <option value="rent">For Rent / Lease</option>
        </select>
        <select name="category" value={form.category} onChange={handleChange} className="w-full border px-3 py-2 rounded bg-gray-50">
          <option value="house">House</option>
          <option value="land">Land</option>
          <option value="shop">Commercial</option>
          <option value="other">Other</option>
        </select>
      </div>
      <select name="subCategory" value={form.subCategory} onChange={handleChange} className="w-full border px-3 py-2 rounded">
        {currentSubCategories.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <input name="state" value={form.state} onChange={handleChange} required placeholder="State" className="w-full border px-3 py-2 rounded" />
      <input name="city" value={form.city} onChange={handleChange} required placeholder="City" className="w-full border px-3 py-2 rounded" />
      <input name="area" value={form.area} onChange={handleChange} placeholder="Area" className="w-full border px-3 py-2 rounded" />
      <input type="file" accept="image/*" multiple onChange={handleImages} className="w-full" />
      <div className="text-xs text-gray-500">Max 5 images. First image will be used as cover.</div>
      <button type="submit" className="w-full bg-gold text-primary py-3 rounded font-bold hover:bg-gold/90 transition shadow-md" disabled={loading}>{loading ? 'Uploading...' : 'Upload Property'}</button>
      {error && <div className="text-red-600 text-center">{error}</div>}
      {success && <div className="text-green-700 text-center">{success}</div>}
    </form>
  );
}
