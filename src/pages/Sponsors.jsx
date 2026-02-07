import React, { useEffect } from 'react'
import {
    Pill, Flame, Box, Car, Scissors,
    ShoppingCart, Mountain, Palette,
    ArrowRight, ShieldCheck, Feather, Brain
} from 'lucide-react'

const ShieldItem = ({ sponsor }) => {
    return (
        <div className="reveal shield-interaction-wrapper" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.8rem',
            padding: '1rem',
            transition: 'all 0.3s ease',
            flex: '1 1 200px',
            maxWidth: '220px'
        }}>
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

            {/* CTA LABEL (Matching Green Tactical Box) */}
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

import badgeElite from '../assets/badges/badge_elite.png'
import badgeMercyHouse from '../assets/badges/badge_mercy_house.png'
import badgeSuperThrift from '../assets/badges/badge_super_thrift.png'
import badgeMercyAuto from '../assets/badges/badge_mercy_house_auto.png'
import badgeElleSalon from '../assets/badges/badge_elle_salon.png'
import badgeMadDesignist from '../assets/badges/badge_mad_designist.png'
import badgeShiversCreek from '../assets/badges/badge_shivers_creek.png'

import heroAlliance from '../assets/hero_alliance.png'

function Sponsors() {
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

    const sponsors = [
        // Top Row (5)
        {
            id: 'EL-01',
            name: 'ELITE',
            image: badgeElite,
            url: 'http://elitecrc.us/'
        },
        {
            id: 'MH-02',
            name: 'MERCY HOUSE',
            image: badgeMercyHouse,
            url: 'https://mercyhouserecovery.org/'
        },
        {
            id: 'ST-03',
            name: 'SUPER THRIFT',
            image: badgeSuperThrift,
            url: 'https://superthrift.com/'
        },
        {
            id: 'MA-04',
            name: 'MERCY HOUSE AUTO',
            image: badgeMercyAuto,
            url: 'https://mercyhouseautorepair.com/'
        },
        {
            id: 'ES-05',
            name: 'ELLE SALON',
            image: badgeElleSalon,
            url: 'https://www.ellesalon.com/'
        },
        // Bottom Row (2)
        {
            id: 'SC-07',
            name: 'SHIVERS CREEK',
            image: badgeShiversCreek,
            url: 'https://www.shiverscreek.com/'
        },
        {
            id: 'MD-08',
            name: 'THE MAD DESIGNIST',
            image: badgeMadDesignist,
            url: 'https://themaddesignist.com/'
        },
    ];

    return (
        <div className="animate-in" style={{ backgroundColor: '#050505', minHeight: '100vh', color: '#fff' }}>
            {/* CINEMATIC HERO */}
            <section className="cinematic-section" style={{
                height: '65vh',
                backgroundImage: `url(${heroAlliance})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center 40%',
                backgroundAttachment: 'fixed',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
                overflow: 'hidden'
            }}>
                <div className="image-overlay" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent, #050505)' }}></div>
                <div className="cinematic-content reveal" style={{ textAlign: 'center', maxWidth: '1000px', padding: '0 2rem' }}>
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
                        <ShieldItem key={s.id} sponsor={s} />
                    ))}
                </div>

                {/* FOOTER TEXT */}
                <div className="reveal" style={{
                    marginTop: '10rem',
                    textAlign: 'center',
                    opacity: 0.3,
                    fontSize: '0.7rem',
                    letterSpacing: '4px',
                    fontFamily: 'monospace',
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    paddingTop: '3rem'
                }}>
                    © 2026 BLACK SHEEP RECOVERY WARFARE | ISAIAH 53
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
                        gap: 1.5rem;
                    }
                    .shield-interaction-wrapper {
                        max-width: 100% !important;
                    }
                }
            `}</style>
        </div>
    )
}

export default Sponsors
