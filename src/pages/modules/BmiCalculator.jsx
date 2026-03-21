import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BmiCalculator() {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [status, setStatus] = useState('');
    const [color, setColor] = useState('');
    const [gradient, setGradient] = useState('');
    const navigate = useNavigate();

    const calculateBmi = (e) => {
        e.preventDefault();
        if (height && weight) {
            const heightInMeters = height / 100;
            const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
            setBmi(bmiValue);

            // Determine Status with Gradients
            if (bmiValue < 18.5) {
                setStatus('Underweight');
                setColor('#F59E0B'); 
                setGradient('linear-gradient(135deg, #F59E0B 0%, #FFD60A 100%)');
            } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
                setStatus('Normal Weight');
                setColor('#1FA971'); 
                setGradient('linear-gradient(135deg, #1FA971 0%, #39C98A 100%)');
            } else if (bmiValue >= 25 && bmiValue <= 29.9) {
                setStatus('Overweight');
                setColor('#EF4444'); 
                setGradient('linear-gradient(135deg, #EF4444 0%, #FF8A8A 100%)');
            } else {
                setStatus('Obese');
                setColor('#7F1D1D'); 
                setGradient('linear-gradient(135deg, #7F1D1D 0%, #EF4444 100%)');
            }
        }
    };

    return (
        <div className="container py-4 position-relative overflow-hidden min-vh-100 view-enter">
            
            {/* --- ANIMATED BACKGROUND BLOBS (FITNESS THEME) --- */}
            <style>
                {`
                .blob {
                    position: absolute; width: 400px; height: 400px;
                    background: var(--color-primary); filter: blur(80px);
                    opacity: 0.15; z-index: -1; border-radius: 50%;
                    animation: move 20s infinite alternate;
                }
                .blob-2 {
                    background: #00C2FF; right: -100px; top: 20%; animation-delay: -5s;
                }
                @keyframes move {
                    from { transform: translate(-10%, -10%) rotate(0deg); }
                    to { transform: translate(10%, 10%) rotate(360deg); }
                }
                .glass-nav-green {
                    background: var(--color-primary);
                    border: 2px solid rgba(255, 255, 255, 0.2);
                    box-shadow: 0 8px 25px rgba(31, 169, 113, 0.4);
                    position: relative; transition: all 0.3s ease;
                }
                .glass-nav-green:hover {
                    transform: translateY(-2px); box-shadow: 0 12px 30px rgba(31, 169, 113, 0.5);
                }
                .module-card {
                    border: 1px solid rgba(255, 255, 255, 0.4);
                    background: rgba(255, 255, 255, 0.9);
                    backdrop-filter: blur(10px);
                }
                `}
            </style>

            <div className="blob"></div>
            <div className="blob blob-2"></div>

            {/* --- CENTERED GREEN NAVIGATION PILL --- */}
            <div className="d-flex justify-content-center mb-5 mt-2">
                <div className="glass-nav-green p-1 rounded-pill">
                    <button 
                        onClick={() => navigate('/dashboard')} 
                        className="btn border-0 d-flex align-items-center fw-bolder py-2 px-4 rounded-pill transition-all"
                        style={{ color: '#fff', fontSize: '0.75rem', letterSpacing: '1px' }}
                    >
                        <i className="bi bi-grid-fill me-2 text-white"></i> 
                        BACK TO DASHBOARD
                    </button>
                </div>
            </div>

            <div className="row justify-content-center g-4">
                {/* INPUT CARD */}
                <div className="col-lg-5">
                    <div className="module-card p-4 p-sm-5 shadow-lg rounded-5 border-0 position-relative overflow-hidden">
                        <div className="text-center mb-4">
                            <div className="rounded-4 d-inline-flex p-3 mb-3 shadow-sm" 
                                 style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, #00C2FF 100%)', color: '#fff' }}>
                                <i className="bi bi-heart-pulse-fill fs-2"></i>
                            </div>
                            <h3 className="fw-bolder text-dark mb-1">BMI Calculator</h3>
                            <p className="text-muted small">Enter details to calculate Body Mass Index</p>
                        </div>

                        <form onSubmit={calculateBmi} className="d-flex flex-column gap-4">
                            <div>
                                <label className="form-label small fw-bolder text-uppercase tracking-wider text-muted ms-1">Weight (kg)</label>
                                <input 
                                    type="number" 
                                    className="form-control form-control-lg border-0 bg-light rounded-4 shadow-none px-4" 
                                    placeholder="e.g. 70"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    required 
                                />
                            </div>
                            <div>
                                <label className="form-label small fw-bolder text-uppercase tracking-wider text-muted ms-1">Height (cm)</label>
                                <input 
                                    type="number" 
                                    className="form-control form-control-lg border-0 bg-light rounded-4 shadow-none px-4" 
                                    placeholder="e.g. 175"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    required 
                                />
                            </div>
                            <button type="submit" className="btn btn-lg w-100 py-3 fw-bolder rounded-4 text-white shadow-lg transition-all hover-float mt-2" 
                                    style={{ background: 'linear-gradient(45deg, var(--color-primary), #00C2FF)', border: 'none' }}>
                                CALCULATE NOW
                            </button>
                        </form>
                    </div>
                </div>

                {/* COLORFUL RESULT SECTION */}
                {bmi && (
                    <div className="col-lg-5">
                        <div className="module-card p-5 text-center h-100 shadow-lg rounded-5 border-0 animate-fade-in position-relative overflow-hidden">
                            
                            {/* Subtle Background Overlay mapped to result gradient */}
                            <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: gradient, opacity: 0.08, zIndex: 0 }}></div>
                            
                            <div className="position-relative" style={{ zIndex: 1 }}>
                                <h5 className="text-muted mb-4 fw-bolder small tracking-widest text-uppercase">Analysis Result</h5>
                                
                                <div className="display-1 fw-bolder mb-2" style={{ background: gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                    {bmi}
                                </div>
                                
                                <div className="badge px-4 py-2 rounded-pill fs-6 mb-4 shadow-sm" style={{ background: gradient, color: '#fff' }}>
                                    {status}
                                </div>
                                
                                <div className="text-start p-4 rounded-4 shadow-sm bg-white mt-4">
                                    <h6 className="fw-bolder mb-2 d-flex align-items-center">
                                        <i className="bi bi-info-circle-fill me-2" style={{ color: color }}></i>
                                        Health Advice
                                    </h6>
                                    <p className="text-muted small mb-0 lh-lg">
                                        {status === 'Normal Weight' 
                                            ? "Great job! You're in a healthy range. Maintain a balanced diet and regular physical activity to stay here."
                                            : "Based on your result, we recommend consulting with a FUHSI campus clinic professional for a personalized health plan."}
                                    </p>
                                </div>

                                <button className="btn btn-outline-secondary btn-sm w-100 mt-4 rounded-pill fw-bold border-2">
                                    <i className="bi bi-bookmark-fill me-2"></i> Save to History
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}