import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, CreditCard, DollarSign } from 'lucide-react';
import Schema from '../components/Schema';

function Checkout() {
    const location = useLocation();
    const navigate = useNavigate();

    // Retrieve product info passed from ProductPage
    const product = location.state?.product;
    const selectedSize = location.state?.selectedSize;

    const [paymentMethod, setPaymentMethod] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // If accessed directly without product, redirect to merch store
    useEffect(() => {
        window.scrollTo(0, 0);
        if (!product) {
            navigate('/merch');
            return;
        }

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
    }, [product, navigate]);

    if (!product) return null;

    // Calculate Pricing
    const subtotal = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));
    const shipping = subtotal >= 100 ? 0 : 8.00;
    const total = subtotal + shipping;

    const formattedShipping = shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`;
    const formattedTotal = `$${total.toFixed(2)}`;

    const isFormComplete = Object.values(formData).every(val => val.trim() !== '') && paymentMethod !== '';

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
        if (!isFormComplete || isSubmitting) return;

        setIsSubmitting(true);

        // Prepare the payload for Formspree
        const orderSummary = {
            ...formData,
            item_purchased: product.name,
            size: selectedSize,
            item_price: product.price,
            shipping_cost: formattedShipping,
            total_paid: formattedTotal,
            selected_payment_method: paymentMethod,
            _subject: `New Merch Order: ${formData.firstName} ${formData.lastName}`
        };

        // Replace this URL with the actual Formspree endpoint the user creates
        const formspreeEndpoint = "https://formspree.io/f/YOUR_FORM_ID_HERE";

        try {
            // Dispatch to Formspree
            await fetch(formspreeEndpoint, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderSummary)
            });
        } catch (error) {
            console.error("Failed to submit order email via Formspree", error);
        }

        setIsSubmitting(false);

        // Route to the selected payment method's direct link
        let paymentUrl = '';
        if (paymentMethod === 'CashApp') {
            paymentUrl = 'https://cash.app/$blacksheeprecovery';
        } else if (paymentMethod === 'Venmo') {
            paymentUrl = 'https://venmo.com/blacksheeprecovery4311';
        } else if (paymentMethod === 'PayPal') {
            paymentUrl = 'https://www.paypal.me/BlackSheep1143';
        }

        if (paymentUrl) {
            window.open(paymentUrl, '_blank');
        }

        // Redirect back to storefront
        navigate('/merch');
    };

    const checkoutSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Checkout - Black Sheep Recovery Warfare",
        "description": "Secure checkout and direct giving portal.",
        "url": "https://blacksheeprecoverywarfare.com/checkout"
    };

    return (
        <div className="checkout-container">
            <Schema data={checkoutSchema} />
            <div className="container">
                <Link to={`/merch/${product.id}`} className="back-link reveal">
                    <ArrowLeft size={18} /> Back to Gear
                </Link>

                <div className="checkout-layout">
                    {/* LEFT: SHIPPING & INFO FORM */}
                    <div className="checkout-form-column reveal">
                        <h1 className="checkout-title">Secure Checkout</h1>
                        <p className="checkout-subtitle">Fill out your details to complete the order.</p>

                        <form className="shipping-form" onSubmit={handleCheckout}>
                            <div className="form-section">
                                <h3>Contact Information</h3>
                                <div className="input-group">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-section">
                                <h3>Shipping Address</h3>
                                <div className="input-row">
                                    <div className="input-group">
                                        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} required />
                                    </div>
                                    <div className="input-group">
                                        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} required />
                                    </div>
                                </div>
                                <div className="input-group">
                                    <input type="text" name="address" placeholder="Street Address" value={formData.address} onChange={handleInputChange} required />
                                </div>
                                <div className="input-row-3">
                                    <div className="input-group">
                                        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} required />
                                    </div>
                                    <div className="input-group">
                                        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleInputChange} required />
                                    </div>
                                    <div className="input-group">
                                        <input type="text" name="zip" placeholder="ZIP Code" value={formData.zip} onChange={handleInputChange} required />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* RIGHT: ORDER SUMMARY & PAYMENT */}
                    <div className="checkout-summary-column reveal" style={{ transitionDelay: '0.1s' }}>
                        <div className="summary-card">
                            <h3>Order Summary</h3>

                            <div className="summary-item-card">
                                <img src={product.image} alt={product.name} className="summary-item-image" />
                                <div className="summary-item-details">
                                    <h4>{product.name}</h4>
                                    <p>Size: {selectedSize}</p>
                                    <span className="summary-item-price">{product.price}</span>
                                </div>
                            </div>

                            <div className="summary-totals">
                                <div className="total-row">
                                    <span>Subtotal</span>
                                    <span>{product.price}</span>
                                </div>
                                <div className="total-row">
                                    <span>Shipping</span>
                                    <span>{formattedShipping}</span>
                                </div>
                                <div className="total-row">
                                    <span style={{ fontSize: '0.8rem', color: '#ff3b30' }}>
                                        {subtotal < 100 && `Add $${(100 - subtotal).toFixed(2)} more for FREE shipping`}
                                    </span>
                                    <span></span>
                                </div>
                                <div className="total-row grand-total">
                                    <span>Total</span>
                                    <span>{formattedTotal}</span>
                                </div>
                            </div>

                            <div className="payment-section">
                                <h3>Payment Method</h3>
                                <p className="payment-note">Select an external payment method below to complete your order manually.</p>

                                <select
                                    className="payment-dropdown"
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                >
                                    <option value="" disabled>Select Payment Method</option>
                                    <option value="CashApp">CashApp</option>
                                    <option value="Venmo">Venmo</option>
                                    <option value="PayPal">PayPal</option>
                                </select>

                                {paymentMethod && (
                                    <div className="payment-instructions">
                                        {paymentMethod === 'CashApp' && (
                                            <p>Click <strong>PLACE ORDER</strong> to be redirected to CashApp. Please send <strong>{product.price}</strong> and include your name and requested size ({selectedSize}) in the 'For' line.</p>
                                        )}
                                        {paymentMethod === 'Venmo' && (
                                            <p>Click <strong>PLACE ORDER</strong> to be redirected to Venmo. Please send <strong>{product.price}</strong> and ensure you mention what this is for in the memo.</p>
                                        )}
                                        {paymentMethod === 'PayPal' && (
                                            <p>Click <strong>PLACE ORDER</strong> to be redirected to PayPal. Please send <strong>{product.price}</strong> and select "Sending to a friend" if possible.</p>
                                        )}
                                    </div>
                                )}
                            </div>

                            <button
                                className={`place-order-btn ${!isFormComplete ? 'disabled' : ''}`}
                                disabled={!isFormComplete}
                                onClick={handleCheckout}
                            >
                                <ShieldCheck size={20} />
                                {isFormComplete ? 'PLACE ORDER' : 'COMPLETE FORM TO ORDER'}
                            </button>
                            <p className="secure-badge"><CreditCard size={14} /> 256-Bit Secure Environment</p>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .checkout-page-container {
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

                .checkout-layout {
                    display: grid;
                    grid-template-columns: 1.2fr 0.8fr;
                    gap: 4rem;
                    align-items: start;
                }

                .checkout-title {
                    font-size: 2.5rem;
                    margin-bottom: 0.5rem;
                }
                .checkout-subtitle {
                    color: var(--text-secondary);
                    margin-bottom: 2.5rem;
                }

                /* FORM STYLES */
                .form-section {
                    margin-bottom: 2.5rem;
                }
                .form-section h3 {
                    margin-bottom: 1.5rem;
                    font-size: 1.2rem;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                    padding-bottom: 0.5rem;
                }
                .input-group {
                    margin-bottom: 1rem;
                }
                .input-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                }
                .input-row-3 {
                    display: grid;
                    grid-template-columns: 2fr 1fr 1fr;
                    gap: 1rem;
                }
                input {
                    width: 100%;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: white;
                    padding: 16px;
                    font-size: 1rem;
                    border-radius: 8px;
                    transition: all 0.3s ease;
                }
                input:focus {
                    outline: none;
                    border-color: rgba(255,255,255,0.5);
                    background: rgba(255,255,255,0.08);
                }

                /* SUMMARY CARD */
                .summary-card {
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 24px;
                    padding: 2.5rem;
                    position: sticky;
                    top: 100px;
                }
                .summary-card h3 {
                    margin-bottom: 1.5rem;
                    font-size: 1.3rem;
                }

                .summary-item-card {
                    display: flex;
                    gap: 1.5rem;
                    align-items: center;
                    padding-bottom: 1.5rem;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                    margin-bottom: 1.5rem;
                }
                .summary-item-image {
                    width: 80px;
                    height: 80px;
                    border-radius: 12px;
                    object-fit: cover;
                    background: rgba(255,255,255,0.05);
                    padding: 5px;
                }
                .summary-item-details h4 {
                    font-size: 1.1rem;
                    margin-bottom: 4px;
                }
                .summary-item-details p {
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                    margin-bottom: 8px;
                }
                .summary-item-price {
                    font-weight: 700;
                    color: var(--emergency-red);
                }

                .summary-totals {
                    margin-bottom: 2rem;
                }
                .total-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 10px;
                    color: var(--text-secondary);
                }
                .grand-total {
                    margin-top: 15px;
                    padding-top: 15px;
                    border-top: 1px solid rgba(255,255,255,0.1);
                    color: white;
                    font-size: 1.3rem;
                    font-weight: 700;
                }

                /* PAYMENT SECTION */
                .payment-section {
                    margin-bottom: 2rem;
                }
                .payment-note {
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                    margin-bottom: 1rem;
                }
                .payment-dropdown {
                    width: 100%;
                    background: #1a1a1a;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    color: white;
                    padding: 16px;
                    font-size: 1rem;
                    border-radius: 8px;
                    cursor: pointer;
                    margin-bottom: 1rem;
                    appearance: none;
                }
                .payment-dropdown:focus {
                    outline: none;
                    border-color: var(--emergency-red);
                }
                .payment-instructions {
                    background: rgba(255,59,48,0.1);
                    border: 1px solid rgba(255,59,48,0.2);
                    padding: 15px;
                    border-radius: 8px;
                    color: white;
                    font-size: 0.95rem;
                    line-height: 1.5;
                }

                /* BUTTON */
                .place-order-btn {
                    width: 100%;
                    background: var(--emergency-red);
                    color: white;
                    border: none;
                    padding: 18px;
                    font-size: 1.1rem;
                    font-weight: 800;
                    border-radius: 12px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    letter-spacing: 1px;
                }
                .place-order-btn:hover:not(.disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px rgba(255,59,48,0.3);
                }
                .place-order-btn.disabled {
                    background: rgba(255,255,255,0.1);
                    color: rgba(255,255,255,0.5);
                    cursor: not-allowed;
                }
                
                .secure-badge {
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 6px;
                    color: var(--text-secondary);
                    font-size: 0.85rem;
                    margin-top: 15px;
                }

                @media (max-width: 1024px) {
                    .checkout-layout {
                        grid-template-columns: 1fr;
                        gap: 3rem;
                    }
                    .summary-card {
                        position: relative;
                        top: 0;
                    }
                }
            `}</style>
        </div>
    );
}

export default Checkout;
