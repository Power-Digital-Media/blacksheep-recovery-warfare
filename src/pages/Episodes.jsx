import React, { useEffect } from 'react'
import { Play, Youtube, Radio, ArrowRight } from 'lucide-react'

function Episodes() {
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

    const episodes = [
        {
            id: 'rOIRXqGBKHQ',
            title: 'From Wreckage to Redemption',
            guest: 'John Gallagher & Dr. Monica Webb',
            date: 'DEC 2025',
            ytId: 'rOIRXqGBKHQ',
            desc: 'In this flagship episode, we dive deep into the strategic recovery process that transformed a life of chaos into a mission of purpose.'
        },
        {
            id: 'Q-VdFgD6du0',
            title: 'From Hate to Holy Fire',
            guest: 'PJ Smith',
            date: 'NOV 2025',
            ytId: 'Q-VdFgD6du0',
            desc: 'The radical redemption story of PJ Smith, moving from a life of anger to spiritual empowerment.'
        },
        {
            id: 'RXaS6scSzs4',
            title: 'From Atheist to Alive',
            guest: 'Thomas Reif',
            date: 'SEP 2025',
            ytId: 'RXaS6scSzs4',
            desc: 'Pastor Thomas Reif shares his testimony of moving from battlefield combat to spiritual warfare for the soul.'
        },
        {
            id: '_WgBM1YGD-4',
            title: 'Prison to Purpose',
            guest: 'Casey Swier',
            date: 'SEP 2025',
            ytId: '_WgBM1YGD-4',
            desc: 'Finding freedom and mission within the walls of a prison.'
        },
        {
            id: 'IkWcTAop-N8',
            title: 'Narrow Path to Redemption',
            guest: 'Brad Hancock & Clean Slate',
            date: 'AUG 2025',
            ytId: 'IkWcTAop-N8',
            desc: 'A powerful conversation on the discipline required to walk the narrow path in recovery.'
        },
        {
            id: 'MYftoEn5y-k',
            title: 'God Had a Plan',
            guest: 'John Gallagher',
            date: 'JUL 2025',
            ytId: 'MYftoEn5y-k',
            desc: 'A profound look at how divine intervention guides us through our darkest hours.'
        }
    ]

    return (
        <div className="animate-in">
            {/* CINEMATIC HERO */}
            <section className="cinematic-section" style={{ backgroundImage: 'url("/dr_monica_webb_cohost.jpg")' }}>
                <div className="image-overlay"></div>
                <div className="cinematic-content reveal">
                    <span className="emergency-text">The Gospel on Air</span>
                    <h1>WARFARE<br />REPORTS</h1>
                    <p className="narrative-text">
                        Raw, unfiltered testimonies of spiritual warfare and the relentless
                        transformation of the soul. These are the voices from the frontline.
                    </p>
                </div>
            </section>

            <div className="container" style={{ marginTop: '8rem' }}>
                <div className="bento-grid">
                    {episodes.map((eps, index) => {
                        // PRECISE BENTO MAPPING
                        let gridClass = 'span-4 row-4';
                        if (index === 0) gridClass = 'span-8 row-6'; // FEATURED
                        else if (index === 1 || index === 2) gridClass = 'span-4 row-3'; // TOP RIGHT STACK
                        else if (index === 3) gridClass = 'span-4 row-5'; // BOTTOM LEFT - VERTICAL
                        else if (index === 4) gridClass = 'span-4 row-4'; // BOTTOM MIDDLE
                        else if (index === 5) gridClass = 'span-4 row-3'; // BOTTOM RIGHT - 16:9 FORM

                        return (
                            <div key={eps.id} className={`${gridClass} bento-card reveal`} style={{ display: 'flex', flexDirection: 'column' }}>
                                {/* THUMBNAIL CONTAINER - ROBUST FIX */}
                                <div style={{
                                    width: '100%',
                                    marginBottom: '1.5rem',
                                    position: 'relative'
                                }}>
                                    <a
                                        href={`https://www.youtube.com/watch?v=${eps.ytId}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: 'block',
                                            width: '100%',
                                            aspectRatio: '16/9',
                                            backgroundColor: '#000',
                                            borderRadius: '16px',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            overflow: 'hidden',
                                            position: 'relative',
                                            cursor: 'pointer',
                                            textDecoration: 'none'
                                        }}
                                        className="thumb-hover"
                                    >
                                        <img
                                            src={`https://img.youtube.com/vi/${eps.ytId}/maxresdefault.jpg`}
                                            alt={eps.title}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'contain',
                                                display: 'block'
                                            }}
                                        />
                                        <div className="play-overlay">
                                            <Play fill="var(--emergency-red)" color="var(--emergency-red)" size={index === 0 ? 48 : 32} />
                                        </div>
                                    </a>
                                </div>

                                {/* CONTENT */}
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <span className="emergency-text" style={{ fontSize: '0.7rem', marginBottom: '0.5rem' }}>{eps.date}</span>
                                    <h2 style={{
                                        marginBottom: '0.5rem',
                                        lineHeight: 1.2
                                    }}>
                                        {eps.title}
                                    </h2>
                                    <p style={{
                                        color: 'var(--text-secondary)',
                                        marginBottom: index === 0 ? '1.5rem' : '1rem',
                                        fontStyle: 'italic',
                                        fontSize: '0.9rem'
                                    }}>
                                        Featuring {eps.guest}
                                    </p>

                                    {index === 0 && (
                                        <p className="narrative-text" style={{ marginTop: '0', marginBottom: '2rem' }}>
                                            {eps.desc}
                                        </p>
                                    )}

                                    <a
                                        href={`https://www.youtube.com/watch?v=${eps.ytId}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="nav-link"
                                        style={{
                                            marginTop: 'auto',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            color: 'var(--text-primary)',
                                            fontWeight: 700,
                                            letterSpacing: '0.05em'
                                        }}
                                    >
                                        WATCH NOW <ArrowRight size={18} />
                                    </a>
                                </div>
                            </div>
                        );
                    })}

                    {/* WATCH ALL CTA */}
                    <div className="span-full" style={{ textAlign: 'center', padding: '6rem 0' }}>
                        <div className="reveal">
                            <h3 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Ready for more warfare?</h3>
                            <div style={{
                                display: 'flex',
                                gap: '1.5rem',
                                justifyContent: 'center',
                                flexWrap: 'wrap'
                            }}>
                                <a
                                    href="https://www.youtube.com/@Brother_Phoenix/videos"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="donate-btn"
                                    style={{
                                        fontSize: '1.2rem',
                                        padding: '18px 40px',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        backgroundColor: '#ff0000',
                                        border: 'none'
                                    }}
                                >
                                    <Youtube size={24} /> WATCH ALL EPISODES
                                </a>

                                <a
                                    href="https://open.spotify.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="donate-btn"
                                    style={{
                                        fontSize: '1.2rem',
                                        padding: '18px 40px',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        backgroundColor: '#1db954',
                                        border: 'none'
                                    }}
                                >
                                    <Radio size={24} /> LISTEN ON SPOTIFY
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Episodes
