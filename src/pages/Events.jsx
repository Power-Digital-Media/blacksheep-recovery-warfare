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

            <div className="container" style={{ marginTop: 'clamp(3rem, 10vw, 8rem)' }}>
                <div className="bento-grid">
                    {/* MAIN FEATURED EVENT */}
                    <div className="bento-card span-8 row-6 reveal featured-event-card">
                        <span className="emergency-text event-date">SEPTEMBER 13, 2025</span>
                        <h1 className="event-title">NIGHT OF HOPE</h1>
                        <p className="event-description">
                            A powerful evening of raw testimonies, worship, and real talk
                            about recovery and the relentless grace of Jesus Christ.
                            Live speakers from the Black Sheep community.
                        </p>

                        <div className="event-details-row">
                            <div className="detail-item">
                                <h3 className="detail-title">WORSHIP</h3>
                                <p className="detail-text">Live Music & Spiritual Warfare</p>
                            </div>
                            <div className="detail-item">
                                <h3 className="detail-title">COMMUNITY</h3>
                                <p className="detail-text">Connection & Direct Mentorship</p>
                            </div>
                        </div>

                        <button className="event-cta">
                            JOIN THE FRONT <ArrowRight size={20} />
                        </button>
                    </div>

                    {/* LOGISTICS */}
                    <div className="bento-card span-4 row-2 reveal logistics-card">
                        <MapPin size={24} color="var(--emergency-red)" className="logistics-icon" />
                        <h2>Location</h2>
                        <p>Central Mississippi. Check back for specific venue details soon.</p>
                    </div>

                    <div className="bento-card span-4 row-2 reveal logistics-card">
                        <Users size={24} color="var(--emergency-red)" className="logistics-icon" />
                        <h2>Open Enlistment</h2>
                        <p>Come as you are. Whether in recovery or looking to support, there is a place for you.</p>
                    </div>

                    <div className="bento-card span-4 row-2 reveal logistics-card secondary-card">
                        <Calendar size={24} className="logistics-icon" />
                        <h2>Past Deployments</h2>
                        <p>Relive the impact of previous Night of Hope gatherings.</p>
                    </div>
                </div>
            </div>

            <style>{`
                .featured-event-card { background: var(--warfare-red); border: none; }
                .event-date { color: white; opacity: 0.8; }
                .event-title { color: white; line-height: 0.9; margin: 1rem 0; font-size: clamp(2rem, 8vw, 4.5rem); }
                .event-description { color: rgba(255,255,255,0.9); fontSize: 1.1rem; max-width: 600px; margin-bottom: 2.5rem; line-height: 1.5; }
                .event-details-row { display: flex; gap: 3rem; margin-top: auto; }
                .detail-title { color: white; font-size: 1.1rem; margin-bottom: 0.5rem; }
                .detail-text { color: rgba(255,255,255,0.7); font-size: 0.9rem; }
                .event-cta {
                    margin-top: 3rem;
                    background: white;
                    color: black;
                    border: none;
                    padding: 16px 40px;
                    border-radius: 30px;
                    font-weight: 900;
                    font-size: 1rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    width: fit-content;
                }
                .logistics-icon { margin-bottom: 1rem; }
                .secondary-card { background: var(--charcoal); }

                @media (max-width: 768px) {
                    .event-title { font-size: 2.5rem; }
                    .event-description { font-size: 1rem; margin-bottom: 1.5rem; }
                    .event-details-row { flex-direction: column; gap: 1.5rem; }
                    .event-cta { width: 100%; justify-content: center; margin-top: 2rem; }
                    .featured-event-card { padding: 1.5rem !important; }
                }
            `}</style>
        </div>
    )
}

export default Events
