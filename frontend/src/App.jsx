import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Listings from './pages/Listings'
import Property from './pages/Property'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'
import SuperAdmin from './pages/SuperAdmin'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import About from './pages/About'
import Contact from './pages/Contact'
import ForgotPassword from './pages/ForgotPassword'

export default function App(){
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/listings" element={<Listings/>} />
          <Route path="/property/:id" element={<Property/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/dashboard/*" element={<Dashboard/>} />
          <Route path="/admin/*" element={<Admin/>} />
          <Route path="/superadmin/*" element={<SuperAdmin/>} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}
