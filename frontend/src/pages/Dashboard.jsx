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
  const properties = dummyProperties;
  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-primary">My Listings</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {properties.map(p => (
          <div key={p._id} className={`bg-white rounded-xl shadow-sm hover:shadow-md transition p-5 border border-gray-100 relative overflow-hidden`}>
            {p.isVerified && <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">VERIFIED</div>}
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
                {!p.isVerified && <button className="text-xs bg-gold/20 text-gold border border-gold px-3 py-1 rounded-full font-bold hover:bg-gold hover:text-white transition">Verify Now</button>}
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
  return <div><h3 className="text-2xl font-bold mb-6 text-primary">Profile Settings</h3><div className="bg-white p-8 rounded-xl shadow-sm text-gray-500 text-center border border-dashed border-gray-300">Profile management module coming soon...</div></div>;
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
