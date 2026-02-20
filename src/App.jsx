import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Episodes from './pages/Episodes'
import Events from './pages/Events'
import Sponsors from './pages/Sponsors'
import Resources from './pages/Resources'
import Merch from './pages/Merch'
import ProductPage from './pages/ProductPage'
import Donate from './pages/Donate'
import Checkout from './pages/Checkout'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app-wrapper">
      <div className="noise-overlay"></div>

      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/episodes" element={<Episodes />} />
          <Route path="/events" element={<Events />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/merch" element={<Merch />} />
          <Route path="/merch/:id" element={<ProductPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/donate" element={<Donate />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
