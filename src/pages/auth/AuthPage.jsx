import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
    const navigate = useNavigate();
    
    // Toggle between Login and Register modes
    const [isLogin, setIsLogin] = useState(true);

    // Registration Wizard State
    const [regStep, setRegStep] = useState(1);
    const [regData, setRegData] = useState({
        username: '',
        department: '',
        level: '',
        matric: '',
        email: '',
        password: ''
    });

    // Login State
    const [loginId, setLoginId] = useState(''); // Handles both Email or Matric
    const [loginPassword, setLoginPassword] = useState('');

    // FUHSI Specific Data
    const departments = [
        "Information Technology & Health Informatics",
        "Medicine and Surgery",
        "Nursing Sciences",
        "Audiology",
        "Physiotherapy",
        "Pharmacology"
    ];
    const levels = ["100", "200", "300", "400", "500", "600"];

    // --- HANDLERS ---
    const handleRegChange = (e) => {
        setRegData({ ...regData, [e.target.name]: e.target.value });
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        // Construct the exact user object the Dashboard expects
        const newUser = {
            name: regData.username,
            role: 'student',
            matric: regData.matric,
            dept: regData.department,
            level: regData.level,
            email: regData.email // Stored for the Health Summary email feature
        };
        
        // Save to local storage to simulate a database for the kiosk
        localStorage.setItem('user', JSON.stringify(newUser));
        
        // Navigate straight to dashboard
        navigate('/dashboard', { replace: true });
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        
        // For this frontend prototype, we will generate a user based on their login ID
        // In production, this checks the database.
        const activeUser = {
            name: loginId.split('@')[0].split('/')[0] || "Student", // Extracts a name from email/matric
            role: 'student',
            matric: loginId.includes('/') ? loginId : 'FUHSI/ITH/24/001',
            dept: 'Information Technology & Health Informatics',
            level: '300',
            email: loginId.includes('@') ? loginId : 'student@fuhsi.edu.ng'
        };

        localStorage.setItem('user', JSON.stringify(activeUser));
        navigate('/dashboard', { replace: true });
    };

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center position-relative overflow-hidden" style={{ backgroundColor: '#f8f9fa' }}>
            
            {/* Animated Background */}
            <style>
                {`
                .auth-blob {
                    position: absolute; width: 500px; height: 500px;
                    background: #1FA971; filter: blur(100px);
                    opacity: 0.2; z-index: 0; border-radius: 50%;
                    animation: float 20s infinite alternate;
                }
                .auth-blob-2 {
                    background: #0ea5e9; right: -100px; bottom: -100px; animation-delay: -5s;
                }
                @keyframes float {
                    from { transform: translate(-5%, -5%); }
                    to { transform: translate(5%, 5%); }
                }
                .auth-card {
                    background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.8); z-index: 1;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
                }
                .step-indicator {
                    height: 6px; width: 100%; background: #e9ecef; border-radius: 10px; overflow: hidden;
                }
                .step-progress {
                    height: 100%; background: var(--color-primary); transition: width 0.4s ease;
                }
                `}
            </style>

            <div className="auth-blob"></div>
            <div className="auth-blob auth-blob-2"></div>

            <div className="col-11 col-sm-8 col-md-6 col-lg-4 auth-card rounded-5 p-4 p-sm-5">
                
                <div className="text-center mb-4">
                    <div className="rounded-circle d-inline-flex p-3 mb-3 shadow-sm" style={{ backgroundColor: 'rgba(31, 169, 113, 0.1)', color: 'var(--color-primary)' }}>
                        <i className="bi bi-heart-pulse-fill fs-1"></i>
                    </div>
                    <h2 className="fw-bolder text-dark mb-1">FUHSI Meditrack</h2>
                    <p className="text-muted small">Campus Health Informatics Kiosk</p>
                </div>

                {/* --- TOGGLE BUTTONS --- */}
                <div className="d-flex bg-light rounded-pill p-1 mb-4 shadow-sm">
                    <button 
                        className={`btn rounded-pill w-50 fw-bold transition-all ${isLogin ? 'btn-white shadow-sm' : 'border-0 text-muted'}`}
                        style={{ backgroundColor: isLogin ? '#fff' : 'transparent', color: isLogin ? 'var(--color-primary)' : 'inherit' }}
                        onClick={() => { setIsLogin(true); setRegStep(1); }}
                    >
                        Log In
                    </button>
                    <button 
                        className={`btn rounded-pill w-50 fw-bold transition-all ${!isLogin ? 'btn-white shadow-sm' : 'border-0 text-muted'}`}
                        style={{ backgroundColor: !isLogin ? '#fff' : 'transparent', color: !isLogin ? 'var(--color-primary)' : 'inherit' }}
                        onClick={() => setIsLogin(false)}
                    >
                        Register
                    </button>
                </div>

                {/* ======================= */}
                {/* LOGIN FORM        */}
                {/* ======================= */}
                {isLogin ? (
                    <form onSubmit={handleLoginSubmit} className="animate-fade-in d-flex flex-column gap-3">
                        <div>
                            <label className="form-label small fw-bolder text-uppercase text-muted ms-1">Matric Number or Email</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg border-0 bg-light rounded-4 px-4" 
                                placeholder="e.g. FUHSI/ITH/24/001"
                                value={loginId} onChange={(e) => setLoginId(e.target.value)} required 
                            />
                        </div>
                        <div>
                            <label className="form-label small fw-bolder text-uppercase text-muted ms-1">Password</label>
                            <input 
                                type="password" 
                                className="form-control form-control-lg border-0 bg-light rounded-4 px-4" 
                                placeholder="••••••••"
                                value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required 
                            />
                        </div>
                        
                        <button type="submit" className="btn btn-lg w-100 py-3 fw-bolder rounded-4 text-white shadow-sm mt-2 transition-all hover-float" style={{ backgroundColor: 'var(--color-primary)' }}>
                            ACCESS TERMINAL
                        </button>
                    </form>
                ) : (
                
                /* ======================= */
                /* REGISTER WIZARD      */
                /* ======================= */
                    <form onSubmit={handleRegisterSubmit} className="animate-fade-in d-flex flex-column gap-3">
                        
                        {/* Progress Bar */}
                        <div className="mb-3">
                            <div className="d-flex justify-content-between small text-muted fw-bold mb-1">
                                <span>Step {regStep} of 3</span>
                            </div>
                            <div className="step-indicator">
                                <div className="step-progress" style={{ width: `${(regStep / 3) * 100}%` }}></div>
                            </div>
                        </div>

                        {/* STEP 1: Username & Dept */}
                        {regStep === 1 && (
                            <div className="animate-fade-in d-flex flex-column gap-3">
                                <div>
                                    <label className="form-label small fw-bolder text-uppercase text-muted ms-1">Preferred Username</label>
                                    <input type="text" name="username" className="form-control form-control-lg border-0 bg-light rounded-4 px-4" placeholder="e.g. John Doe" value={regData.username} onChange={handleRegChange} required />
                                </div>
                                <div>
                                    <label className="form-label small fw-bolder text-uppercase text-muted ms-1">Department</label>
                                    <select name="department" className="form-select form-select-lg border-0 bg-light rounded-4 px-4" value={regData.department} onChange={handleRegChange} required>
                                        <option value="" disabled>Select Department...</option>
                                        {departments.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </div>
                                <button type="button" onClick={() => { if(regData.username && regData.department) setRegStep(2) }} className="btn btn-lg w-100 py-3 fw-bolder rounded-4 text-white shadow-sm mt-2" style={{ backgroundColor: 'var(--color-primary)' }}>
                                    NEXT <i className="bi bi-arrow-right ms-2"></i>
                                </button>
                            </div>
                        )}

                        {/* STEP 2: Level */}
                        {regStep === 2 && (
                            <div className="animate-fade-in d-flex flex-column gap-3">
                                <div>
                                    <label className="form-label small fw-bolder text-uppercase text-muted ms-1">Current Level</label>
                                    <select name="level" className="form-select form-select-lg border-0 bg-light rounded-4 px-4" value={regData.level} onChange={handleRegChange} required>
                                        <option value="" disabled>Select Level...</option>
                                        {levels.map(l => <option key={l} value={l}>{l} Level</option>)}
                                    </select>
                                </div>
                                <div className="d-flex gap-2 mt-2">
                                    <button type="button" onClick={() => setRegStep(1)} className="btn btn-lg btn-light py-3 fw-bolder rounded-4 w-25"><i className="bi bi-arrow-left"></i></button>
                                    <button type="button" onClick={() => { if(regData.level) setRegStep(3) }} className="btn btn-lg py-3 fw-bolder rounded-4 text-white shadow-sm w-75" style={{ backgroundColor: 'var(--color-primary)' }}>
                                        NEXT <i className="bi bi-arrow-right ms-2"></i>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: Matric, Email, Password */}
                        {regStep === 3 && (
                            <div className="animate-fade-in d-flex flex-column gap-3">
                                <div>
                                    <label className="form-label small fw-bolder text-uppercase text-muted ms-1">Matric Number</label>
                                    <input type="text" name="matric" className="form-control form-control-lg border-0 bg-light rounded-4 px-4" placeholder="FUHSI/..." value={regData.matric} onChange={handleRegChange} required />
                                </div>
                                <div>
                                    <label className="form-label small fw-bolder text-uppercase text-muted ms-1">Email Address (For Reports)</label>
                                    <input type="email" name="email" className="form-control form-control-lg border-0 bg-light rounded-4 px-4" placeholder="student@fuhsi.edu.ng" value={regData.email} onChange={handleRegChange} required />
                                </div>
                                <div>
                                    <label className="form-label small fw-bolder text-uppercase text-muted ms-1">Password</label>
                                    <input type="password" name="password" className="form-control form-control-lg border-0 bg-light rounded-4 px-4" placeholder="Create a secure password" value={regData.password} onChange={handleRegChange} required />
                                </div>
                                <div className="d-flex gap-2 mt-2">
                                    <button type="button" onClick={() => setRegStep(2)} className="btn btn-lg btn-light py-3 fw-bolder rounded-4 w-25"><i className="bi bi-arrow-left"></i></button>
                                    <button type="submit" className="btn btn-lg py-3 fw-bolder rounded-4 text-white shadow-sm w-75" style={{ background: 'linear-gradient(45deg, #1FA971, #0ea5e9)' }}>
                                        COMPLETE SETUP
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                )}
            </div>
            
            {/* Kiosk Helper Text */}
            <div className="position-absolute bottom-0 mb-4 text-center w-100 text-muted small fw-bold">
                <i className="bi bi-shield-lock-fill me-1"></i> Secure Kiosk Connection
            </div>

        </div>
    );
}