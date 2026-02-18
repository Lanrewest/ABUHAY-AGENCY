import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { dummyUsers, dummyProperties, dummyLeads } from '../dummyData';

function Users() {
  const [users, setUsers] = useState(dummyUsers);
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

function Properties() {
  const [properties, setProperties] = useState(dummyProperties);
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
                {p.isVerified ? <span className="text-xs font-bold text-green-600">Verified</span> : <button className="text-xs text-blue-600 hover:underline">Verify</button>}
              </div>
              <div className="flex gap-2">
                <Link to={`/property/${p._id}`} className="text-xs text-gray-600 hover:underline">View</Link>
                <button className="text-xs text-red-600 hover:underline">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Leads() {
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

function AdminDashboardHome() {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-primary">Admin Overview</h3>
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
      </div>
    </div>
  );
}

function Settings() {
  const [form, setForm] = useState({
    siteName: 'ABUHAY Agency',
    contactEmail: 'info@abuhay.com',
    commissionRate: 5,
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would call an API to save these settings
    console.log('Saving admin settings:', form);
    alert('Settings saved! (Check console)');
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-primary">Site Settings</h3>
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Site Name</label>
            <input name="siteName" value={form.siteName} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Public Contact Email</label>
            <input name="contactEmail" value={form.contactEmail} onChange={handleChange} type="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Commission Rate (%)</label>
            <input name="commissionRate" value={form.commissionRate} onChange={handleChange} type="number" step="0.1" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
          </div>
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <button type="submit" className="bg-gold text-primary py-2 px-6 rounded-lg font-bold hover:bg-gold/90 transition shadow-md">Save Settings</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AdminSidebar() {
  // A simplified sidebar for the admin layout
  const navItems = [
    { name: 'Overview', path: '/admin', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg> },
    { name: 'Users', path: '/admin/users', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg> },
    { name: 'Properties', path: '/admin/properties', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg> },
    { name: 'Leads', path: '/admin/leads', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg> },
    { name: 'Settings', path: '/admin/settings', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> },
  ];
  return (
    <aside className="w-64 bg-gray-900 text-white flex-shrink-0 flex flex-col">
      <div className="flex items-center justify-center px-6 py-6 border-b border-gray-800">
        <span className="text-xl font-extrabold tracking-tight text-gold">ADMIN</span>
      </div>
      <nav className="flex flex-col gap-1 px-4 py-6 flex-1">
        {navItems.map(item => (
          <Link key={item.name} to={item.path} className="hover:bg-gray-800 hover:text-gold px-4 py-3 rounded-lg transition font-medium flex items-center gap-3">
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default function Admin() {
  return (
    <div className="flex min-h-[calc(100vh-150px)]">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-50/50 overflow-y-auto">
        <Routes>
          <Route path="/" element={<AdminDashboardHome />} />
          <Route path="users" element={<Users />} />
          <Route path="properties" element={<Properties />} />
          <Route path="leads" element={<Leads />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}
