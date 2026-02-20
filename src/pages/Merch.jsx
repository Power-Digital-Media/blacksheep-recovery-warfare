import React, { useEffect } from 'react'
import { ShoppingBag, ArrowRight, Star } from 'lucide-react'

// Dynamic product array based on the 6 uploaded transparent PNGs.
const merchItems = [
    {
        id: 'straight-outta',
        name: 'Straight Outta Darkness Tee',
        price: '$35.00',
        desc: 'Colossians 1:13. Remind them where you came from and who brought you out.',
        image: '/images/Black Sheep Merch Upscaled website/Straight Outta Darkness.png',
        badge: 'Top Seller'
    },
    {
        id: 'hoodie',
        name: 'Black Sheep Signature Hoodie',
        price: '$65.00',
        desc: 'Heavyweight cotton. Double-stitched for the battlefield. Wear the message.',
        image: '/images/Black Sheep Merch Upscaled website/Hoodie.png',
        badge: 'Featured Release'
    },
    {
        id: 'iam-blk',
        name: 'I AM A Black Sheep Tee',
        price: '$35.00',
        desc: 'Declare your identity in Christ proudly. Minimalist tactical design.',
        image: '/images/Black Sheep Merch Upscaled website/I_Am_BLK_Shp.png'
    },
    {
        id: 'ww-jb',
        name: 'Wilderness Warfare Tee',
        price: '$35.00',
        desc: 'Equipped for the fight, armed with His word. Built for the frontline.',
        image: '/images/Black Sheep Merch Upscaled website/WW_JB.png'
    },
    {
        id: 'ts-blk',
        name: 'Classic Logo Tee (Black)',
        price: '$30.00',
        desc: 'Premium combed cotton. Soft, durable, and ready for everyday action.',
        image: '/images/Black Sheep Merch Upscaled website/BS_TS_Blk.png'
    },
    {
        id: 'ts-pnk',
        name: 'Classic Logo Tee (Pink)',
        price: '$30.00',
        desc: 'Stand out and bear witness with the vibrant signature logo tee.',
        image: '/images/Black Sheep Merch Upscaled website/BS_TS_PNK.png'
    }
];

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
                        <div key={item.id} className="bento-card span-4 row-5 reveal product-card" style={{ transitionDelay: `${index * 0.1}s` }}>
                            <div className="product-image-container">
                                <img src={item.image} className="product-image" alt={item.name} />
                            </div>
                            <span className="emergency-text">{item.badge || 'New Arrival'}</span>
                            <h2 className="product-title">{item.name}</h2>
                            <p className="product-description">{item.desc}</p>
                            <div className="product-footer">
                                <span className="product-price">{item.price}</span>
                                <button className="donate-btn product-cta">
                                    GEAR UP <ArrowRight size={18} />
                                </button>
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
                    filter: drop-shadow(0 30px 50px rgba(0,0,0,0.8));
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
                    .product-footer { flex-direction: column; align-items: flex-start; gap: 1rem; }
                    .product-cta { width: 100%; justify-content: center; }
                    .product-image-container { height: 300px; }
                }
            `}</style>
        </div>
    )
}

export default Merch
