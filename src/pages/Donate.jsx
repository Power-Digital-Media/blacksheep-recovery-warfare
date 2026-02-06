import React from 'react'

function Donate() {
    return (
        <div className="bento-grid">
            <div className="bento-card span-4 hero-card" style={{ height: 'auto', padding: '3rem' }}>
                <h1 className="logo-text">DONATE</h1>
                <p className="stencil-text" style={{ color: 'var(--text-secondary)' }}>Help Black Sheep spread the Good News</p>
            </div>

            <div className="bento-card span-3 row-2 accent-card">
                <h1 className="logo-text" style={{ fontSize: '3rem' }}>SUPPORT THE<br />WARFARE</h1>
                <p style={{ fontSize: '1.1rem', marginTop: '1.5rem', maxWidth: '500px' }}>
                    Your financial support allows us to continue sharing real stories of addiction, struggle,
                    and God's relentless grace through our podcast and ministry.
                </p>

                <div style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(0,0,0,0.3)', borderRadius: '24px', textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '1rem' }}>Paypal Donation</h2>
                    <div style={{ width: '100%', padding: '1.5rem', background: '#FFC439', color: 'black', borderRadius: '12px', fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer' }}>
                        DONATE WITH PAYPAL
                    </div>
                    <p style={{ fontSize: '0.8rem', marginTop: '1rem', opacity: 0.7 }}>Securely processed via PayPal for Black Sheep Recovery Warfare.</p>
                </div>
            </div>

            <div className="bento-card">
                <h2>Isaiah 53</h2>
                <p>"But he was pierced for our transgressions, he was crushed for our iniquities; the punishment that brought us peace was on him, and by his wounds we are healed."</p>
            </div>

            <div className="bento-card">
                <h2>Ministry Impact</h2>
                <p>Your giving helps provide safe sober living environments and mentorship for those in need.</p>
            </div>
        </div>
    )
}

export default Donate
