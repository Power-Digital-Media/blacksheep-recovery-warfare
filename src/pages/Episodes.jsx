import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Play, Youtube, Radio, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import DynamicBackground from '../components/DynamicBackground'
import EpisodeModal from '../components/EpisodeModal'
import SEO from '../components/SEO'

const EpisodeCard = ({ eps, index, gridClass, onClick }) => {
    return (
        <motion.div
            layoutId={`card-${eps.id}`}
            className={`${gridClass} bento-card episode-card`}
            onClick={onClick}
            style={{ cursor: 'pointer', position: 'relative' }}
        >
            <div className="video-thumb-container">
                <div className="thumb-hover video-link" style={{ pointerEvents: 'none' }}>
                    <img
                        src={`https://img.youtube.com/vi/${eps.ytId}/maxresdefault.jpg`}
                        alt={eps.title}
                        className="video-thumb"
                    />
                    <div className="play-overlay">
                        <Play fill="white" color="white" size={index === 0 ? 44 : 32} />
                    </div>
                </div >
            </div >

            <div className="episode-content">
                <span className="emergency-text episode-date">{eps.date}</span>
                <h2 className="episode-title">{eps.title}</h2>
                <p className="episode-guest">Featuring {eps.guest}</p>
                {index === 0 && <p className="narrative-text episode-desc">{eps.desc}</p>}
                <div className="nav-link episode-cta">
                    WATCH NOW <ArrowRight size={18} />
                </div>
            </div>

            {
                index === 0 && (
                    <img
                        src="/images/blacksheep/Blacksheep YT Collection/YT_TALL.webp"
                        alt="YouTube Sheep"
                        className="featured-sheep-overlay"
                    />
                )
            }
        </motion.div >
    );
};

