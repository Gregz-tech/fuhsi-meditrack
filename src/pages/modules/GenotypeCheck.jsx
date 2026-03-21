import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GenotypeCheck() {
    // Genotype States
    const [userGenotype, setUserGenotype] = useState('');
    const [partnerGenotype, setPartnerGenotype] = useState('');
    
    // Rh Factor States
    const [userRh, setUserRh] = useState('');
    const [partnerRh, setPartnerRh] = useState('');
    
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    const genotypes = ['AA', 'AS', 'AC', 'SS', 'SC', 'CC'];
    const rhFactors = [{ val: '+', label: 'Positive (+)' }, { val: '-', label: 'Negative (-)' }];

    const checkCompatibility = (e) => {
        e.preventDefault();
        
        // --- 1. GENOTYPE LOGIC ---
        const pair = [userGenotype, partnerGenotype].sort().join('+');
        let status = '', advice = '', color = '', gradient = '';

        if (userGenotype === 'AA' || partnerGenotype === 'AA') {
            status = 'Compatible';
            color = '#1FA971';
            gradient = 'linear-gradient(135deg, #1FA971 0%, #39C98A 100%)';
            advice = "Excellent compatibility. Offspring are safe from Sickle Cell Disease (SS).";
        } else if (pair === 'AS+AS' || pair === 'AS+AC' || pair === 'AC+AC') {
            status = 'Risky';
            color = '#F59E0B';
            gradient = 'linear-gradient(135deg, #F59E0B 0%, #FFD60A 100%)';
            advice = "Caution. There is a 25% chance of children having Sickle Cell Disease. Medical counseling is highly recommended.";
        } else {
            status = 'High Risk';
            color = '#EF4444';
            gradient = 'linear-gradient(135deg, #EF4444 0%, #FF8A8A 100%)';
            advice = "Serious risk. High probability of children with Sickle Cell Disease. Please consult a specialist.";
        }

        // --- 2. RH FACTOR LOGIC ---
        let rhWarning = null;
        if (userRh !== partnerRh) {
            rhWarning = "Rh Incompatibility Potential: If the biological mother is Rh-Negative (-) and the father is Rh-Positive (+), there is a risk of Rh disease in pregnancy. This is easily managed with routine RhoGAM injections prescribed by your doctor.";
        } else {
            rhWarning = "Rh Compatible: Both partners share the same Rhesus factor or present no common Rh conflict.";
        }

        setResult({ status, advice, color, gradient, rhWarning, hasRhRisk: userRh !== partnerRh });
    };

    return (
        <div className="container py-4 position-relative overflow-hidden min-vh-100 view-enter">
            
            {/* --- ANIMATED BACKGROUND BLOBS --- */}
            <style>
                {`
                .blob {
                    position: absolute; width: 400px; height: 400px;
                    background: var(--color-primary); filter: blur(80px);
                    opacity: 0.15; z-index: -1; border-radius: 50%;
                    animation: move 20s infinite alternate;
                }
                .blob-2 {
                    background: var(--color-accent); right: -100px; top: 20%; animation-delay: -5s;
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
                <div className="col-lg-6">
                    <div className="module-card p-4 p-sm-5 shadow-lg rounded-5 border-0 position-relative overflow-hidden">
                        <div className="text-center mb-4">
                            <div className="rounded-4 d-inline-flex p-3 mb-3 shadow-sm" 
                                 style={{ background: 'linear-gradient(135deg, #3A86FF 0%, #8338EC 100%)', color: '#fff' }}>
                                <i className="bi bi-people-fill fs-2"></i>
                            </div>
                            <h3 className="fw-bolder text-dark mb-1">Couples Compatibility</h3>
                            <p className="text-muted small">Analyze Genotype and Rh Factor</p>
                        </div>

                        <form onSubmit={checkCompatibility} className="d-flex flex-column gap-4">
                            
                            {/* USER INPUTS */}
                            <div className="p-4 rounded-4" style={{ backgroundColor: '#f8f9fa' }}>
                                <h6 className="fw-bolder mb-3 text-primary">Your Details</h6>
                                <div className="row g-3">
                                    <div className="col-sm-6">
                                        <label className="form-label small fw-bolder text-muted">Genotype</label>
                                        <select className="form-select border-0 bg-white rounded-3 shadow-sm" value={userGenotype} onChange={(e) => setUserGenotype(e.target.value)} required>
                                            <option value="">Select...</option>
                                            {genotypes.map(g => <option key={g} value={g}>{g}</option>)}
                                        </select>
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label small fw-bolder text-muted">Rh Factor (+/-)</label>
                                        <select className="form-select border-0 bg-white rounded-3 shadow-sm" value={userRh} onChange={(e) => setUserRh(e.target.value)} required>
                                            <option value="">Select...</option>
                                            {rhFactors.map(rh => <option key={rh.val} value={rh.val}>{rh.label}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* PARTNER INPUTS */}
                            <div className="p-4 rounded-4" style={{ backgroundColor: '#f8f9fa' }}>
                                <h6 className="fw-bolder mb-3" style={{ color: 'var(--color-accent)' }}>Partner's Details</h6>
                                <div className="row g-3">
                                    <div className="col-sm-6">
                                        <label className="form-label small fw-bolder text-muted">Genotype</label>
                                        <select className="form-select border-0 bg-white rounded-3 shadow-sm" value={partnerGenotype} onChange={(e) => setPartnerGenotype(e.target.value)} required>
                                            <option value="">Select...</option>
                                            {genotypes.map(g => <option key={g} value={g}>{g}</option>)}
                                        </select>
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label small fw-bolder text-muted">Rh Factor (+/-)</label>
                                        <select className="form-select border-0 bg-white rounded-3 shadow-sm" value={partnerRh} onChange={(e) => setPartnerRh(e.target.value)} required>
                                            <option value="">Select...</option>
                                            {rhFactors.map(rh => <option key={rh.val} value={rh.val}>{rh.label}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-lg w-100 py-3 fw-bolder rounded-4 text-white shadow-lg transition-all hover-float mt-2" 
                                    style={{ background: 'linear-gradient(45deg, #3A86FF, #00C2FF)', border: 'none' }}>
                                ANALYZE COMPATIBILITY
                            </button>
                        </form>
                    </div>
                </div>

                {/* COLORFUL RESULT SECTION */}
                {result && (
                    <div className="col-lg-5">
                        <div className="module-card p-4 p-sm-5 text-center h-100 shadow-lg rounded-5 border-0 animate-fade-in position-relative overflow-hidden">
                            
                            <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: result.gradient, opacity: 0.08, zIndex: 0 }}></div>
                            
                            <div className="position-relative" style={{ zIndex: 1 }}>
                                <h5 className="text-muted mb-4 fw-bolder small tracking-widest text-uppercase">Genotype Result</h5>
                                
                                <div className="display-4 fw-bolder mb-3" style={{ background: result.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                    {result.status}
                                </div>
                                
                                <div className="badge px-4 py-2 rounded-pill fs-6 mb-4 shadow-sm" style={{ background: result.gradient, color: '#fff' }}>
                                    {userGenotype} + {partnerGenotype}
                                </div>
                                
                                <div className="text-start p-4 rounded-4 shadow-sm bg-white mb-3">
                                    <h6 className="fw-bolder mb-2 d-flex align-items-center">
                                        <i className="bi bi-diagram-3-fill me-2" style={{ color: result.color }}></i>
                                        Genotype Insight
                                    </h6>
                                    <p className="text-muted small mb-0 lh-lg">{result.advice}</p>
                                </div>

                                {/* RH FACTOR RESULT BOX */}
                                <div className={`text-start p-4 rounded-4 shadow-sm ${result.hasRhRisk ? 'bg-warning bg-opacity-10 border border-warning' : 'bg-success bg-opacity-10 border border-success'}`}>
                                    <h6 className={`fw-bolder mb-2 d-flex align-items-center ${result.hasRhRisk ? 'text-warning-emphasis' : 'text-success'}`}>
                                        <i className={`bi ${result.hasRhRisk ? 'bi-exclamation-triangle-fill' : 'bi-check-circle-fill'} me-2`}></i>
                                        Rhesus (Rh) Factor
                                    </h6>
                                    <p className="small mb-0 lh-lg text-dark opacity-75">{result.rhWarning}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}