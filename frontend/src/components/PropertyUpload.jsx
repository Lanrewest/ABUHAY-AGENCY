import React, { useState } from 'react';
import axios from 'axios';

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

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess('');
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    images.forEach(img => data.append('images', img));
    try {
      await axios.post('/api/properties', data, { withCredentials: true });
      setSuccess('Property uploaded!');
      setForm({ title: '', description: '', price: '', type: 'sale', category: 'house', state: '', city: '', area: '' });
      setImages([]);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 bg-white rounded shadow p-6 max-w-lg mx-auto">
      <input name="title" value={form.title} onChange={handleChange} required placeholder="Title" className="w-full border px-3 py-2 rounded" />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border px-3 py-2 rounded" />
      <input name="price" value={form.price} onChange={handleChange} required type="number" placeholder="Price" className="w-full border px-3 py-2 rounded" />
      <select name="type" value={form.type} onChange={handleChange} className="w-full border px-3 py-2 rounded">
        <option value="sale">Sale</option>
        <option value="rent">Rent</option>
      </select>
      <select name="category" value={form.category} onChange={handleChange} className="w-full border px-3 py-2 rounded">
        <option value="house">House</option>
        <option value="land">Land</option>
        <option value="shop">Shop</option>
        <option value="other">Other</option>
      </select>
      <select name="subCategory" value={form.subCategory} onChange={handleChange} className="w-full border px-3 py-2 rounded">
        <option value="Duplex">Duplex</option>
        <option value="Flat">Flat</option>
        <option value="Bungalow">Bungalow</option>
        <option value="Terrace">Terrace</option>
        <option value="Detached">Detached</option>
        <option value="Semi-detached">Semi-detached</option>
        <option value="Apartment">Apartment</option>
        <option value="Land">Land</option>
        <option value="Shop">Shop</option>
        <option value="Office">Office</option>
        <option value="Warehouse">Warehouse</option>
        <option value="Other">Other</option>
      </select>
      <input name="state" value={form.state} onChange={handleChange} required placeholder="State" className="w-full border px-3 py-2 rounded" />
      <input name="city" value={form.city} onChange={handleChange} required placeholder="City" className="w-full border px-3 py-2 rounded" />
      <input name="area" value={form.area} onChange={handleChange} placeholder="Area" className="w-full border px-3 py-2 rounded" />
      <input type="file" accept="image/*" multiple onChange={handleImages} className="w-full" />
      <div className="text-xs text-gray-500">Max 5 images. First image will be used as cover.</div>
      <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded font-semibold hover:bg-blue-800 transition" disabled={loading}>{loading ? 'Uploading...' : 'Upload Property'}</button>
      {error && <div className="text-red-600 text-center">{error}</div>}
      {success && <div className="text-green-700 text-center">{success}</div>}
    </form>
  );
}
