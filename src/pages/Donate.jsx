import React, { useEffect } from 'react'
import { ExternalLink, CreditCard, DollarSign } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import DynamicBackground from '../components/DynamicBackground'
import SEO from '../components/SEO'
import Schema from '../components/Schema'

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
            glowRgb: '0, 214, 50',
            image: '/images/blacksheep/Blacksheep Cash App Collection/CA_Point Right.webp',
            description: 'Tap to send directly via Cash App. Fast, simple, and every dollar goes to the mission.',
            btnText: 'CASH APP'
        },
        {
            name: 'Venmo',
            tag: '@blacksheeprecovery4311',
            url: 'https://venmo.com/blacksheeprecovery4311',
            color: '#3D95CE',
            glowRgb: '61, 149, 206',
            image: '/images/blacksheep/Blacksheep Venmo Collection/VM_Point Right.webp',
            description: 'Send your support through Venmo. Quick giving for the Kingdom offensive.',
            btnText: 'VENMO'
        },
        {
            name: 'PayPal',
            tag: '@BlackSheep1143',
            url: 'https://www.paypal.me/BlackSheep1143',
            color: '#003087',
            glowRgb: '0, 48, 135',
            image: '/images/blacksheep/Blacksheep Paypal Collection/PP_Point Right.webp',
            description: 'Contribute securely via PayPal. One-time or recurring — you set the pace.',
            btnText: 'PAYPAL'
        }
    ];

    const donateSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Donate - Black Sheep Recovery Warfare",
        "description": "Support the Black Sheep Recovery mission. Every dollar directly impacts lives currently lost in the shadow of addiction.",
        "url": "https://blacksheeprecoverywarfare.com/donate"
    };

    return (
        <div className="">
            <SEO
                title="Donate - Black Sheep Recovery Warfare"
                description="Support the Black Sheep Recovery mission. Every dollar directly impacts lives currently lost in the shadow of addiction. Join the offensive."
                url="https://blacksheeprecoverywarfare.com/donate"
                image="https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?auto=format&fit=crop&q=80&w=2000"
                schemaData={donateSchema}
            />
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
                            className="bento-card reveal"
                            onClick={() => window.open(method.url, '_blank')}
                            style={{
                                '--glow-rgb': method.glowRgb,
                                padding: 0,
                                position: 'relative',
                                borderRadius: '28px',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                background: '#000',
                                border: `1px solid ${method.color} 33`,
                                height: '380px',
                                display: 'flex',
                                alignItems: 'flex-end'
                            }}
                        >
                            <img
                                src={method.image}
                                alt={`Donate via ${method.name} `}
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
