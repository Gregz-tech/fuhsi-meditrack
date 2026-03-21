import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MentalWellnessCheck() {
    const navigate = useNavigate();
    
    // State to hold answers for 4 questions (0 to 3 points each)
    const [answers, setAnswers] = useState({ q1: '', q2: '', q3: '', q4: '' });
    const [result, setResult] = useState(null);

    const questions = [
        { id: 'q1', text: "1. How often have you felt overwhelmed by academic or personal responsibilities?" },
        { id: 'q2', text: "2. How often have you had trouble falling asleep or staying awake?" },
        { id: 'q3', text: "3. How often have you felt little interest or pleasure in doing things?" },
        { id: 'q4', text: "4. How often have you felt nervous, anxious, or on edge?" }
    ];

    const options = [
        { value: 0, label: "Not at all (0)" },
        { value: 1, label: "Several days (1)" },
        { value: 2, label: "More than half the days (2)" },
        { value: 3, label: "Nearly every day (3)" }
    ];

    const handleChange = (e) => {
        setAnswers({ ...answers, [e.target.name]: parseInt(e.target.value) });
    };

    const calculateWellness = (e) => {
        e.preventDefault();
        
        // Sum the scores
        const score = answers.q1 + answers.q2 + answers.q3 + answers.q4;
        let status = '', advice = '', color = '', gradient = '';

        if (score <= 2) {
            status = 'Healthy & Balanced';
            color = '#1FA971';
            gradient = 'linear-gradient(135deg, #1FA971 0%, #39C98A 100%)';
            advice = "You are currently in a good headspace! Keep up your healthy habits, stay active, and continue managing your time well.";
        } else if (score >= 3 && score <= 5) {
            status = 'Mild Stress';
            color = '#3A86FF';
            gradient = 'linear-gradient(135deg, #3A86FF 0%, #00C2FF 100%)';
            advice = "You're experiencing some standard campus stress. Remember to take breaks, drink water, and prioritize a full night's sleep.";
        } else if (score >= 6 && score <= 8) {
            status = 'Moderate Anxiety/Stress';
            color = '#F59E0B';
            gradient = 'linear-gradient(135deg, #F59E0B 0%, #FFD60A 100%)';
            advice = "Your stress levels are elevated. It might be helpful to talk to a friend, try mindfulness exercises, or visit the campus counselor for a quick chat.";
        } else {
            status = 'High Stress / Burnout';
            color = '#EF4444';
            gradient = 'linear-gradient(135deg, #EF4444 0%, #FF8A8A 100%)';
            advice = "You are carrying a heavy cognitive load right now. Please prioritize your mental health by reaching out to the FUHSI wellness center or a professional counselor. You don't have to manage this alone.";
        }

        setResult({ score, status, advice, color, gradient });
    };

    return (
        <div className="container py-4 position-relative overflow-hidden min-vh-100 view-enter">
            
            {/* --- ANIMATED BACKGROUND BLOBS (MINDFULNESS PURPLE THEME) --- */}
            <style>
                {`
                .blob {
                    position: absolute; width: 400px; height: 400px;
                    background: #6f42c1; filter: blur(80px);
                    opacity: 0.15; z-index: -1; border-radius: 50%;
                    animation: move 20s infinite alternate;
                }
                .blob-2 {
                    background: #4361ee; right: -100px; top: 20%; animation-delay: -5s;
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
                {/* INPUT CARD - THE QUIZ */}
                <div className="col-lg-6">
                    <div className="module-card p-4 p-sm-5 shadow-lg rounded-5 border-0 position-relative overflow-hidden">
                        <div className="text-center mb-4">
                            <div className="rounded-4 d-inline-flex p-3 mb-3 shadow-sm" 
                                 style={{ background: 'linear-gradient(135deg, #6f42c1 0%, #4361ee 100%)', color: '#fff' }}>
                                <i className="bi bi-brain fs-2"></i>
                            </div>
                            <h3 className="fw-bolder text-dark mb-1">Mental Wellness</h3>
                            <p className="text-muted small">Over the last 2 weeks, how often have you been bothered by the following?</p>
                        </div>

                        <form onSubmit={calculateWellness} className="d-flex flex-column gap-4">
                            
                            {questions.map((q) => (
                                <div key={q.id} className="p-3 rounded-4" style={{ backgroundColor: '#f8f9fa' }}>
                                    <label className="form-label small fw-bold text-dark mb-3 lh-base">{q.text}</label>
                                    <select 
                                        className="form-select border-0 bg-white rounded-3 shadow-sm py-2" 
                                        name={q.id}
                                        value={answers[q.id]} 
                                        onChange={handleChange} 
                                        required
                                    >
                                        <option value="" disabled>Select your answer...</option>
                                        {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                    </select>
                                </div>
                            ))}

                            <button type="submit" className="btn btn-lg w-100 py-3 fw-bolder rounded-4 text-white shadow-lg transition-all hover-float mt-2" 
                                    style={{ background: 'linear-gradient(45deg, #6f42c1, #4361ee)', border: 'none' }}>
                                GENERATE WELLNESS REPORT
                            </button>
                        </form>
                    </div>
                </div>

                {/* COLORFUL RESULT SECTION */}
                {result && (
                    <div className="col-lg-5">
                        <div className="module-card p-4 p-sm-5 text-center h-100 shadow-lg rounded-5 border-0 animate-fade-in position-relative overflow-hidden">
                            
                            {/* Dynamic Background Overlay */}
                            <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: result.gradient, opacity: 0.08, zIndex: 0 }}></div>
                            
                            <div className="position-relative" style={{ zIndex: 1 }}>
                                <h5 className="text-muted mb-4 fw-bolder small tracking-widest text-uppercase">Wellness Score</h5>
                                
                                <div className="display-1 fw-bolder mb-0" style={{ background: result.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                    {result.score}<span className="fs-3 text-muted">/12</span>
                                </div>
                                
                                <div className="badge px-4 py-2 rounded-pill fs-6 mt-3 mb-4 shadow-sm" style={{ background: result.gradient, color: '#fff' }}>
                                    {result.status}
                                </div>
                                
                                <div className="text-start p-4 rounded-4 shadow-sm bg-white mb-3">
                                    <h6 className="fw-bolder mb-2 d-flex align-items-center">
                                        <i className="bi bi-chat-heart-fill me-2" style={{ color: result.color }}></i>
                                        Guided Advice
                                    </h6>
                                    <p className="text-muted small mb-0 lh-lg">{result.advice}</p>
                                </div>

                                {/* ACTION BUTTON */}
                                <button className="btn btn-outline-secondary btn-sm w-100 mt-2 rounded-pill fw-bold border-2 py-2">
                                    <i className="bi bi-journal-check me-2"></i> Log to Journal
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}