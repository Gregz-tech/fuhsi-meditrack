import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BloodGroupCheck() {
    const [bloodGroup, setBloodGroup] = useState('');
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    const bloodData = {
        'A+': { donate: ['A+', 'AB+'], receive: ['A+', 'A-', 'O+', 'O-'] },
        'A-': { donate: ['A+', 'A-', 'AB+', 'AB-'], receive: ['A-', 'O-'] },
        'B+': { donate: ['B+', 'AB+'], receive: ['B+', 'B-', 'O+', 'O-'] },
        'B-': { donate: ['B+', 'B-', 'AB+', 'AB-'], receive: ['B-', 'O-'] },
        'AB+': { donate: ['AB+'], receive: ['Everyone (Universal Recipient)'] },
        'AB-': { donate: ['AB+', 'AB-'], receive: ['AB-', 'A-', 'B-', 'O-'] },
        'O+': { donate: ['O+', 'A+', 'B+', 'AB+'], receive: ['O+', 'O-'] },
        'O-': { donate: ['Everyone (Universal Donor)'], receive: ['O-'] },
    };

    const checkCompatibility = (e) => {
        e.preventDefault();
        if (bloodGroup) {
            setResult(bloodData[bloodGroup]);
        }
    };

    return (
        <div className="container py-4 position-relative overflow-hidden min-vh-100 view-enter">
            
            {/* --- ANIMATED BACKGROUND BLOBS (RED THEME) --- */}
            <style>
                {`
                .blob {
                    position: absolute; width: 400px; height: 400px;
                    background: #e63946; filter: blur(80px);
                    opacity: 0.15; z-index: -1; border-radius: 50%;
                    animation: move 20s infinite alternate;
                }
                .blob-2 {
                    background: #d90429; right: -100px; top: 20%; animation-delay: -5s;
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
                                 style={{ background: 'linear-gradient(135deg, #ef233c 0%, #d90429 100%)', color: '#fff' }}>
                                <i className="bi bi-capsule fs-2"></i>
                            </div>
                            <h3 className="fw-bolder text-dark mb-1">Blood Group Checker</h3>
                            <p className="text-muted small">Analyze donation compatibility</p>
                        </div>

                        <form onSubmit={checkCompatibility} className="d-flex flex-column gap-4">
                            <div>
                                <label className="form-label small fw-bolder text-uppercase tracking-wider text-muted ms-1">Your Blood Group</label>
                                <select 
                                    className="form-select form-select-lg border-0 bg-light rounded-4 shadow-none" 
                                    value={bloodGroup} 
                                    onChange={(e) => setBloodGroup(e.target.value)} 
                                    required
                                >
                                    <option value="">Select Blood Group...</option>
                                    {Object.keys(bloodData).map(bg => <option key={bg} value={bg}>{bg}</option>)}
                                </select>
                            </div>
                            <button type="submit" className="btn btn-lg w-100 py-3 fw-bolder rounded-4 text-white shadow-lg transition-all hover-float" 
                                    style={{ background: 'linear-gradient(45deg, #ef233c, #d90429)', border: 'none' }}>
                                VIEW COMPATIBILITY
                            </button>
                        </form>
                    </div>
                </div>

                {/* COLORFUL RESULT SECTION */}
                {result && (
                    <div className="col-lg-6">
                        <div className="module-card p-4 p-sm-5 text-center h-100 shadow-lg rounded-5 border-0 animate-fade-in position-relative overflow-hidden">
                            
                            {/* Subtle red background glow */}
                            <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(135deg, #ef233c, #d90429)', opacity: 0.05, zIndex: 0 }}></div>
                            
                            <div className="position-relative" style={{ zIndex: 1 }}>
                                <div className="text-center mb-4">
                                    <h5 className="text-muted mb-2 fw-bolder small tracking-widest text-uppercase">Compatibility Map</h5>
                                    <div className="display-2 fw-bolder mb-0" style={{ background: 'linear-gradient(135deg, #ef233c, #d90429)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                        {bloodGroup}
                                    </div>
                                </div>

                                <div className="row g-3">
                                    {/* DONATE TO */}
                                    <div className="col-sm-6">
                                        <div className="p-4 rounded-4 h-100 shadow-sm bg-white border-0 text-start">
                                            <h6 className="fw-bolder mb-3 d-flex align-items-center" style={{ color: '#e63946' }}>
                                                <i className="bi bi-box-arrow-up me-2"></i> Can Donate To:
                                            </h6>
                                            <div className="d-flex flex-wrap gap-2">
                                                {Array.isArray(result.donate) ? result.donate.map(bg => (
                                                    <span key={bg} className="badge bg-light text-dark border px-3 py-2 rounded-pill shadow-sm">{bg}</span>
                                                )) : <span className="text-muted small fw-bold">{result.donate}</span>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* RECEIVE FROM */}
                                    <div className="col-sm-6">
                                        <div className="p-4 rounded-4 h-100 shadow-sm bg-white border-0 text-start">
                                            <h6 className="fw-bolder mb-3 d-flex align-items-center text-success">
                                                <i className="bi bi-box-arrow-in-down me-2"></i> Can Receive From:
                                            </h6>
                                            <div className="d-flex flex-wrap gap-2">
                                                {Array.isArray(result.receive) ? result.receive.map(bg => (
                                                    <span key={bg} className="badge bg-light text-dark border px-3 py-2 rounded-pill shadow-sm">{bg}</span>
                                                )) : <span className="text-muted small fw-bold text-success">{result.receive}</span>}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="alert alert-warning border-0 small mt-4 mb-0 rounded-4 shadow-sm text-start d-flex align-items-center">
                                    <i className="bi bi-exclamation-triangle-fill fs-4 me-3 text-warning"></i>
                                    <div>
                                        <strong>Educational tool only.</strong> Transfusions require professional cross-matching in a clinical laboratory.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}