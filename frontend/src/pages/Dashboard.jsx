import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { dummyProperties, dummyLeads, dummyUsers } from '../dummyData';
import PropertyUpload from '../components/PropertyUpload';
import Sidebar from '../components/Sidebar';

function DashboardHome({ user }) {
  const isSeller = ['seller', 'agent'].includes(user.role);

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-primary">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {isSeller ? (
          <>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition">
              <div>
                <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Listings</div>
                <div className="text-3xl font-bold text-gray-900 mt-2">12</div>
              </div>
              <div className="p-3 bg-blue-50 rounded-full text-blue-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition">
              <div>
                <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Views</div>
                <div className="text-3xl font-bold text-gray-900 mt-2">1,245</div>
              </div>
              <div className="p-3 bg-purple-50 rounded-full text-purple-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition">
              <div>
                <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">Active Leads</div>
                <div className="text-3xl font-bold text-gray-900 mt-2">8</div>
              </div>
              <div className="p-3 bg-green-50 rounded-full text-green-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition">
              <div>
                <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">Saved Properties</div>
                <div className="text-3xl font-bold text-gray-900 mt-2">5</div>
              </div>
              <div className="p-3 bg-red-50 rounded-full text-red-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              </div>
            </div>
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition">
              <div>
                <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">Recent Views</div>
                <div className="text-3xl font-bold text-gray-900 mt-2">12</div>
              </div>
              <div className="p-3 bg-blue-50 rounded-full text-blue-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function MyListings() {
  // Show all dummy properties for demo
  const [properties, setProperties] = useState(dummyProperties);

  const markAsSold = (id) => {
    // In a real app, you would make an API call here: axios.put(`/api/properties/${id}`, { status: 'sold' })
    const updated = properties.map(p => 
      p._id === id ? { ...p, status: 'sold', soldAt: new Date().toISOString() } : p
    );
    setProperties(updated);
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-gray-800">My Listings</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {properties.map(p => (
          <div key={p._id} className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition p-5 border border-gray-100 relative overflow-hidden group`}>
            {p.isVerified && <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">VERIFIED</div>}
            {p.status === 'sold' && <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center"><span className="text-red-600 font-black text-3xl border-4 border-red-600 px-4 py-2 -rotate-12 rounded">SOLD</span></div>}
            <div className="flex flex-col h-full justify-between">
              <div className="mb-4">
                <div className="font-bold text-lg text-gray-800 mb-1 truncate">{p.title}</div>
                <div className="text-blue-600 font-semibold text-sm mb-2">{p.subCategory} &bull; {p.type === 'rent' ? 'For Rent' : 'For Sale'}</div>
                <div className="text-gray-500 text-sm flex items-center gap-1">
                  <span className="text-xs">📍</span> {p.location?.city}, {p.location?.state}
                </div>
                <div className="text-gray-900 font-extrabold text-xl mt-2">₦{p.price?.toLocaleString()}</div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <Link to={`/property/${p._id}`} className="text-blue-600 hover:text-blue-800 font-medium text-sm transition">View Details &rarr;</Link>
                <div className="flex gap-2">
                  {!p.isVerified && <button className="text-xs bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1 rounded-full font-bold hover:bg-amber-500 hover:text-white transition">Verify</button>}
                  {p.status !== 'sold' && <button onClick={() => markAsSold(p._id)} className="text-xs bg-red-100 text-red-600 border border-red-200 px-3 py-1 rounded-full font-bold hover:bg-red-600 hover:text-white transition">Mark Sold</button>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SavedProperties() {
  const properties = dummyProperties.slice(0, 2); // Mock data
  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Saved Properties</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {properties.map(p => (
          <div key={p._id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition p-5 border border-gray-100 relative overflow-hidden group">
             <div className="flex flex-col h-full justify-between">
              <div className="mb-4">
                <div className="font-bold text-lg text-gray-800 mb-1 truncate">{p.title}</div>
                <div className="text-blue-600 font-semibold text-sm mb-2">{p.subCategory}</div>
                <div className="text-gray-500 text-sm flex items-center gap-1">
                  <span className="text-xs">📍</span> {p.location?.city}, {p.location?.state}
                </div>
                <div className="text-gray-900 font-extrabold text-xl mt-2">₦{p.price?.toLocaleString()}</div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <Link to={`/property/${p._id}`} className="text-blue-600 hover:text-blue-800 font-medium text-sm transition">View Details &rarr;</Link>
                <button className="text-xs text-red-600 hover:underline">Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AddProperty() {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Add New Property</h3>
      <PropertyUpload />
    </div>
  );
}

function Leads() {
  const leads = dummyLeads;
  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Recent Leads</h3>
      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-bold border-b border-gray-200"><tr><th className="px-6 py-4">Property</th><th className="px-6 py-4">Buyer</th><th className="px-6 py-4">Contact</th><th className="px-6 py-4">Message</th></tr></thead>
          <tbody className="divide-y divide-gray-100">
            {leads.map(l => (
              <tr key={l._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-semibold text-blue-600">{l.propertyId?.title}</td>
                <td className="px-6 py-4">{l.buyerName}</td>
                <td className="px-6 py-4 text-gray-500">{l.buyerEmail} <br />{l.buyerPhone}</td>
                <td className="px-6 py-4 text-gray-600 italic">"{l.message}"</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Profile({ currentUser }) {
  const [form, setForm] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone,
    address: 'Lagos, Nigeria',
    bio: 'Real estate enthusiast.',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handlePasswordChange = e => setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess('');
    try {
      // In a real app: await axios.put('/api/users/profile', form);
      console.log("Updating profile with:", form);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async e => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      return setPasswordError('New passwords do not match.');
    }
    setPasswordLoading(true); setPasswordError(''); setPasswordSuccess('');
    try {
      // In a real app: await axios.put('/api/users/change-password', passwordForm);
      console.log("Changing password...");
      setPasswordSuccess('Password changed successfully!');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setPasswordError('Failed to change password. Check current password.');
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Profile Settings</h3>
      
      {/* Profile Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-3xl mx-auto mb-6 flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-3xl font-bold border-4 border-white shadow-sm">
            {form.name.charAt(0)}
        </div>
        <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900">{form.name}</h2>
            <p className="text-gray-500">{currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)} Account</p>
            <button className="text-sm text-blue-600 font-semibold mt-2 hover:underline">Change Profile Photo</button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div><label className="block text-sm font-medium text-gray-700">Full Name</label><input name="name" value={form.name} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" /></div>
            <div><label className="block text-sm font-medium text-gray-700">Email Address</label><input name="email" value={form.email} onChange={handleChange} required type="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" /></div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div><label className="block text-sm font-medium text-gray-700">Phone Number</label><input name="phone" value={form.phone} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" /></div>
            <div><label className="block text-sm font-medium text-gray-700">Location</label><input name="address" value={form.address} onChange={handleChange} placeholder="City, Country" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" /></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700">Bio</label><textarea name="bio" rows="3" value={form.bio} onChange={handleChange} placeholder="Tell us about yourself..." className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" /></div>
          
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded-lg font-bold hover:bg-blue-700 transition shadow-md" disabled={loading}>{loading ? 'Saving...' : 'Save Changes'}</button>
          </div>
          {error && <div className="text-red-600 text-center pt-4">{error}</div>}
          {success && <div className="text-green-700 text-center pt-4">{success}</div>}
        </form>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-3xl mx-auto mt-8">
        <h4 className="text-xl font-bold mb-4 text-gray-800">Change Password</h4>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Password</label>
              <div className="relative">
                <input name="currentPassword" value={passwordForm.currentPassword} onChange={handlePasswordChange} required type={showCurrentPassword ? "text" : "password"} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pr-10" />
                <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700">
                  {showCurrentPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <div className="relative">
                <input name="newPassword" value={passwordForm.newPassword} onChange={handlePasswordChange} required type={showNewPassword ? "text" : "password"} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pr-10" />
                <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700">
                  {showNewPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <div className="relative">
                <input name="confirmPassword" value={passwordForm.confirmPassword} onChange={handlePasswordChange} required type={showConfirmPassword ? "text" : "password"} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pr-10" />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700">
                  {showConfirmPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  )}
                </button>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button type="submit" className="bg-gray-700 text-white py-2 px-6 rounded-lg font-bold hover:bg-gray-800 transition" disabled={passwordLoading}>{passwordLoading ? 'Saving...' : 'Change Password'}</button>
            </div>
            {passwordError && <div className="text-red-600 text-center">{passwordError}</div>}
            {passwordSuccess && <div className="text-green-700 text-center">{passwordSuccess}</div>}
        </form>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentUser = dummyUsers[0]; // Simulate logged in user
  const isSeller = ['seller', 'agent'].includes(currentUser.role);

  return (
    <div className="flex min-h-[80vh]">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} role={currentUser.role} />
      <main className="flex-1 bg-gray-50/50">
        <div className="container mx-auto px-4 py-8">
          <button className="md:hidden mb-4 text-white bg-blue-600 px-3 py-1 rounded font-bold" onClick={() => setSidebarOpen(true)}>
            ☰ Menu
          </button>
          {/* Mobile Nav Placeholder - Sidebar handles navigation now */}
          <div className="md:hidden mb-6">
              <h2 className="text-2xl font-bold text-primary">Dashboard</h2>
          </div>
          
          <Routes>
            <Route path="/" element={<DashboardHome user={currentUser} />} />
            <Route path="profile" element={<Profile currentUser={currentUser} />} />
            {isSeller && (
              <>
                <Route path="add-property" element={<AddProperty />} />
                <Route path="my-listings" element={<MyListings />} />
                <Route path="leads" element={<Leads />} />
              </>
            )}
            {!isSeller && (
               <Route path="saved-properties" element={<SavedProperties />} />
            )}
          </Routes>
        </div>
      </main>
    </div>
  );
}