function Episodes() {
    const [bgMap, setBgMap] = useState({});
    const [selectedEpisode, setSelectedEpisode] = useState(null);
    const containerRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Global scroll tracking for the entire grid area
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Mobile-only Mid-scroll Hero Integration (/dr_monica_webb_cohost.webp)
    // On mobile, she re-appears in the middle of the scroll journey
    const mobileHeroOpacity = useTransform(scrollYProgress, [0.35, 0.5, 0.6, 0.75], [0, 1, 1, 0]);

    // Seamless Cross-fade Ranges:
    // Background 1: Prison to Purpose (_WgBM1YGD-4)
    // Desktop: Full scroll / Mobile: First third
    const opacity1 = useTransform(
        scrollYProgress,
        isMobile ? [0, 0.1, 0.35, 0.5] : [0, 0.1, 0.45, 0.7],
        [0, 1, 1, 0]
    );

    // Background 2: Narrow Path to Redemption (IkWcTAop-N8)
    // Desktop: Second half / Mobile: Final third
    const opacity2 = useTransform(
        scrollYProgress,
        isMobile ? [0.6, 0.75, 0.9, 1] : [0.45, 0.7, 0.9, 1],
        [0, 1, 1, 1]
    );

    useEffect(() => {
        const syncBgs = () => {
            const next = {};
            const v1 = opacity1.get();
            const v2 = opacity2.get();
            const vMidHero = mobileHeroOpacity.get();

            // Add Hero to hologram sequence IF we are on mobile AND she's in her scroll window
            if (isMobile && vMidHero > 0.01) {
                next['/dr_monica_webb_cohost.webp'] = vMidHero;
            }

            if (v1 > 0.01) next['_WgBM1YGD-4'] = v1;
            if (v2 > 0.01) next['IkWcTAop-N8'] = v2;

            setBgMap(next);
        };

        const unsub1 = opacity1.on("change", syncBgs);
        const unsub2 = opacity2.on("change", syncBgs);
        const unsubMid = mobileHeroOpacity.on("change", syncBgs);

        return () => {
            unsub1();
            unsub2();
            unsubMid();
        };
    }, [isMobile, opacity1, opacity2, mobileHeroOpacity]);

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
        // ... episodes array
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

    const podcastSchema = {
        "@context": "https://schema.org",
        "@type": "PodcastSeries",
        "name": "Warfare Reports - Black Sheep Recovery",
        "description": "Raw, unfiltered testimonies of spiritual warfare and the relentless transformation of the soul.",
        "url": "https://blacksheeprecoverywarfare.com/episodes",
        "hasPart": episodes.map(eps => ({
            "@type": "PodcastEpisode",
            "name": eps.title,
            "description": eps.desc,
            "datePublished": `2025-${eps.date.split(' ')[0]}-01`, // Fallback format
            "url": `https://www.youtube.com/watch?v=${eps.ytId}`,
            "associatedMedia": {
                "@type": "ImageObject",
                "url": `https://img.youtube.com/vi/${eps.ytId}/maxresdefault.jpg`
            }
        }))
    };

    return (
        <>
            <SEO
                title="Episodes - Black Sheep Recovery Warfare"
                description="Listen to real conversations about addiction, redemption, and fighting back."
                url="https://blacksheeprecoverywarfare.com/episodes"
                image="https://blacksheeprecoverywarfare.com/dr_monica_webb_cohost.webp"
                schemaData={podcastSchema}
            />
            <DynamicBackground
                backgrounds={bgMap}
                blur="0px"
                bgSize={isMobile ? "cover" : "110%"}
                customPositions={{
                    '_WgBM1YGD-4': 'center center',
                    'IkWcTAop-N8': 'center center',
                    '/dr_monica_webb_cohost.webp': 'center center'
                }}
            />
            <div style={{ position: 'relative', zIndex: 1 }}>
                {/* CINEMATIC HERO */}
                <section className="cinematic-section" style={{ backgroundImage: 'url("/dr_monica_webb_cohost.webp")' }}>
                    <div className="image-overlay"></div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="cinematic-content"
                    >
                        <span className="emergency-text">The Gospel on Air</span>
                        <h1>WARFARE<br />REPORTS</h1>
                        <p className="narrative-text">
                            Raw, unfiltered testimonies of spiritual warfare and the relentless
                            transformation of the soul. These are the voices from the frontline.
                        </p>
                    </motion.div>
                </section>

                <div className="container" ref={containerRef} style={{ marginTop: 'clamp(3rem, 10vw, 8rem)' }}>
                    <div className="bento-grid">
                        {episodes.map((eps, index) => {
                            // PRECISE BENTO MAPPING (Handled by global CSS on mobile)
                            let gridClass = 'span-4 row-4';
                            if (index === 0) gridClass = 'span-8 row-6';
                            else if (index === 1 || index === 2) gridClass = 'span-4 row-3';
                            else if (index >= 3) gridClass = 'span-4 row-5';

                            return (
                                <EpisodeCard
                                    key={eps.id}
                                    eps={eps}
                                    index={index}
                                    gridClass={gridClass}
                                    onClick={() => setSelectedEpisode(eps)}
                                />
                            );
                        })}

                        {/* WATCH ALL CTA */}
                        <div className="span-full watch-all-container">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="watch-all-title">Ready for more warfare?</h3>
                                <div className="watch-all-buttons">
                                    <a
                                        href="https://www.youtube.com/@Brother_Phoenix/videos"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="donate-btn youtube-btn"
                                    >
                                        <Youtube size={24} /> WATCH ALL EPISODES
                                    </a>

                                    <a
                                        href="https://open.spotify.com/show/6rByCbmShGIZJUWXj7Szim"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="donate-btn spotify-btn"
                                    >
                                        <Radio size={24} /> LISTEN ON SPOTIFY
                                    </a>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                <style>{`
                .cinematic-section .image-overlay {
                    background: linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.8) 100%) !important;
                }
                .cinematic-section { 
                    background-position: center 15% !important; 
                    -webkit-mask-image: linear-gradient(to bottom, black 0%, black 75%, transparent 100%);
                    mask-image: linear-gradient(to bottom, black 0%, black 75%, transparent 100%);
                }

                @media (max-width: 768px) {
                    .cinematic-section {
                        background-position: center 15% !important;
                    }
                }

                .episode-card { display: flex; flex-direction: column; transition: border-color 0.3s ease, background 0.3s ease; }
                /* Make cards slightly transparent to show background */
                .bento-card { background: rgba(22, 22, 23, 0.7); backdrop-filter: blur(30px); }
                .bento-card:hover { background: rgba(22, 22, 23, 0.85); border-color: #ff3b30; }

                .video-thumb-container { width: 100%; margin-bottom: 1.5rem; position: relative; }
                .video-link { display: block; width: 100%; aspect-ratio: 16/9; background: #000; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); overflow: hidden; position: relative; cursor: pointer; text-decoration: none; }
                .video-thumb { width: 100%; height: 100%; object-fit: contain; display: block; }
                .episode-content { flex: 1; display: flex; flex-direction: column; }
                .episode-date { font-size: 0.7rem; margin-bottom: 0.5rem; }
                .episode-title { margin-bottom: 0.5rem; line-height: 1.2; }
                .episode-guest { color: var(--text-secondary); margin-bottom: 1rem; font-style: italic; font-size: 0.9rem; }
                .episode-desc { margin-top: 0; margin-bottom: 2rem; font-size: 0.95rem; }
                .episode-cta { margin-top: auto; display: flex; align-items: center; gap: 0.5rem; color: var(--text-primary); font-weight: 700; letter-spacing: 0.05em; font-size: 0.8rem; pointer-events: none; }
                
                .featured-sheep-overlay {
                    position: absolute;
                    bottom: -15px;
                    right: -10px;
                    width: 260px;
                    height: auto;
                    object-fit: contain;
                    pointer-events: none;
                    filter: drop-shadow(0 0 30px rgba(0, 0, 0, 0.5));
                    z-index: 10;
                }

                @media (max-width: 1024px) {
                    .featured-sheep-overlay {
                        width: 200px;
                        bottom: -10px;
                        right: -10px;
                    }
                }
                @media (max-width: 768px) {
                    .featured-sheep-overlay {
                        display: none; /* Hide on small mobile to avoid layout chaos */
                    }
                }
                .watch-all-container { text-align: center; padding: 6rem 0; width: 100%; position: relative; z-index: 2; }
                .watch-all-title { font-size: 2rem; margin-bottom: 2rem; }
                .watch-all-buttons { display: flex; gap: 1.5rem; justify-content: center; flex-wrap: wrap; }
                .youtube-btn { background-color: #ff0000 !important; border: none; font-size: 1.1rem; padding: 18px 40px; }
                .spotify-btn { background-color: #1db954 !important; border: none; font-size: 1.1rem; padding: 18px 40px; }

                @media (max-width: 768px) {
                    .watch-all-container { padding: 4rem 0; }
                    .watch-all-title { font-size: 1.5rem; }
                    .watch-all-buttons { flex-direction: column; width: 100%; }
                    .youtube-btn, .spotify-btn { width: 100%; justify-content: center; font-size: 1rem; }
                    .episode-title { font-size: 1.4rem; }
                }
            `}</style>
            </div>

            <AnimatePresence>
                {selectedEpisode && (
                    <EpisodeModal episode={selectedEpisode} onClose={() => setSelectedEpisode(null)} />
                )}
            </AnimatePresence>
        </>
    )
}

export default Episodes
