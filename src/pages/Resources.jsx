import React from 'react'

function Resources() {
    const resources = [
        { name: 'Trapped in the Addict', type: 'Book', description: 'Powerful insights into the cycle of addiction.' },
        { name: 'Mercy House Teen Challenge', type: 'Ministry', description: 'Faith-based recovery programs for adults and teens.' },
        { name: 'The Uncommon Christian', type: 'Podcast', description: 'Focusing on lived faith and recovery.' },
        { name: 'Unashamed Recovery', type: 'YouTube', description: 'Real stories from the road of redemption.' }
    ]

    return (
        <div className="bento-grid">
            <div className="bento-card span-4 hero-card" style={{ height: 'auto', padding: '3rem' }}>
                <h1 className="logo-text">RESOURCES</h1>
                <p className="stencil-text" style={{ color: 'var(--text-secondary)' }}>Tools for the battle of recovery</p>
            </div>

            {resources.map((res, idx) => (
                <div key={idx} className="bento-card span-2">
                    <div className="stencil-text" style={{ fontSize: '0.7rem', color: 'var(--warfare-red)' }}>{res.type}</div>
                    <h2 style={{ marginTop: '0.5rem' }}>{res.name}</h2>
                    <p>{res.description}</p>
                    <div style={{ marginTop: '2rem', fontWeight: 'bold' }}>ACCESS RESOURCE →</div>
                </div>
            ))}

            <div className="bento-card span-4 accent-card">
                <h2>4 Mics 13 Teeth 1 Ankle Monitor</h2>
                <p>A raw, unashamed look at the journey from the bottom to the cross.</p>
                <div style={{ marginTop: '1rem', fontWeight: 'bold' }}>WATCH THE PROJECT →</div>
            </div>
        </div>
    )
}

export default Resources
