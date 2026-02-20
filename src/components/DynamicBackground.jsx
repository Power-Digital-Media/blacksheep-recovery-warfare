import React from 'react';

const DynamicBackground = ({ backgrounds = {}, customPositions = {}, blur = '8px', bgSize = 'cover' }) => {
    const getUrl = (img) => {
        if (!img) return '';
        const src = img.includes('/')
            ? img
            : `https://img.youtube.com/vi/${img}/maxresdefault.jpg`;
        return `url("${src}")`;
    };

    const [isMobile, setIsMobile] = React.useState(false);
    const [knownLayers, setKnownLayers] = React.useState({});

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Track all layers we've ever seen so they stay in the DOM (no mount/unmount flickering)
    React.useEffect(() => {
        setKnownLayers(prev => {
            const next = { ...prev };
            let changed = false;
            for (const id of Object.keys(backgrounds)) {
                if (!(id in next)) {
                    next[id] = true;
                    changed = true;
                }
            }
            return changed ? next : prev;
        });
    }, [backgrounds]);

    const allLayerIds = Object.keys(knownLayers);

    return (
        <div className="dynamic-background-container">
            <div className="dynamic-bg-base" />

            {allLayerIds.map((id) => {
                const intensity = backgrounds[id] || 0;
                const scale = isMobile
                    ? (1.05 - (intensity * 0.12))
                    : (1 + (1 - intensity) * 0.08);

                return (
                    <div
                        key={id}
                        className="dynamic-bg-layer"
                        style={{
                            backgroundImage: getUrl(id),
                            zIndex: 2,
                            transformOrigin: 'center center',
                            backgroundPosition: customPositions[id] || 'center 25%',
                            filter: `blur(${isMobile ? '0px' : blur}) brightness(0.4) saturate(1.1)`,
                            opacity: intensity,
                            transform: `scale(${scale})`,
                            transition: 'opacity 0.15s linear, transform 0.6s ease-out',
                            willChange: 'opacity, transform'
                        }}
                    />
                );
            })}

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
                    background-size: ${bgSize};
                    background-repeat: no-repeat;
                    background-position: center;
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
