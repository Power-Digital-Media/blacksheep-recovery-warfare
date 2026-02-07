import React, { useEffect } from 'react'
import { BookOpen, ExternalLink, ShieldCheck, Youtube } from 'lucide-react'

function Resources() {
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

    const resources = [
        { name: 'Trapped in the Addict', type: 'Literature', author: 'John Gallagher', impact: 'Core Doctrine' },
        { name: 'Mercy House Teen Challenge', type: 'Residential', author: 'Mississippi', impact: 'Direct Intervention' },
        { name: 'The Uncommon Christian', type: 'Podcast', author: 'Ministry Partners', impact: 'Spiritual Growth' },
        { name: 'Unashamed Recovery', type: 'Visuals', author: 'YouTube', impact: 'Cultural Warfare' }
    ]

    return (
        <div className="animate-in">
            {/* CINEMATIC HERO */}
            <section className="cinematic-section" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=2000")' }}>
                <div className="image-overlay"></div>
                <div className="cinematic-content reveal">
                    <span className="emergency-text">Strategic Intelligence</span>
                    <h1>TACTICAL<br />INTEL</h1>
                    <p className="narrative-text">
                        Equipping the saints with the knowledge and tools necessary to
                        sustain the recovered life. Every resource is a weapon for the welfare.
                    </p>
                </div>
            </section>

            <div className="container" style={{ marginTop: 'clamp(3rem, 10vw, 8rem)' }}>
                <div className="bento-grid">
                    {/* RESOURCE LIST */}
                    {resources.map((res, idx) => (
                        <div key={idx} className="bento-card span-6 row-3 reveal resource-card">
                            <div className="resource-header">
                                <span className="emergency-text resource-type">{res.type}</span>
                                <span className="resource-impact">{res.impact}</span>
                            </div>
                            <h2 className="resource-name">{res.name}</h2>
                            <p className="resource-author">By {res.author}</p>
                            <div className="resource-link">
                                OPEN RESOURCE <ExternalLink size={14} />
                            </div>
                        </div>
                    ))}

                    {/* FEATURED DOCUMENTARY/PROJECT */}
                    <div className="bento-card span-full row-4 reveal featured-intel-card">
                        <Youtube size={32} color="var(--emergency-red)" className="card-icon" />
                        <div className="featured-intel-container">
                            <div className="featured-intel-content">
                                <span className="emergency-text">Featured Intelligence</span>
                                <h1 className="featured-title">4 Mics, 13 Teeth, 1 Ankle Monitor</h1>
                                <p className="featured-desc">
                                    A raw, cinematic perspective on the journey from federal oversight
                                    to spiritual freedom. This project documents the reality of the
                                    warfare we are engaged in.
                                </p>
                            </div>
                            <button className="donate-btn featured-cta">
                                WATCH PROJECT
                            </button>
                        </div>
                    </div>

                    <style>{`
                        .resource-card { display: flex; flex-direction: column; }
                        .resource-header { display: flex; justify-content: space-between; align-items: flex-start; }
                        .resource-type { font-size: 0.65rem; }
                        .resource-impact { font-size: 0.65rem; opacity: 0.4; text-transform: uppercase; letter-spacing: 1px; }
                        .resource-name { margin-top: 1rem; margin-bottom: 0.5rem; font-size: 1.4rem; }
                        .resource-author { font-size: 1.05rem; color: var(--text-secondary); margin-bottom: 2rem; }
                        .resource-link { margin-top: auto; display: flex; alignItems: center; gap: 8px; font-weight: bold; color: var(--emergency-red); font-size: 0.85rem; letter-spacing: 1px; }

                        .featured-intel-card { background: var(--charcoal); border-left: 4px solid var(--emergency-red); }
                        .card-icon { margin-bottom: 1.5rem; }
                        .featured-intel-container { display: flex; justify-content: space-between; align-items: flex-end; gap: 2rem; }
                        .featured-intel-content { max-width: 700px; }
                        .featured-title { font-size: clamp(1.6rem, 4vw, 2.5rem); margin-bottom: 1rem; line-height: 1.1; }
                        .featured-desc { font-size: 1.1rem; color: var(--text-secondary); line-height: 1.5; }
                        .featured-cta { border: none; cursor: pointer; padding: 18px 45px !important; white-space: nowrap; }

                        @media (max-width: 900px) {
                            .featured-intel-container { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
                            .featured-intel-content { max-width: 100%; }
                            .featured-cta { width: 100%; text-align: center; }
                            .resource-name { font-size: 1.25rem; }
                        }
                    `}</style>

                    {/* CORE PILLAR */}
                    <div className="bento-card span-4 row-2 reveal">
                        <BookOpen size={24} color="var(--emergency-red)" className="pillar-icon" />
                        <h2>The Word</h2>
                        <p>The ultimate strategic manual for every recovered soul. Daily grounding in scripture.</p>
                    </div>

                    {/* SUPPORT PILLAR */}
                    <div className="bento-card span-4 row-2 reveal">
                        <ShieldCheck size={24} color="var(--emergency-red)" className="pillar-icon" />
                        <h2>Verified Partners</h2>
                        <p>Connecting you with vetted, faith-based recovery hubs across the nation.</p>
                    </div>

                    <div className="bento-card span-4 row-2 reveal">
                        <h2>Direct Support</h2>
                        <p>Need urgent strategic advice? Reach out via our tactical response channels.</p>
                    </div>
                </div>
            </div>

            <style>{`
                .pillar-icon { margin-bottom: 1rem; }
            `}</style>
        </div>
    )
}

export default Resources
