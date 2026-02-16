import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MapPin, Calendar, Users, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import DynamicBackground from '../components/DynamicBackground'

const EventCard = ({ id, image, children, className, onActiveChange }) => {
    const cardRef = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    const intensity = useTransform(
        scrollYProgress,
        [0, 0.1, 0.5, 0.9, 1], // Entering -> Active -> CENTER -> Active -> Exit
        [0, 0.8, 1, 0.8, 0]    // High floor to prevent dip to black
    );

    React.useEffect(() => {
        const unsubscribe = intensity.on("change", (latest) => {
            // Ultra-low threshold for instant pre-dissolve
            if (latest > 0.01) {
                onActiveChange(image, latest);
            }
        });
        return () => unsubscribe();
    }, [intensity, image, onActiveChange]);

    return (
        <div
            ref={cardRef}
            className={`bento-card reveal ${className}`}
            onMouseEnter={() => onActiveChange(image, 1)}
            onMouseLeave={() => onActiveChange(null, 0)}
        >
            {children}
        </div>
    );
};

function Events() {
    const [bgMap, setBgMap] = useState({});

    const handleActiveChange = (id, intensity) => {
        setBgMap(prev => {
            const next = { ...prev };
            if (id === null) return {};
            next[id] = intensity;
            if (intensity <= 0.01) {
                delete next[id];
            }
            return next;
        });
    };

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
        <>
            <DynamicBackground backgrounds={bgMap} />
            <div className="animate-in" style={{ position: 'relative', zIndex: 1 }}>

                {/* CINEMATIC HERO */}
                <section className="cinematic-section graphic-hero" style={{ backgroundImage: 'url("/studio_hero.jpg")' }}>
                    <div className="image-overlay"></div>
                    <div className="cinematic-content reveal">
                        <span className="emergency-text">Fellowship & Recovery</span>
                        <h1>THE<br />GATHERINGS</h1>
                        <p className="narrative-text">
                            A brotherhood of hope, transformation, and spiritual empowerment.
                            Real talk. Real community. Real redemption.
                        </p>
                    </div>
                </section>

                <div className="container" style={{ marginTop: 'clamp(3rem, 10vw, 8rem)' }}>
                    <div className="bento-grid">
                        <EventCard
                            image="/night_of_hope_card.png?v=5"
                            className="span-8 row-4 featured-event-card"
                            onActiveChange={handleActiveChange}
                        >
                            <div className="featured-overlay top-smoke">
                                <span className="emergency-text event-date">SEPTEMBER 13, 2025</span>
                                <h1 className="event-title">NIGHT OF HOPE</h1>
                            </div>

                            <div className="featured-overlay bottom-smoke">
                                <p className="event-description">
                                    A powerful evening of raw testimonies, worship, and real talk
                                    about recovery and the relentless grace of Jesus Christ.
                                </p>

                                <div className="event-details-row">
                                    <div className="detail-item">
                                        <h3 className="detail-title">WORSHIP</h3>
                                        <p className="detail-text">Live Music & Praise</p>
                                    </div>
                                    <div className="detail-item">
                                        <h3 className="detail-title">COMMUNITY</h3>
                                        <p className="detail-text">Connection & Brotherhood</p>
                                    </div>
                                </div>

                                <button className="event-cta">
                                    JOIN THE BROTHERHOOD <ArrowRight size={20} />
                                </button>
                            </div>
                        </EventCard>

                        {/* LOGISTICS */}
                        <EventCard
                            image="/community_selfie.jpg?v=1"
                            className="span-4 row-2 logistics-card location-card"
                            onActiveChange={handleActiveChange}
                        >
                            <div className="card-overlay">
                                <h2>Location</h2>
                                <p>Central Mississippi. Check back for specific venue details soon.</p>
                            </div>
                        </EventCard>

                        <EventCard
                            image="/community_large.jpg?v=1"
                            className="span-4 row-2 logistics-card invitation-card"
                            onActiveChange={handleActiveChange}
                        >
                            <div className="card-overlay">
                                <h2>Open Invitation</h2>
                                <p>Come as you are. Whether in recovery or looking to support, there is a place for you.</p>
                            </div>
                        </EventCard>

                        <EventCard
                            image="/community_studio_small.jpg?v=1"
                            className="span-4 row-2 logistics-card community-card"
                            onActiveChange={handleActiveChange}
                        >
                            <div className="card-overlay">
                                <h2>Past Gatherings</h2>
                                <p>Relive the impact of previous Night of Hope events.</p>
                            </div>
                        </EventCard>
                    </div>
                </div>

                <style>{`
                .featured-event-card { 
                    background: #000 !important;
                    box-shadow: 0 0 30px rgba(0,0,0,0.3);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding: 0;
                    overflow: hidden;
                    position: relative;
                }

                .featured-event-card::before {
                    content: '';
                    position: absolute;
                    inset: 1.5px; /* The Anti-Bleed Gutter */
                    background-image: url('/night_of_hope_card.png?v=5');
                    background-size: cover;
                    background-position: 65% 15%;
                    border-radius: inherit;
                    z-index: 1;
                }

                .featured-event-card::after, .logistics-card::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    border: 1px solid rgba(255, 255, 255, 0.12);
                    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.5); /* Inner shadow to hide gutter transition */
                    pointer-events: none;
                    z-index: 10;
                    border-radius: inherit;
                    transform: translateZ(1px);
                }
                
                .featured-overlay {
                    width: 100%;
                    padding: 2.5rem;
                    position: relative;
                    z-index: 2;
                }

                .top-smoke {
                    background: linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, transparent 100%);
                }

                .bottom-smoke {
                    background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 50%, transparent 100%);
                    padding-top: 5rem; /* Room for gradient to breathe */
                }
                
                .event-date { color: var(--warfare-red); opacity: 1; font-weight: 700; letter-spacing: 0.15em; }
                .event-title { 
                    color: white; 
                    line-height: 0.9; 
                    margin: 0.5rem 0 0 0; 
                    font-size: clamp(2.5rem, 6vw, 4rem); 
                    text-shadow: 0 0 20px rgba(255, 61, 48, 0.3);
                }
                .event-description { color: rgba(255,255,255,0.9); fontSize: 1.1rem; max-width: 700px; margin-bottom: 2rem; line-height: 1.6; }
                .event-details-row { display: flex; gap: 4rem; margin-bottom: 2rem; }
                .detail-title { color: white; font-size: 0.9rem; margin-bottom: 0.3rem; letter-spacing: 0.1em; opacity: 0.8; }
                .detail-text { color: white; font-size: 1.1rem; font-weight: 500; }
                .event-cta {
                    background: var(--warfare-red);
                    color: white;
                    border: none;
                    padding: 14px 32px;
                    border-radius: 99px;
                    font-weight: 700;
                    font-size: 0.95rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    width: fit-content;
                    box-shadow: 0 4px 20px rgba(255, 61, 48, 0.4);
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }
                .event-cta:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 25px rgba(255, 61, 48, 0.6);
                }
                
                .logistics-card {
                    padding: 0 !important;
                    overflow: hidden;
                    position: relative;
                    background-color: #000 !important;
                    display: flex;
                    flex-direction: column;
                    transform: translateZ(0); 
                }

                .logistics-card::before {
                    content: '';
                    position: absolute;
                    inset: 1.5px; /* The Anti-Bleed Gutter */
                    background-size: cover !important;
                    background-position: center !important;
                    background-repeat: no-repeat !important;
                    border-radius: inherit;
                    z-index: 1;
                }
                
                .location-card::before { 
                    background-image: url('/community_selfie.jpg?v=5') !important;
                }
                .invitation-card::before { 
                    background-image: url('/community_large.jpg?v=5') !important;
                }
                .community-card::before { 
                    background-image: url('/community_studio_small.jpg?v=5') !important;
                }

                .card-overlay {
                    background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%);
                    width: 100%;
                    flex: 1;
                    padding: 2rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                }

                .logistics-card h2 { margin-bottom: 0.5rem; text-shadow: 0 2px 4px rgba(0,0,0,0.8); }
                .logistics-card p { opacity: 0.9; text-shadow: 0 2px 4px rgba(0,0,0,0.8); }

                .bento-grid {
                    gap: 3rem; /* Cinematic separation */
                }

                @media (max-width: 768px) {
                    .event-title { font-size: 2.2rem; }
                    .event-description { font-size: 0.95rem; margin-bottom: 1.5rem; }
                    .event-details-row { flex-direction: row; flex-wrap: wrap; gap: 2rem; margin-bottom: 1.5rem; }
                    .event-cta { width: 100%; justify-content: center; margin-top: 1rem; }
                    
                    .bento-grid { gap: 2.5rem; } /* Higher separation on mobile too */
                    
                    .featured-event-card { 
                        min-height: 600px; /* Taller for mobile full-bg */
                    }
                    .featured-overlay {
                        padding: 1.5rem;
                    }
                    .bottom-smoke {
                        padding-top: 8rem;
                    }
                    
                    .logistics-card { 
                        aspect-ratio: 1/1; 
                        min-height: 350px; 
                    }
                }
            `}</style>
            </div>
        </>
    )
}

export default Events
