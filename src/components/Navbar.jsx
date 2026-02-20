import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="animate-in mobile-nav-container">
            <div className="container nav-content-wrapper">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <img src="/logo.png" alt="Black Sheep Logo" className="nav-logo" />
                </Link>

                <button className="mobile-menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
                </button>

                <div className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
                    <Link to="/episodes" className="nav-link" onClick={() => setIsMenuOpen(false)}>Episodes</Link>
                    <Link to="/events" className="nav-link" onClick={() => setIsMenuOpen(false)}>Gatherings</Link>
                    <Link to="/sponsors" className="nav-link" onClick={() => setIsMenuOpen(false)}>Sponsors</Link>
                    <Link to="/resources" className="nav-link" onClick={() => setIsMenuOpen(false)}>Resources</Link>
                    <Link to="/merch" className="nav-link" onClick={() => setIsMenuOpen(false)}>Gear</Link>
                    <Link to="/donate" className="donate-btn" onClick={() => setIsMenuOpen(false)}>DONATE</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
