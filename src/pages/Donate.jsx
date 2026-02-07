import React, { useEffect } from 'react'
import { Heart, ShieldCheck, ExternalLink } from 'lucide-react'

function Donate() {
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
            <section className="cinematic-section" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?auto=format&fit=crop&q=80&w=2000")' }}>
                <div className="image-overlay"></div>
                <div className="cinematic-content reveal">
                    <span className="emergency-text">Giving is Warfare</span>
                    <h1>FUEL THE<br />MISSION</h1>
                    <p className="narrative-text">
                        Your support fuels the recovery strategy. Every dollar directly impacts
                        lives currently lost in the shadow of addiction. Join the offensive.
                    </p>
                </div>
            </section>

            <div className="container" style={{ marginTop: '8rem' }}>
                <div className="bento-grid">
                    {/* MAIN DONATION MODULE */}
                    <div className="bento-card span-8 row-6 reveal">
                        <div style={{ marginBottom: '2rem' }}>
                            <Heart size={32} color="var(--emergency-red)" style={{ marginBottom: '1.5rem' }} />
                            <h2>Ministry Operations</h2>
                            <p className="donate-description">
                                Your financial support allows us to continue sharing stories of
                                redemption and God's relentless grace through our podcast,
                                sober living resources, and community outreach.
                            </p>
                        </div>

                        <div className="donation-container">
                            <h3>Secure Contribution</h3>
                            <p className="donation-subtext">Contributions are processed securely via PayPal.</p>

                            <a href="#" className="donate-btn donation-cta">
                                DONATE VIA PAYPAL <ExternalLink size={18} style={{ marginLeft: '10px' }} />
                            </a>

                            <div className="donation-footer">
                                <ShieldCheck size={20} />
                                <span>TAX DEDUCTIBLE</span>
                            </div>
                        </div>
                    </div>

                    <style>{`
                        .donate-description { fontSize: 1.1rem; marginBottom: 2rem; }
                        .donation-container { marginTop: auto; padding: clamp(1.5rem, 5vw, 3rem); background: rgba(255,255,255,0.02); borderRadius: 24px; border: 1px solid rgba(255,255,255,0.05); textAlign: center; }
                        .donation-container h3 { marginBottom: 1rem; fontSize: clamp(1.2rem, 3vw, 1.5rem); }
                        .donation-subtext { color: var(--text-secondary); marginBottom: 2.5rem; }
                        .donation-cta { fontSize: 1.1rem; padding: 15px 40px !important; display: inline-flex; }
                        .donation-footer { display: flex; justifyContent: center; gap: 2rem; marginTop: 3rem; opacity: 0.5; fontSize: 0.8rem; }

                        @media (max-width: 600px) {
                            .donation-container { padding: 1.5rem; }
                            .donation-cta { width: 100%; }
                        }
                    `}</style>

                    {/* SCRIPTURE PILLAR */}
                    <div className="bento-card span-4 row-2 reveal">
                        <span className="emergency-text">The Foundation</span>
                        <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--text-primary)' }}>
                            "But he was pierced for our transgressions, he was crushed for our iniquities..."
                        </p>
                        <div style={{ marginTop: 'auto', fontWeight: 'bold' }}>ISAIAH 53</div>
                    </div>

                    {/* IMPACT PILLAR */}
                    <div className="bento-card span-4 row-2 reveal">
                        <h2>Mission Fuel</h2>
                        <p>
                            Support provides safe discipleship environments and vertical
                            mentorship for those in transition from addiction.
                        </p>
                    </div>

                    {/* CONTACT PILLAR */}
                    <div className="bento-card span-4 row-2 reveal" style={{ background: 'var(--charcoal)' }}>
                        <h2>Other Ways to Give</h2>
                        <p style={{ fontSize: '0.9rem' }}>
                            For corporate sponsorship or physical donations, reach out directly at
                            contact@blacksheeprecoverywarfare.org
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Donate
