import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Episodes from './pages/Episodes'
import Events from './pages/Events'
import Sponsors from './pages/Sponsors'
import Resources from './pages/Resources'
import Merch from './pages/Merch'
import Donate from './pages/Donate'

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <div className="noise-overlay"></div>

        <div className="container">
          <Navbar />
        </div>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/episodes" element={<Episodes />} />
            <Route path="/events" element={<Events />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/merch" element={<Merch />} />
            <Route path="/donate" element={<Donate />} />
          </Routes>
        </main>

        <div className="container">
          <footer style={{ marginTop: '4rem', textAlign: 'center', opacity: 0.5, fontSize: '0.8rem', paddingBottom: '2rem' }}>
            <p>© 2026 BLACK SHEEP RECOVERY WARFARE | ISAIAH 53 | www.blacksheeprecoverywarfare.org</p>
          </footer>
        </div>
      </div>
    </Router>
  )
}

export default App
