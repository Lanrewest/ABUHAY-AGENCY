import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    try {
      await forgotPassword({ email });
      setMessage('Password reset link sent to your email.');
    } catch (err) {
      console.error("Forgot Password Error:", err);
      setError(err.response?.data?.message || 'Failed to send reset link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop')" }}>
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-[2px]"></div>

      <div className="relative z-10 w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">Reset Password</h2>
            <p className="text-sm text-gray-500 mt-2">Enter your email to receive a reset link</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input name="email" value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="john@example.com" className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white" />
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg transform hover:scale-[1.02]" disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
        </form>

        {message && <div className="mt-4 p-3 bg-green-100 text-green-700 rounded text-center text-sm">{message}</div>}
        {error && <div className="mt-4 p-3 bg-red-100 text-red-700 rounded text-center text-sm">{error}</div>}

        <div className="mt-6 text-center text-sm text-gray-600">
            Remember your password? <Link to="/login" className="font-bold text-yellow-600 hover:text-yellow-500">Sign in</Link>
        </div>
      </div>
    </div>
  );
}