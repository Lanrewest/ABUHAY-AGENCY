import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { dummyProperties } from '../dummyData';

function Home() {
  const [activeTab, setActiveTab] = useState('sale');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/listings');
  };

  // Get top 3 properties for featured section
  const featuredProperties = dummyProperties ? dummyProperties.slice(0, 3) : [];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-gray-900 text-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1920&auto=format&fit=crop" 
                alt="Luxury Home" 
                className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/40 to-gray-900/90"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            Discover <span className="text-yellow-500">Luxury</span> Living
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto font-light">
            Your journey to finding the perfect property starts here. Exclusive listings, prime locations, and unmatched elegance.
          </p>

          {/* Search Widget - Centered and Horizontal-ish */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-2xl max-w-4xl mx-auto border border-white/20">
             {/* Tabs */}
             <div className="flex justify-center mb-4 gap-4">
                <button 
                    type="button"
                    onClick={() => setActiveTab('sale')}
                    className={`px-6 py-2 rounded-full font-bold transition ${activeTab === 'sale' ? 'bg-yellow-500 text-gray-900' : 'bg-transparent text-white hover:bg-white/10'}`}
                >
                    Buy
                </button>
                <button 
                    type="button"
                    onClick={() => setActiveTab('rent')}
                    className={`px-6 py-2 rounded-full font-bold transition ${activeTab === 'rent' ? 'bg-yellow-500 text-gray-900' : 'bg-transparent text-white hover:bg-white/10'}`}
                >
                    Rent
                </button>
             </div>

             {/* Form */}
             <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                <input 
                    type="text" 
                    placeholder="Search by location, type..." 
                    className="flex-grow px-6 py-4 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-500"
                />
                <div className="flex gap-2 md:w-1/3">
                    <select className="w-1/2 px-4 py-4 rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 appearance-none cursor-pointer">
                        <option>Min Price</option>
                        <option>₦10M</option>
                        <option>₦50M</option>
                        <option>₦100M</option>
                    </select>
                    <select className="w-1/2 px-4 py-4 rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 appearance-none cursor-pointer">
                        <option>Max Price</option>
                        <option>₦100M</option>
                        <option>₦500M</option>
                        <option>₦1B+</option>
                    </select>
                </div>
                <button type="submit" className="bg-yellow-500 text-gray-900 font-bold px-8 py-4 rounded-xl hover:bg-yellow-400 transition shadow-lg transform hover:scale-105">
                    Search
                </button>
             </form>
          </div>
        </div>
      </section>

      {/* Featured Section (New) */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Properties</h2>
                <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
                {featuredProperties.map(p => (
                    <div key={p._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group border border-gray-100">
                        <div className="relative h-64 overflow-hidden">
                            <img src={p.images && p.images[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                            <div className="absolute top-4 left-4 bg-yellow-500 text-gray-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                {p.type}
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">{p.title}</h3>
                            <p className="text-gray-500 mb-4 text-sm">{p.location?.city}, {p.location?.state}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-2xl font-bold text-gray-900">₦{p.price?.toLocaleString()}</span>
                                <Link to={`/property/${p._id}`} className="text-yellow-600 font-semibold hover:text-yellow-700">Details &rarr;</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center mt-12">
                <Link to="/listings" className="inline-block border-2 border-gray-900 text-gray-900 px-10 py-3 rounded-full font-bold hover:bg-gray-900 hover:text-white transition">
                    View All Listings
                </Link>
            </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
