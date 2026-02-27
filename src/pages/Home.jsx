import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Shield, Mic, Home as HomeIcon, ShoppingBag, Heart, ArrowRight, Play, ExternalLink } from 'lucide-react'
import DynamicBackground from '../components/DynamicBackground'
import Schema from '../components/Schema'

/* ── Scroll-tracked card wrapper ── */
const HoloCard = ({ bgImage, onActiveChange, children, ...rest }) => {
    const cardRef = useRef(null);
    useEffect(() => {
        const thresholds = [];
        for (let i = 0; i <= 20; i++) {
            thresholds.push(i / 20);
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Ease the intersection ratio slightly so it hits full opacity smoothly
                let ratio = entry.intersectionRatio;
                // Optional easing if needed, but linear ratio is very performant
                onActiveChange(bgImage, ratio);
            });
        }, {
            threshold: thresholds,
            rootMargin: "-5% 0px -5% 0px"
        });

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [bgImage, onActiveChange]);

    return (
        <div
            ref={cardRef}
            onMouseEnter={() => onActiveChange(bgImage, 1)}
            onMouseLeave={() => onActiveChange(bgImage, 0)}
            {...rest}
        >
            {children}
        </div>
    );
};

function Home() {
    const [bgMap, setBgMap] = useState({});

    const handleActiveChange = useCallback((id, intensity) => {
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
    }, []);

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

    const bgSizeConfig = {
        '/images/blacksheep/Blacksheep SP Collection/SP_TALL.webp': 'contain',
        '/images/blacksheep/Blacksheep FB Collection/FB_Tall Both Holding.webp': 'contain',
        '/images/blacksheep/Blacksheep YT Collection/YT_TALL.webp': 'contain',
        '/skit_crew_dramatic.webp': 'cover'
    };

    return (
        <>
            <Schema data={{
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Black Sheep Recovery Warfare",
                "url": "https://blacksheeprecoverywarfare.com",
                "description": "A Christ-centered offensive strategy for spiritual resilience. Transforming the chaos of addiction into the grace of vitality."
            }} />
            <Schema data={{
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Black Sheep Recovery Warfare",
                "url": "https://blacksheeprecoverywarfare.com",
                "logo": "https://blacksheeprecoverywarfare.com/logo.webp",
                "sameAs": [
                    "https://www.facebook.com/61564077765264/",
                    "https://www.youtube.com/@BlackSheep_Recovery"
                ]
            }} />
            <DynamicBackground backgrounds={bgMap} blur="0px" bgSize={bgSizeConfig} />
            <div style={{ position: 'relative', zIndex: 1 }}>
                {/* CINEMATIC HERO */}
                <section className="cinematic-section" style={{ position: 'relative' }}>
                    <img
                        src="/john_gallagher_host.webp"
                        alt="John Gallagher Host"
                        fetchPriority="high"
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', zIndex: -1 }}
                    />
                    <div className="image-overlay"></div>
                    <div className="cinematic-content">
                        <span className="emergency-text">Leaving the 99</span>
                        <h1>REDEMPTION<br />WARFARE</h1>
                        <p className="narrative-text">
                            A Christ-centered offensive strategy for spiritual resilience.
                            Transforming the grit of addiction into the grace of eternity.
                        </p>
                        <div className="hero-button-container">
                            <button className="donate-btn large-cta">ENLIST NOW</button>
                        </div>
                    </div>
                </section>

                <div className="container" style={{ paddingTop: 'clamp(4rem, 8vw, 8rem)' }}>
                    <div className="bento-grid" style={{ marginBottom: 0 }}>
                        {/* MISSION CORE */}
                        <div className="bento-card span-8 row-4 reveal">
                            <span className="emergency-text">The Mission</span>
                            <h2>The Architecture of Deliverance</h2>
                            <p className="mission-description">
                                We are not just a recovery program; we are a mobilization force.
                                Based in Mississippi, we provide the spiritual intel and horizontal
                                support needed to liberate souls from chemical and spiritual bondage.
                            </p>
                            <div className="mission-stats">
                                <div>
                                    <span className="stat-value">REVELATION</span>
                                    <span className="stat-label">12:11</span>
                                </div>
                                <div>
                                    <span className="stat-value">ISAIAH</span>
                                    <span className="stat-label">53</span>
                                </div>
                            </div>
                        </div>

                        {/* FEATURED PODCAST — Hologram-tracked */}
                        <HoloCard
                            bgImage="/images/blacksheep/Blacksheep SP Collection/SP_TALL.webp"
                            onActiveChange={handleActiveChange}
                            className="bento-card span-4 row-4 reveal warfare-report-card"
                            onClick={() => window.open('https://open.spotify.com/show/6rByCbmShGIZJUWXj7Szim', '_blank')}
                            style={{
                                cursor: 'pointer',
                                backgroundImage: 'url("/images/blacksheep/Blacksheep SP Collection/SP_TALL.webp")',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                position: 'relative',
                                overflow: 'hidden',
                                border: '1px solid rgba(29, 185, 84, 0.5)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                padding: '0'
                            }}
                        >
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)',
                                zIndex: 1
                            }}></div>

                            <div style={{ position: 'relative', zIndex: 2, padding: '2rem' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    marginBottom: '0.5rem'
                                }}>
                                    <span style={{
                                        background: '#1db954',
                                        color: '#000',
                                        padding: '2px 8px',
                                        borderRadius: '4px',
                                        fontSize: '0.7rem',
                                        fontWeight: '900',
                                        letterSpacing: '1px'
                                    }}>
                                        LISTEN NOW
                                    </span>
                                </div>
                                <h2 style={{
                                    fontSize: '2rem',
                                    textShadow: '0 0 20px rgba(29, 185, 84, 0.6)',
                                    lineHeight: 1,
                                    marginBottom: '0.5rem'
                                }}>
                                    WARFARE<br />REPORTS
                                </h2>
                            </div>
                        </HoloCard>
                    </div>

                    {/* SOCIAL FOLLOW SECTION */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '1.5rem',
                        marginTop: '1.5rem',
                        marginBottom: 'var(--section-gap)'
                    }}>
                        {/* FACEBOOK CARD — Hologram-tracked */}
                        <HoloCard
                            bgImage="/images/blacksheep/Blacksheep FB Collection/FB_Tall Both Holding.webp"
                            onActiveChange={handleActiveChange}
                            className="reveal social-card social-card-fb"
                            onClick={() => window.open('https://www.facebook.com/profile.php?id=61564077765264', '_blank')}
                            style={{
                                position: 'relative',
                                borderRadius: '28px',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                background: '#000',
                                border: '1px solid rgba(24, 119, 242, 0.3)',
                                height: '320px',
                                display: 'flex',
                                alignItems: 'flex-end'
                            }}
                        >
                            <img
                                src="/images/blacksheep/Blacksheep FB Collection/FB_Point Right.webp"
                                alt="Follow on Facebook"
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
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '0.5rem' }}>
                                    FOLLOW US
                                </h3>
                                <p style={{ fontSize: '0.85rem', color: '#86868b', marginBottom: '1.5rem', lineHeight: 1.4 }}>
                                    Join the community on Facebook for daily encouragement & updates.
                                </p>
                                <span style={{
                                    display: 'inline-block',
                                    background: '#1877f2',
                                    color: '#fff',
                                    padding: '10px 24px',
                                    borderRadius: '8px',
                                    fontSize: '0.8rem',
                                    fontWeight: '900',
                                    letterSpacing: '1px'
                                }}>
                                    FACEBOOK
                                </span>
                            </div>
                        </HoloCard>

                        {/* YOUTUBE CARD — Hologram-tracked */}
                        <HoloCard
                            bgImage="/images/blacksheep/Blacksheep YT Collection/YT_TALL.webp"
                            onActiveChange={handleActiveChange}
                            className="reveal social-card social-card-yt"
                            onClick={() => window.open('https://www.youtube.com/@BlackSheep_Recovery', '_blank')}
                            style={{
                                position: 'relative',
                                borderRadius: '28px',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                background: '#000',
                                border: '1px solid rgba(255, 0, 0, 0.3)',
                                height: '320px',
                                display: 'flex',
                                alignItems: 'flex-end'
                            }}
                        >
                            <img
                                src="/images/blacksheep/Blacksheep YT Collection/YT_Point Right.webp"
                                alt="Subscribe on YouTube"
                                style={{
                                    position: 'absolute',
                                    right: '-10px',
                                    bottom: '0',
                                    height: '100%',
                                    objectFit: 'contain',
                                    objectPosition: 'bottom right',
                                    transform: 'scaleX(-1)',
                                    zIndex: 1
                                }}
                            />
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to right, rgba(0,0,0,0.95) 30%, transparent 70%)',
                                zIndex: 2
                            }}></div>
                            <div style={{
                                position: 'relative',
                                zIndex: 3,
                                padding: '2rem',
                                marginRight: 'auto',
                                textAlign: 'left',
                                maxWidth: '55%'
                            }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '0.5rem' }}>
                                    SUBSCRIBE
                                </h3>
                                <p style={{ fontSize: '0.85rem', color: '#86868b', marginBottom: '1.5rem', lineHeight: 1.4 }}>
                                    Watch full episodes, testimonies & behind-the-scenes warfare content.
                                </p>
                                <span style={{
                                    display: 'inline-block',
                                    background: '#ff0000',
                                    color: '#fff',
                                    padding: '10px 24px',
                                    borderRadius: '8px',
                                    fontSize: '0.8rem',
                                    fontWeight: '900',
                                    letterSpacing: '1px'
                                }}>
                                    YOUTUBE
                                </span>
                            </div>
                        </HoloCard>
                    </div>
                </div>

                {/* NARRATIVE BREAK: THE GRIT — Hologram-tracked */}
                <HoloCard
                    bgImage="/skit_crew_dramatic.webp"
                    onActiveChange={handleActiveChange}
                    className="cinematic-section graphic-hero"
                    style={{ background: 'transparent' }}
                >
                    <div className="cinematic-content reveal">
                        <span className="emergency-text light">The Foundation</span>
                        <h2 className="massive-heading">From the Shadows of Mississippi to the Light of the World.</h2>
                        <p className="narrative-text narrative-sub">
                            Real struggle requires real hope. We don't sugarcoat the warfare—we
                            suit up for it. Our ministry is grounded in the reality of the
                            crucifixion and the power of the resurrection.
                        </p>
                    </div>
                </HoloCard>

                <div className="container">
                    <div className="bento-grid" style={{ marginTop: 'clamp(4rem, 10vw, 8rem)' }}>
                        {/* SOBER LIVING */}
                        <div className="bento-card span-6 row-4 reveal">
                            <HomeIcon size={32} className="card-icon red" />
                            <h2>The Garrison</h2>
                            <p className="card-text">Safe, faith-based sober living environments where discipleship isn't a program—it's a lifestyle.</p>
                            <div className="card-link">
                                VIEW SOBER LIVING <ArrowRight size={16} />
                            </div>
                        </div>

                        {/* RESOURCES */}
                        <div className="bento-card span-6 row-4 reveal">
                            <Shield size={32} className="card-icon red" />
                            <h2>Tactical Intel</h2>
                            <ul className="intel-list">
                                <li>Daily Spiritual Warfare Devotionals</li>
                                <li>Curriculum for Recovered Soldiers</li>
                                <li>Newsletter Archive</li>
                            </ul>
                        </div>
                    </div>


                    {/* FINAL CALL TO ACTION */}
                    <div className="bento-grid">
                        <div className="bento-card span-full row-4 reveal footer-cta-card">
                            <Heart size={48} color="var(--emergency-red)" className="footer-heart" />
                            <h1>Support the Offensive</h1>
                            <p className="footer-cta-text">
                                Your partnership provides the fuel for this warfare. Help us bring
                                the message of the Gospel to those currently lost in the ninety-nine.
                            </p>
                            <div className="footer-button-container">
                                <Link to="/support" style={{ textDecoration: 'none' }}>
                                    <button className="donate-btn xl-cta">SUPPORT THE MISSION</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <style>{`
                    .hero-button-container { 
                        display: flex; 
                        gap: 1.5rem; 
                    }
                    .large-cta { 
                        font-size: 1.1rem; 
                        padding: 15px 40px !important; 
                    }
                    .mission-description { 
                        font-size: 1.1rem; 
                        margin-bottom: 2rem; 
                        line-height: 1.6;
                    }
                    .mission-stats { 
                        margin-top: auto; 
                        display: flex; 
                        gap: 2.5rem; 
                    }
                    .stat-value { 
                        font-weight: 900; 
                        font-size: 1.8rem; 
                        display: block; 
                    }
                    .stat-label { 
                        opacity: 0.5; 
                        font-size: 0.8rem;
                    }
                    .warfare-report-card { 
                        background: #000;
                        transition: box-shadow 0.5s ease, transform 0.5s ease, border-color 0.5s ease;
                    }
                    .warfare-report-card:hover {
                        box-shadow: 0 0 30px rgba(29, 185, 84, 0.7), 0 0 60px rgba(29, 185, 84, 0.35);
                        border-color: rgba(29, 185, 84, 0.8) !important;
                        transform: scale(1.02);
                    }
                    @media (max-width: 768px) {
                        .warfare-report-card {
                            min-height: 420px;
                        }
                        .warfare-report-card:hover {
                            box-shadow: none;
                            transform: none;
                            border-color: rgba(29, 185, 84, 0.5) !important;
                        }
                        .warfare-report-card.active {
                            box-shadow: 0 0 25px rgba(29, 185, 84, 0.6), 0 0 50px rgba(29, 185, 84, 0.3);
                            border-color: rgba(29, 185, 84, 0.8) !important;
                        }
                    }
                    .social-card {
                        transition: box-shadow 0.5s ease, transform 0.5s ease, border-color 0.5s ease;
                    }
                    .social-card-fb:hover {
                        box-shadow: 0 0 30px rgba(24, 119, 242, 0.5), 0 0 60px rgba(24, 119, 242, 0.2);
                        border-color: rgba(24, 119, 242, 0.8) !important;
                        transform: scale(1.02);
                    }
                    .social-card-yt:hover {
                        box-shadow: 0 0 30px rgba(255, 0, 0, 0.5), 0 0 60px rgba(255, 0, 0, 0.2);
                        border-color: rgba(255, 0, 0, 0.8) !important;
                        transform: scale(1.02);
                    }
                    @media (max-width: 768px) {
                        .social-card:hover { box-shadow: none; transform: none; }
                        .social-card-fb.active {
                            box-shadow: 0 0 25px rgba(24, 119, 242, 0.4);
                            border-color: rgba(24, 119, 242, 0.8) !important;
                        }
                        .social-card-yt.active {
                            box-shadow: 0 0 25px rgba(255, 0, 0, 0.4);
                            border-color: rgba(255, 0, 0, 0.8) !important;
                        }
                    }
                    .card-icon { 
                        margin-bottom: 1.5rem; 
                        color: white; 
                    }
                    .card-icon.red { 
                        color: var(--emergency-red); 
                    }
                    .card-description { 
                        color: rgba(255,255,255,0.8); 
                        font-size: 1.05rem; 
                        line-height: 1.5;
                    }
                    .podcast-player-mock { 
                        margin-top: 2.5rem; 
                        width: 100%; 
                        height: 100px; 
                        background: rgba(0,0,0,0.2); 
                        border-radius: 20px; 
                        display: flex; 
                        align-items: center; 
                        justify-content: center; 
                    }
                    .emergency-text.light { 
                        color: white; 
                    }
                    .massive-heading { 
                        font-size: clamp(1.8rem, 6vw, 4rem); 
                        color: white; 
                        max-width: 800px; 
                        line-height: 1.1; 
                    }
                    .narrative-sub { 
                        color: rgba(255,255,255,0.7); 
                        font-size: 1rem;
                    }
                    .card-text { 
                        font-size: 1.05rem; 
                        line-height: 1.5;
                    }
                    .card-link { 
                        margin-top: auto; 
                        display: flex; 
                        align-items: center; 
                        gap: 8px; 
                        font-weight: bold; 
                        cursor: pointer; 
                    }
                    .intel-list { 
                        list-style: none; 
                        padding: 0;
                    }
                    .intel-list li { 
                        padding: 1rem 0; 
                        border-bottom: 1px solid rgba(255,255,255,0.05); 
                    }
                    .intel-list li:last-child { 
                        border-bottom: none; 
                    }
                    .footer-cta-card { 
                        background: var(--charcoal); 
                        padding: 4rem 2rem; 
                        text-align: center; 
                    }
                    .footer-heart { 
                        margin: 0 auto 1.5rem; 
                    }
                    .footer-cta-text { 
                        font-size: 1.2rem; 
                        max-width: 800px; 
                        margin: 0 auto 2.5rem; 
                        color: var(--text-secondary); 
                    }
                    .footer-button-container { 
                        display: flex; 
                        justify-content: center; 
                        gap: 1.5rem; 
                    }
                    .xl-cta { 
                        padding: 18px 45px !important; 
                        font-size: 1.1rem; 
                    }

                    @media (max-width: 768px) {
                        .hero-button-container, .footer-button-container { 
                            justify-content: center; 
                            flex-direction: column;
                            width: 100%;
                        }
                        .donate-btn {
                            width: 100%;
                            text-align: center;
                        }
                        .mission-stats { 
                            flex-direction: column; 
                            gap: 1.5rem; 
                            margin-top: 2rem;
                        }
                        .footer-cta-card { 
                            padding: 3rem 1.25rem; 
                        }
                        .footer-cta-text { 
                            font-size: 1rem; 
                        }
                        .massive-heading {
                            font-size: 1.8rem;
                        }
                    }
                `}</style>
            </div>
        </>
    )
}

export default Home
