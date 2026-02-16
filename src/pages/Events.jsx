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
        [0, 0.35, 0.5, 0.65, 1],
        [0, 0, 1, 0, 0]
    );

    React.useEffect(() => {
        const unsubscribe = intensity.on("change", (latest) => {
            if (latest > 0.1) {
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
                        {/* MAIN FEATURED EVENT */}
                        <EventCard
                            image="/night_of_hope_card.png?v=1"
                            className="span-8 row-4 featured-event-card"
                            onActiveChange={handleActiveChange}
                        >
                            <div className="event-content-wrapper">
                                <span className="emergency-text event-date">SEPTEMBER 13, 2025</span>
                                <h1 className="event-title">NIGHT OF HOPE</h1>
                                <p className="event-description">
                                    A powerful evening of raw testimonies, worship, and real talk
                                    about recovery and the relentless grace of Jesus Christ.
                                    Live speakers from the Black Sheep community.
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
                    background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url('/night_of_hope_card.png?v=1'), #050505;
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position: center 75%; /* Shifted DOWN to reveal faces at the top */
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    box-shadow: 0 0 30px rgba(0,0,0,0.3);
                    display: flex;
                    align-items: flex-end;
                    padding: 0;
                    overflow: hidden;
                    background-clip: padding-box; /* Fix border bleed */
                    transform: translateZ(0); /* Fix corner masking */
                }
                
                .event-content-wrapper {
                    background: rgba(10, 10, 10, 0.4);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 2.5rem;
                    width: 100%;
                }

                .event-date { color: var(--warfare-red); opacity: 1; font-weight: 700; letter-spacing: 0.15em; }
                .event-title { 
                    color: white; 
                    line-height: 0.9; 
                    margin: 0.5rem 0 1rem 0; 
                    font-size: clamp(2.5rem, 6vw, 4rem); 
                    text-shadow: 0 0 20px rgba(255, 61, 48, 0.3);
                }
                .event-description { color: rgba(255,255,255,0.85); fontSize: 1.1rem; max-width: 700px; margin-bottom: 2rem; line-height: 1.6; }
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
                    border: 1px solid rgba(255,255,255,0.05); /* Dimmer border */
                    background-color: #000;
                    background-clip: padding-box !important; /* Force clip */
                    transform: translateZ(0); 
                }
                
                /* Use longhand to avoid resetting background-clip */
                .location-card { 
                    background-image: url('/community_selfie.jpg?v=1') !important;
                    background-position: center !important;
                    background-size: cover !important;
                    background-repeat: no-repeat !important;
                }
                .invitation-card { 
                    background-image: url('/community_large.jpg?v=1') !important;
                    background-position: center !important;
                    background-size: cover !important;
                    background-repeat: no-repeat !important;
                }
                .community-card { 
                    background-image: url('/community_studio_small.jpg?v=1') !important;
                    background-position: center !important;
                    background-size: cover !important;
                    background-repeat: no-repeat !important;
                }

                .card-overlay {
                    background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.1));
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    width: 100%;
                    height: 100%;
                    padding: 2rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                }

                .logistics-card h2 { margin-bottom: 0.5rem; text-shadow: 0 2px 4px rgba(0,0,0,0.8); }
                .logistics-card p { opacity: 0.9; text-shadow: 0 2px 4px rgba(0,0,0,0.8); }

                @media (max-width: 768px) {
                    .event-title { font-size: 2.5rem; }
                    .event-description { font-size: 1rem; margin-bottom: 1.5rem; }
                    .event-details-row { flex-direction: column; gap: 1.5rem; }
                    .event-cta { width: 100%; justify-content: center; margin-top: 1rem; }
                    .featured-event-card { align-items: flex-end; }
                    .event-content-wrapper { padding: 1.5rem; }
                }
            `}</style>
            </div>
        </>
    )
}

export default Events
