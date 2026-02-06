import React from 'react'

function Merch() {
    return (
        <div className="bento-grid">
            <div className="bento-card span-4 hero-card" style={{ height: 'auto', padding: '3rem' }}>
                <h1 className="logo-text">GEAR</h1>
                <p className="stencil-text" style={{ color: 'var(--text-secondary)' }}>Wear the message. Support the mission.</p>
            </div>

            <div className="bento-card span-2 row-2">
                <div style={{ width: '100%', aspectRatio: '1/1', background: '#222', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <span style={{ opacity: 0.3 }}>HOODIE IMAGE</span>
                </div>
                <h2>Black Sheep Hoodie</h2>
                <p>Premium quality. Battle-ready.</p>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>$43.20</span>
                    </div>
                    <div style={{ background: 'white', color: 'black', padding: '0.8rem 1.5rem', fontWeight: 'bold', borderRadius: '8px' }}>
                        ADD TO CART
                    </div>
                </div>
            </div>

            <div className="bento-card span-2">
                <h2>Size Selection</h2>
                <p>Choose your fit for the battle.</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginTop: '1rem' }}>
                    {['S', 'M', 'L', 'XL', '2XL', '3XL'].map(size => (
                        <div key={size} style={{ border: '1px solid var(--card-border)', padding: '0.5rem', textAlign: 'center', borderRadius: '4px' }}>{size}</div>
                    ))}
                </div>
            </div>

            <div className="bento-card span-2 accent-card">
                <h2>Unashamed Apparel</h2>
                <p>Every purchase directly supports our podcast and recovery efforts in Mississippi.</p>
            </div>
        </div>
    )
}

export default Merch
