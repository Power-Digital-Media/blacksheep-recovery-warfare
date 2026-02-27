import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
    Pill, Flame, Box, Car, Scissors,
    ShoppingCart, Mountain, Palette,
    ArrowRight, ShieldCheck, Feather, Brain
} from 'lucide-react'
import DynamicBackground from '../components/DynamicBackground'
import SEO from '../components/SEO'
import Schema from '../components/Schema'

const SponsorCard = ({ sponsor, onActiveChange }) => {
    const cardRef = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    const intensity = useTransform(
        scrollYProgress,
        [0, 0.2, 0.5, 0.8, 1],
        [0, 0.8, 1, 0.8, 0]
    );

    React.useEffect(() => {
        const unsubscribe = intensity.on("change", (latest) => {
            onActiveChange(sponsor.bgImage, latest);
        });
        return () => unsubscribe();
    }, [intensity, sponsor.bgImage, onActiveChange]);

    return (
        <div
            ref={cardRef}
            className="shield-interaction-wrapper"
            onMouseEnter={() => onActiveChange(sponsor.bgImage, 1)}
            onMouseLeave={() => onActiveChange(sponsor.bgImage, 0)}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.8rem',
                padding: '1rem',
                transition: 'all 0.3s ease',
                flex: '1 1 200px',
                maxWidth: '220px',
                position: 'relative',
                zIndex: 2
            }}
        >
            <div style={{
                position: 'relative',
                width: '100%',
                height: '280px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}>
                <img
                    src={sponsor.image}
                    alt={sponsor.name}
                    style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.8))'
                    }}
                />
            </div>

            <a
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shield-visit-btn"
                style={{
                    background: 'rgba(29, 185, 84, 0.05)',
                    border: '1px solid rgba(29, 185, 84, 0.3)',
                    padding: '5px 18px',
                    borderRadius: '2px',
                    fontSize: '0.7rem',
                    fontFamily: 'monospace',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    letterSpacing: '2px',
                    color: '#1db954',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease'
                }}
            >
                VISIT SITE
                <span style={{ width: '5px', height: '5px', background: '#1db954', borderRadius: '50%', boxShadow: '0 0 8px #1db954' }}></span>
            </a>
        </div>
    );
};

import badgeElite from '../assets/badges/badge_elite.webp'
import badgeMercyHouse from '../assets/badges/badge_mercy_house.webp'
import badgeSuperThrift from '../assets/badges/badge_super_thrift.webp'
import badgeMercyAuto from '../assets/badges/badge_mercy_house_auto.webp'
import badgeElleSalon from '../assets/badges/badge_elle_salon.webp'
import badgeMadDesignist from '../assets/badges/badge_mad_designist.webp'
import badgeShiversCreek from '../assets/badges/badge_shivers_creek.webp'

import heroAlliance from '../assets/hero_alliance.webp'

