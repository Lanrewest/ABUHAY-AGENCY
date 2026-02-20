import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[400px] flex items-center justify-center bg-gray-900 text-white">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80" 
            alt="Skyscrapers" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 to-gray-900/90"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight">About <span className="text-yellow-500">ABUHAY</span> Agency</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Redefining the real estate experience with trust, transparency, and technology.</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Who We Are</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              ABUHAY Agency is a premier real estate marketplace connecting buyers, sellers, and agents in a seamless digital environment. We believe that finding your dream property shouldn't be a hassle.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Whether you are looking for a luxury apartment, a commercial space, or a plot of land, our platform offers verified listings and powerful tools to help you make informed decisions.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="text-4xl font-bold text-yellow-500 mb-2">500+</div>
                <div className="text-gray-600 font-medium">Properties Listed</div>
             </div>
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">1k+</div>
                <div className="text-gray-600 font-medium">Happy Clients</div>
             </div>
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="text-4xl font-bold text-green-500 mb-2">50+</div>
                <div className="text-gray-600 font-medium">Cities Covered</div>
             </div>
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="text-4xl font-bold text-purple-500 mb-2">24/7</div>
                <div className="text-gray-600 font-medium">Support</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
