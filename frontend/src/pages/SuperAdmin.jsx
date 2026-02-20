import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { dummyUsers, dummyProperties, dummyLeads } from '../dummyData';

function SuperAdminUsers() {
  const [users, setUsers] = useState(dummyUsers);
  // Mock function for making a user an admin
  const makeAdmin = (userId) => {
    setUsers(users.map(user => user._id === userId ? { ...user, role: 'admin' } : user));
    alert(`User ${userId} is now an admin.`);
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-primary">User Management</h3>
      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-bold">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email & Phone</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map(u => (
              <tr key={u._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-primary">{u.name}</td>
                <td className="px-6 py-4 text-gray-500">{u.email}<br/>{u.phone}</td>
                <td className="px-6 py-4 capitalize">{u.role}</td>
                <td className="px-6 py-4">
                  {u.isVerified ? <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">Verified</span> : <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">Pending</span>}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="text-xs text-blue-600 hover:underline">Edit</button>
                    {u.role !== 'admin' && <button onClick={() => makeAdmin(u._id)} className="text-xs text-purple-600 hover:underline">Make Admin</button>}
                    <button className="text-xs text-red-600 hover:underline">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SuperAdminProperties() {
  const [properties, setProperties] = useState(dummyProperties);

  const verifyProperty = (propertyId) => {
    // In a real app: await axios.put(`/api/admin/verify-property/${propertyId}`);
    setProperties(properties.map(p => p._id === propertyId ? { ...p, isVerified: true } : p));
    alert(`Property ${propertyId} verified.`);
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-primary">Property Management</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map(p => (
          <div key={p._id} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="font-bold text-md text-primary truncate">{p.title}</div>
            <div className="text-sm text-gray-500">{p.location.city}, {p.location.state}</div>
            <div className="text-lg font-bold text-dark mt-1">₦{p.price.toLocaleString()}</div>
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
              <div>
                {p.isVerified ? <span className="text-xs font-bold text-green-600">Verified</span> : <button onClick={() => verifyProperty(p._id)} className="text-xs text-blue-600 hover:underline">Verify</button>}
              </div>
              <div className="flex gap-2">
                <Link to={`/property/${p._id}`} className="text-xs text-gray-600 hover:underline">View</Link>
                <button className="text-xs text-blue-600 hover:underline">Edit</button>
                <button className="text-xs text-red-600 hover:underline">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SuperAdminLeads() {
  const [leads, setLeads] = useState(dummyLeads);
  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-primary">All Leads</h3>
      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-bold">
            <tr>
              <th className="px-6 py-3">Property</th>
              <th className="px-6 py-3">Buyer</th>
              <th className="px-6 py-3">Contact</th>
              <th className="px-6 py-3">Message</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leads.map(l => (
              <tr key={l._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-primary">{l.propertyId?.title}</td>
                <td className="px-6 py-4">{l.buyerName}</td>
                <td className="px-6 py-4 text-gray-500">{l.buyerEmail}<br/>{l.buyerPhone}</td>
                <td className="px-6 py-4 text-gray-600 italic">"{l.message}"</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SuperAdminDashboardHome() {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-primary">Super Admin Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
          <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Users</div>
          <div className="text-3xl font-bold text-dark mt-2">{dummyUsers.length}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
          <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Properties</div>
          <div className="text-3xl font-bold text-dark mt-2">{dummyProperties.length}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
          <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Leads</div>
          <div className="text-3xl font-bold text-dark mt-2">{dummyLeads.length}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500">
          <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">Pending Verifications</div>
          <div className="text-3xl font-bold text-dark mt-2">{dummyProperties.filter(p => !p.isVerified).length}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500">
          <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Revenue</div>
          <div className="text-3xl font-bold text-dark mt-2">₦150,000</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-indigo-500">
          <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Visitors</div>
          <div className="text-3xl font-bold text-dark mt-2">12,450</div>
          <div className="text-xs text-green-600 mt-1">↑ 12% this week</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-pink-500">
          <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">Traffic (Hits)</div>
          <div className="text-3xl font-bold text-dark mt-2">45,200</div>
           <div className="text-xs text-green-600 mt-1">↑ 5% this week</div>
        </div>
         <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-teal-500">
          <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">System Backup</div>
          <div className="text-lg font-bold text-dark mt-2">Last: 2h ago</div>
          <div className="text-xs text-green-600 mt-1">Status: Healthy</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h4 className="font-bold text-lg mb-4 text-gray-800">System Health</h4>
              <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                      <span className="text-gray-600">Database Status</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-bold">Operational</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                      <span className="text-gray-600">Server Load</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-bold">12%</span>
                  </div>
                   <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                      <span className="text-gray-600">Storage Usage</span>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-bold">65%</span>
                  </div>
                  <div className="flex justify-between items-center">
                      <span className="text-gray-600">Last Error Log</span>
                      <span className="text-xs text-gray-500">None in last 24h</span>
                  </div>
              </div>
          </div>
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h4 className="font-bold text-lg mb-4 text-gray-800">Quick Actions</h4>
               <div className="flex gap-3 flex-wrap">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm font-medium shadow-sm">Run Backup Now</button>
                  <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition text-sm font-medium shadow-sm">Clear Cache</button>
                  <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition text-sm font-medium shadow-sm">Maintenance Mode</button>
                  <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm font-medium shadow-sm">View Access Logs</button>
               </div>
          </div>
      </div>
    </div>
  );
}

function SuperAdminSettings() {
  const [form, setForm] = useState({
    siteName: 'ABUHAY Agency',
    siteDescription: 'The best place to find your dream home.',
    contactEmail: 'info@abuhay.com',
    contactPhone: '+234 800 000 0000',
    address: '123 Real Estate Ave, Lagos',
    commissionRate: 5,
    currency: 'NGN',
    maintenanceMode: false,
    facebookUrl: '',
    twitterUrl: '',
    instagramUrl: ''
  });

  const handleChange = e => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saving admin settings:', form);
    alert('Settings saved! (Check console)');
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-primary">Site Settings</h3>
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* General Settings */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">General Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Site Name</label>
                <input name="siteName" value={form.siteName} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Email</label>
                <input name="contactEmail" value={form.contactEmail} onChange={handleChange} type="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Phone</label>
                <input name="contactPhone" value={form.contactPhone} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500" />
              </div>
               <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input name="address" value={form.address} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Site Description</label>
                <textarea name="siteDescription" rows="3" value={form.siteDescription} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
          </div>

          {/* Financial Settings */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Financial Configuration</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                <label className="block text-sm font-medium text-gray-700">Currency Symbol</label>
                <select name="currency" value={form.currency} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500">
                  <option value="NGN">₦ (NGN)</option>
                  <option value="USD">$ (USD)</option>
                  <option value="EUR">€ (EUR)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Commission Rate (%)</label>
                <input name="commissionRate" value={form.commissionRate} onChange={handleChange} type="number" step="0.1" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Social Media Links</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Facebook URL</label>
                <input name="facebookUrl" value={form.facebookUrl} onChange={handleChange} placeholder="https://facebook.com/..." className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Twitter URL</label>
                <input name="twitterUrl" value={form.twitterUrl} onChange={handleChange} placeholder="https://twitter.com/..." className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Instagram URL</label>
                <input name="instagramUrl" value={form.instagramUrl} onChange={handleChange} placeholder="https://instagram.com/..." className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
          </div>

          {/* System Control */}
          <div>
             <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">System Control</h4>
             <div className="flex items-center">
                <input
                  id="maintenanceMode"
                  name="maintenanceMode"
                  type="checkbox"
                  checked={form.maintenanceMode}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="maintenanceMode" className="ml-2 block text-sm text-gray-900">
                  Enable Maintenance Mode (Site will be inaccessible to public)
                </label>
             </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-gray-200">
            <button type="button" className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded-lg font-bold hover:bg-blue-700 transition shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function SuperAdminProfile() {
  const currentUser = dummyUsers[0]; // Mock current user
  const [form, setForm] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone,
    address: 'Lagos, Nigeria',
    bio: 'Super Admin',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Password state
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
            <p className="text-gray-500">Super Admin Account</p>
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

function SuperAdminSidebar({ open, onClose }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    // In a real app, clear auth tokens here
    navigate('/login');
  };

  const navItems = [
    { name: 'Overview', path: '/superadmin', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg> },
    { name: 'Users', path: '/superadmin/users', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg> },
    { name: 'Properties', path: '/superadmin/properties', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg> },
    { name: 'Leads', path: '/superadmin/leads', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg> },
    { name: 'Settings', path: '/superadmin/settings', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> },
    { name: 'Profile', path: '/superadmin/profile', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg> },
  ];
  return (
    <aside className={`fixed md:static top-0 left-0 h-full min-h-screen w-64 bg-white text-gray-800 shadow-xl z-40 transform ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 flex flex-col border-r border-gray-200`}>
      <div className="flex items-center justify-center px-6 py-6 border-b border-gray-200">
        <span className="text-xl font-extrabold tracking-tight text-blue-700">SUPER ADMIN</span>
        <button onClick={onClose} className="text-blue-700 text-2xl font-bold md:hidden absolute right-6">&times;</button>
      </div>
      <nav className="flex flex-col gap-1 px-4 py-6 flex-1">
        {navItems.map(item => (
          <Link key={item.name} to={item.path} className="hover:bg-blue-50 hover:text-blue-700 px-4 py-3 rounded-lg transition font-medium flex items-center gap-3 text-gray-600">
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="px-4 py-4 border-t border-gray-200">
        <button onClick={handleLogout} className="w-full hover:bg-red-50 text-gray-600 hover:text-red-600 px-4 py-3 rounded-lg transition font-medium flex items-center gap-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default function SuperAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex min-h-[calc(100vh-150px)]">
      <SuperAdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 p-8 bg-gray-50/50 overflow-y-auto">
        <button className="md:hidden mb-4 text-white bg-blue-600 px-3 py-1 rounded font-bold" onClick={() => setSidebarOpen(true)}>
            ☰ Menu
        </button>
        <Routes>
          <Route path="/" element={<SuperAdminDashboardHome />} />
          <Route path="users" element={<SuperAdminUsers />} />
          <Route path="properties" element={<SuperAdminProperties />} />
          <Route path="leads" element={<SuperAdminLeads />} />
          <Route path="settings" element={<SuperAdminSettings />} />
          <Route path="profile" element={<SuperAdminProfile />} />
        </Routes>
      </main>
    </div>
  );
}