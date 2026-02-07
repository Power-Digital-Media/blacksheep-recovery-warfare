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

            <div className="container" style={{ marginTop: 'clamp(3rem, 10vw, 8rem)' }}>
                <div className="bento-grid">
                    {/* MAIN DONATION MODULE */}
                    <div className="bento-card span-8 row-6 reveal donate-card">
                        <div className="donate-intro">
                            <Heart size={32} color="var(--emergency-red)" className="donate-icon" />
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
                                DONATE VIA PAYPAL <ExternalLink size={18} />
                            </a>

                            <div className="donation-footer">
                                <ShieldCheck size={20} />
                                <span>TAX DEDUCTIBLE</span>
                            </div>
                        </div>
                    </div>

                    <style>{`
                        .donate-card { display: flex; flex-direction: column; }
                        .donate-icon { margin-bottom: 1.5rem; }
                        .donate-intro { margin-bottom: 2rem; }
                        .donate-description { font-size: 1.1rem; margin-bottom: 2rem; line-height: 1.6; }
                        .donation-container { 
                            margin-top: auto; 
                            padding: clamp(1.5rem, 5vw, 3rem); 
                            background: rgba(255,255,255,0.02); 
                            border-radius: 24px; 
                            border: 1px solid rgba(255,255,255,0.05); 
                            text-align: center; 
                        }
                        .donation-container h3 { margin-bottom: 1rem; font-size: clamp(1.2rem, 3vw, 1.5rem); }
                        .donation-subtext { color: var(--text-secondary); margin-bottom: 2.5rem; }
                        .donation-cta { 
                            font-size: 1.1rem; 
                            padding: 18px 45px !important; 
                            display: inline-flex; 
                            align-items: center;
                            gap: 12px;
                            text-decoration: none;
                        }
                        .donation-footer { 
                            display: flex; 
                            justify-content: center; 
                            gap: 2rem; 
                            margin-top: 3rem; 
                            opacity: 0.5; 
                            font-size: 0.8rem; 
                            letter-spacing: 1px;
                        }

                        @media (max-width: 768px) {
                            .donation-container { padding: 1.5rem; }
                            .donation-cta { width: 100%; justify-content: center; }
                            .donation-footer { gap: 1rem; }
                        }
                    `}</style>

                    {/* SCRIPTURE PILLAR */}
                    <div className="bento-card span-4 row-2 reveal scripture-card">
                        <span className="emergency-text">The Foundation</span>
                        <p className="scripture-text">
                            "But he was pierced for our transgressions, he was crushed for our iniquities..."
                        </p>
                        <div className="scripture-ref">ISAIAH 53</div>
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
                    <div className="bento-card span-4 row-2 reveal contact-pillar">
                        <h2>Other Ways to Give</h2>
                        <p className="contact-text">
                            For corporate sponsorship or physical donations, reach out directly at
                            contact@blacksheeprecoverywarfare.org
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
                .scripture-card { display: flex; flex-direction: column; }
                .scripture-text { font-size: 1.1rem; font-style: italic; color: var(--text-primary); line-height: 1.5; }
                .scripture-ref { margin-top: auto; font-weight: bold; letter-spacing: 2px; font-size: 0.9rem; }
                .contact-pillar { background: var(--charcoal); }
                .contact-text { font-size: 0.9rem; line-height: 1.5; }
            `}</style>
        </div>
    )
}

export default Donate
