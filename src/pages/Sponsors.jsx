import React from 'react'

function Sponsors() {
    const sponsors = [
        { name: 'Elite Clinical Research', url: '#' },
        { name: 'MHATC Thrift Store', url: '#' },
        { name: 'Mercy House Auto Center', url: '#' },
        { name: 'Shivers Creek', url: '#' },
        { name: 'The Mad Designist', url: '#' },
        { name: 'Elle Salon', url: '#' }
    ]

    return (
        <div className="bento-grid">
            <div className="bento-card span-4 hero-card" style={{ height: 'auto', padding: '3rem' }}>
                <h1 className="logo-text">OUR SPONSORS</h1>
                <p className="stencil-text" style={{ color: 'var(--text-secondary)' }}>Supported by those who believe in the mission</p>
            </div>

            {sponsors.map((sponsor, idx) => (
                <div key={idx} className="bento-card">
                    <div style={{ padding: '1rem', background: '#222', borderRadius: '12px', height: '100px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {/* Placeholder for images */}
                        <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>{sponsor.name} LOGO</span>
                    </div>
                    <h2 style={{ fontSize: '1rem' }}>{sponsor.name}</h2>
                    <div style={{ marginTop: 'auto', fontSize: '0.8rem', color: 'var(--warfare-red)' }}>VISIT WEBSITE →</div>
                </div>
            ))}

            <div className="bento-card span-2 accent-card">
                <h2>Become a Sponsor</h2>
                <p>Help us share the good news and support recovery.</p>
                <div style={{ marginTop: '1rem', fontWeight: 'bold' }}>CONTACT US →</div>
            </div>
        </div>
    )
}

export default Sponsors
