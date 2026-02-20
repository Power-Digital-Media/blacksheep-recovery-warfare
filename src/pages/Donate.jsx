import React, { useEffect } from 'react'
import { Heart, ShieldCheck, ExternalLink } from 'lucide-react'

function Donate() {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const paymentMethods = [
        {
            name: 'Cash App',
            tag: '$blacksheeprecovery',
            url: 'https://cash.app/$blacksheeprecovery',
            color: '#00D632',
            image: '/images/blacksheep/Blacksheep Cash App Collection/CA_Point Right.png',
            description: 'Tap to send directly via Cash App. Fast, simple, and every dollar goes to the mission.',
            btnText: 'CASH APP'
        },
        {
            name: 'Venmo',
            tag: '@blacksheeprecovery4311',
            url: 'https://venmo.com/blacksheeprecovery4311',
            color: '#3D95CE',
            image: '/images/blacksheep/Blacksheep Venmo Collection/VM_Point Right.png',
            description: 'Send your support through Venmo. Quick giving for the Kingdom offensive.',
            btnText: 'VENMO'
        },
        {
            name: 'PayPal',
            tag: '@BlackSheep1143',
            url: 'https://www.paypal.me/BlackSheep1143',
            color: '#003087',
            image: '/images/blacksheep/Blacksheep Paypal Collection/PP_Point Right.png',
            description: 'Contribute securely via PayPal. One-time or recurring — you set the pace.',
            btnText: 'PAYPAL'
        }
    ];

    return (
        <div className="animate-in">
            {/* CINEMATIC HERO */}
            <section className="cinematic-section" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?auto=format&fit=crop&q=80&w=2000")' }}>
                <div className="image-overlay"></div>
                <div className="cinematic-content reveal">
                    <span className="emergency-text">Giving is Warfare</span>
                    <h1>FUEL THE<br />MISSION</h1>
                    <p className="narrative-text">
                        Your support fuels the recovery strategy. Every dollar directly impacts
                        lives currently lost in the shadow of addiction. Join the offensive.
                    </p>
                </div>
            </section>

            <div className="container" style={{ marginTop: 'clamp(3rem, 10vw, 8rem)' }}>
                {/* PAYMENT METHOD CARDS */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '3rem'
                }}>
                    {paymentMethods.map((method, index) => (
                        <div
                            key={method.name}
                            className={`reveal donate-method-card donate-card-${index}`}
                            onClick={() => window.open(method.url, '_blank')}
                            style={{
                                position: 'relative',
                                borderRadius: '28px',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                background: '#000',
                                border: `1px solid ${method.color}33`,
                                height: '380px',
                                display: 'flex',
                                alignItems: 'flex-end'
                            }}
                        >
                            <img
                                src={method.image}
                                alt={`Donate via ${method.name}`}
                                style={{
                                    position: 'absolute',
                                    left: '-10px',
                                    bottom: '0',
                                    height: '100%',
                                    objectFit: 'contain',
                                    objectPosition: 'bottom left',
                                    zIndex: 1
                                }}
                            />
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to left, rgba(0,0,0,0.95) 30%, transparent 70%)',
                                zIndex: 2
                            }}></div>
                            <div style={{
                                position: 'relative',
                                zIndex: 3,
                                padding: '2rem',
                                marginLeft: 'auto',
                                textAlign: 'right',
                                maxWidth: '55%'
                            }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '0.25rem' }}>
                                    {method.name.toUpperCase()}
                                </h3>
                                <span style={{
                                    fontSize: '0.75rem',
                                    color: method.color,
                                    fontFamily: 'monospace',
                                    letterSpacing: '1px',
                                    display: 'block',
                                    marginBottom: '0.75rem'
                                }}>
                                    {method.tag}
                                </span>
                                <p style={{ fontSize: '0.85rem', color: '#86868b', marginBottom: '1.5rem', lineHeight: 1.4 }}>
                                    {method.description}
                                </p>
                                <span style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    background: method.color,
                                    color: '#fff',
                                    padding: '10px 24px',
                                    borderRadius: '8px',
                                    fontSize: '0.8rem',
                                    fontWeight: '900',
                                    letterSpacing: '1px'
                                }}>
                                    {method.btnText} <ExternalLink size={14} />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bento-grid">
                    {/* SCRIPTURE PILLAR */}
                    <div className="bento-card span-4 row-2 reveal scripture-card">
                        <span className="emergency-text">The Foundation</span>
                        <p className="scripture-text">
                            "But he was pierced for our transgressions, he was crushed for our iniquities..."
                        </p>
                        <div className="scripture-ref">ISAIAH 53</div>
                    </div>

                    {/* IMPACT PILLAR */}
                    <div className="bento-card span-4 row-2 reveal">
                        <h2>Mission Fuel</h2>
                        <p>
                            Support provides safe discipleship environments and vertical
                            mentorship for those in transition from addiction.
                        </p>
                    </div>

                    {/* CONTACT PILLAR */}
                    <div className="bento-card span-4 row-2 reveal contact-pillar">
                        <h2>Other Ways to Give</h2>
                        <p className="contact-text">
                            For corporate sponsorship or physical donations, reach out directly at
                            contact@blacksheeprecoverywarfare.org
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
                .donate-method-card {
                    transition: box-shadow 0.5s ease, transform 0.5s ease, border-color 0.5s ease;
                }
                .donate-card-0:hover {
                    box-shadow: 0 0 30px rgba(0, 214, 50, 0.5), 0 0 60px rgba(0, 214, 50, 0.2);
                    border-color: rgba(0, 214, 50, 0.8) !important;
                    transform: scale(1.02);
                }
                .donate-card-1:hover {
                    box-shadow: 0 0 30px rgba(61, 149, 206, 0.5), 0 0 60px rgba(61, 149, 206, 0.2);
                    border-color: rgba(61, 149, 206, 0.8) !important;
                    transform: scale(1.02);
                }
                .donate-card-2:hover {
                    box-shadow: 0 0 30px rgba(0, 48, 135, 0.5), 0 0 60px rgba(0, 48, 135, 0.3);
                    border-color: rgba(0, 48, 135, 0.8) !important;
                    transform: scale(1.02);
                }
                @media (max-width: 768px) {
                    .donate-method-card:hover {
                        box-shadow: none;
                        transform: none;
                    }
                    .donate-card-0.active {
                        box-shadow: 0 0 25px rgba(0, 214, 50, 0.4);
                        border-color: rgba(0, 214, 50, 0.8) !important;
                    }
                    .donate-card-1.active {
                        box-shadow: 0 0 25px rgba(61, 149, 206, 0.4);
                        border-color: rgba(61, 149, 206, 0.8) !important;
                    }
                    .donate-card-2.active {
                        box-shadow: 0 0 25px rgba(0, 48, 135, 0.4);
                        border-color: rgba(0, 48, 135, 0.8) !important;
                    }
                }
                .scripture-card { display: flex; flex-direction: column; }
                .scripture-text { font-size: 1.1rem; font-style: italic; color: var(--text-primary); line-height: 1.5; }
                .scripture-ref { margin-top: auto; font-weight: bold; letter-spacing: 2px; font-size: 0.9rem; }
                .contact-pillar { background: var(--charcoal); }
                .contact-text { font-size: 0.9rem; line-height: 1.5; }
            `}</style>
        </div>
    )
}

export default Donate
