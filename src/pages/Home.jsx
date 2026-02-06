import React from 'react'

function Home() {
    return (
        <div className="bento-grid">
            {/* HERO SECTION */}
            <div className="bento-card span-2 row-2 hero-card">
                <div className="hero-content">
                    <img src="/logo.png" alt="Black Sheep Recovery Warfare Logo" style={{ maxWidth: '100%', marginBottom: '1rem' }} />
                    <h1 className="logo-text" style={{ display: 'none' }}>BLACK SHEEP<br />RECOVERY<br />WARFARE</h1>
                    <p className="stencil-text" style={{ marginTop: '1rem', color: 'var(--text-primary)' }}>Leaving the 99</p>
                </div>
            </div>

            {/* MISSION STATEMENT */}
            <div className="bento-card span-2">
                <h2>Our Mission</h2>
                <p>We are a Christ-centered ministry from Mississippi, dedicated to breaking the chains of addiction through the power of testimony and the blood of the Lamb.</p>
                <div className="stencil-text" style={{ fontSize: '0.8rem', marginTop: '1rem' }}>Revelation 12:11</div>
            </div>

            {/* PODCAST CARD */}
            <div className="bento-card accent-card">
                <h2>Podcast</h2>
                <p>Real stories of struggle and redemption. Hosted by John Gallagher.</p>
                <div style={{ marginTop: '1rem', fontWeight: 'bold' }}>LISTEN NOW →</div>
            </div>

            {/* ARMY SIGNUP */}
            <div className="bento-card">
                <h2>Join the Army</h2>
                <p>Sign up for our monthly newsletter and spiritual warfare tools.</p>
                <div style={{ marginTop: '1rem', borderBottom: '1px solid var(--accent)', paddingBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                    Email Address...
                </div>
            </div>

            {/* FEATURED GUEST */}
            <div className="bento-card span-2">
                <h2>Featured Testimony</h2>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div style={{ width: '60px', height: '60px', background: '#333', borderRadius: '50%' }}></div>
                    <div>
                        <p style={{ color: 'white', fontWeight: 'bold' }}>Brian "Head" Welch (KORN)</p>
                        <p style={{ fontSize: '0.85rem' }}>From rock bottom to the Rock of Ages.</p>
                    </div>
                </div>
            </div>

            {/* BATTLE READY RESOURCES */}
            <div className="bento-card row-2">
                <h2>Battle Ready</h2>
                <ul style={{ listStyle: 'none', marginTop: '1rem', fontSize: '0.9rem' }}>
                    <li style={{ marginBottom: '0.8rem' }}>• Devotionals</li>
                    <li style={{ marginBottom: '0.8rem' }}>• Recovery Resources</li>
                    <li style={{ marginBottom: '0.8rem' }}>• Spiritual Warfare Tools</li>
                    <li style={{ marginBottom: '0.8rem' }}>• Newsletter Archive</li>
                </ul>
            </div>

            {/* MERCHANDISE */}
            <div className="bento-card">
                <h2>Gear</h2>
                <p>Support the mission and wear the message.</p>
                <div style={{ textAlign: 'right', marginTop: '1rem' }}>SHOP →</div>
            </div>

            {/* SOBER LIVING */}
            <div className="bento-card span-2">
                <h2>Sober Living</h2>
                <p>Providing safe, faith-based environments for individuals overcoming addiction through discipleship and mentorship.</p>
            </div>

            {/* DONATE */}
            <div className="bento-card accent-card">
                <h2>Support</h2>
                <p>This ministry is donor-supported. Help us bring more home.</p>
                <div style={{ marginTop: '1rem', fontWeight: 'bold' }}>DONATE →</div>
            </div>

        </div>
    )
}

export default Home
