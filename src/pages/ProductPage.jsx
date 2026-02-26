import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, ShieldCheck } from 'lucide-react';
import { merchItems } from '../data/merchData';

function ProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedSize, setSelectedSize] = useState('');

    // Find matching product or return undefined
    const product = merchItems.find(item => item.id === id);

    const handleAddToCart = () => {
        if (!selectedSize) return;
        navigate('/checkout', { state: { product, selectedSize } });
    };

    useEffect(() => {
        window.scrollTo(0, 0); // Reset scroll on load

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        const elements = document.querySelectorAll('.reveal');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, [id]);

    if (!product) {
        return (
            <div className="animate-in empty-state">
                <div className="container" style={{ textAlign: 'center', paddingTop: '15vh', paddingBottom: '10vh' }}>
                    <h1 style={{ marginBottom: '1rem' }}>SITREP: ITEM NOT FOUND</h1>
                    <p className="narrative-text" style={{ marginBottom: '2rem' }}>
                        The gear you are looking for has been relocated or doesn't exist.
                    </p>
                    <Link to="/merch" className="donate-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <ArrowLeft size={18} /> RETURN TO STOREFRONT
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-in product-page-container">
            <div className="container">

                {/* BACK NAVIGATION */}
                <Link to="/merch" className="back-link reveal">
                    <ArrowLeft size={18} /> Back to Gear
                </Link>

                <div className="product-layout">
                    {/* LEFT COLUMN: IMAGE DISPLAY */}
                    <div className="product-image-column reveal">
                        <div className="hero-product-container">
                            <img src={product.mascotImage || product.image} alt={product.name} className="hero-product-image mascot-image" />
                        </div>
                        {product.mascotImage && (
                            <div className="secondary-product-container">
                                <img src={product.image} alt={`${product.name} standalone`} className="secondary-product-image" />
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN: PRODUCT DETAILS */}
                    <div className="product-details-column reveal" style={{ transitionDelay: '0.1s' }}>

                        {/* BADGES & RATING */}
                        <div className="product-meta">
                            {product.badge && <span className="emergency-text" style={{ marginBottom: '0' }}>{product.badge}</span>}
                            <div className="star-row-small">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="var(--emergency-red)" color="var(--emergency-red)" />)}
                                <span className="review-count">(12 Reviews)</span>
                            </div>
                        </div>

                        {/* TITLE & PRICE */}
                        <h1 className="product-title-large">{product.name}</h1>
                        <div className="product-price-large">{product.price}</div>

                        {/* DESCRIPTION */}
                        <div className="product-description-container">
                            <p className="product-description-text">{product.desc}</p>
                            <ul className="product-features">
                                <li><ShieldCheck size={16} /> Premium tactical construction</li>
                                <li><ShieldCheck size={16} /> Designed for the spiritual battlefield</li>
                                <li><ShieldCheck size={16} /> Global deployment available</li>
                            </ul>
                        </div>

                        {/* SIZE SELECTOR */}
                        <div className="size-selector-section">
                            <div className="size-header">
                                <span className="size-label">Select Size</span>
                                <span className="size-guide">Size Guide</span>
                            </div>
                            <div className="size-grid">
                                {['S', 'M', 'L', 'XL', '2XL'].map(size => (
                                    <button
                                        key={size}
                                        className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                            {!selectedSize && <p className="size-warning">* Please select a size to continue</p>}
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="product-actions">
                            <button
                                className={`add-to-cart-btn ${!selectedSize ? 'disabled' : ''}`}
                                disabled={!selectedSize}
                                onClick={handleAddToCart}
                            >
                                <ShoppingCart size={20} />
                                {selectedSize ? `ADD TO CART - ${product.price}` : 'SELECT A SIZE'}
                            </button>

                            <div className="logistics-note">
                                <span className="pulse-dot"></span> In Stock. Ships within 48 hours.
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <style>{`
                .product-page-container {
                    padding-top: clamp(8rem, 15vh, 12rem);
                    padding-bottom: 5rem;
                    min-height: 100vh;
                }
                
                .back-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    color: var(--text-secondary);
                    text-decoration: none;
                    font-weight: 600;
                    margin-bottom: 2rem;
                    transition: color 0.3s ease;
                }
                .back-link:hover {
                    color: white;
                }

                .product-layout {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 4rem;
                    align-items: start;
                }

                /* IMAGE COLUMN */
                .product-image-column {
                    position: sticky;
                    top: 100px;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .hero-product-container {
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 24px;
                    padding: 3rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    aspect-ratio: 1;
                    box-shadow: inset 0 0 40px rgba(var(--glow-rgb), 0.05), 0 0 20px rgba(var(--glow-rgb), 0.05);
                }
                .hero-product-image {
                    max-width: 90%;
                    max-height: 90%;
                    object-fit: contain;
                    filter: drop-shadow(0 20px 40px rgba(0,0,0,0.8)) drop-shadow(0 0 40px rgba(var(--glow-rgb), 0.4));
                    animation: float-subtle 6s ease-in-out;
                }
                .mascot-image {
                    max-width: 100%;
                    max-height: 100%;
                }

                .secondary-product-container {
                    background: rgba(255, 255, 255, 0.01);
                    border: 1px solid rgba(255, 255, 255, 0.03);
                    border-radius: 16px;
                    padding: 1.5rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 180px;
                    transition: all 0.3s ease;
                }
                .secondary-product-container:hover {
                    background: rgba(var(--glow-rgb), 0.03);
                    border-color: rgba(var(--glow-rgb), 0.3);
                    box-shadow: inset 0 0 20px rgba(var(--glow-rgb), 0.1), 0 0 30px rgba(var(--glow-rgb), 0.15);
                }
                .secondary-product-image {
                    max-height: 100%;
                    max-width: 100%;
                    object-fit: contain;
                    filter: drop-shadow(0 15px 25px rgba(0,0,0,0.5)) drop-shadow(0 0 20px rgba(var(--glow-rgb), 0.4));
                    transition: transform 0.3s ease, filter 0.3s ease;
                }
                .secondary-product-container:hover .secondary-product-image {
                    transform: scale(1.08);
                    filter: drop-shadow(0 20px 30px rgba(0,0,0,0.6)) drop-shadow(0 0 35px rgba(var(--glow-rgb), 0.7));
                }
                
                @keyframes float-subtle {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                    100% { transform: translateY(0px); }
                }

                /* DETAILS COLUMN */
                .product-meta {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    margin-bottom: 1rem;
                }
                .star-row-small {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }
                .review-count {
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                    margin-left: 8px;
                }

                .product-title-large {
                    font-size: clamp(2.5rem, 4vw, 3.5rem);
                    line-height: 1.1;
                    margin-bottom: 1rem;
                }
                .product-price-large {
                    font-size: 2.5rem;
                    font-weight: 900;
                    color: var(--emergency-red);
                    margin-bottom: 2rem;
                }

                .product-description-container {
                    margin-bottom: 2.5rem;
                    padding-bottom: 2.5rem;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                }
                .product-description-text {
                    font-size: 1.2rem;
                    color: var(--text-secondary);
                    line-height: 1.6;
                    margin-bottom: 1.5rem;
                }
                
                .product-features {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .product-features li {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    color: var(--text-primary);
                    margin-bottom: 10px;
                    font-size: 1.05rem;
                }
                .product-features li svg {
                    color: var(--emergency-red);
                }

                /* SIZE SELECTOR */
                .size-selector-section {
                    margin-bottom: 2.5rem;
                }
                .size-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                }
                .size-label {
                    font-weight: 700;
                    font-size: 1.1rem;
                    letter-spacing: 1px;
                }
                .size-guide {
                    font-size: 0.9rem;
                    color: var(--text-secondary);
                    text-decoration: underline;
                    cursor: pointer;
                }
                .size-grid {
                    display: grid;
                    grid-template-columns: repeat(5, 1fr);
                    gap: 10px;
                }
                .size-btn {
                    background: transparent;
                    border: 2px solid rgba(255,255,255,0.2);
                    color: white;
                    padding: 15px 0;
                    font-size: 1.1rem;
                    font-weight: 700;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .size-btn:hover {
                    border-color: rgba(255,255,255,0.8);
                }
                .size-btn.selected {
                    background: white;
                    color: black;
                    border-color: white;
                }
                .size-warning {
                    color: var(--emergency-red);
                    font-size: 0.85rem;
                    margin-top: 10px;
                    font-weight: 600;
                }

                /* ACTIONS */
                .add-to-cart-btn {
                    width: 100%;
                    background: var(--emergency-red);
                    color: white;
                    border: none;
                    padding: 20px;
                    font-size: 1.2rem;
                    font-weight: 800;
                    border-radius: 12px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    letter-spacing: 1px;
                    box-shadow: 0 0 25px rgba(255, 59, 48, 0.4);
                }
                .add-to-cart-btn:hover:not(.disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 40px rgba(255, 59, 48, 0.8), 0 0 35px rgba(var(--glow-rgb), 0.6);
                }
                .add-to-cart-btn.disabled {
                    background: rgba(255,255,255,0.1);
                    color: rgba(255,255,255,0.5);
                    cursor: not-allowed;
                    box-shadow: none;
                }
                
                .logistics-note {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    margin-top: 1.5rem;
                    color: var(--text-secondary);
                    font-size: 0.95rem;
                }
                .pulse-dot {
                    width: 8px;
                    height: 8px;
                    background: #34C759;
                    border-radius: 50%;
                    display: inline-block;
                    box-shadow: 0 0 0 0 rgba(52, 199, 89, 0.7);
                    /* animation: pulse 2s infinite; - disabled for Lighthouse LCP idle state */
                }
                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(52, 199, 89, 0.7); }
                    70% { box-shadow: 0 0 0 10px rgba(52, 199, 89, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(52, 199, 89, 0); }
                }

                @media (max-width: 1024px) {
                    .product-layout {
                        gap: 2rem;
                    }
                    .hero-product-container {
                        padding: 2rem;
                    }
                }

                @media (max-width: 768px) {
                    .product-layout {
                        grid-template-columns: 1fr;
                        gap: 3rem;
                    }
                    .hero-product-container {
                        position: relative;
                        top: 0;
                        padding: 1.5rem;
                    }
                    .product-title-large {
                        font-size: 2.2rem;
                    }
                    .size-btn {
                        padding: 12px 0;
                    }
                }
            `}</style>
        </div>
    );
}

export default ProductPage;
