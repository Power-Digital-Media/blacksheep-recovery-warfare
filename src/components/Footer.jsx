import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Instagram, Youtube, MapPin, Shield, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const tacticalSections = [
        {
            title: 'DEPLOYMENT',
            links: [
                { name: 'EPISODES', path: '/episodes' },
                { name: 'GATHERINGS', path: '/events' },
                { name: 'SPONSORS', path: '/sponsors' },
                { name: 'DONATE', path: '/donate' }
            ]
        },
        {
            title: 'COMM LINK',
            links: [
                { name: 'EMAIL OPS', path: 'mailto:contact@blacksheeprecoverywarfare.org' },
                { name: 'INSTAGRAM', path: '#' },
                { name: 'YOUTUBE', path: '#' }
            ]
        }
    ];

    return (
        <footer style={{
            background: 'linear-gradient(to bottom, transparent, #050505 20%, #000 100%)',
            padding: '8rem 2rem 4rem',
            position: 'relative',
            zIndex: 10,
            color: '#fff',
            borderTop: '1px solid rgba(255,255,255,0.03)'
        }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '4rem',
                    marginBottom: '6rem'
                }}>
                    {/* MISSION PILLAR */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <img
                                src="/logo.png"
                                alt="Black Sheep Logo"
                                style={{
                                    width: '45px',
                                    height: 'auto',
                                    filter: 'brightness(1.2) drop-shadow(0 0 10px rgba(215, 0, 21, 0.2))'
                                }}
                            />
                            <span style={{
                                fontSize: '1.2rem',
                                fontWeight: '900',
                                letterSpacing: '2px',
                                textTransform: 'uppercase'
                            }}>
                                BLACK SHEEP
                            </span>
                        </div>
                        <p style={{
                            fontSize: '0.9rem',
                            color: '#86868b',
                            lineHeight: '1.6',
                            fontFamily: 'monospace',
                            letterSpacing: '1px'
                        }}>
                            "But he was pierced for our transgressions, he was crushed for our iniquities; the punishment that brought us peace was on him, and by his wounds we are healed."
                        </p>
                        <div style={{
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            letterSpacing: '3px',
                            color: 'var(--warfare-red)'
                        }}>
                            ISAIAH 53:5
                        </div>
                    </div>

                    {/* TACTICAL LINKS */}
                    {tacticalSections.map((section) => (
                        <div key={section.title} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <h4 style={{
                                fontSize: '0.8rem',
                                letterSpacing: '4px',
                                color: '#fff',
                                opacity: 0.5,
                                fontFamily: 'monospace'
                            }}>
                                {section.title}
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                {section.links.map((link) => (
                                    link.path.startsWith('http') || link.path.startsWith('mailto') ? (
                                        <a key={link.name} href={link.path} style={{
                                            color: '#f5f5f7',
                                            textDecoration: 'none',
                                            fontSize: '0.8rem',
                                            letterSpacing: '2px',
                                            fontWeight: '500',
                                            transition: 'all 0.3s ease',
                                            fontFamily: 'monospace'
                                        }}
                                            onMouseOver={(e) => e.target.style.color = 'var(--warfare-red)'}
                                            onMouseOut={(e) => e.target.style.color = '#f5f5f7'}>
                                            {link.name}
                                        </a>
                                    ) : (
                                        <Link key={link.name} to={link.path} style={{
                                            color: '#f5f5f7',
                                            textDecoration: 'none',
                                            fontSize: '0.8rem',
                                            letterSpacing: '2px',
                                            fontWeight: '500',
                                            transition: 'all 0.3s ease',
                                            fontFamily: 'monospace'
                                        }}
                                            onMouseOver={(e) => e.target.style.color = 'var(--warfare-red)'}
                                            onMouseOut={(e) => e.target.style.color = '#f5f5f7'}>
                                            {link.name}
                                        </Link>
                                    )
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* SYSTEM STATE */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <h4 style={{
                            fontSize: '0.8rem',
                            letterSpacing: '4px',
                            color: '#fff',
                            opacity: 0.5,
                            fontFamily: 'monospace'
                        }}>
                            SYSTEM STATE
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontFamily: 'monospace' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.7rem' }}>
                                <Activity size={14} color="#30d158" />
                                <span style={{ color: '#86868b' }}>STATUS: </span>
                                <span style={{ color: '#30d158' }}>OPERATIONAL</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.7rem' }}>
                                <MapPin size={14} color="var(--warfare-red)" />
                                <span style={{ color: '#86868b' }}>LOC: </span>
                                <span style={{ color: '#f5f5f7' }}>GLOBAL ASSET</span>
                            </div>
                            <div style={{ fontSize: '0.7rem', color: '#86868b', marginTop: '1rem' }}>
                                VERSION: 2.0.26_STABLE
                            </div>
                        </div>
                    </div>
                </div>

                {/* BOTTOM STRIPE */}
                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    paddingTop: '3rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1.5rem'
                }}>
                    <div style={{
                        fontSize: '0.7rem',
                        letterSpacing: '5px',
                        color: '#666',
                        textAlign: 'center',
                        fontFamily: 'monospace'
                    }}>
                        © {currentYear} BLACK SHEEP RECOVERY WARFARE
                    </div>
                </div>
            </div>

            {/* Scanning Line Animation */}
            <motion.div
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                style={{
                    position: 'absolute',
                    left: 0,
                    width: '100%',
                    height: '1px',
                    background: 'linear-gradient(to right, transparent, var(--warfare-red), transparent)',
                    opacity: 0.1,
                    pointerEvents: 'none'
                }}
            />
        </footer>
    );
};

export default Footer;
