import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ☁️ NEW: Import Convex tools
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function LifestyleCheck() {
    const navigate = useNavigate();
    
    // States for daily habits
    const [sleep, setSleep] = useState('');
    const [water, setWater] = useState('');
    const [exercise, setExercise] = useState('');
    const [result, setResult] = useState(null);

    // ☁️ NEW: States for Cloud Sync and UI
    const [user, setUser] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // ☁️ Initialize Convex mutation
    const saveRecord = useMutation(api.records.save);

    // Fetch the logged-in user on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const calculateScore = (e) => {
        e.preventDefault();
        
        const sleepNum = parseFloat(sleep) || 0;
        const waterNum = parseInt(water) || 0;
        const exerciseNum = parseInt(exercise) || 0;

        // Scoring Logic (Total 100 points)
        // Sleep: Optimal is 8 hrs (40 pts)
        let sleepScore = (sleepNum >= 7 && sleepNum <= 9) ? 40 : (sleepNum >= 5 ? 20 : 10);
        // Water: Optimal is 8 glasses (30 pts)
        let waterScore = waterNum >= 8 ? 30 : (waterNum >= 4 ? 15 : 5);
        // Exercise: Optimal is 30+ mins (30 pts)
        let exerciseScore = exerciseNum >= 30 ? 30 : (exerciseNum >= 15 ? 15 : 5);

        const totalScore = sleepScore + waterScore + exerciseScore;

        let status = '', advice = '', color = '', gradient = '';

        if (totalScore >= 80) {
            status = 'Optimal Vitality';
            color = '#1FA971';
            gradient = 'linear-gradient(135deg, #1FA971 0%, #39C98A 100%)';
            advice = "Incredible job! Your habits are perfectly aligned to support peak academic performance and immune health. Keep it up!";
        } else if (totalScore >= 50) {
            status = 'Moderate Balance';
            color = '#F59E0B';
            gradient = 'linear-gradient(135deg, #F59E0B 0%, #FFD60A 100%)';
            
            // Dynamic advice based on what is lacking
            let tips = [];
            if (sleepScore < 40) tips.push("aiming for 7-8 hours of sleep");
            if (waterScore < 30) tips.push("drinking a few more glasses of water");
            if (exerciseScore < 30) tips.push("getting at least 30 mins of movement");
            
            advice = `You're doing okay, but there is room for optimization. Try ${tips.join(' and ')} to boost your daily energy levels.`;
        } else {
            status = 'Action Required';
            color = '#EF4444';
            gradient = 'linear-gradient(135deg, #EF4444 0%, #FF8A8A 100%)';
            advice = "Your body is running on empty right now. Ignoring sleep, hydration, and movement can lead to severe burnout and weakened immunity. Start small: drink a glass of water right now.";
        }

        setResult({ score: totalScore, status, advice, color, gradient });
    };

    // ☁️ NEW: Handle saving to the Cloud
    const handleSave = async () => {
        if (!user) {
            alert("Please log in to save your health records.");
            return;
        }

        setIsSaving(true);
        
        try {
            // 🚀 Send to Convex Cloud Database!
            await saveRecord({
                userId: user.email, 
                module: 'Lifestyle', // Must match the exact string filter in HealthHistory
                result: `${result.score}/100`, // Format it so it looks good in the history list
                category: result.status,
            });

            // Trigger custom popup upon successful save
            setShowPopup(true);
        } catch (error) {
            alert(`Error saving to cloud: ${error.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="container py-4 position-relative overflow-hidden min-vh-100 view-enter">
            
            {/* --- CUSTOM SUCCESS POPUP OVERLAY --- */}
            {showPopup && (
                <div 
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center animate-fade-in" 
                    style={{ zIndex: 1050, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
                >
                    <div className="card border-0 shadow-lg rounded-5 p-4 p-md-5 text-center" style={{ maxWidth: '400px', width: '90%' }}>
                        <div className="rounded-circle d-inline-flex p-4 mb-4 mx-auto" style={{ backgroundColor: 'rgba(31, 169, 113, 0.1)', color: 'var(--color-primary)' }}>
                            <i className="bi bi-check-circle-fill" style={{ fontSize: '4rem' }}></i>
                        </div>
                        <h3 className="fw-bolder text-dark mb-2">Successfully Saved!</h3>
                        <p className="text-muted mb-4 px-2">
                            Daily habit score of <strong>{result.score}/100</strong> has been securely added to your health journal.
                        </p>
                        <button 
                            onClick={() => navigate('/history')} 
                            className="btn btn-lg w-100 py-3 fw-bolder rounded-4 text-white shadow-sm hover-float" 
                            style={{ backgroundColor: 'var(--color-primary)' }}
                        >
                            VIEW HEALTH HISTORY
                        </button>
                    </div>
                </div>
            )}

            {/* --- ANIMATED BACKGROUND BLOBS (SUNRISE THEME) --- */}
            <style>
                {`
                .blob {
                    position: absolute; width: 400px; height: 400px;
                    background: #0ea5e9; filter: blur(80px);
                    opacity: 0.15; z-index: -1; border-radius: 50%;
                    animation: move 20s infinite alternate;
                }
                .blob-2 {
                    background: #f59e0b; right: -100px; top: 20%; animation-delay: -5s;
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
                                 style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #2dd4bf 100%)', color: '#fff' }}>
                                <i className="bi bi-activity fs-2"></i>
                            </div>
                            <h3 className="fw-bolder text-dark mb-1">Daily Lifestyle</h3>
                            <p className="text-muted small">Log today's habits to get your vitality score</p>
                        </div>

                        <form onSubmit={calculateScore} className="d-flex flex-column gap-4">
                            <div>
                                <label className="form-label small fw-bolder text-uppercase tracking-wider text-muted ms-1 d-flex align-items-center">
                                    <i className="bi bi-moon-stars-fill text-indigo me-2"></i> Sleep (Hours)
                                </label>
                                <input 
                                    type="number" step="0.5"
                                    className="form-control form-control-lg border-0 bg-light rounded-4 shadow-none px-4" 
                                    placeholder="e.g. 7.5"
                                    value={sleep} onChange={(e) => setSleep(e.target.value)} required 
                                />
                            </div>
                            <div>
                                <label className="form-label small fw-bolder text-uppercase tracking-wider text-muted ms-1 d-flex align-items-center">
                                    <i className="bi bi-cup-straw text-info me-2"></i> Water (Glasses)
                                </label>
                                <input 
                                    type="number" 
                                    className="form-control form-control-lg border-0 bg-light rounded-4 shadow-none px-4" 
                                    placeholder="e.g. 8"
                                    value={water} onChange={(e) => setWater(e.target.value)} required 
                                />
                            </div>
                            <div>
                                <label className="form-label small fw-bolder text-uppercase tracking-wider text-muted ms-1 d-flex align-items-center">
                                    <i className="bi bi-bicycle text-orange me-2" style={{ color: '#f59e0b'}}></i> Exercise (Minutes)
                                </label>
                                <input 
                                    type="number" 
                                    className="form-control form-control-lg border-0 bg-light rounded-4 shadow-none px-4" 
                                    placeholder="e.g. 30"
                                    value={exercise} onChange={(e) => setExercise(e.target.value)} required 
                                />
                            </div>

                            <button type="submit" className="btn btn-lg w-100 py-3 fw-bolder rounded-4 text-white shadow-lg transition-all hover-float mt-2" 
                                    style={{ background: 'linear-gradient(45deg, #0ea5e9, #2dd4bf)', border: 'none' }}>
                                CALCULATE SCORE
                            </button>
                        </form>
                    </div>
                </div>

                {/* COLORFUL RESULT SECTION */}
                {result && (
                    <div className="col-lg-5">
                        <div className="module-card p-5 text-center h-100 shadow-lg rounded-5 border-0 animate-fade-in position-relative overflow-hidden">
                            
                            <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: result.gradient, opacity: 0.08, zIndex: 0 }}></div>
                            
                            <div className="position-relative" style={{ zIndex: 1 }}>
                                <h5 className="text-muted mb-3 fw-bolder small tracking-widest text-uppercase">Habit Score</h5>
                                
                                <div className="display-1 fw-bolder mb-0" style={{ color: result.color }}>
                                    {result.score}<span className="fs-3 text-muted">/100</span>
                                </div>
                                
                                <div className="badge px-4 py-2 rounded-pill fs-6 mt-3 mb-4 shadow-sm" style={{ background: result.gradient, color: '#fff' }}>
                                    {result.status}
                                </div>
                                
                                <div className="text-start p-4 rounded-4 shadow-sm bg-white mt-2 mb-4">
                                    <h6 className="fw-bolder mb-2 d-flex align-items-center">
                                        <i className="bi bi-lightning-charge-fill me-2" style={{ color: result.color }}></i>
                                        Action Plan
                                    </h6>
                                    <p className="text-muted small mb-0 lh-lg">{result.advice}</p>
                                </div>

                                {/* ☁️ NEW: Save to History Button */}
                                <button 
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="btn w-100 py-3 rounded-pill fw-bold transition-all hover-float shadow-sm"
                                    style={{ 
                                        backgroundColor: isSaving ? '#6c757d' : '#212529', 
                                        color: '#fff',
                                        border: 'none'
                                    }}
                                >
                                    {isSaving ? (
                                        <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> SAVING TO CLOUD...</>
                                    ) : (
                                        <><i className="bi bi-calendar-check me-2"></i> LOG DAILY HABIT</>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}