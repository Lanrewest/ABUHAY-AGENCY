import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { dummyUsers, dummyProperties, dummyLeads } from '../dummyData';

function Properties() {
  const [properties, setProperties] = useState(dummyProperties);

  const verifyProperty = (propertyId) => {
    // In a real app: await axios.put(`/api/admin/verify-property/${propertyId}`);
    setProperties(properties.map(p => p._id === propertyId ? { ...p, isVerified: true } : p));
    alert(`Property ${propertyId} verified.`);
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Property Management</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map(p => (
          <div key={p._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-200 group">
            <div className="h-40 overflow-hidden relative">
                <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                {!p.isVerified && <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">Pending</div>}
            </div>
            <div className="p-4">
                <div className="font-bold text-lg text-gray-800 truncate">{p.title}</div>
                <div className="text-sm text-gray-500 mb-2">{p.location.city}, {p.location.state}</div>
                <div className="text-lg font-bold text-blue-600">₦{p.price.toLocaleString()}</div>
            </div>
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
              <div>
                {p.isVerified ? <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">Verified</span> : <button onClick={() => verifyProperty(p._id)} className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition">Verify</button>}
              </div>
              <div className="flex gap-2">
                <Link to={`/property/${p._id}`} className="text-xs text-gray-500 hover:text-blue-600 font-medium">View Details</Link>
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
      <h3 className="text-2xl font-bold mb-6 text-gray-800">All Leads</h3>
      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-bold border-b border-gray-200">
            <tr>
              <th className="px-6 py-4">Property</th>
              <th className="px-6 py-4">Buyer</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4">Message</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leads.map(l => (
              <tr key={l._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-semibold text-blue-600">{l.propertyId?.title}</td>
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
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Admin Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition">
          <div>
            <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Leads</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">{dummyLeads.length}</div>
          </div>
          <div className="p-3 bg-yellow-50 rounded-full text-yellow-600">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition">
          <div>
            <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">Pending Verifications</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">{dummyProperties.filter(p => !p.isVerified).length}</div>
          </div>
          <div className="p-3 bg-red-50 rounded-full text-red-600">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          </div>
        </div>
      </div>
      <p className="text-gray-500">This is the standard admin dashboard. For full site control, please access the Super Admin panel.</p>
    </div>
  );
}

function AdminSidebar({ open, onClose }) {
  // A simplified sidebar for the admin layout
  const navItems = [
    { name: 'Overview', path: '/admin', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg> },
    { name: 'Properties', path: '/admin/properties', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg> },
    { name: 'Leads', path: '/admin/leads', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg> },
  ];
  return (
    <aside className={`fixed md:static top-0 left-0 h-full min-h-screen w-64 bg-white text-gray-800 shadow-xl z-40 transform ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 flex flex-col border-r border-gray-200`}>
      <div className="flex items-center justify-center px-6 py-6 border-b border-gray-200">
        <span className="text-xl font-extrabold tracking-tight text-blue-700">ADMIN</span>
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
    </aside>
  );
}

export default function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex min-h-[calc(100vh-150px)]">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 p-8 bg-gray-50/50 overflow-y-auto">
        <button className="md:hidden mb-4 text-white bg-blue-600 px-3 py-1 rounded font-bold" onClick={() => setSidebarOpen(true)}>
            ☰ Menu
        </button>
        <Routes>
          <Route path="/" element={<AdminDashboardHome />} />
          <Route path="properties" element={<Properties />} />
          <Route path="leads" element={<Leads />} />
        </Routes>
      </main>
    </div>
  );
}
