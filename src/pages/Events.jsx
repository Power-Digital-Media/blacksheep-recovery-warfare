import React, { useEffect } from 'react'
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react'

function Events() {
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
            <section className="cinematic-section graphic-hero" style={{ backgroundImage: 'url("/skit_crew_dramatic.jpg")' }}>
                <div className="image-overlay"></div>
                <div className="cinematic-content reveal">
                    <span className="emergency-text">Strategic Deployments</span>
                    <h1>FIELD<br />OPERATIONS</h1>
                    <p className="narrative-text">
                        Gathering the collective for hope, transformation, and
                        spiritual empowerment. Real talk. Real community. Real warfare.
                    </p>
                </div>
            </section>

            <div className="container" style={{ marginTop: '8rem' }}>
                <div className="bento-grid">
                    {/* MAIN FEATURED EVENT */}
                    <div className="bento-card span-8 row-6 reveal" style={{ background: 'var(--warfare-red)', border: 'none' }}>
                        <span className="emergency-text" style={{ color: 'white', opacity: 0.8 }}>SEPTEMBER 13, 2025</span>
                        <h1 style={{ color: 'white', lineHeight: '0.9', margin: '1rem 0' }}>NIGHT OF HOPE</h1>
                        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.25rem', maxWidth: '600px', marginBottom: '3rem' }}>
                            A powerful evening of raw testimonies, worship, and real talk
                            about recovery and the relentless grace of Jesus Christ.
                            Live speakers from the Black Sheep community.
                        </p>

                        <div style={{ display: 'flex', gap: '3rem', marginTop: 'auto' }}>
                            <div>
                                <h3 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '0.5rem' }}>WORSHIP</h3>
                                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Live Music & Spiritual Warfare</p>
                            </div>
                            <div>
                                <h3 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '0.5rem' }}>COMMUNITY</h3>
                                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Connection & Direct Mentorship</p>
                            </div>
                        </div>

                        <button style={{
                            marginTop: '4rem',
                            background: 'white',
                            color: 'black',
                            border: 'none',
                            padding: '18px 45px',
                            borderRadius: '30px',
                            fontWeight: '900',
                            fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                        }}>
                            JOIN THE FRONT <ArrowRight size={20} />
                        </button>
                    </div>

                    {/* LOGISTICS */}
                    <div className="bento-card span-4 row-2 reveal">
                        <MapPin size={24} color="var(--emergency-red)" style={{ marginBottom: '1rem' }} />
                        <h2>Location</h2>
                        <p>Central Mississippi. Check back for specific venue details soon.</p>
                    </div>

                    <div className="bento-card span-4 row-2 reveal">
                        <Users size={24} color="var(--emergency-red)" style={{ marginBottom: '1rem' }} />
                        <h2>Open Enlistment</h2>
                        <p>Come as you are. Whether in recovery or looking to support, there is a place for you.</p>
                    </div>

                    <div className="bento-card span-4 row-2 reveal" style={{ background: 'var(--charcoal)' }}>
                        <Calendar size={24} style={{ marginBottom: '1rem' }} />
                        <h2>Past Deployments</h2>
                        <p>Relive the impact of previous Night of Hope gatherings.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Events
