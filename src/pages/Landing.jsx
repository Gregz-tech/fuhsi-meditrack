import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0);

    // The features that will rotate on the screen
    const features = [
        {
            id: 1,
            title: "BMI Calculator",
            desc: "Instantly calculate your Body Mass Index and receive tailored nutritional advice.",
            icon: "bi-heart-pulse-fill",
            color: "#ef4444",
            gradient: "linear-gradient(135deg, #ef4444 0%, #f87171 100%)"
        },
        {
            id: 2,
            title: "Genotype Compatibility",
            desc: "Analyze genetic markers for pre-marital planning and Rh-factor safety.",
            icon: "bi-people-fill",
            color: "#8b5cf6",
            gradient: "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)"
        },
        {
            id: 3,
            title: "Mental Wellness",
            desc: "Take a clinically-backed PHQ-4 assessment to measure and manage academic stress.",
            icon: "bi-brain",
            color: "#3b82f6",
            gradient: "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)"
        },
        {
            id: 4,
            title: "Daily Lifestyle Check",
            desc: "Log your sleep, hydration, and exercise to generate a daily vitality score.",
            icon: "bi-activity",
            color: "#10b981",
            gradient: "linear-gradient(135deg, #10b981 0%, #34d399 100%)"
        },
        {
            id: 5,
            title: "Health Trends",
            desc: "Visualize your wellness progress over time with beautiful, interactive charts.",
            icon: "bi-graph-up-arrow",
            color: "#f59e0b",
            gradient: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)"
        }
    ];

    // Auto-rotate features every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % features.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [features.length]);

    const activeFeature = features[activeIndex];

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center position-relative overflow-hidden" style={{ backgroundColor: '#f8f9fa' }}>
            
            {/* --- KIOSK ANIMATIONS & STYLES --- */}
            <style>
                {`
                .hero-blob {
                    position: absolute; width: 600px; height: 600px;
                    background: var(--color-primary); filter: blur(120px);
                    opacity: 0.15; z-index: 0; border-radius: 50%;
                    animation: float-slow 20s infinite alternate;
                }
                .hero-blob-2 {
                    background: #0ea5e9; right: -100px; bottom: -100px; animation-delay: -5s;
                }
                @keyframes float-slow {
                    from { transform: translate(-5%, -5%); }
                    to { transform: translate(5%, 5%); }
                }
                .kiosk-btn-pulse {
                    animation: pulse-glow 2s infinite;
                }
                @keyframes pulse-glow {
                    0% { box-shadow: 0 0 0 0 rgba(31, 169, 113, 0.4); }
                    70% { box-shadow: 0 0 0 20px rgba(31, 169, 113, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(31, 169, 113, 0); }
                }
                
                /* The magic rotation animation */
                .feature-slide-in {
                    animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                @keyframes slideUpFade {
                    from { opacity: 0; transform: translateY(40px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                
                /* Timer progress bar synced to 5 seconds */
                .progress-timer {
                    height: 4px; background: rgba(255,255,255,0.3); border-radius: 4px; overflow: hidden; mt-4;
                }
                .progress-timer-fill {
                    height: 100%; background: #fff; width: 0%;
                    animation: timerFill 5s linear infinite;
                }
                @keyframes timerFill {
                    from { width: 0%; }
                    to { width: 100%; }
                }
                `}
            </style>

            <div className="hero-blob"></div>
            <div className="hero-blob hero-blob-2"></div>

            <div className="container position-relative" style={{ zIndex: 1 }}>
                <div className="row align-items-center min-vh-75">
                    
                    {/* LEFT SIDE: Permanent Branding & CTA */}
                    <div className="col-lg-6 text-center text-lg-start mb-5 mb-lg-0 pe-lg-5">
                        <div className="badge bg-white text-dark border px-3 py-2 rounded-pill shadow-sm mb-4 fw-bold">
                            <i className="bi bi-geo-alt-fill text-danger me-2"></i> Federal University of Health Sciences, Ila-Orangun
                        </div>
                        
                        <h1 className="display-3 fw-bolder text-dark mb-3 lh-sm" style={{ letterSpacing: '-1px' }}>
                            Campus Health <br/>
                            <span style={{ color: 'var(--color-primary)' }}>Informatics Kiosk</span>
                        </h1>
                        
                        <p className="lead text-muted mb-5 pe-lg-4 lh-base">
                            Welcome to Meditrack. Your secure, centralized terminal for instant health diagnostics, wellness tracking, and personalized medical insights.
                        </p>

                        <button 
                            onClick={() => navigate('/roles')} 
                            className="btn btn-lg rounded-pill px-5 py-4 fw-bolder text-white shadow-lg kiosk-btn-pulse w-100 w-sm-auto d-inline-flex align-items-center justify-content-center"
                            style={{ backgroundColor: 'var(--color-primary)', fontSize: '1.25rem' }}
                        >
                            <i className="bi bi-fingerprint fs-3 me-3"></i> TAP HERE TO BEGIN
                        </button>
                        
                        <div className="mt-4 text-muted small fw-bold">
                            <i className="bi bi-shield-check text-success me-1"></i> End-to-End Encrypted Session
                        </div>
                    </div>

                    {/* RIGHT SIDE: Rotating Feature Showcase */}
                    <div className="col-lg-6 ps-lg-5">
                        {/* The 'key' prop is the secret sauce. 
                            When activeIndex changes, React completely destroys and rebuilds this div, 
                            forcing the 'feature-slide-in' CSS animation to play again!
                        */}
                        <div 
                            key={activeIndex} 
                            className="feature-slide-in p-5 rounded-5 shadow-lg position-relative overflow-hidden"
                            style={{ background: activeFeature.gradient, minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                        >
                            {/* Decorative background icon */}
                            <i 
                                className={`bi ${activeFeature.icon} position-absolute`} 
                                style={{ fontSize: '15rem', color: '#fff', opacity: 0.1, right: '-10%', bottom: '-10%', transform: 'rotate(-15deg)' }}
                            ></i>

                            <div className="position-relative" style={{ zIndex: 1 }}>
                                <div className="bg-white rounded-circle d-inline-flex align-items-center justify-content-center mb-4 shadow" style={{ width: '80px', height: '80px', color: activeFeature.color }}>
                                    <i className={`bi ${activeFeature.icon} fs-1`}></i>
                                </div>
                                
                                <h2 className="display-5 fw-bolder text-white mb-3">{activeFeature.title}</h2>
                                <p className="text-white fs-5 opacity-75 mb-0 lh-lg" style={{ maxWidth: '90%' }}>
                                    {activeFeature.desc}
                                </p>

                                {/* Animated Timer Bar */}
                                <div className="mt-5">
                                    <div className="d-flex justify-content-between text-white opacity-50 small fw-bold mb-2">
                                        <span>Showcasing Features</span>
                                        <span>{activeIndex + 1} / {features.length}</span>
                                    </div>
                                    <div className="progress-timer">
                                        <div className="progress-timer-fill"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}