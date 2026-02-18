import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { dummyProperties, dummyLeads } from '../dummyData';
import PropertyUpload from '../components/PropertyUpload';
import Sidebar from '../components/Sidebar';

function DashboardHome() {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-primary">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-gold">
          <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Listings</div>
          <div className="text-3xl font-bold text-dark mt-2">12</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-primary">
          <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Views</div>
          <div className="text-3xl font-bold text-dark mt-2">1,245</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
          <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">Active Leads</div>
          <div className="text-3xl font-bold text-dark mt-2">8</div>
        </div>
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
      <h3 className="text-2xl font-bold mb-6 text-primary">My Listings</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {properties.map(p => (
          <div key={p._id} className={`bg-white rounded-xl shadow-sm hover:shadow-md transition p-5 border border-gray-100 relative overflow-hidden`}>
            {p.isVerified && <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">VERIFIED</div>}
            {p.status === 'sold' && <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center"><span className="text-red-600 font-black text-3xl border-4 border-red-600 px-4 py-2 -rotate-12 rounded">SOLD</span></div>}
            <div className="flex flex-col h-full justify-between">
              <div className="mb-4">
                <div className="font-bold text-lg text-primary mb-1 truncate">{p.title}</div>
                <div className="text-gold font-semibold text-sm mb-2">{p.subCategory} &bull; {p.type === 'rent' ? 'For Rent' : 'For Sale'}</div>
                <div className="text-gray-500 text-sm flex items-center gap-1">
                  <span className="text-xs">📍</span> {p.location?.city}, {p.location?.state}
                </div>
                <div className="text-dark font-extrabold text-xl mt-2">₦{p.price?.toLocaleString()}</div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <Link to={`/property/${p._id}`} className="text-primary hover:text-gold font-medium text-sm transition">View Details &rarr;</Link>
                <div className="flex gap-2">
                  {!p.isVerified && <button className="text-xs bg-gold/20 text-gold border border-gold px-3 py-1 rounded-full font-bold hover:bg-gold hover:text-white transition">Verify</button>}
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

function AddProperty() {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-primary">Add New Property</h3>
      <PropertyUpload />
    </div>
  );
}

function Leads() {
  const leads = dummyLeads;
  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-primary">Recent Leads</h3>
      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-bold"><tr><th className="px-6 py-3">Property</th><th className="px-6 py-3">Buyer</th><th className="px-6 py-3">Contact</th><th className="px-6 py-3">Message</th></tr></thead>
          <tbody className="divide-y divide-gray-100">
            {leads.map(l => (
              <tr key={l._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-primary">{l.propertyId?.title}</td>
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

function Profile() {
  // Using the first user from dummy data as the logged-in user
  const currentUser = dummyUsers[0]; 
  const [form, setForm] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

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
      <h3 className="text-2xl font-bold mb-6 text-primary">Profile Settings</h3>
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div><label className="block text-sm font-medium text-gray-700">Full Name</label><input name="name" value={form.name} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" /></div>
          <div><label className="block text-sm font-medium text-gray-700">Email Address</label><input name="email" value={form.email} onChange={handleChange} required type="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" /></div>
          <div><label className="block text-sm font-medium text-gray-700">Phone Number</label><input name="phone" value={form.phone} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" /></div>
          <div><label className="block text-sm font-medium text-gray-700">Account Type</label><p className="mt-1 text-sm text-gray-500 bg-gray-100 p-3 rounded-md capitalize">{currentUser.role}</p></div>
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <button type="submit" className="bg-gold text-primary py-2 px-6 rounded-lg font-bold hover:bg-gold/90 transition shadow-md" disabled={loading}>{loading ? 'Saving...' : 'Save Changes'}</button>
          </div>
          {error && <div className="text-red-600 text-center pt-4">{error}</div>}
          {success && <div className="text-green-700 text-center pt-4">{success}</div>}
        </form>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto mt-8">
        <h4 className="text-xl font-bold mb-4 text-primary">Change Password</h4>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700">Current Password</label><input name="currentPassword" value={passwordForm.currentPassword} onChange={handlePasswordChange} required type="password" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" /></div>
            <div><label className="block text-sm font-medium text-gray-700">New Password</label><input name="newPassword" value={passwordForm.newPassword} onChange={handlePasswordChange} required type="password" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" /></div>
            <div><label className="block text-sm font-medium text-gray-700">Confirm New Password</label><input name="confirmPassword" value={passwordForm.confirmPassword} onChange={handlePasswordChange} required type="password" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" /></div>
            <div className="flex justify-end pt-2">
              <button type="submit" className="bg-primary text-white py-2 px-6 rounded-lg font-bold hover:bg-primary/90 transition" disabled={passwordLoading}>{passwordLoading ? 'Saving...' : 'Change Password'}</button>
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
  return (
    <div className="flex min-h-[80vh]">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 container mx-auto px-4 py-8 bg-gray-50/50">
        <button className="md:hidden mb-4 text-primary bg-gold px-3 py-1 rounded font-bold" onClick={() => setSidebarOpen(true)}>
          ☰ Menu
        </button>
        {/* Mobile Nav Placeholder - Sidebar handles navigation now */}
        <div className="md:hidden mb-6">
            <h2 className="text-2xl font-bold text-primary">Dashboard</h2>
        </div>
        
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="add-property" element={<AddProperty />} />
          <Route path="my-listings" element={<MyListings />} />
          <Route path="leads" element={<Leads />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}
