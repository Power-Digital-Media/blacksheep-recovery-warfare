import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import GlobalScrollGlow from './components/GlobalScrollGlow'

const Home = lazy(() => import('./pages/Home'))
const Episodes = lazy(() => import('./pages/Episodes'))
const Events = lazy(() => import('./pages/Events'))
const Sponsors = lazy(() => import('./pages/Sponsors'))
const Resources = lazy(() => import('./pages/Resources'))
const Merch = lazy(() => import('./pages/Merch'))
const ProductPage = lazy(() => import('./pages/ProductPage'))
const Donate = lazy(() => import('./pages/Donate'))
const MilesOfSmiles = lazy(() => import('./pages/MilesOfSmiles'))
const Checkout = lazy(() => import('./pages/Checkout'))

function App() {
  return (
    <div className="app-wrapper">
      <ScrollToTop />
      <GlobalScrollGlow />
      <div className="noise-overlay"></div>

      <Navbar />

      <main>
        <Suspense fallback={<div style={{ minHeight: '80vh', background: '#000' }} />}>
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
            <Route path="/miles-of-smiles" element={<MilesOfSmiles />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}

export default App
