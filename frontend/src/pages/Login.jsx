import React, { useState } from 'react';
import { login as loginApi } from '../api';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess('');
    try {
      const res = await loginApi(form);
      setSuccess('Login successful!');
      // TODO: Save token, redirect, etc.
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h2 className="text-3xl font-bold mb-6 text-blue-800 text-center">Sign In</h2>
      <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 space-y-4">
        <input name="email" value={form.email} onChange={handleChange} required type="email" placeholder="Email" className="w-full border px-3 py-2 rounded" />
        <input name="password" value={form.password} onChange={handleChange} required type="password" placeholder="Password" className="w-full border px-3 py-2 rounded" />
        <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded font-semibold hover:bg-blue-800 transition" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
        {error && <div className="text-red-600 text-center">{error}</div>}
        {success && <div className="text-green-700 text-center">{success}</div>}
      </form>
    </div>
  );
}
