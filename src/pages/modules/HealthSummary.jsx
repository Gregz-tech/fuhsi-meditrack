import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HealthSummary() {
    const navigate = useNavigate();
    const [emailStatus, setEmailStatus] = useState('idle'); // 'idle', 'sending', 'sent'

    // Aggregated Dummy Data
    const summaryData = {
        patient: { name: "Oluwaseun Adeyemi", id: "FUHSI/ITH/24/001", date: new Date().toLocaleDateString(), email: "adeyemi.o@fuhsi.edu.ng" },
        overallStatus: { label: "Excellent Condition", color: "#1FA971" },
        metrics: {
            bmi: { value: "22.4", label: "Normal Weight", color: "#1FA971", icon: "bi-heart-pulse-fill" },
            blood: { value: "O+", label: "Universal Donor", color: "#EF4444", icon: "bi-capsule" },
            genotype: { value: "AA + AS", label: "Compatible", color: "#1FA971", icon: "bi-droplet-half" },
            wellness: { value: "4/12", label: "Mild Stress", color: "#3A86FF", icon: "bi-brain" },
            lifestyle: { value: "85/100", label: "Optimal Vitality", color: "#0ea5e9", icon: "bi-activity" }
        }
    };

    const handleSecureEmail = () => {
        setEmailStatus('sending');
        
        // Simulate a secure network request to the campus email server
        setTimeout(() => {
            setEmailStatus('sent');
            // Reset the button after 3 seconds
            setTimeout(() => setEmailStatus('idle'), 3000);
        }, 2000);
    };

    return (
        <div className="container py-4 position-relative overflow-hidden min-vh-100 view-enter">
            
            {/* --- ANIMATED BACKGROUND BLOBS --- */}
            <style>
                {`
                .blob {
                    position: absolute; width: 450px; height: 450px;
                    background: #4f46e5; filter: blur(90px);
                    opacity: 0.15; z-index: -1; border-radius: 50%;
                    animation: move 25s infinite alternate;
                }
                .blob-2 {
                    background: #10b981; right: -50px; top: 30%; animation-delay: -7s;
                }
                @keyframes move {
                    from { transform: translate(-5%, -5%) rotate(0deg); }
                    to { transform: translate(5%, 5%) rotate(360deg); }
                }
                .glass-nav-green {
                    background: var(--color-primary); border: 2px solid rgba(255, 255, 255, 0.2);
                    box-shadow: 0 8px 25px rgba(31, 169, 113, 0.4); position: relative; transition: all 0.3s ease;
                }
                .module-card {
                    background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.5);
                }
                `}
            </style>

            <div className="blob"></div>
            <div className="blob blob-2"></div>

            {/* --- TOP NAVIGATION & EMAIL BUTTON --- */}
            <div className="d-flex justify-content-center justify-content-md-between align-items-center mb-4 mt-2 flex-wrap gap-3">
                <div className="glass-nav-green p-1 rounded-pill">
                    <button onClick={() => navigate('/dashboard')} className="btn border-0 d-flex align-items-center fw-bolder py-2 px-4 rounded-pill" style={{ color: '#fff', fontSize: '0.75rem', letterSpacing: '1px' }}>
                        <i className="bi bi-grid-fill me-2 text-white"></i> DASHBOARD
                    </button>
                </div>
                
                {/* NEW KIOSK EMAIL BUTTON */}
                <button 
                    onClick={handleSecureEmail} 
                    disabled={emailStatus !== 'idle'}
                    className={`btn rounded-pill px-4 py-3 fw-bold shadow-sm d-flex align-items-center transition-all ${
                        emailStatus === 'sent' ? 'btn-success' : 'btn-dark'
                    }`}
                    style={{ fontSize: '0.9rem' }}
                >
                    {emailStatus === 'idle' && <><i className="bi bi-envelope-paper-fill me-2 fs-5"></i> Email My Report</>}
                    {emailStatus === 'sending' && <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending securely...</>}
                    {emailStatus === 'sent' && <><i className="bi bi-check-circle-fill me-2 fs-5"></i> Sent to {summaryData.patient.email}</>}
                </button>
            </div>

            <div className="row justify-content-center">
                <div className="col-lg-10">
                    
                    {/* MASTER REPORT CONTAINER */}
                    <div className="module-card p-4 p-md-5 shadow-lg rounded-5 border-0 mb-5">
                        
                        <div className="row align-items-center mb-5 border-bottom pb-4">
                            <div className="col-md-8 text-center text-md-start mb-3 mb-md-0">
                                <h2 className="fw-bolder text-dark mb-1">Comprehensive Health Summary</h2>
                                <p className="text-muted mb-0">Generated by Meditrack Kiosk</p>
                            </div>
                            <div className="col-md-4 text-center text-md-end">
                                <div className="badge px-4 py-2 rounded-pill fs-6 mb-2 border shadow-sm" style={{ backgroundColor: `${summaryData.overallStatus.color}15`, color: summaryData.overallStatus.color, borderColor: `${summaryData.overallStatus.color}30` }}>
                                    Overall: {summaryData.overallStatus.label}
                                </div>
                                <div className="small fw-bold text-muted">
                                    Date: {summaryData.patient.date}
                                </div>
                            </div>
                        </div>

                        {/* Metrics Grid */}
                        <div className="row g-4 mb-5">
                            <h5 className="fw-bolder text-dark w-100 mb-0"><i className="bi bi-clipboard2-pulse text-primary me-2"></i> Clinical Metrics</h5>
                            
                            {Object.entries(summaryData.metrics).map(([key, data]) => (
                                <div className="col-md-6 col-lg-4" key={key}>
                                    <div className="p-4 rounded-4 shadow-sm border h-100 bg-white d-flex align-items-center gap-3" style={{ borderLeft: `5px solid ${data.color}` }}>
                                        <div className="rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ backgroundColor: `${data.color}15`, color: data.color, width: '50px', height: '50px' }}>
                                            <i className={`bi ${data.icon} fs-4`}></i>
                                        </div>
                                        <div>
                                            <div className="small fw-bold text-muted text-uppercase tracking-wider">{key}</div>
                                            <div className="fs-4 fw-bolder mb-0" style={{ color: data.color }}>{data.value}</div>
                                            <div className="small fw-bold text-dark">{data.label}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Medical Insight Box */}
                        <div className="p-4 rounded-4 shadow-sm" style={{ backgroundColor: 'rgba(79, 70, 229, 0.05)', border: '1px solid rgba(79, 70, 229, 0.2)' }}>
                            <h5 className="fw-bolder d-flex align-items-center" style={{ color: '#4f46e5' }}>
                                <i className="bi bi-shield-lock-fill me-2"></i> Kiosk Privacy Notice
                            </h5>
                            <p className="text-muted small mb-0 lh-lg">
                                This system is operating in a shared campus environment. Your data is not stored locally on this machine. Please ensure you tap "Logout" or return to the main menu before leaving the terminal. The system will automatically clear your session after 60 seconds of inactivity.
                            </p>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}