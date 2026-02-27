import React, { useState } from 'react'
import { useScroll, useTransform } from 'framer-motion'
import { MapPin, Calendar, Users, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import DynamicBackground from '../components/DynamicBackground'
import SEO from '../components/SEO'
import Schema from '../components/Schema'

const EventCard = ({ image, children, className, onActiveChange }) => {
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
            onActiveChange(image, latest);
        });
        return () => unsubscribe();
    }, [intensity, image, onActiveChange]);

    return (
        <div
            ref={cardRef}
            className={`bento-card ${className}`}
            onMouseEnter={() => onActiveChange(image, 1)}
            onMouseLeave={() => onActiveChange(image, 0)}
        >
            {children}
        </div>
    );
};

function Events() {
    const [bgMap, setBgMap] = useState({});

    const handleActiveChange = (id, intensity) => {
        if (!id) return;
        setBgMap(prev => {
            const currentIntensity = prev[id] || 0;
            // Precision check to prevent spamming state updates
            if (Math.abs(currentIntensity - intensity) < 0.01) return prev;

            const next = { ...prev };
            if (intensity <= 0.01) {
                delete next[id];
            } else {
                next[id] = intensity;
            }
            return next;
        });
    };

    const eventSchema = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": "NIGHT OF HOPE - Black Sheep Recovery",
        "startDate": "2025-09-13T19:00:00-05:00",
        "endDate": "2025-09-13T22:00:00-05:00",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "eventStatus": "https://schema.org/EventScheduled",
        "location": {
            "@type": "Place",
            "name": "Central Mississippi",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Jackson",
                "addressRegion": "MS",
                "addressCountry": "US"
            }
        },
        "image": [
            "https://blacksheeprecoverywarfare.com/night_of_hope_card.webp"
        ],
        "description": "A powerful evening of raw testimonies, worship, and real talk about recovery and the relentless grace of Jesus Christ.",
        "offers": {
            "@type": "Offer",
            "url": "https://blacksheeprecoverywarfare.com/events",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "validFrom": "2025-01-01T00:00:00-05:00"
        }
    };

    return (
        <>
            <SEO
                title="Events - Black Sheep Recovery Warfare"
                description="A brotherhood of hope, transformation, and spiritual empowerment. Real talk. Real community. Real redemption."
                url="https://blacksheeprecoverywarfare.com/events"
                image="https://blacksheeprecoverywarfare.com/studio_hero.webp"
                schemaData={eventSchema}
            />
            <DynamicBackground backgrounds={bgMap} blur="1px" />
            <div style={{ position: 'relative', zIndex: 1 }}>

                {/* CINEMATIC HERO */}
                <section className="cinematic-section graphic-hero" style={{ backgroundImage: 'url("/studio_hero.webp")' }}>
                    <div className="image-overlay"></div>
                    <div className="cinematic-content">
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
                            image="/night_of_hope_card.webp"
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
                            image="/community_selfie.webp"
                            className="span-4 row-2 logistics-card location-card"
                            onActiveChange={handleActiveChange}
                        >
                            <div className="card-overlay">
                                <h2>Location</h2>
                                <p>Central Mississippi. Check back for specific venue details soon.</p>
                            </div>
                        </EventCard>

                        <EventCard
                            image="/community_large.webp"
                            className="span-4 row-2 logistics-card invitation-card"
                            onActiveChange={handleActiveChange}
                        >
                            <div className="card-overlay">
                                <h2>Open Invitation</h2>
                                <p>Come as you are. Whether in recovery or looking to support, there is a place for you.</p>
                            </div>
                        </EventCard>

                        <EventCard
                            image="/community_studio_small.webp"
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
                    background-image: url('/night_of_hope_card.webp');
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
                    will-change: transform; 
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
                    background-image: url('/community_selfie.webp') !important;
                }
                .invitation-card::before { 
                    background-image: url('/community_large.webp') !important;
                }
                .community-card::before { 
                    background-image: url('/community_studio_small.webp') !important;
                }

                .card-overlay {
                    position: relative;
                    z-index: 5;
                    background: linear-gradient(to top, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.5) 30%, transparent 100%);
                    width: 100%;
                    flex: 1;
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                }

                .logistics-card h2 { 
                    font-size: 1.5rem; /* Significantly smaller than featured */
                    margin-bottom: 0.35rem; 
                    text-shadow: 0 2px 4px rgba(0,0,0,0.8); 
                }
                .logistics-card p { 
                    font-size: 0.95rem; /* Tighter for small cards */
                    opacity: 0.9; 
                    text-shadow: 0 2px 4px rgba(0,0,0,0.8); 
                    line-height: 1.4;
                }

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
                        min-height: 380px; /* Slightly taller for text safety */
                    }
                    .logistics-card .card-overlay {
                        padding: 1.25rem; /* Even tighter for mobile */
                    }
                    .logistics-card h2 { font-size: 1.4rem; }
                    .logistics-card p { font-size: 0.9rem; }
                }
            `}</style>
            </div>
        </>
    )
}

export default Events
