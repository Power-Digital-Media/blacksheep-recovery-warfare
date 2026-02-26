import React, { useEffect } from 'react'
import { ShoppingBag, ArrowRight, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { merchItems } from '../data/merchData'

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

        // Mobile Scroll Glow Logic
        const handleScroll = () => {
            if (window.innerWidth > 768) return; // Only process on mobile

            const cards = document.querySelectorAll('.product-card');
            const windowCenter = window.innerHeight / 2;

            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const cardCenter = rect.top + rect.height / 2;

                // Calculate distance from center (0 = perfectly centered)
                const distance = Math.abs(windowCenter - cardCenter);
                const maxDistance = window.innerHeight / 2.5; // Starts glowing earlier

                let intensity = 1 - (distance / maxDistance);
                intensity = Math.max(0, Math.min(1, intensity));

                // Apply a slight curve to the intensity so it pops more in the middle
                const curvedIntensity = Math.pow(intensity, 1.5).toFixed(2);
                card.style.setProperty('--scroll-intensity', curvedIntensity);
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Trigger once on mount

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="animate-in">
            {/* CINEMATIC HERO */}
            <section className="cinematic-section" style={{ backgroundImage: 'url("/images/merch_page_hero.webp")' }}>
                <div className="image-overlay" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,1) 100%)' }}></div>
                <div className="cinematic-content reveal">
                    <span className="emergency-text">Identity in Christ</span>
                    <h1>TACTICAL<br />APPAREL</h1>
                    <p className="narrative-text">
                        Premium gear designed for the recovered life. Every purchase fuels the
                        warfare against addiction. Wear the message. Support the mission.
                    </p>
                </div>
            </section>

            <div className="container" style={{ marginTop: 'clamp(3rem, 10vw, 8rem)', paddingBottom: '4rem' }}>
                <div className="bento-grid">
                    {/* DYNAMIC PRODUCT GRID */}
                    {merchItems.map((item, index) => (
                        <div key={item.id} className="bento-card span-4 row-5 reveal product-card" style={{ transitionDelay: `${index * 0.1}s`, '--glow-rgb': item.glowColor || '57, 255, 20' }}>
                            <div className="product-image-container">
                                <img src={item.image} className="product-image" alt={item.name} />
                            </div>
                            <span className="emergency-text">{item.badge || 'New Arrival'}</span>
                            <h2 className="product-title">{item.name}</h2>
                            <p className="product-description">{item.desc}</p>
                            <div className="product-footer">
                                <span className="product-price">{item.price}</span>
                                <Link to={`/merch/${item.id}`} className="donate-btn product-cta" style={{ textDecoration: 'none' }}>
                                    GEAR UP <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bento-grid mt-4">
                    {/* MISSION SUPPORT PILLAR */}
                    <div className="bento-card span-8 row-3 reveal review-card">
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

                    {/* LOGISTICS */}
                    <div className="bento-card span-4 row-3 reveal logistics-card">
                        <ShoppingBag size={24} className="logistics-icon" />
                        <h2>Global Logistics</h2>
                        <p>Fast shipping. Secure tracking. Mission ready deliveries.</p>
                        <div className="card-link-red">EXPLORE SUPPORT →</div>
                    </div>
                </div>
            </div>

            <style>{`
                .product-image-container { 
                    width: 100%; 
                    height: clamp(250px, 30vw, 350px); 
                    background: rgba(255,255,255,0.02); 
                    border-radius: 24px; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    margin-bottom: 2rem; 
                    position: relative;
                }
                
                .product-image { 
                    max-width: 85%; 
                    max-height: 85%; 
                    object-fit: contain; 
                    filter: drop-shadow(0 20px 40px rgba(0,0,0,0.6));
                    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease;
                }

                .product-card:hover .product-image {
                    transform: scale(1.08) translateY(-10px);
                    filter: drop-shadow(0 30px 50px rgba(0,0,0,0.8)) drop-shadow(0 0 25px rgba(var(--glow-rgb), 0.4));
                }

                .mt-4 {
                    margin-top: 1.5rem;
                }

                .product-title {
                    font-size: clamp(1.4rem, 3vw, 1.8rem);
                    margin-bottom: 0.5rem;
                    line-height: 1.2;
                }
                .product-description { 
                    font-size: 1.05rem; 
                    margin-bottom: 2rem; 
                    color: var(--text-secondary);
                    line-height: 1.5;
                    flex-grow: 1;
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
                    padding: 12px 24px !important; 
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
                .logistics-icon { margin-bottom: 1.5rem; color: var(--text-primary); }
                .card-link-red { margin-top: auto; font-weight: bold; color: var(--emergency-red); font-size: 0.85rem; cursor: pointer; }

                @media (max-width: 1024px) {
                    .product-card {
                        grid-column: span 6;
                    }
                }

                @media (max-width: 768px) {
                    .product-card, .review-card, .logistics-card {
                        grid-column: span 12;
                    }
                    /* Dynamic Mobile Scroll Glow */
                    .product-card {
                        transition: all 0.1s ease-out;
                        /* The alpha/intensity channels scale based on distance to the center */
                        box-shadow: 0 0 calc(80px * var(--scroll-intensity, 0)) rgba(var(--glow-rgb), calc(0.6 * var(--scroll-intensity, 0))), 
                                    inset 0 0 calc(30px * var(--scroll-intensity, 0)) rgba(var(--glow-rgb), calc(0.2 * var(--scroll-intensity, 0))) !important;
                        border-color: rgba(var(--glow-rgb), calc(0.2 + (0.6 * var(--scroll-intensity, 0)))) !important;
                        transform: scale(calc(1 + (0.04 * var(--scroll-intensity, 0))));
                    }
                    .product-card .product-image {
                        /* Amplify mascot shadow as well */
                        filter: drop-shadow(0 20px 40px rgba(0,0,0,0.8)) drop-shadow(0 0 calc(40px * var(--scroll-intensity, 0)) rgba(var(--glow-rgb), calc(0.8 * var(--scroll-intensity, 0))));
                    }
                    .product-footer { flex-direction: column; align-items: flex-start; gap: 1rem; }
                    .product-cta { width: 100%; justify-content: center; }
                    .product-image-container { height: 300px; }
                }
            `}</style>
        </div>
    )
}

export default Merch
