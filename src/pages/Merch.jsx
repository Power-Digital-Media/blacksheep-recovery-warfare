import React, { useEffect } from 'react'
import { ShoppingBag, ArrowRight, Star } from 'lucide-react'

function Merch() {
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

    return (
        <div className="animate-in">
            {/* CINEMATIC HERO */}
            <section className="cinematic-section" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&q=80&w=2000")' }}>
                <div className="image-overlay"></div>
                <div className="cinematic-content reveal">
                    <span className="emergency-text">Identity in Christ</span>
                    <h1>TACTICAL<br />APPAREL</h1>
                    <p className="narrative-text">
                        Premium gear designed for the recovered life. Every purchase fuels the
                        warfare against addiction. Wear the message. Support the mission.
                    </p>
                </div>
            </section>

            <div className="container" style={{ marginTop: '8rem' }}>
                <div className="bento-grid">
                    {/* FEATURED ITEM */}
                    <div className="bento-card span-6 row-6 reveal">
                        <div className="product-image-container">
                            <img src="/logo.png" className="product-placeholder" alt="placeholder" />
                        </div>
                        <span className="emergency-text">Featured Release</span>
                        <h2>Black Sheep Signature Hoodie</h2>
                        <p className="product-description">
                            Heavyweight 450GSM cotton. Double-stitched for the battlefield.
                            Minimalist embroidery on left chest.
                        </p>
                        <div className="product-footer">
                            <span className="product-price">$65.00</span>
                            <button className="donate-btn product-cta">
                                ADD TO GEAR <ArrowRight size={18} style={{ marginLeft: '10px' }} />
                            </button>
                        </div>
                    </div>

                    <style>{`
                        .product-image-container { width: 100%; height: clamp(250px, 40vw, 350px); background: rgba(255,255,255,0.02); borderRadius: 24px; display: flex; alignItems: center; justifyContent: center; marginBottom: 2rem; }
                        .product-placeholder { width: clamp(100px, 20vw, 150px); opacity: 0.1; filter: grayscale(1); }
                        .product-description { fontSize: 1.1rem; marginBottom: 2rem; }
                        .product-footer { marginTop: auto; display: flex; justifyContent: space-between; alignItems: center; flexWrap: wrap; gap: 1rem; }
                        .product-price { fontSize: 2rem; fontWeight: 900; }
                        .product-cta { border: none; cursor: pointer; padding: 15px 30px !important; }
                        
                        @media (max-width: 600px) {
                            .product-footer { flex-direction: column; align-items: flex-start; }
                            .product-cta { width: 100%; }
                        }
                    `}</style>

                    {/* MISSION SUPPORT PILLAR */}
                    <div className="bento-card span-6 row-3 reveal" style={{ background: 'var(--warfare-red)' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="white" color="white" />)}
                        </div>
                        <h2 style={{ color: 'white' }}>Wear the Message</h2>
                        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem' }}>
                            "The quality is incredible, but the conversation it starts is the real value.
                            I've shared my testimony twice this week because of this hoodie."
                        </p>
                        <div style={{ marginTop: 'auto', color: 'white', fontWeight: 'bold', fontSize: '0.9rem' }}>— VERIFIED SOLDIER</div>
                    </div>

                    {/* TACTICAL COLLECTION */}
                    <div className="bento-card span-3 row-3 reveal">
                        <ShoppingBag size={24} style={{ marginBottom: '1.5rem' }} />
                        <h2>The Foundry</h2>
                        <p>New arrivals and limited edition drops.</p>
                        <div style={{ marginTop: 'auto', fontWeight: 'bold', color: 'var(--emergency-red)' }}>EXPLORE ALL GEAR →</div>
                    </div>

                    {/* LOGISTICS */}
                    <div className="bento-card span-3 row-3 reveal">
                        <h2>Global Logistics</h2>
                        <p>Fast shipping. Secure tracking. International reach available.</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Merch
