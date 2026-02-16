import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const EpisodeModal = ({ episode, onClose }) => {
    if (!episode) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1000 }}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundImage: `url(https://img.youtube.com/vi/${episode.ytId}/maxresdefault.jpg)`,
                    filter: 'blur(8px) brightness(0.4) saturate(1.2)', // Slightly darker than hover for focus
                    transform: 'scale(1.05)'
                }}
            />
            {/* Dark overlay for readability */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.6)', // Less opaque to show bg
                    backdropFilter: 'blur(5px)'
                }}
                onClick={onClose}
            />

            <motion.div
                layoutId={`card-${episode.id}`}
                className="relative w-full max-w-5xl bg-[#161617] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                style={{
                    width: '90%',
                    maxWidth: '1000px',
                    background: '#161617',
                    borderRadius: '28px',
                    overflow: 'hidden',
                    position: 'relative',
                    zIndex: 10,
                    border: '1px solid rgba(255,255,255,0.1)',
                    maxHeight: '90vh',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                {/* VIDEO PLAYER CONTAINER - 16:9 Aspect Ratio */}
                <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', background: '#000' }}>
                    <iframe
                        src={`https://www.youtube.com/embed/${episode.ytId}?autoplay=1&rel=0&modestbranding=1`}
                        title={episode.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            border: 'none',
                        }}
                    />
                </div>

                {/* CONTENT */}
                <div className="p-8" style={{ padding: '2rem', overflowY: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                        <div>
                            <span className="emergency-text" style={{ fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>{episode.date}</span>
                            <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: 0, lineHeight: 1.1 }}>{episode.title}</h2>
                        </div>
                        <button
                            onClick={(e) => { e.stopPropagation(); onClose(); }}
                            style={{
                                background: 'rgba(255,255,255,0.1)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: 'white',
                                transition: 'background 0.2s'
                            }}
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <p style={{ color: '#86868b', fontStyle: 'italic', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Featuring {episode.guest}</p>

                    <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: '#f5f5f7', maxWidth: '800px' }}>
                        {episode.desc}
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default EpisodeModal;
