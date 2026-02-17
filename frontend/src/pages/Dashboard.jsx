import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { dummyProperties, dummyLeads } from '../dummyData';
import PropertyUpload from '../components/PropertyUpload';
import Sidebar from '../components/Sidebar';

function MyListings() {
  // Show all dummy properties for demo
  const properties = dummyProperties;
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">My Listings</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {properties.map(p => (
          <div key={p._id} className="bg-white rounded shadow p-4">
            <div className="font-semibold text-primary">{p.title}</div>
            <div className="text-gold font-bold text-sm">{p.subCategory}</div>
            <div className="text-gray-600 text-sm">{p.location?.city}, {p.location?.state}</div>
            <div className="text-dark font-bold">₦{p.price?.toLocaleString()}</div>
            <a href={`/property/${p._id}`} className="text-accent hover:underline text-sm">View</a>
          </div>
        ))}
      </div>
    </div>
  );
}

function AddProperty() {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Add Property</h3>
      <PropertyUpload />
    </div>
  );
}

function Leads() {
  const leads = dummyLeads;
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Leads</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead><tr><th>Property</th><th>Buyer</th><th>Contact</th><th>Message</th></tr></thead>
          <tbody>
            {leads.map(l => (
              <tr key={l._id} className="border-b">
                <td>{l.propertyId?.title}</td>
                <td>{l.buyerName}</td>
                <td>{l.buyerEmail} <br />{l.buyerPhone}</td>
                <td>{l.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Profile() {
  return <div><h3 className="text-xl font-bold mb-4">Profile</h3><div className="text-gray-500">(Profile management coming soon...)</div></div>;
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex min-h-[80vh]">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 container mx-auto px-4 py-8">
        <button className="md:hidden mb-4 text-primary bg-gold px-3 py-1 rounded font-bold" onClick={() => setSidebarOpen(true)}>
          ☰ Menu
        </button>
        <h2 className="text-2xl font-bold mb-4">Seller Dashboard</h2>
        <nav className="mb-4 space-x-4 hidden md:block">
          <Link to="/dashboard/add-property">Add Property</Link>
          <Link to="/dashboard/my-listings">My Listings</Link>
          <Link to="/dashboard/leads">Leads</Link>
          <Link to="/dashboard/profile">Profile</Link>
        </nav>
        <Routes>
          <Route path="add-property" element={<AddProperty />} />
          <Route path="my-listings" element={<MyListings />} />
          <Route path="leads" element={<Leads />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}
