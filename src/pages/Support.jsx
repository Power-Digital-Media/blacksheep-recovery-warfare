import React, { useEffect } from 'react';
import { Target, ShieldAlert, Crosshair, Users, ArrowRight, Activity, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import Schema from '../components/Schema';

function Support() {
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

    const supportSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Support the Mission - Black Sheep Recovery Warfare",
        "description": "Join the offensive. Your partnership fuels our mission to bring the Gospel to the lost and equip the recovered.",
        "url": "https://blacksheeprecoverywarfare.com/support"
    };

    return (
        <div className="support-page" style={{ paddingBottom: 'var(--section-gap)' }}>
            <Schema data={supportSchema} />

            {/* CINEMATIC HERO */}
            <section className="cinematic-section graphic-hero" style={{
                backgroundImage: 'url("/danny_studio_bg.webp")',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                minHeight: '85vh',
                maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
            }}>
                <div className="image-overlay" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.9) 100%)' }}></div>
                <div className="cinematic-content reveal" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <Flame size={48} color="var(--emergency-red)" style={{ margin: '0 auto 1.5rem', display: 'block', filter: 'drop-shadow(0 0 20px rgba(255, 59, 48, 0.4))' }} />
                    <span className="emergency-text" style={{ fontSize: '1.2rem', letterSpacing: '0.2em' }}>Partnership</span>
                    <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', textTransform: 'uppercase', lineHeight: 1, marginBottom: '1rem', textShadow: '0 0 40px rgba(255, 255, 255, 0.1)' }}>
                        ENLIST IN<br />THE OFFENSIVE
                    </h1>
                    <p className="narrative-text" style={{ fontSize: '1.2rem', color: '#ccc', textAlign: 'center' }}>
                        This is not a passive operation. We are actively engaged in spiritual warfare for the souls of men and women trapped in addiction. We need operators to fund the extraction.
                    </p>
                    <div style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                        <Link to="/donate" style={{ textDecoration: 'none' }}>
                            <button className="donate-btn" style={{ padding: '16px 40px', fontSize: '1.1rem' }}>
                                PROCEED TO ARMORY <ArrowRight size={20} style={{ marginLeft: '8px' }} />
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            <div className="container" style={{ marginTop: '-4rem', position: 'relative', zIndex: 10 }}>
                {/* IMPACT METRICS */}
                <div className="bento-grid" style={{ marginBottom: '4rem' }}>
                    <div className="bento-card span-4 reveal" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 2rem' }}>
                        <Target size={40} color="var(--emergency-red)" style={{ marginBottom: '1rem' }} />
                        <h2 style={{ fontSize: '3rem', margin: '0', fontWeight: '900' }}>100%</h2>
                        <span style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>Mission Focus</span>
                        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#888' }}>Every resource deployed goes directly toward content creation, outreach, and recovery facility support.</p>
                    </div>
                    <div className="bento-card span-4 reveal" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 2rem', transitionDelay: '0.1s' }}>
                        <Users size={40} color="var(--emergency-red)" style={{ marginBottom: '1rem' }} />
                        <h2 style={{ fontSize: '3rem', margin: '0', fontWeight: '900' }}>THE 99</h2>
                        <span style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>Our Target</span>
                        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#888' }}>We don't wait for them to find the church. We take the church into the darkness where they are trapped.</p>
                    </div>
                    <div className="bento-card span-4 reveal" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 2rem', transitionDelay: '0.2s' }}>
                        <Activity size={40} color="var(--emergency-red)" style={{ marginBottom: '1rem' }} />
                        <h2 style={{ fontSize: '3rem', margin: '0', fontWeight: '900' }}>ZERO</h2>
                        <span style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>Compromise</span>
                        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#888' }}>Unapologetic, biblical truth delivered with tactical precision to break the chains of generational bondage.</p>
                    </div>
                </div>

                {/* THE STRATEGY SECTION */}
                <div className="bento-card span-full reveal" style={{ padding: '4rem', background: 'linear-gradient(145deg, rgba(20,20,20,0.9) 0%, rgba(10,10,10,0.95) 100%)', border: '1px solid rgba(255, 59, 48, 0.2)' }}>
                    <div style={{ maxWidth: '800px' }}>
                        <ShieldAlert size={32} color="var(--emergency-red)" style={{ marginBottom: '1rem' }} />
                        <span className="emergency-text">Strategic Execution</span>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: 1.2 }}>HOW YOUR SUPPORT IS DEPLOYED</h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '3rem' }}>
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                <div style={{ background: 'rgba(255, 59, 48, 0.1)', padding: '1rem', borderRadius: '12px' }}>
                                    <h3 style={{ color: 'var(--emergency-red)', fontSize: '1.5rem', margin: 0, lineHeight: 1 }}>01</h3>
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Broadcasting the Message</h3>
                                    <p style={{ color: '#aaa', lineHeight: 1.6 }}>Producing high-fidelity podcast episodes and video content. We utilize professional-grade studios to ensure the frequency of truth cuts through the cultural noise overriding the algorithms.</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                <div style={{ background: 'rgba(255, 59, 48, 0.1)', padding: '1rem', borderRadius: '12px' }}>
                                    <h3 style={{ color: 'var(--emergency-red)', fontSize: '1.5rem', margin: 0, lineHeight: 1 }}>02</h3>
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Equipping the Facilities</h3>
                                    <p style={{ color: '#aaa', lineHeight: 1.6 }}>Direct partnership and material support for frontline extraction units like Mercy House and Friends of Alcoholics. We provision the tools they need to execute discipleship.</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                <div style={{ background: 'rgba(255, 59, 48, 0.1)', padding: '1rem', borderRadius: '12px' }}>
                                    <h3 style={{ color: 'var(--emergency-red)', fontSize: '1.5rem', margin: 0, lineHeight: 1 }}>03</h3>
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Ground Operations</h3>
                                    <p style={{ color: '#aaa', lineHeight: 1.6 }}>Funding physical interventions and live events, bringing the recovered community together to strengthen the ranks and plan the next stage of the offensive.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '6rem' }} className="reveal">
                    <Crosshair size={48} color="var(--text-secondary)" style={{ marginBottom: '2rem', opacity: 0.5 }} />
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>READY TO DEPLOY?</h2>
                    <p style={{ color: '#888', maxWidth: '600px', margin: '0 auto 3rem', fontSize: '1.1rem' }}>
                        Whether it's a one-time supply drop or a recurring logistical contract, your partnership keeps our units in the field.
                    </p>
                    <Link to="/donate" style={{ textDecoration: 'none' }}>
                        <button className="donate-btn" style={{ padding: '18px 48px', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                            FUND THE MISSION
                        </button>
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default Support;
