import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DynamicBackground = ({ activeImage, intensity = 1 }) => {
    return (
        <div className="dynamic-background-container">
            <div className="dynamic-bg-base" />

            <AnimatePresence mode="popLayout">
                {activeImage && (
                    <motion.div
                        key={activeImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: intensity }}
                        exit={{ opacity: 0 }}
                        transition={{
                            opacity: { duration: 0.1, ease: "linear" }, // Fast intensity tracking
                            default: { duration: 0.8, ease: "easeInOut" } // Smooth image swap
                        }}
                        className="dynamic-bg-layer"
                        style={{
                            backgroundImage: activeImage && activeImage.includes('/')
                                ? `url(${activeImage})`
                                : `url(https://img.youtube.com/vi/${activeImage}/maxresdefault.jpg)`,
                        }}
                    />
                )}
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
                    filter: blur(8px) brightness(0.6) saturate(1.2);
                    transform: scale(1.1);
                    z-index: 2;
                }

                .dynamic-bg-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: radial-gradient(circle at center, transparent 20%, #000 90%);
                    z-index: 3;
                }
            `}</style>
        </div>
    );
};

export default DynamicBackground;
