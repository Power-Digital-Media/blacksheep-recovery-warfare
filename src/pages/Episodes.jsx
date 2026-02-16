import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Youtube, Radio, ArrowRight } from 'lucide-react'
import DynamicBackground from '../components/DynamicBackground'
import EpisodeModal from '../components/EpisodeModal'

const EpisodeCard = ({ eps, index, gridClass, onActiveChange }) => {
    const cardRef = React.useRef(null);
    const { scrollYProgress } = motion.useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    // Calculate intensity based on how centered the card is
    const intensity = motion.useTransform(
        scrollYProgress,
        [0, 0.35, 0.5, 0.65, 1], // Entering -> Coming to center -> CENTER -> Leaving center -> Exit
        [0, 0, 1, 0, 0]
    );

    // Sync state with parent
    React.useEffect(() => {
        const unsubscribe = intensity.on("change", (latest) => {
            // Only report if intensity is significant
            if (latest > 0.1) {
                onActiveChange(eps.ytId, latest);
            }
        });
        return () => unsubscribe();
    }, [intensity, eps.ytId, onActiveChange]);

    return (
        <motion.div
            ref={cardRef}
            layoutId={`card-${eps.id}`}
            className={`${gridClass} bento-card episode-card`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseEnter={() => onActiveChange(eps.ytId, 1)}
            onMouseLeave={() => onActiveChange(null, 0)}
            style={{ cursor: 'pointer' }}
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
                </div>
            </div>

            <div className="episode-content">
                <span className="emergency-text episode-date">{eps.date}</span>
                <h2 className="episode-title">{eps.title}</h2>
                <p className="episode-guest">Featuring {eps.guest}</p>
                {index === 0 && <p className="narrative-text episode-desc">{eps.desc}</p>}
                <div className="nav-link episode-cta">
                    WATCH NOW <ArrowRight size={18} />
                </div>
            </div>
        </motion.div>
    );
};

function Episodes() {
    const [activeState, setActiveState] = useState({ id: null, intensity: 0 });
    const [selectedEpisode, setSelectedEpisode] = useState(null);

    const handleActiveChange = (id, intensity) => {
        // Simple winner-takes-all logic or blending
        // For mobile, we just want the most recent "centered" one to win if it's over a threshold
        setActiveState(prev => {
            if (id === null) return { id: null, intensity: 0 };
            // If it's a new ID and it has some intensity, it takes over
            if (id !== prev.id && intensity > 0.1) {
                return { id, intensity };
            }
            // If it's the same ID, update intensity
            if (id === prev.id) {
                return { id, intensity };
            }
            return prev;
        });
    };

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

    return (
        <>
            <DynamicBackground activeImage={activeState.id} intensity={activeState.intensity} />
            <div className="animate-in" style={{ position: 'relative', zIndex: 1 }}>
                {/* CINEMATIC HERO */}
                <section className="cinematic-section" style={{ backgroundImage: 'url("/dr_monica_webb_cohost.jpg")' }}>
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

                <div className="container" style={{ marginTop: 'clamp(3rem, 10vw, 8rem)' }}>
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
                                    onActiveChange={handleActiveChange}
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
                                        href="https://open.spotify.com"
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
