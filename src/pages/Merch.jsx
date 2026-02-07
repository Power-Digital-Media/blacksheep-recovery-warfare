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

            <div className="container" style={{ marginTop: 'clamp(3rem, 10vw, 8rem)' }}>
                <div className="bento-grid">
                    {/* FEATURED ITEM */}
                    <div className="bento-card span-6 row-6 reveal product-card">
                        <div className="product-image-container">
                            <img src="/logo.png" className="product-placeholder" alt="placeholder" />
                        </div>
                        <span className="emergency-text">Featured Release</span>
                        <h2 className="product-title">Black Sheep Signature Hoodie</h2>
                        <p className="product-description">
                            Heavyweight 450GSM cotton. Double-stitched for the battlefield.
                            Minimalist embroidery on left chest.
                        </p>
                        <div className="product-footer">
                            <span className="product-price">$65.00</span>
                            <button className="donate-btn product-cta">
                                ADD TO GEAR <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>

                    {/* MISSION SUPPORT PILLAR */}
                    <div className="bento-card span-6 row-3 reveal review-card">
                        <div className="star-row">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="white" color="white" />)}
                        </div>
                        <h2 className="review-title">Wear the Message</h2>
                        <p className="review-text">
                            "The quality is incredible, but the conversation it starts is the real value.
                            I've shared my testimony twice this week because of this hoodie."
                        </p>
                        <div className="review-attribution">— VERIFIED SOLDIER</div>
                    </div>

                    {/* TACTICAL COLLECTION */}
                    <div className="bento-card span-3 row-3 reveal logistics-card">
                        <ShoppingBag size={24} className="logistics-icon" />
                        <h2>The Foundry</h2>
                        <p>New arrivals and limited edition drops.</p>
                        <div className="card-link-red">EXPLORE ALL GEAR →</div>
                    </div>

                    {/* LOGISTICS */}
                    <div className="bento-card span-3 row-3 reveal logistics-card">
                        <h2>Global Logistics</h2>
                        <p>Fast shipping. Secure tracking. International reach available.</p>
                    </div>
                </div>
            </div>

            <style>{`
                .product-image-container { 
                    width: 100%; 
                    height: clamp(200px, 40vw, 350px); 
                    background: rgba(255,255,255,0.02); 
                    border-radius: 24px; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    margin-bottom: 2rem; 
                }
                .product-placeholder { 
                    width: clamp(80px, 20vw, 150px); 
                    opacity: 0.1; 
                    filter: grayscale(1); 
                }
                .product-title {
                    font-size: clamp(1.5rem, 4vw, 2.2rem);
                    margin-bottom: 0.5rem;
                }
                .product-description { 
                    font-size: 1.05rem; 
                    margin-bottom: 2rem; 
                    color: var(--text-secondary);
                    line-height: 1.5;
                }
                .product-footer { 
                    margin-top: auto; 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center; 
                    flex-wrap: wrap; 
                    gap: 1.5rem; 
                }
                .product-price { 
                    font-size: 1.8rem; 
                    font-weight: 900; 
                }
                .product-cta { 
                    border: none; 
                    cursor: pointer; 
                    padding: 15px 30px !important; 
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                
                .review-card { background: var(--warfare-red); display: flex; flex-direction: column; }
                .star-row { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; }
                .review-title { color: white; margin-bottom: 1rem; }
                .review-text { color: rgba(255,255,255,0.8); font-size: 1.05rem; line-height: 1.5; }
                .review-attribution { margin-top: auto; color: white; font-weight: bold; font-size: 0.8rem; letter-spacing: 1px; }

                .logistics-card { display: flex; flex-direction: column; }
                .logistics-icon { margin-bottom: 1.5rem; }
                .card-link-red { margin-top: auto; font-weight: bold; color: var(--emergency-red); font-size: 0.85rem; cursor: pointer; }

                @media (max-width: 768px) {
                    .product-footer { flex-direction: column; align-items: flex-start; gap: 1rem; }
                    .product-cta { width: 100%; justify-content: center; }
                    .product-price { font-size: 1.5rem; }
                    .product-image-container { height: 250px; margin-bottom: 1.5rem; }
                }
            `}</style>
        </div>
    )
}

export default Merch
