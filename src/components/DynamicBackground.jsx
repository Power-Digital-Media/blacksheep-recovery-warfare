import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DynamicBackground = ({ backgrounds = {} }) => {
    const getUrl = (img) => {
        if (!img) return '';
        return img.includes('/')
            ? `url(${img})`
            : `url(https://img.youtube.com/vi/${img}/maxresdefault.jpg)`;
    };

    // Filter out backgrounds with negligible intensity to optimize DOM
    const activeLayers = Object.entries(backgrounds).filter(([_, intensity]) => intensity > 0.01);

    return (
        <div className="dynamic-background-container">
            <div className="dynamic-bg-base" />

            <AnimatePresence>
                {activeLayers.map(([id, intensity]) => (
                    <motion.div
                        key={id}
                        initial={{ opacity: 0, scale: 1.08 }}
                        animate={{
                            opacity: intensity,
                            scale: 1 + (1 - intensity) * 0.08 // Subdued zoom-out effect as it activates
                        }}
                        exit={{ opacity: 0, scale: 1.08 }}
                        transition={{
                            opacity: { duration: 0.2, ease: "linear" },
                            scale: { duration: 1.2, ease: "easeOut" }, // Slow, cinematic zoom
                            default: { duration: 0.8, ease: "easeInOut" }
                        }}
                        className="dynamic-bg-layer"
                        style={{
                            backgroundImage: getUrl(id),
                            zIndex: 2,
                            transformOrigin: 'center center'
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
                    filter: blur(8px) brightness(0.4) saturate(1.1); /* Slightly moodier */
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
