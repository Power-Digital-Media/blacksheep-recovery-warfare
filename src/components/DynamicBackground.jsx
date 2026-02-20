import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DynamicBackground = ({ backgrounds = {}, customPositions = {}, blur = '8px' }) => {
    const getUrl = (img) => {
        if (!img) return '';
        const src = img.includes('/')
            ? img
            : `https://img.youtube.com/vi/${img}/maxresdefault.jpg`;
        return `url("${src}")`;
    };

    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Filter out backgrounds with negligible intensity to optimize DOM
    const activeLayers = Object.entries(backgrounds).filter(([_, intensity]) => intensity > 0.01);

    return (
        <div className="dynamic-background-container">
            <div className="dynamic-bg-base" />

            <AnimatePresence>
                {activeLayers.map(([id, intensity]) => (
                    <motion.div
                        key={id}
                        initial={{ opacity: 0, scale: isMobile ? 1.05 : 1.08 }}
                        animate={{
                            opacity: intensity,
                            scale: isMobile
                                ? (1.05 - (intensity * 0.12)) // Deep zoom out for mobile (1.05 -> 0.93)
                                : (1 + (1 - intensity) * 0.08)
                        }}
                        exit={{ opacity: 0, scale: isMobile ? 1.05 : 1.08 }}
                        transition={{
                            opacity: { duration: 0.2, ease: "linear" },
                            scale: { duration: 1.2, ease: "easeOut" },
                            default: { duration: 0.8, ease: "easeInOut" }
                        }}
                        className="dynamic-bg-layer"
                        style={{
                            backgroundImage: getUrl(id),
                            zIndex: 2,
                            transformOrigin: 'center center',
                            backgroundPosition: customPositions[id] || 'center 25%',
                            filter: `blur(${isMobile ? '0px' : blur}) brightness(0.4) saturate(1.1)`
                        }}
                    />
                ))}
            </AnimatePresence>

            <div className="dynamic-bg-overlay" />

            <style>{`
                .dynamic-background-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    z-index: 0;
                    pointer-events: none;
                    overflow: hidden;
                    background: #000;
                }

                .dynamic-bg-base {
                    position: absolute;
                    inset: 0;
                    background: #0a0a0a;
                    z-index: 1;
                }

                .dynamic-bg-layer {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-size: cover;
                    background-position: center;
                    background-position: center 25%;
                }

                .dynamic-bg-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: radial-gradient(circle at center, transparent 10%, #000 95%);
                    z-index: 3;
                }
            `}</style>
        </div>
    );
};

export default DynamicBackground;