function Sponsors() {
    const [bgMap, setBgMap] = useState({});

    const handleActiveChange = (id, intensity) => {
        if (!id) return;
        setBgMap(prev => {
            const currentIntensity = prev[id] || 0;
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

    const sponsors = [
        // Top Row (5)
        {
            id: 'EL-01',
            name: 'ELITE',
            image: badgeElite,
            url: 'http://elitecrc.us/',
            bgImage: '/danny_studio_bg.webp',
            bgPosition: '20% center'
        },
        {
            id: 'MH-02',
            name: 'MERCY HOUSE',
            image: badgeMercyHouse,
            url: 'https://mercyhouserecovery.org/',
            bgImage: '/community_selfie.webp' // Placeholder
        },
        {
            id: 'ST-03',
            name: 'SUPER THRIFT',
            image: badgeSuperThrift,
            url: 'https://superthrift.com/',
            bgImage: '/community_large.webp' // Placeholder
        },
        {
            id: 'MA-04',
            name: 'MERCY HOUSE AUTO',
            image: badgeMercyAuto,
            url: 'https://mercyhouseautorepair.com/',
            bgImage: '/community_studio_small.webp' // Placeholder
        },
        {
            id: 'ES-05',
            name: 'ELLE SALON',
            image: badgeElleSalon,
            url: 'https://www.ellesalon.com/',
            bgImage: '/hero_alliance.webp' // Placeholder
        },
        // Bottom Row (2)
        {
            id: 'SC-07',
            name: 'SHIVERS CREEK',
            image: badgeShiversCreek,
            url: 'https://www.shiverscreek.com/',
            bgImage: '/night_of_hope_card.webp' // Placeholder
        },
        {
            id: 'MD-08',
            name: 'THE MAD DESIGNIST',
            image: badgeMadDesignist,
            url: 'https://themaddesignist.com/',
            bgImage: '/studio_hero.webp' // Placeholder
        },
    ];

    const customPositions = sponsors.reduce((acc, s) => {
        if (s.bgPosition) acc[s.bgImage] = s.bgPosition;
        return acc;
    }, {});

    const sponsorsSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Network - Black Sheep Recovery Warfare",
        "description": "Our network of strategic alliances, kingdom businesses, and ministry partners supporting the recovery mission.",
        "url": "https://blacksheeprecoverywarfare.com/sponsors"
    };

    return (
        <>
            <SEO
                title="Network - Black Sheep Recovery Warfare"
                description="Our network of strategic alliances, kingdom businesses, and ministry partners supporting the recovery mission."
                url="https://blacksheeprecoverywarfare.com/sponsors"
                image={`https://blacksheeprecoverywarfare.com${heroAlliance}`}
                schemaData={sponsorsSchema}
            />
            <DynamicBackground backgrounds={bgMap} customPositions={customPositions} blur="2px" />
            <div style={{ position: 'relative', zIndex: 1, backgroundColor: 'transparent', minHeight: '100vh', color: '#fff' }}>
                {/* CINEMATIC HERO */}
                <section className="cinematic-section" style={{
                    height: '80vh',
                    backgroundColor: '#000', // Solid black shield
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    zIndex: 10,
                    margin: 0,
                    padding: 0
                }}>
                    {/* PHYSICAL SHIELD: Blocks everything behind the hero */}
                    <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000', zIndex: -1 }}></div>

                    {/* The Hero Image Layer */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url(${heroAlliance})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center 40%',
                        zIndex: 0,
                        opacity: 1 // Ensure sharp and opaque
                    }} />

                    {/* The Shadow Overlay: Fades only at the bottom */}
                    <div className="image-overlay" style={{
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 30%, #000 100%)',
                        zIndex: 1
                    }} />
                    <div className="cinematic-content" style={{ textAlign: 'center', maxWidth: '1000px', padding: '0 2rem', position: 'relative', zIndex: 2 }}>
                        <span className="emergency-text" style={{ fontSize: '1rem', letterSpacing: '8px' }}>MISSION OF COMPASSION</span>
                        <h1 style={{ fontSize: 'clamp(3rem, 10vw, 7.5rem)', lineHeight: 1, margin: '1rem 0', fontWeight: '900' }}>THE ALLIANCE</h1>
                        <p style={{
                            fontSize: 'clamp(0.8rem, 1.4vw, 1rem)',
                            textTransform: 'uppercase',
                            letterSpacing: '3px',
                            lineHeight: '1.6',
                            opacity: 0.8,
                            maxWidth: '850px',
                            margin: '0 auto'
                        }}>
                            JOINING FORCES TO PULL OTHERS OUT OF THE DARKNESS.<br />
                            TOGETHER, WE FORTIFY THE FRONTLINE OF ADDICTION RECOVERY WITH UNWAVERING GRACE.
                        </p>
                    </div>
                </section>

                <div className="container" style={{ marginTop: '-4rem', paddingBottom: '12rem' }}>
                    <div className="sponsor-grid">
                        {sponsors.map((s) => (
                            <SponsorCard key={s.id} sponsor={s} onActiveChange={handleActiveChange} />
                        ))}
                    </div>

                </div>

                <style>{`
                .sponsor-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                    gap: 3rem;
                    width: 100%;
                    max-width: 1400px;
                    margin: 0 auto;
                }

                .shield-interaction-wrapper:hover {
                    transform: translateY(-8px);
                }
                .shield-interaction-wrapper:hover .shield-visit-btn {
                    background: rgba(29, 185, 84, 0.2);
                    border-color: #1db954;
                    box-shadow: 0 0 20px rgba(29, 185, 84, 0.1);
                }

                @media (max-width: 1024px) {
                    .sponsor-grid {
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        gap: 2rem;
                    }
                }

                @media (max-width: 600px) {
                    .sponsor-grid {
                        grid-template-columns: 1fr;
                        gap: 2.5rem; /* Increased for breathing room */
                        justify-items: center;
                    }
                    .shield-interaction-wrapper {
                        max-width: 170px !important; /* Shrunk for background visibility */
                    }
                    .shield-interaction-wrapper div:first-child {
                        height: 200px !important; /* Proportionally shorter */
                    }
                }

                /* Fixed: Prevent background leak behind Navbar */
                .mobile-nav-container, nav {
                    background-color: #000 !important;
                    background: #000 !important;
                    position: relative;
                    z-index: 1001 !important;
                    box-shadow: 0 5px 30px rgba(0,0,0,0.8);
                    margin-bottom: 0 !important; /* Killer of the bleed gap */
                }
                
                /* Ensure navbar links are visible */
                .nav-link {
                    color: #888 !important;
                    text-shadow: 0 0 10px rgba(0,0,0,0.5);
                }
                .nav-link:hover {
                    color: #fff !important;
                }

                .nav-logo {
                    filter: drop-shadow(0 0 10px rgba(0,0,0,0.8));
                }
            `}</style>
            </div>
        </>
    );
}

export default Sponsors
