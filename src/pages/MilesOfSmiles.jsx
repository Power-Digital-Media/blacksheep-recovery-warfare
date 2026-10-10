import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Smile, Heart, HandHeart, Megaphone, Stethoscope, Send, ArrowRight, Users, Target, Sparkles } from 'lucide-react'
import SEO from '../components/SEO'

const NOMINATE_MAIL = 'mailto:contact@blacksheeprecoverywarfare.org?subject=Miles%20of%20Smiles%20-%20Nomination&body=Tell%20us%20their%20name%2C%20their%20story%2C%20and%20how%20to%20reach%20them.'
const SPONSOR_MAIL = 'mailto:contact@blacksheeprecoverywarfare.org?subject=Miles%20of%20Smiles%20-%20Sponsor%20a%20Smile'

// Update these as recipients are confirmed / stories are approved.
const SMILES_GOAL = 99

const recipients = [
    {
        number: 1,
        name: 'Amy Searle',
        blurb: 'Amy became the first recipient of the Miles of Smiles Initiative, beginning a mission we believe will impact many more lives.',
        before: '/images/miles-of-smiles/amy-before.webp',
        after: '/images/miles-of-smiles/amy-after.webp',
        story: null // add Amy's approved story here
    },
    {
        number: 2,
        name: 'April Cook',
        blurb: 'April became our second Miles of Smiles recipient, continuing the mission of restoring confidence and celebrating the transformation that comes through recovery.',
        before: '/images/miles-of-smiles/april-before.webp',
        after: '/images/miles-of-smiles/april-after.webp',
        story: null // add April's approved story here
    }
]

const nextSmile = {
    number: 3,
    name: 'Ashley Greene',
    note: 'Had her first appointment today! Follow along as her transformation unfolds.'
}

const ways = [
    { icon: HandHeart, text: 'Sponsoring dental work for a recipient' },
    { icon: Heart, text: 'Donating toward the Miles of Smiles Initiative' },
    { icon: Stethoscope, text: 'Providing professional dental or laboratory services' },
    { icon: Users, text: 'Helping us identify someone in recovery who desperately needs a new smile' },
    { icon: Megaphone, text: 'Sharing these stories so the right people can see them' }
]

function BeforeAfter({ before, after, name }) {
    const ref = useRef(null)
    // 0 when the frame's center is a bit below the middle of the screen (full BEFORE showing),
    // 1 once it has scrolled up past the middle (full AFTER showing)
    const { scrollYProgress } = useScroll({ target: ref, offset: ['center 68%', 'center 28%'] })
    const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })
    const beforeOpacity = useTransform(progress, [0, 1], [1, 0])
    const beforeTag = useTransform(progress, [0, 0.4], [1, 0])
    const afterTag = useTransform(progress, [0.6, 1], [0, 1])
    const scale = useTransform(progress, [0, 1], [1, 1.04])
    const barWidth = useTransform(progress, [0, 1], ['0%', '100%'])
    return (
        <div className="mos-slider" ref={ref} role="img" aria-label={`${name}: before and after`}>
            <motion.div className="mos-layer" style={{ scale }}>
                <img src={after} alt={`${name} after`} className="mos-img" width="500" height="625" loading="lazy" decoding="async" />
                <motion.img src={before} alt={`${name} before`} className="mos-img" width="500" height="625" loading="lazy" decoding="async" style={{ opacity: beforeOpacity }} />
            </motion.div>
            <motion.span className="mos-tag mos-tag-l" style={{ opacity: beforeTag }}>BEFORE</motion.span>
            <motion.span className="mos-tag mos-tag-r" style={{ opacity: afterTag }}>AFTER</motion.span>
            <div className="mos-bar"><motion.div style={{ width: barWidth }} /></div>
        </div>
    )
}

