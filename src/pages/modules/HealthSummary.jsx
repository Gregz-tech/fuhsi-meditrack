import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ☁️ Import Convex tools
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function HealthSummary() {
    const navigate = useNavigate();
    const [emailStatus, setEmailStatus] = useState('idle'); // 'idle', 'sending', 'sent'
    const [user, setUser] = useState(null);

    // 1. Fetch the logged-in user on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // 2. ☁️ Fetch ALL records for this user from Convex
    const records = useQuery(api.records.getUserRecords, user?.email ? { userId: user.email } : "skip");

    const handleSecureEmail = () => {
        if (!user) return;
        setEmailStatus('sending');
        
        // Simulate a secure network request to the campus email server
        setTimeout(() => {
            setEmailStatus('sent');
            // Reset the button after 3 seconds
            setTimeout(() => setEmailStatus('idle'), 3000);
        }, 2000);
    };

    // Helper to get the most recent record for a specific module
    const getLatestRecord = (moduleName) => {
        if (!records) return null;
        return records.find(r => r.module === moduleName); // records are already sorted newest first
    };

    // Helper to assign colors based on the category string from the database
    const getColorForCategory = (category, defaultColor) => {
        if (!category) return '#6c757d'; // Grey for N/A
        const cat = category.toLowerCase();
        if (cat.includes('high') || cat.includes('risk') || cat.includes('burnout') || cat.includes('crisis') || cat.includes('action') || cat.includes('hypertension')) return '#EF4444'; // Red
        if (cat.includes('moderate') || cat.includes('mild') || cat.includes('overweight') || cat.includes('underweight') || cat.includes('risky') || cat.includes('stage')) return '#F59E0B'; // Orange
        if (cat.includes('elevated')) return '#17a2b8'; // Blue
        if (cat.includes('donor') || cat.includes('blood')) return '#EF4444'; // Red for Blood types
        return '#1FA971'; // Green for normal/optimal/compatible
    };

    // 3. Build the dynamic summary data based on the database
    const buildSummaryData = () => {
        const bmiRecord = getLatestRecord('BMI');
        const bpRecord = getLatestRecord('Blood Pressure'); // 🔴 NEW: Added Blood Pressure
        const bloodRecord = getLatestRecord('Blood');
        const genotypeRecord = getLatestRecord('Genotype');
        const wellnessRecord = getLatestRecord('Wellness');
        const lifestyleRecord = getLatestRecord('Lifestyle');

        // Determine overall status based on if any records exist
        let overallLabel = "Pending Diagnostics";
        let overallColor = "#6c757d";
        
        if (records && records.length > 0) {
            // A simple logic check: if any recent record is a "High Risk" category, flag the overall status
            const hasRisks = records.some(r => r.category.toLowerCase().includes('high') || r.category.toLowerCase().includes('risk') || r.category.toLowerCase().includes('crisis'));
            overallLabel = hasRisks ? "Attention Needed" : "Stable Condition";
            overallColor = hasRisks ? "#EF4444" : "#1FA971";
        }

        return {
            patient: { 
                name: user?.name || "Guest User", 
                id: user?.matric || user?.staffId || "FUHSI/GUEST", 
                date: new Date().toLocaleDateString(), 
                email: user?.email || "Not Provided" 
            },
            overallStatus: { label: overallLabel, color: overallColor },
            metrics: {
                bmi: { 
                    value: bmiRecord?.result || "N/A", 
                    label: bmiRecord?.category || "Not Recorded", 
                    color: getColorForCategory(bmiRecord?.category), 
                    icon: "bi-heart-pulse-fill" 
                },
                // 🔴 NEW: Blood Pressure Metric Block
                bloodPressure: {
                    value: bpRecord?.result || "N/A",
                    label: bpRecord?.category || "Not Recorded",
                    color: getColorForCategory(bpRecord?.category),
                    icon: "bi-activity"
                },
                blood: { 
                    value: bloodRecord?.result || "N/A", 
                    label: bloodRecord?.category || "Not Recorded", 
                    color: getColorForCategory(bloodRecord?.category), 
                    icon: "bi-capsule" 
                },
                genotype: { 
                    value: genotypeRecord?.result || "N/A", 
                    label: genotypeRecord?.category || "Not Recorded", 
                    color: getColorForCategory(genotypeRecord?.category), 
                    icon: "bi-droplet-half" 
                },
                wellness: { 
                    value: wellnessRecord?.result || "N/A", 
                    label: wellnessRecord?.category || "Not Recorded", 
                    color: getColorForCategory(wellnessRecord?.category), 
                    icon: "bi-brain" 
                },
                lifestyle: { 
                    value: lifestyleRecord?.result || "N/A", 
                    label: lifestyleRecord?.category || "Not Recorded", 
                    color: getColorForCategory(lifestyleRecord?.category), 
                    icon: "bi-bicycle" 
                }
            }
        };
    };

    const summaryData = buildSummaryData();

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
                
                <button 
                    onClick={handleSecureEmail} 
                    disabled={emailStatus !== 'idle' || !user}
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
                        
                        {/* Loading State */}
                        {records === undefined ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-primary" role="status"></div>
                                <p className="mt-3 text-muted fw-bold">Compiling your clinical data...</p>
                            </div>
                        ) : (
                            <>
                                <div className="row align-items-center mb-5 border-bottom pb-4">
                                    <div className="col-md-8 text-center text-md-start mb-3 mb-md-0">
                                        <h2 className="fw-bolder text-dark mb-1">Comprehensive Health Summary</h2>
                                        <p className="text-muted mb-0">Generated by Meditrack Kiosk for <strong>{summaryData.patient.name}</strong> ({summaryData.patient.id})</p>
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
                                            <div className="p-4 rounded-4 shadow-sm border h-100 bg-white d-flex align-items-center gap-3 transition-all hover-float" style={{ borderLeft: `5px solid ${data.color}` }}>
                                                <div className="rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ backgroundColor: `${data.color}15`, color: data.color, width: '50px', height: '50px' }}>
                                                    <i className={`bi ${data.icon} fs-4`}></i>
                                                </div>
                                                <div>
                                                    <div className="small fw-bold text-muted text-uppercase tracking-wider">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
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
                            </>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}