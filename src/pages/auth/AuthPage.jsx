import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function AuthPage() {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Safely extract and format the role, defaulting to 'student' to prevent crashes
    const rawRole = location.state?.role;
    const userRole = (typeof rawRole === 'string') ? rawRole.toLowerCase() : 'student';

    // Toggle between Login and Register modes
    const [isLogin, setIsLogin] = useState(true);

    // Registration Wizard State
    const [regStep, setRegStep] = useState(1);
    const [regData, setRegData] = useState({
        username: '',
        department: '',
        level: '',
        matric: '',
        staffId: '',
        visitorType: '',
        occupation: '',
        email: '',
        password: ''
    });

    // Login State
    const [loginId, setLoginId] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    // Predefined Dropdown Data
    const departments = [
        "Information Technology & Health Informatics", "Medicine and Surgery", 
        "Nursing Sciences", "Audiology", "Physiotherapy", "Pharmacology"
    ];
    const levels = ["100", "200", "300", "400", "500", "600"];
    const visitorTypes = ["Intern", "Visiting Student", "Guest/Parent", "Contractor"];

    // --- HANDLERS ---
    const handleRegChange = (e) => {
        setRegData({ ...regData, [e.target.name]: e.target.value });
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        
        // Build the specific user object based on their role
        const newUser = {
            name: regData.username,
            role: userRole,
            email: regData.email,
            ...(userRole === 'student' && { matric: regData.matric, dept: regData.department, level: regData.level }),
            ...(userRole === 'staff' && { staffId: regData.staffId }),
            ...(userRole === 'visitor' && { visitorType: regData.visitorType, occupation: regData.occupation }),
        };
        
        localStorage.setItem('user', JSON.stringify(newUser));
        navigate('/dashboard', { replace: true });
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        
        const activeUser = {
            name: loginId.split('@')[0].split('/')[0] || "User",
            role: userRole,
            email: loginId.includes('@') ? loginId : 'user@fuhsi.edu.ng',
            ...(userRole === 'student' && { matric: loginId.includes('/') ? loginId : 'FUHSI/ITH/24/001', dept: 'Information Technology', level: '300' }),
            ...(userRole === 'staff' && { staffId: loginId.includes('@') ? 'STAFF-001' : loginId }),
            ...(userRole === 'visitor' && { visitorType: 'Guest', occupation: 'Campus Visitor' }),
        };

        localStorage.setItem('user', JSON.stringify(activeUser));
        navigate('/dashboard', { replace: true });
    };

    // Helper to get Login Label
    const getLoginLabel = () => {
        if (userRole === 'student') return "Matric Number or Email";
        if (userRole === 'staff') return "Staff ID or Email";
        return "Email Address";
    };

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center position-relative overflow-hidden" style={{ backgroundColor: '#f8f9fa' }}>
            
            <style>
                {`
                .auth-blob {
                    position: absolute; width: 500px; height: 500px;
                    background: #1FA971; filter: blur(100px);
                    opacity: 0.2; z-index: 0; border-radius: 50%;
                    animation: float 20s infinite alternate;
                }
                .auth-blob-2 { background: #0ea5e9; right: -100px; bottom: -100px; animation-delay: -5s; }
                @keyframes float { from { transform: translate(-5%, -5%); } to { transform: translate(5%, 5%); } }
                .auth-card {
                    background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.8); z-index: 1;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
                }
                .step-indicator { height: 6px; width: 100%; background: #e9ecef; border-radius: 10px; overflow: hidden; }
                .step-progress { height: 100%; background: var(--color-primary); transition: width 0.4s ease; }
                `}
            </style>

            <div className="auth-blob"></div>
            <div className="auth-blob auth-blob-2"></div>

            <div className="col-11 col-sm-8 col-md-6 col-lg-4 auth-card rounded-5 p-4 p-sm-5 position-relative">
                
                <div className="text-center mb-4">
                    <div className="rounded-circle d-inline-flex p-3 mb-3 shadow-sm" style={{ backgroundColor: 'rgba(31, 169, 113, 0.1)', color: 'var(--color-primary)' }}>
                        <i className={`bi ${userRole === 'student' ? 'bi-mortarboard-fill' : userRole === 'staff' ? 'bi-person-badge-fill' : 'bi-person-bounding-box'} fs-1`}></i>
                    </div>
                    <h2 className="fw-bolder text-dark mb-1 text-capitalize">{userRole} Portal</h2>
                    <p className="text-muted small">FUHSI Meditrack Kiosk Authentication</p>
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
                {/* LOGIN FORM              */}
                {/* ======================= */}
                {isLogin ? (
                    <form onSubmit={handleLoginSubmit} className="animate-fade-in d-flex flex-column gap-3">
                        <div>
                            <label className="form-label small fw-bolder text-uppercase text-muted ms-1">{getLoginLabel()}</label>
                            <input 
                                type="text" className="form-control form-control-lg border-0 bg-light rounded-4 px-4" 
                                placeholder={`Enter your ${getLoginLabel().toLowerCase()}`}
                                value={loginId} onChange={(e) => setLoginId(e.target.value)} required 
                            />
                        </div>
                        <div>
                            <label className="form-label small fw-bolder text-uppercase text-muted ms-1">Password</label>
                            <input 
                                type="password" className="form-control form-control-lg border-0 bg-light rounded-4 px-4" 
                                placeholder="••••••••" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required 
                            />
                        </div>
                        <button type="submit" className="btn btn-lg w-100 py-3 fw-bolder rounded-4 text-white shadow-sm mt-2 hover-float" style={{ backgroundColor: 'var(--color-primary)' }}>
                            ACCESS TERMINAL
                        </button>
                    </form>
                ) : (
                
                /* ======================= */
                /* DYNAMIC REGISTER WIZARD */
                /* ======================= */
                    <form onSubmit={handleRegisterSubmit} className="animate-fade-in d-flex flex-column gap-3">
                        
                        <div className="mb-3">
                            <div className="d-flex justify-content-between small text-muted fw-bold mb-1">
                                <span>Step {regStep} of 3</span>
                            </div>
                            <div className="step-indicator">
                                <div className="step-progress" style={{ width: `${(regStep / 3) * 100}%` }}></div>
                            </div>
                        </div>

                        {/* STEP 1: Username & (Dept OR Visitor Type) */}
                        {regStep === 1 && (
                            <div className="animate-fade-in d-flex flex-column gap-3">
                                <div>
                                    <label className="form-label small fw-bolder text-uppercase text-muted ms-1">Preferred Username</label>
                                    <input type="text" name="username" className="form-control form-control-lg border-0 bg-light rounded-4 px-4" placeholder="e.g. John Doe" value={regData.username} onChange={handleRegChange} required />
                                </div>
                                
                                {userRole === 'student' && (
                                    <div>
                                        <label className="form-label small fw-bolder text-uppercase text-muted ms-1">Department</label>
                                        <select name="department" className="form-select form-select-lg border-0 bg-light rounded-4 px-4" value={regData.department} onChange={handleRegChange} required>
                                            <option value="" disabled>Select Department...</option>
                                            {departments.map(d => <option key={d} value={d}>{d}</option>)}
                                        </select>
                                    </div>
                                )}
                                
                                {userRole === 'visitor' && (
                                    <div>
                                        <label className="form-label small fw-bolder text-uppercase text-muted ms-1">Visitor Type</label>
                                        <select name="visitorType" className="form-select form-select-lg border-0 bg-light rounded-4 px-4" value={regData.visitorType} onChange={handleRegChange} required>
                                            <option value="" disabled>Select Type...</option>
                                            {visitorTypes.map(v => <option key={v} value={v}>{v}</option>)}
                                        </select>
                                    </div>
                                )}

                                <button type="button" onClick={() => { 
                                    if(userRole === 'student' && regData.username && regData.department) setRegStep(2);
                                    else if (userRole === 'visitor' && regData.username && regData.visitorType) setRegStep(2);
                                    else if (userRole === 'staff' && regData.username) setRegStep(2);
                                }} className="btn btn-lg w-100 py-3 fw-bolder rounded-4 text-white shadow-sm mt-2" style={{ backgroundColor: 'var(--color-primary)' }}>
                                    NEXT <i className="bi bi-arrow-right ms-2"></i>
                                </button>
                            </div>
                        )}

                        {/* STEP 2: Role Specific Detail (Level / Staff ID / Occupation) */}
                        {regStep === 2 && (
                            <div className="animate-fade-in d-flex flex-column gap-3">
                                {userRole === 'student' && (
                                    <div>
                                        <label className="form-label small fw-bolder text-uppercase text-muted ms-1">Current Level</label>
                                        <select name="level" className="form-select form-select-lg border-0 bg-light rounded-4 px-4" value={regData.level} onChange={handleRegChange} required>
                                            <option value="" disabled>Select Level...</option>
                                            {levels.map(l => <option key={l} value={l}>{l} Level</option>)}
                                        </select>
                                    </div>
                                )}
                                {userRole === 'staff' && (
                                    <div>
                                        <label className="form-label small fw-bolder text-uppercase text-muted ms-1">Staff ID Number</label>
                                        <input type="text" name="staffId" className="form-control form-control-lg border-0 bg-light rounded-4 px-4" placeholder="e.g. FUHSI/STF/123" value={regData.staffId} onChange={handleRegChange} required />
                                    </div>
                                )}
                                {userRole === 'visitor' && (
                                    <div>
                                        <label className="form-label small fw-bolder text-uppercase text-muted ms-1">Occupation / Affiliation</label>
                                        <input type="text" name="occupation" className="form-control form-control-lg border-0 bg-light rounded-4 px-4" placeholder="e.g. IT Consultant" value={regData.occupation} onChange={handleRegChange} required />
                                    </div>
                                )}
                                <div className="d-flex gap-2 mt-2">
                                    <button type="button" onClick={() => setRegStep(1)} className="btn btn-lg btn-light py-3 fw-bolder rounded-4 w-25"><i className="bi bi-arrow-left"></i></button>
                                    <button type="button" onClick={() => { 
                                        if(userRole === 'student' && regData.level) setRegStep(3);
                                        else if (userRole === 'staff' && regData.staffId) setRegStep(3);
                                        else if (userRole === 'visitor' && regData.occupation) setRegStep(3);
                                    }} className="btn btn-lg py-3 fw-bolder rounded-4 text-white shadow-sm w-75" style={{ backgroundColor: 'var(--color-primary)' }}>
                                        NEXT <i className="bi bi-arrow-right ms-2"></i>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: Credentials (Matric/Email/Password) */}
                        {regStep === 3 && (
                            <div className="animate-fade-in d-flex flex-column gap-3">
                                {userRole === 'student' && (
                                    <div>
                                        <label className="form-label small fw-bolder text-uppercase text-muted ms-1">Matric Number</label>
                                        <input type="text" name="matric" className="form-control form-control-lg border-0 bg-light rounded-4 px-4" placeholder="FUHSI/..." value={regData.matric} onChange={handleRegChange} required />
                                    </div>
                                )}
                                <div>
                                    <label className="form-label small fw-bolder text-uppercase text-muted ms-1">Email Address (For Reports)</label>
                                    <input type="email" name="email" className="form-control form-control-lg border-0 bg-light rounded-4 px-4" placeholder="name@example.com" value={regData.email} onChange={handleRegChange} required />
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
            
            <div className="position-absolute bottom-0 mb-4 text-center w-100 text-muted small fw-bold">
                <i className="bi bi-shield-lock-fill me-1"></i> Secure Kiosk Connection
            </div>
        </div>
    );
}