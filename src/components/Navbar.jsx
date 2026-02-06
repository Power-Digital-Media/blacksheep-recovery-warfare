import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav style={{ padding: '1.5rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img src="/logo.png" alt="Logo" style={{ height: '40px' }} />
                    <span className="stencil-text" style={{ fontSize: '1.2rem', fontWeight: '900' }}>BLACK SHEEP</span>
                </div>
            </Link>

            <div style={{ display: 'flex', gap: '2rem' }}>
                <Link to="/episodes" className="stencil-text" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Episodes</Link>
                <Link to="/events" className="stencil-text" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Events</Link>
                <Link to="/sponsors" className="stencil-text" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Sponsors</Link>
                <Link to="/resources" className="stencil-text" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Resources</Link>
                <Link to="/merch" className="stencil-text" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Gear</Link>
                <Link to="/donate" className="stencil-text" style={{ textDecoration: 'none', color: 'var(--warfare-red)', fontSize: '0.8rem', fontWeight: 'bold' }}>Donate</Link>
            </div>
        </nav>
    )
}

export default Navbar
