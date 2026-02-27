import React, { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ExternalLink, BookOpen, Video, MapPin, Heart, ShieldAlert, GraduationCap, Map, ShieldCheck, Youtube, ArrowRight, FileText, Mic } from 'lucide-react'
import DynamicBackground from '../components/DynamicBackground'
import SEO from '../components/SEO'
import Schema from '../components/Schema'

const ResourceCard = ({ image, children, className, onActiveChange, style }) => {
    const cardRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    const intensity = useTransform(
        scrollYProgress,
        [0, 0.1, 0.5, 0.9, 1],
        [0, 0.8, 1, 0.8, 0]
    );

    useEffect(() => {
        if (onActiveChange && image) {
            const unsubscribe = intensity.on("change", (latest) => {
                onActiveChange(image, latest);
            });
            return () => unsubscribe();
        }
    }, [intensity, image, onActiveChange]);

    return (
        <div
            ref={cardRef}
            className={`bento-card ${className}`}
            onMouseEnter={() => image && onActiveChange(image, 1)}
            onMouseLeave={() => image && onActiveChange(image, 0)}
            style={style}
        >
            {children}
        </div>
    );
};

function Resources() {
    const [bgMap, setBgMap] = useState({});

    const handleActiveChange = (id, intensity) => {
        if (!id) return;
        setBgMap(prev => {
            const currentIntensity = prev[id] || 0;
            if (Math.abs(currentIntensity - intensity) < 0.01) return prev;
            const next = { ...prev };
            if (intensity <= 0.01) delete next[id];
            else next[id] = intensity;
            return next;
        });
    };

    const resources = [
        { name: 'Friends of Alcoholics', type: 'Recovery Community', author: 'Jackson, MS', impact: 'Faith-Based Support', url: 'https://www.foaministry.org/', image: '/images/Friends_Of_Alcoholics.avif' },
        { name: 'Trapped in the Addict', type: 'Literature / Group', author: 'John Gallagher', impact: 'Core Doctrine', url: 'https://trappedintheaddict.com/', image: '/images/trapped_in_the_Addict.webp' },
        { name: 'Gateway Rescue Mission', type: 'Facility', author: 'Jackson, MS', impact: 'Rescue & Recovery', url: 'https://gatewaymission.org/' },
        { name: 'The Uncommon Christian', type: 'Podcast', author: 'Ministry Partners', impact: 'Spiritual Growth', url: '#' }
    ]

    const resourcesSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Tactical Resources - Black Sheep Recovery Warfare",
        "description": "Strategic intelligence and ministry resources to equip the saints and sustain the recovered life.",
        "url": "https://blacksheeprecoverywarfare.com/resources"
    };

    return (
        <>
            <SEO
                title="Resources | Tactical Intel - Black Sheep Recovery Warfare"
                description="Equipping the saints with the knowledge and tools necessary to sustain the recovered life. Every resource is a weapon for the warfare."
                url="https://blacksheeprecoverywarfare.com/resources"
                image="https://blacksheeprecoverywarfare.com/danny_studio_bg.webp"
                schemaData={resourcesSchema}
            />
            <DynamicBackground backgrounds={bgMap} blur="3px" />
            <div style={{ position: 'relative', zIndex: 1 }}>

                {/* CINEMATIC HERO */}
                <section className="cinematic-section graphic-hero" style={{ backgroundImage: 'url("/danny_studio_bg.webp")', justifyContent: 'flex-end', paddingRight: '5%', '--hero-text-align': 'right', maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)' }}>
                    <div className="image-overlay" style={{ background: 'linear-gradient(to left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.1) 100%)' }}></div>
                    <div className="cinematic-content" style={{ alignItems: 'flex-end', textAlign: 'right', maxWidth: '600px', marginRight: '5%' }}>
                        <span className="emergency-text">Strategic Intelligence</span>
                        <h1>TACTICAL<br />INTEL</h1>
                        <p className="narrative-text" style={{ textAlign: 'right' }}>
                            Equipping the saints with the knowledge and tools necessary to
                            sustain the recovered life. Every resource is a weapon for the warfare.
                        </p>
                    </div>
                </section>

                <div className="container" style={{ marginTop: 'clamp(3rem, 10vw, 8rem)' }}>
                    <div className="bento-grid">

                        {/* RESOURCE LIST - TOP ROW */}
                        {resources.slice(0, 2).map((res, idx) => (
                            <a
                                key={idx}
                                href={res.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="span-6 row-3"
                                style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}
                                onMouseEnter={() => res.image && handleActiveChange(res.image, 1)}
                                onMouseLeave={() => res.image && handleActiveChange(res.image, 0)}
                            >
                                <ResourceCard className="resource-card" style={{ flex: 1, width: '100%' }}>
                                    <div className="resource-header">
                                        <span className="emergency-text resource-type">{res.type}</span>
                                        <span className="resource-impact">{res.impact}</span>
                                    </div>
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <h2 className="resource-name">{res.name}</h2>
                                        <p className="resource-author">Loc: {res.author}</p>
                                    </div>
                                    <div className="resource-link">
                                        ACCESS BASE <ExternalLink size={14} />
                                    </div>
                                </ResourceCard>
                            </a>
                        ))}

                        {/* FEATURED RECOVERY BASE - ROW 2 */}
                        <div className="bento-card span-full row-4 featured-intel-card" style={{ backgroundImage: 'url("/community_large.webp")', backgroundSize: 'cover', backgroundPosition: 'center', padding: 0 }}>
                            <div className="featured-overlay" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.4) 100%)' }}></div>
                            <div className="featured-content" style={{ padding: '3rem' }}>
                                {/* Left Side Info */}
                                <div className="featured-main" style={{ flex: 1, paddingRight: '2rem' }}>
                                    <div className="featured-header" style={{ marginBottom: '1.5rem' }}>
                                        <ShieldCheck size={32} color="var(--emergency-red)" />
                                        <span className="emergency-text">Frontline Recovery Base</span>
                                    </div>
                                    <h1 className="featured-title">Mercy House<br />Central Mississippi</h1>
                                    <p className="featured-desc">
                                        A faith-based, long-term residential program providing comprehensive, biblical solutions to life-controlling addictions. This is where the warfare becomes tactical recovery.
                                    </p>
                                    <a href="https://mercyhouserecovery.org/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                        <button className="event-cta">
                                            ENTER RECOVERY FORCE <ArrowRight size={20} />
                                        </button>
                                    </a>
                                </div>

                                {/* Right Side Nested Cards */}
                                <div className="nested-cards-container">
                                    <a
                                        href="https://mercyhouserecovery.org/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="nested-card"
                                        onMouseEnter={() => handleActiveChange('/images/Teen_Challenge.webp', 1)}
                                        onMouseLeave={() => handleActiveChange('/images/Teen_Challenge.webp', 0)}
                                    >
                                        <h4>Mercy House<br />Teen Challenge</h4>
                                        <span>Residential Program</span>
                                    </a>
                                    <a
                                        href="https://superthrift.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="nested-card"
                                        onMouseEnter={() => handleActiveChange('/images/Super_Thrift.webp', 1)}
                                        onMouseLeave={() => handleActiveChange('/images/Super_Thrift.webp', 0)}
                                    >
                                        <h4>Super Thrift</h4>
                                        <span>Mission Support Enterprise</span>
                                    </a>
                                    <a href="https://mercyhouseautorepair.com/" target="_blank" rel="noopener noreferrer" className="nested-card">
                                        <h4>Mercy House Auto</h4>
                                        <span>Skill Development Services</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* RESOURCE LIST - ROW 3 */}
                        {resources.slice(2).map((res, idx) => (
                            <a key={idx} href={res.url} target="_blank" rel="noopener noreferrer" className="span-6 row-3" style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}>
                                <ResourceCard className="resource-card" style={{ flex: 1, width: '100%' }}>
                                    <div className="resource-header">
                                        <span className="emergency-text resource-type">{res.type}</span>
                                        <span className="resource-impact">{res.impact}</span>
                                    </div>
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <h2 className="resource-name">{res.name}</h2>
                                        <p className="resource-author">Loc: {res.author}</p>
                                    </div>
                                    <div className="resource-link">
                                        ACCESS BASE <ExternalLink size={14} />
                                    </div>
                                </ResourceCard>
                            </a>
                        ))}

                        {/* CORE PILLAR */}
                        <ResourceCard className="span-4 row-2 pillar-card">
                            <BookOpen size={24} color="var(--emergency-red)" className="pillar-icon" />
                            <h2>The Word</h2>
                            <p>The ultimate strategic manual for every recovered soul. Daily grounding in scripture.</p>
                        </ResourceCard>

                        {/* SUPPORT PILLAR */}
                        <ResourceCard className="span-4 row-2 pillar-card">
                            <ShieldCheck size={24} color="var(--emergency-red)" className="pillar-icon" />
                            <h2>Verified Partners</h2>
                            <p>Connecting you with vetted, faith-based recovery hubs across the nation.</p>
                        </ResourceCard>

                        {/* DIRECT SUPPORT */}
                        <ResourceCard className="span-4 row-2 pillar-card" style={{ border: '1px solid var(--emergency-red)' }}>
                            <Mic size={24} color="var(--emergency-red)" className="pillar-icon" />
                            <h2>Direct Comms</h2>
                            <p>Need urgent strategic advice? Reach out via our tactical response channels.</p>
                        </ResourceCard>

                    </div>
                </div>

                <style>{`
                    .resource-card {
                        background: rgba(10, 10, 10, 0.6) !important;
                        backdrop-filter: blur(20px);
                        border: 1px solid rgba(255, 255, 255, 0.05);
                        padding: 2.5rem;
                        display: flex;
                        flex-direction: column;
                        transition: all 0.4s ease;
                        position: relative;
                        overflow: hidden;
                    }
                    .resource-card:hover {
                        border-color: rgba(255, 255, 255, 0.2);
                        transform: translateY(-5px);
                        background: rgba(20, 20, 20, 0.8) !important;
                    }
                    .resource-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; }
                    .resource-type { font-size: 0.7rem; letter-spacing: 2px; }
                    .resource-impact { font-size: 0.65rem; opacity: 0.5; text-transform: uppercase; letter-spacing: 1px; font-family: 'monospace'; }
                    
                    .resource-name { margin-bottom: 0.5rem; font-size: 1.6rem; line-height: 1.1; }
                    .resource-author { font-size: 0.95rem; color: var(--text-secondary); font-family: 'monospace'; }
                    
                    .resource-link { 
                        margin-top: 1.5rem; 
                        display: flex; 
                        align-items: center; 
                        gap: 8px; 
                        font-weight: bold; 
                        color: var(--emergency-red); 
                        font-size: 0.8rem; 
                        letter-spacing: 2px;
                        opacity: 0.8;
                        transition: opacity 0.3s ease;
                    }
                    .resource-card:hover .resource-link { opacity: 1; }

                    .featured-intel-card { 
                        background: #000 !important; 
                        position: relative; 
                        overflow: hidden; 
                        display: flex;
                        align-items: flex-end;
                        min-height: 500px;
                        border: 1px solid rgba(255, 255, 255, 0.1);
                    }
                    .featured-overlay {
                        position: absolute;
                        inset: 0;
                        background: radial-gradient(circle at top right, rgba(215, 0, 21, 0.15), transparent 60%),
                                    linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 100%);
                        z-index: 1;
                    }
                    .featured-content {
                        position: relative;
                        z-index: 2;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: space-between;
                        padding: 0;
                    }
                    .featured-header {
                        display: flex;
                        align-items: center;
                        gap: 1rem;
                        margin-bottom: 2rem;
                    }
                    .featured-main {
                        max-width: 700px;
                    }
                    .nested-cards-container {
                        display: flex;
                        flex-direction: column;
                        gap: 1.5rem;
                        width: 340px;
                        padding-left: 2rem;
                        border-left: 1px solid rgba(255, 255, 255, 0.1);
                        height: 100%;
                        justify-content: space-between;
                    }
                    .nested-card {
                        background: rgba(20, 20, 20, 0.6);
                        backdrop-filter: blur(10px);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        border-radius: 12px;
                        padding: 1.5rem;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        gap: 0.4rem;
                        text-decoration: none;
                        color: white;
                        transition: all 0.3s ease;
                        flex: 1;
                    }
                    .nested-card:hover {
                        background: rgba(30, 30, 30, 0.9);
                        border-color: rgba(255, 59, 48, 0.6);
                        transform: translateX(-5px);
                    }
                    .nested-card h4 {
                        margin: 0;
                        font-size: 1.1rem;
                        line-height: 1.2;
                    }
                    .nested-card span {
                        font-family: 'monospace';
                        font-size: 0.75rem;
                        color: var(--emergency-red);
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        opacity: 0.9;
                    }
                    .featured-title { 
                        font-size: clamp(2rem, 5vw, 3.5rem); 
                        margin-bottom: 1.5rem; 
                        line-height: 1;
                        text-shadow: 0 0 30px rgba(0,0,0,0.5);
                    }
                    .featured-desc { 
                        font-size: 1.1rem; 
                        color: rgba(255,255,255,0.8); 
                        line-height: 1.6; 
                        max-width: 600px;
                        margin-bottom: 2.5rem;
                    }

                    .pillar-card {
                        background: rgba(20, 20, 20, 0.4) !important;
                        border: 1px solid rgba(255, 255, 255, 0.05);
                        transition: all 0.3s ease;
                    }
                    .pillar-card:hover {
                        background: rgba(30, 30, 30, 0.6) !important;
                        border-color: rgba(255, 255, 255, 0.1);
                    }
                    .pillar-icon { margin-bottom: 1.5rem; opacity: 0.9; }
                    .pillar-card h2 { font-size: 1.4rem; margin-bottom: 0.8rem; }
                    .pillar-card p { font-size: 0.95rem; color: var(--text-secondary); line-height: 1.5; }

                    @media (max-width: 900px) {
                        .featured-intel-card { min-height: auto; }
                        .featured-content {
                            flex-direction: column !important;
                            padding: 2rem !important;
                        }
                        .featured-main {
                            padding-right: 0 !important;
                            margin-bottom: 2rem;
                        }
                        .nested-cards-container {
                            width: 100% !important;
                            padding-left: 0 !important;
                            padding-top: 2rem;
                            border-left: none !important;
                            border-top: 1px solid rgba(255, 255, 255, 0.1);
                        }
                        .featured-title { font-size: 2rem; }
                        .resource-name { font-size: 1.4rem; }
                    }
                `}</style>
            </div>
        </>
    )
}

export default Resources