function MilesOfSmiles() {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active') })
        }, { threshold: 0.1 })
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
        return () => observer.disconnect()
    }, [])

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Miles of Smiles - Black Sheep Recovery Warfare",
        "description": "Miles of Smiles helps men and women in recovery restore their smile, their confidence, and their dignity.",
        "url": "https://blacksheeprecoverywarfare.com/miles-of-smiles"
    }

    const scrollTo = (id) => (e) => {
        e.preventDefault()
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        if (window.location.hash) {
            window.history.replaceState(null, '', window.location.pathname)
        }
    }, [])

    return (
        <div className="mos-page">
            <SEO
                title="Miles of Smiles - Black Sheep Recovery Warfare"
                description="Miles of Smiles is an outreach initiative of Black Sheep Recovery Warfare restoring smiles, confidence, and dignity for men and women in recovery."
                url="https://blacksheeprecoverywarfare.com/miles-of-smiles"
                image="https://blacksheeprecoverywarfare.com/images/miles-of-smiles/april-after.webp"
                schemaData={schema}
            />

            {/* HERO */}
            <section className="cinematic-section mos-hero" style={{ backgroundImage: 'url("/images/miles-of-smiles/hero.webp")', backgroundPosition: 'center 30%' }}>
                <div className="image-overlay" style={{ background: 'radial-gradient(circle at 50% 40%, rgba(212,160,23,0.22), rgba(0,0,0,0.88) 65%), linear-gradient(to bottom, rgba(0,0,0,0.6), #000)' }}></div>
                <div className="cinematic-content reveal">
                    <h1 className="mos-sr">Miles of Smiles - Black Sheep Recovery Warfare</h1>
                    <img
                        src="/images/miles-of-smiles/logo.webp"
                        alt="Miles of Smiles Initiative - Black Sheep Recovery Warfare"
                        className="mos-hero-logo"
                        width="520"
                        height="520"
                        fetchpriority="high"
                        decoding="async"
                    />
                    <p className="narrative-text">
                        Restoring Smiles. Restoring Confidence.<br />Reminding People They Matter.
                    </p>
                    <div className="mos-hero-btns">
                        <button type="button" onClick={scrollTo('nominate')} className="donate-btn" style={{ cursor: 'pointer', border: 'none' }}>GET INVOLVED</button>
                        <button type="button" onClick={scrollTo('smiles')} className="mos-ghost" style={{ cursor: 'pointer', background: 'transparent' }}>MEET THE SMILES</button>
                    </div>
                </div>
            </section>

            <div className="container" style={{ marginTop: 'clamp(3rem, 10vw, 6rem)' }}>

                {/* COUNTER */}
                <div className="bento-grid" style={{ marginBottom: '4rem' }}>
                    <div className="bento-card span-4 reveal mos-stat mos-glow mos-red">
                        <Smile size={40} color="var(--emergency-red)" />
                        <h2>{recipients.length}</h2>
                        <span>Smiles Restored</span>
                    </div>
                    <div className="bento-card span-4 reveal mos-stat mos-glow mos-gold" style={{ transitionDelay: '0.1s' }}>
                        <Sparkles size={40} color="var(--emergency-red)" />
                        <h2 style={{ fontSize: '2rem' }}>{nextSmile.name.toUpperCase()}</h2>
                        <span>Next Smile</span>
                    </div>
                    <div className="bento-card span-4 reveal mos-stat mos-glow mos-red" style={{ transitionDelay: '0.2s' }}>
                        <Target size={40} color="var(--emergency-red)" />
                        <h2>{SMILES_GOAL}</h2>
                        <span>Smiles Goal · We Are the 99</span>
                        <div className="mos-progress"><div style={{ width: `${(recipients.length / SMILES_GOAL) * 100}%` }} /></div>
                    </div>
                </div>

                {/* WHY */}
                <div className="bento-grid" style={{ marginBottom: '4rem' }}>
                    <div className="bento-card span-full reveal mos-why">
                        <span className="emergency-text">The Mission</span>
                        <h2>RECOVERY CHANGES THE HEART.<br />SOMETIMES WE GET TO CHANGE THE SMILE TOO.</h2>
                        <div className="mos-cols">
                            <p>
                                Miles of Smiles is an outreach initiative of Black Sheep Recovery Warfare created to help men and women in recovery restore something addiction often takes away — their smile.
                            </p>
                            <p>
                                For many who have lived through years of addiction, homelessness, incarceration, abuse, or life on the streets, dental damage becomes another visible reminder of the life they are trying to leave behind.
                            </p>
                            <p>
                                A new smile may seem like a small thing until you've spent years refusing to smile in pictures, covering your mouth when you laugh, or walking into a job interview ashamed of your teeth.
                            </p>
                            <p>
                                Through partnerships with compassionate dentists, businesses, sponsors, donors, and the Black Sheep Army, we help deserving men and women receive life-changing dental care. Every smile has a story. Every person has value. And everybody deserves to know their life is worth fighting for.
                            </p>
                        </div>
                        <blockquote className="mos-quote">
                            “They triumphed over him by the blood of the Lamb and by the word of their testimony.”
                            <cite>REVELATION 12:11</cite>
                        </blockquote>
                    </div>
                </div>

                {/* THE SMILES */}
                <div id="smiles" style={{ marginBottom: '2rem', textAlign: 'center' }} className="reveal">
                    <span className="emergency-text">The Smiles</span>
                    <h2 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 900 }}>EVERY SMILE HAS A STORY</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Keep scrolling to watch each transformation unfold.</p>
                </div>

                <div className="mos-recipients">
                    {recipients.map((r) => (
                        <div key={r.name} className="bento-card reveal mos-recipient mos-glow mos-gold">
                            <BeforeAfter before={r.before} after={r.after} name={r.name} />
                            <div className="mos-info">
                                <span className="mos-num">SMILE #{r.number}</span>
                                <h3>{r.name.toUpperCase()}</h3>
                                <p>{r.blurb}</p>
                                <div className="mos-story">
                                    <strong>THEIR STORY</strong>
                                    <p>{r.story || `${r.name.split(' ')[0]}'s story is coming soon.`}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="bento-card reveal mos-recipient mos-soon mos-glow mos-red">
                        <div className="mos-soon-photo"><Smile size={64} color="var(--emergency-red)" /></div>
                        <div className="mos-info">
                            <span className="mos-num">SMILE #{nextSmile.number}</span>
                            <h3>{nextSmile.name.toUpperCase()}</h3>
                            <p>{nextSmile.note || 'Coming soon. Follow along as the next transformation unfolds.'}</p>
                        </div>
                    </div>
                </div>

                {/* GET INVOLVED */}
                <div id="nominate" className="bento-grid" style={{ margin: '6rem 0 4rem' }}>
                    <div className="bento-card span-full reveal" style={{ padding: 'clamp(2rem, 5vw, 4rem)', background: 'linear-gradient(145deg, rgba(20,20,20,0.9), rgba(10,10,10,0.95))', border: '1px solid rgba(255,59,48,0.2)' }}>
                        <span className="emergency-text">Join the Mission</span>
                        <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', lineHeight: 1.15, marginBottom: '0.5rem' }}>HELP US CREATE THE NEXT SMILE</h2>
                        <p style={{ color: '#aaa', maxWidth: 700, lineHeight: 1.6 }}>
                            Miles of Smiles isn't about cosmetic dentistry. It's about restoration. We're looking for dentists, dental professionals, laboratories, businesses, churches, organizations, and individuals willing to partner with us. You can help by:
                        </p>
                        <ul className="mos-ways">
                            {ways.map(({ icon: Icon, text }) => (
                                <li key={text}><Icon size={22} color="var(--emergency-red)" /><span>{text}</span></li>
                            ))}
                        </ul>
                    </div>

                    <div className="bento-card span-4 reveal mos-cta mos-glow mos-red">
                        <Send size={32} color="var(--emergency-red)" />
                        <h3>NOMINATE SOMEONE</h3>
                        <p>Know someone who has fought their way out of addiction and is rebuilding their life but desperately needs dental help? Tell us their story.</p>
                        <a href={NOMINATE_MAIL} className="mos-btn">NOMINATE <ArrowRight size={16} /></a>
                    </div>
                    <div className="bento-card span-4 reveal mos-cta mos-glow mos-gold" style={{ transitionDelay: '0.1s' }}>
                        <HandHeart size={32} color="var(--emergency-red)" />
                        <h3>SPONSOR A SMILE</h3>
                        <p>Businesses, churches, dental professionals, and individuals can directly help restore someone's smile and confidence.</p>
                        <a href={SPONSOR_MAIL} className="mos-btn">SPONSOR <ArrowRight size={16} /></a>
                    </div>
                    <div className="bento-card span-4 reveal mos-cta mos-glow mos-red" style={{ transitionDelay: '0.2s' }}>
                        <Heart size={32} color="var(--emergency-red)" />
                        <h3>SUPPORT THE MISSION</h3>
                        <p>Your support lets us keep meeting people where they are and restoring what addiction tried to destroy.</p>
                        <Link to="/donate" className="mos-btn mos-btn-solid">DONATE <ArrowRight size={16} /></Link>
                    </div>
                </div>

                <div className="reveal" style={{ textAlign: 'center', padding: '2rem 0 8rem' }}>
                    <h2 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 900, margin: 0 }}>WE ARE THE 99.</h2>
                </div>
            </div>

            <style>{`
                .mos-red { --glow-rgb: 255, 59, 48; }
                .mos-gold { --glow-rgb: 212, 160, 23; }
                .bento-card.mos-glow {
                    background: #000 !important;
                    border: 1px solid rgba(var(--glow-rgb), 0.35) !important;
                    border-radius: 28px !important;
                    transition: box-shadow 0.4s ease, border-color 0.4s ease, transform 0.4s ease;
                }
                .bento-card.mos-glow:hover {
                    border-color: rgba(var(--glow-rgb), 0.9) !important;
                    box-shadow: 0 0 30px rgba(var(--glow-rgb), 0.5), 0 0 60px rgba(var(--glow-rgb), 0.2);
                    transform: translateY(-4px);
                }
                @media (max-width: 768px) {
                    .bento-card.mos-glow:hover { transform: none; }
                    .bento-card.mos-glow {
                        border-color: rgba(var(--glow-rgb), calc(0.25 + 0.65 * var(--scroll-intensity, 0.5))) !important;
                        box-shadow: 0 0 calc(15px + 25px * var(--scroll-intensity, 0.5)) rgba(var(--glow-rgb), calc(0.25 + 0.35 * var(--scroll-intensity, 0.5))) !important;
                    }
                }
                .mos-hero { min-height: 90vh; }
                @media (max-width: 600px) {
                    .mos-hero { min-height: 0 !important; padding: 3rem 0 2rem !important; }
                    .mos-hero + .container { margin-top: 1rem !important; }
                    .mos-hero-btns { margin-top: 1.25rem; }
                }
                .mos-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
                .mos-hero-logo { width: min(520px, 80vw); height: auto; margin: 0 auto 1rem; display: block; filter: drop-shadow(0 0 40px rgba(212,160,23,0.35)); }
                .mos-hero-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-top: 2rem; }
                .mos-ghost { padding: 12px 28px; border: 1px solid rgba(255,255,255,0.3); border-radius: 999px; color: #fff; text-decoration: none; font-weight: 800; letter-spacing: 1px; font-size: 0.85rem; transition: all .3s; }
                .mos-ghost:hover { border-color: var(--emergency-red); color: var(--emergency-red); }
                .mos-stat { text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 3rem 2rem; gap: .5rem; }
                .mos-stat h2 { font-size: 3.5rem; margin: .5rem 0 0; font-weight: 900; }
                .mos-stat span { color: var(--text-secondary); text-transform: uppercase; letter-spacing: 2px; font-size: .8rem; }
                .mos-progress { width: 100%; max-width: 220px; height: 6px; background: rgba(255,255,255,.08); border-radius: 99px; margin-top: .75rem; overflow: hidden; }
                .mos-progress div { height: 100%; min-width: 6px; background: var(--emergency-red); box-shadow: 0 0 12px var(--emergency-red); }
                .mos-why { padding: clamp(2rem, 5vw, 4rem); }
                .mos-why h2 { font-size: clamp(1.6rem, 4vw, 2.6rem); line-height: 1.2; margin: .5rem 0 2rem; }
                .mos-cols { columns: 2; column-gap: 3rem; color: #aaa; line-height: 1.7; }
                .mos-cols p { margin: 0 0 1.2rem; break-inside: avoid; }
                .mos-quote { margin: 2rem 0 0; padding-left: 1.2rem; border-left: 3px solid var(--emergency-red); font-style: italic; font-size: 1.1rem; }
                .mos-quote cite { display: block; margin-top: .5rem; font-style: normal; font-weight: 800; letter-spacing: 2px; font-size: .8rem; color: var(--emergency-red); }
                .mos-recipients { display: grid; gap: 2rem; }
                .mos-recipient { display: grid; grid-template-columns: minmax(280px, 440px) 1fr; gap: 0; padding: 0; overflow: hidden; align-items: stretch; }
                .mos-info { padding: clamp(1.5rem, 4vw, 3rem); display: flex; flex-direction: column; justify-content: center; gap: .5rem; }
                .mos-info h3 { font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 900; margin: 0; }
                .mos-info p { color: #aaa; line-height: 1.6; margin: 0; }
                .mos-num { color: var(--emergency-red); font-family: monospace; letter-spacing: 4px; font-size: .8rem; font-weight: 800; }
                .mos-story { margin-top: 1rem; padding: 1.2rem; border: 1px dashed rgba(255,255,255,.15); border-radius: 12px; }
                .mos-story strong { font-size: .75rem; letter-spacing: 3px; color: #fff; opacity: .6; display: block; margin-bottom: .5rem; }
                .mos-story p { font-style: italic; }
                .mos-soon-photo { display: flex; align-items: center; justify-content: center; min-height: 220px; background: radial-gradient(circle, rgba(255,59,48,.15), transparent 70%); }
                .mos-slider { position: relative; aspect-ratio: 4 / 5; overflow: hidden; background: #000; }
                .mos-layer { position: absolute; inset: 0; will-change: transform; }
                .mos-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
                .mos-bar { position: absolute; left: 0; right: 0; bottom: 0; height: 4px; background: rgba(255,255,255,.1); }
                .mos-bar div { height: 100%; background: var(--emergency-red); box-shadow: 0 0 12px var(--emergency-red); }
                .mos-tag { position: absolute; bottom: 14px; padding: 4px 12px; background: rgba(0,0,0,.65); border-radius: 99px; font-size: .7rem; font-weight: 800; letter-spacing: 2px; pointer-events: none; }
                .mos-tag-l { left: 14px; } .mos-tag-r { right: 14px; }
                .mos-ways { list-style: none; padding: 0; margin: 2rem 0 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; }
                .mos-ways li { display: flex; gap: 1rem; align-items: flex-start; padding: 1rem 1.2rem; background: rgba(255,59,48,.06); border-radius: 12px; color: #ddd; line-height: 1.4; }
                .mos-ways svg { flex-shrink: 0; margin-top: 2px; }
                .mos-cta { display: flex; flex-direction: column; gap: 1rem; padding: 2.5rem 2rem; }
                .mos-cta h3 { margin: 0; font-size: 1.4rem; font-weight: 900; }
                .mos-cta p { color: #aaa; line-height: 1.6; margin: 0; flex: 1; }
                .mos-btn { display: inline-flex; align-items: center; gap: 8px; align-self: flex-start; padding: 10px 24px; border: 1px solid var(--emergency-red); border-radius: 8px; color: var(--emergency-red); text-decoration: none; font-weight: 900; letter-spacing: 1px; font-size: .8rem; transition: all .3s; }
                .mos-btn:hover, .mos-btn-solid { background: var(--emergency-red); color: #fff; }
                .mos-btn-solid:hover { background: var(--warfare-red); }
                @media (max-width: 800px) {
                    .mos-cols { columns: 1; }
                    .mos-recipient { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    )
}

export default MilesOfSmiles
