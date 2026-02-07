import React, { useEffect } from 'react'
import { Shield, Mic, Home as HomeIcon, ShoppingBag, Heart, ArrowRight, Play, ExternalLink } from 'lucide-react'

function Home() {
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
            <section className="cinematic-section" style={{ backgroundImage: 'url("/john_gallagher_host.png")' }}>
                <div className="image-overlay"></div>
                <div className="cinematic-content reveal">
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

            <div className="container">
                <div className="bento-grid">
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

                    {/* FEATURED PODCAST */}
                    <div className="bento-card span-4 row-4 reveal warfare-report-card">
                        <Mic size={32} className="card-icon" />
                        <h2>Warfare Reports</h2>
                        <p className="card-description">
                            Hear from the soldiers who have returned from the abyss.
                            Hosted by John Gallagher.
                        </p>
                        <div className="podcast-player-mock">
                            <Play size={40} fill="white" color="white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* NARRATIVE BREAK: THE GRIT */}
            <section className="cinematic-section graphic-hero" style={{ backgroundImage: 'url("/skit_crew_dramatic.jpg")' }}>
                <div className="image-overlay"></div>
                <div className="cinematic-content reveal">
                    <span className="emergency-text light">The Foundation</span>
                    <h2 className="massive-heading">From the Shadows of Mississippi to the Light of the World.</h2>
                    <p className="narrative-text narrative-sub">
                        Real struggle requires real hope. We don't sugarcoat the warfare—we
                        suit up for it. Our ministry is grounded in the reality of the
                        crucifixion and the power of the resurrection.
                    </p>
                </div>
            </section>

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
                            <button className="donate-btn xl-cta">SUPPORT THE MISSION</button>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .hero-button-container { display: flex; gap: 2rem; }
                .large-cta { fontSize: 1.1rem; padding: 15px 40px !important; }
                .mission-description { fontSize: 1.2rem; marginBottom: 2rem; }
                .mission-stats { marginTop: auto; display: flex; gap: 3rem; }
                .stat-value { fontWeight: 900; fontSize: 2rem; display: block; }
                .stat-label { opacity: 0.5; }
                .warfare-report-card { background: var(--warfare-red); }
                .card-icon { marginBottom: 1.5rem; color: white; }
                .card-icon.red { color: var(--emergency-red); }
                .card-description { color: rgba(255,255,255,0.8); fontSize: 1.1rem; }
                .podcast-player-mock { marginTop: auto; width: 100%; height: 120px; background: rgba(0,0,0,0.2); borderRadius: 20px; display: flex; alignItems: center; justifyContent: center; }
                .emergency-text.light { color: white; }
                .massive-heading { fontSize: clamp(2rem, 6vw, 4rem); color: white; maxWidth: 800px; line-height: 1.1; }
                .narrative-sub { color: rgba(255,255,255,0.7); }
                .card-text { fontSize: 1.1rem; }
                .card-link { marginTop: auto; display: flex; alignItems: center; gap: 8px; fontWeight: bold; cursor: pointer; }
                .intel-list { listStyle: none; }
                .intel-list li { padding: 1rem 0; borderBottom: 1px solid rgba(255,255,255,0.05); }
                .intel-list li:last-child { borderBottom: none; }
                .footer-cta-card { background: var(--charcoal); padding: 5rem; text-align: center; }
                .footer-heart { margin: 0 auto 2rem; }
                .footer-cta-text { fontSize: 1.5rem; maxWidth: 800px; margin: 0 auto 3rem; color: var(--text-secondary); }
                .footer-button-container { display: flex; justifyContent: center; gap: 2rem; }
                .xl-cta { padding: 20px 60px !important; fontSize: 1.2rem; }

                @media (max-width: 768px) {
                    .hero-button-container, .footer-button-container { justify-content: center; }
                    .mission-stats { flex-direction: column; gap: 1rem; }
                    .footer-cta-card { padding: 3rem 1.5rem; }
                    .footer-cta-text { fontSize: 1.1rem; }
                }
            `}</style>
        </div>
    )
}

export default Home
