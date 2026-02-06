import React from 'react'

function Episodes() {
    const episodes = [
        { id: '1', title: 'With ASAP Preach', description: 'Real talk about recovery and faith.', youtubeId: '#' },
        { id: '2', title: 'Rikki Blackwell', description: 'A guest appearance sharing powerful testimony.', youtubeId: '#' },
        { id: '3', title: 'Boston 2 percent', description: 'Episode 37 - The struggle and the victory.', youtubeId: '#' },
        { id: '4', title: 'Prison to Purpose', description: 'Casey Swier\'s journey of redemption.', youtubeId: '#' },
    ]

    return (
        <div className="bento-grid">
            <div className="bento-card span-4 hero-card" style={{ height: 'auto', padding: '3rem' }}>
                <h1 className="logo-text">EPISODES</h1>
                <p className="stencil-text" style={{ color: 'var(--text-secondary)' }}>Watch the testimonies of transformation</p>
            </div>

            {episodes.map(eps => (
                <div key={eps.id} className="bento-card span-2">
                    <h2>{eps.title}</h2>
                    <p>{eps.description}</p>
                    <div style={{ marginTop: '1rem', width: '100%', aspectRatio: '16/9', background: '#333', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '2rem' }}>▶</span>
                    </div>
                </div>
            ))}

            <div className="bento-card span-2 accent-card">
                <h2>Spotify</h2>
                <p>Stream all our episodes on the go.</p>
                <div style={{ marginTop: '1rem', fontWeight: 'bold' }}>LISTEN ON SPOTIFY →</div>
            </div>

            <div className="bento-card span-2">
                <h2>YouTube channel</h2>
                <p>Join our 1.43K+ subscribers for the latest updates.</p>
                <div style={{ marginTop: '1rem', fontWeight: 'bold' }}>SUBSCRIBE →</div>
            </div>
        </div>
    )
}

export default Episodes
