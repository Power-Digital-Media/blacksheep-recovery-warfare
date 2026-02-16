import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DynamicBackground = ({ activeImage, intensity = 1 }) => {
    return (
        <div className="dynamic-background-container">
            {/* Overall Scroll Intensity */}
            <motion.div
                className="intensity-wrapper"
                animate={{ opacity: intensity }}
                transition={{ duration: 0.1, ease: "linear" }}
            >
                <AnimatePresence>
                    {activeImage && (
                        <motion.div
                            key={activeImage}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="dynamic-bg-layer"
                            style={{
                                backgroundImage: activeImage && activeImage.includes('/')
                                    ? `url(${activeImage})`
                                    : `url(https://img.youtube.com/vi/${activeImage}/maxresdefault.jpg)`,
                            }}
                        />
                    )}
                </AnimatePresence>
            </motion.div>
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
                    background: #000; /* Ensure solid black base */
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
                    transform: scale(1.1); /* Slightly larger scale for immersion */
                }

                .intensity-wrapper {
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                }

                .dynamic-bg-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: radial-gradient(circle at center, transparent 20%, #000 90%);
                    z-index: 1;
                }
            `}</style>
        </div>
    );
};

export default DynamicBackground;
