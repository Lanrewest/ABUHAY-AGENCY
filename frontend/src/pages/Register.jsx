import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register as registerApi } from '../api';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', role: 'buyer' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess('');
    try {
      await registerApi(form);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1996&auto=format&fit=crop')" }}>
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-[2px]"></div>
      
      <div className="relative z-10 w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl transform transition-all">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Join ABUHAY Agency</h2>
            <p className="text-sm text-gray-500 mt-2">Start your real estate journey today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input name="name" value={form.name} onChange={handleChange} required placeholder="John Doe" className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition bg-gray-50 hover:bg-white" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input name="email" value={form.email} onChange={handleChange} required type="email" placeholder="john@example.com" className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition bg-gray-50 hover:bg-white" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input name="phone" value={form.phone} onChange={handleChange} required placeholder="+234..." className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition bg-gray-50 hover:bg-white" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                    <input name="password" value={form.password} onChange={handleChange} required type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition bg-gray-50 hover:bg-white pr-10" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition">
                        {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                        ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        )}
                    </button>
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">I am a...</label>
                <select name="role" value={form.role} onChange={handleChange} className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition bg-gray-50 hover:bg-white">
                    <option value="buyer">Buyer (Looking for property)</option>
                    <option value="seller">Seller / Agent (Listing property)</option>
                </select>
            </div>
            
            <button type="submit" className="w-full bg-yellow-500 text-gray-900 py-3 rounded-xl font-bold hover:bg-yellow-400 transition shadow-lg transform hover:scale-[1.02]" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
            </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account? <Link to="/login" className="font-bold text-blue-600 hover:text-blue-500">Sign in</Link>
        </div>

        {error && <div className="text-red-600 text-center">{error}</div>}
        {success && <div className="text-green-700 text-center">{success}</div>}
      </div>
    </div>
  );
}
