import React from 'react'

function Events() {
    return (
        <div className="bento-grid">
            <div className="bento-card span-4 hero-card" style={{ height: 'auto', padding: '3rem' }}>
                <h1 className="logo-text">EVENTS</h1>
                <p className="stencil-text" style={{ color: 'var(--text-secondary)' }}>Gathering for hope and transformation</p>
            </div>

            {/* Main Event Card */}
            <div className="bento-card span-3 row-2 accent-card">
                <div className="stencil-text" style={{ fontSize: '0.8rem', opacity: 0.8 }}>September 13, 2025</div>
                <h1 className="logo-text" style={{ fontSize: '4rem', marginTop: '1rem' }}>NIGHT OF HOPE</h1>
                <p style={{ fontSize: '1.2rem', marginTop: '1rem', maxWidth: '600px' }}>
                    A powerful evening of raw testimonies, worship, and real talk about recovery and the grace of Jesus Christ.
                    Featuring live speakers from the Black Sheep community.
                </p>
                <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
                    <div>
                        <span style={{ fontWeight: 'bold', display: 'block' }}>WORSHIP</span>
                        <span style={{ fontSize: '0.8rem' }}>Live Music & Prayer</span>
                    </div>
                    <div>
                        <span style={{ fontWeight: 'bold', display: 'block' }}>MINISTRY</span>
                        <span style={{ fontSize: '0.8rem' }}>Connection & Empowerment</span>
                    </div>
                </div>
                <div style={{ marginTop: 'auto', fontSize: '1.5rem', fontWeight: 'bold', border: '2px solid white', padding: '1rem', width: 'fit-content' }}>
                    JOIN US →
                </div>
            </div>

            <div className="bento-card">
                <h2>Location</h2>
                <p>Mississippi, USA</p>
                <div style={{ marginTop: '1rem', fontSize: '0.8rem', opacity: 0.7 }}>Check back for venue details.</div>
            </div>

            <div className="bento-card">
                <h2>Come as you are</h2>
                <p>Whether you're in recovery or needing spiritual renewal, you're welcome here.</p>
            </div>
        </div>
    )
}

export default Events
