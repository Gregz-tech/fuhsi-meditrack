import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BPModule() {
    const navigate = useNavigate();
    
    const [systolic, setSystolic] = useState('');
    const [diastolic, setDiastolic] = useState('');
    const [result, setResult] = useState(null);
    
    // NEW: State to control our custom success popup
    const [showPopup, setShowPopup] = useState(false);

    // American Heart Association (AHA) BP Categories
    const calculateBP = (e) => {
        e.preventDefault();
        
        const sys = parseInt(systolic);
        const dia = parseInt(diastolic);
        
        if (!sys || !dia || sys < 50 || dia < 30 || sys > 300 || dia > 200) {
            alert("Please enter valid blood pressure readings.");
            return;
        }

        let category = '';
        let color = '';
        let icon = '';
        let advice = '';

        if (sys > 180 || dia > 120) {
            category = 'Hypertensive Crisis';
            color = '#dc3545'; // Danger Red
            icon = 'bi-exclamation-octagon-fill';
            advice = 'Seek emergency medical attention immediately. Do not wait.';
        } else if (sys >= 140 || dia >= 90) {
            category = 'High BP (Stage 2)';
            color = '#fd7e14'; // Orange
            icon = 'bi-exclamation-triangle-fill';
            advice = 'Consult a doctor promptly. Medication or strict lifestyle changes may be required.';
        } else if (sys >= 130 || dia >= 80) {
            category = 'High BP (Stage 1)';
            color = '#ffc107'; // Yellow
            icon = 'bi-exclamation-circle-fill';
            advice = 'Your blood pressure is high. Consider dietary changes, reducing sodium, and regular exercise. Monitor closely.';
        } else if (sys >= 120 && dia < 80) {
            category = 'Elevated';
            color = '#17a2b8'; // Info Blue
            icon = 'bi-info-circle-fill';
            advice = 'Your systolic pressure is slightly high. Adopt healthier habits to prevent hypertension.';
        } else {
            category = 'Normal';
            color = '#1FA971'; // Success Green
            icon = 'bi-check-circle-fill';
            advice = 'Great job! Your blood pressure is in the healthy range. Keep up the good lifestyle habits.';
        }

        setResult({ category, color, icon, advice, sys, dia });
    };

    const handleSave = () => {
        // Trigger our custom popup instead of the browser alert
        setShowPopup(true);
    };

    return (
        <div className="container-fluid min-vh-100 py-5 view-enter position-relative" style={{ backgroundColor: '#f8f9fa' }}>
            
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
                            Blood Pressure of <strong>{result.sys}/{result.dia}</strong> has been securely added to your health journal.
                        </p>
                        <button 
                            onClick={() => navigate('/dashboard')} 
                            className="btn btn-lg w-100 py-3 fw-bolder rounded-4 text-white shadow-sm hover-float" 
                            style={{ backgroundColor: 'var(--color-primary)' }}
                        >
                            RETURN TO DASHBOARD
                        </button>
                    </div>
                </div>
            )}

            <div className="container max-w-md">
                
                {/* ⬅️ BACK BUTTON */}
                <button 
                    onClick={() => navigate('/dashboard')} 
                    className="btn btn-white shadow-sm rounded-pill mb-4 fw-bold d-flex align-items-center gap-2 hover-float"
                    style={{ backgroundColor: '#fff', color: 'var(--color-primary)' }}
                >
                    <i className="bi bi-arrow-left-circle-fill fs-5"></i> Back to Dashboard
                </button>

                <div className="row justify-content-center">
                    <div className="col-12 col-lg-8">
                        
                        {/* HEADER */}
                        <div className="text-center mb-5">
                            <div className="rounded-circle d-inline-flex p-4 mb-3 shadow-sm bg-white" style={{ color: '#dc3545' }}>
                                <i className="bi bi-heart-pulse-fill" style={{ fontSize: '3rem' }}></i>
                            </div>
                            <h2 className="display-6 fw-bolder text-dark mb-2">Blood Pressure Monitor</h2>
                            <p className="lead text-muted">Enter your systolic and diastolic readings for an instant AHA-compliant analysis.</p>
                        </div>

                        {/* INPUT CARD */}
                        <div className="card border-0 shadow-lg rounded-5 p-4 p-md-5 mb-4">
                            <form onSubmit={calculateBP}>
                                <div className="row g-4 mb-4">
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bolder text-uppercase text-muted ms-1">Systolic (Top Number)</label>
                                        <div className="input-group input-group-lg shadow-sm rounded-4 overflow-hidden">
                                            <input 
                                                type="number" 
                                                className="form-control border-0 bg-light px-4" 
                                                placeholder="e.g. 120" 
                                                value={systolic} 
                                                onChange={(e) => setSystolic(e.target.value)} 
                                                required 
                                            />
                                            <span className="input-group-text border-0 bg-light text-muted fw-bold pe-4">mmHg</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bolder text-uppercase text-muted ms-1">Diastolic (Bottom Number)</label>
                                        <div className="input-group input-group-lg shadow-sm rounded-4 overflow-hidden">
                                            <input 
                                                type="number" 
                                                className="form-control border-0 bg-light px-4" 
                                                placeholder="e.g. 80" 
                                                value={diastolic} 
                                                onChange={(e) => setDiastolic(e.target.value)} 
                                                required 
                                            />
                                            <span className="input-group-text border-0 bg-light text-muted fw-bold pe-4">mmHg</span>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-lg w-100 py-3 fw-bolder rounded-4 text-white shadow-sm hover-float" style={{ backgroundColor: 'var(--color-primary)' }}>
                                    ANALYZE READING
                                </button>
                            </form>
                        </div>

                        {/* RESULT CARD (Only shows after calculation) */}
                        {result && (
                            <div className="card border-0 shadow-lg rounded-5 p-4 p-md-5 animate-fade-in" style={{ borderTop: `8px solid ${result.color} !important` }}>
                                <div className="text-center">
                                    <h4 className="fw-bolder text-uppercase mb-1" style={{ color: result.color }}>
                                        <i className={`bi ${result.icon} me-2`}></i> {result.category}
                                    </h4>
                                    <h1 className="display-3 fw-bolder text-dark mb-4">
                                        {result.sys} <span className="text-muted fs-3 fw-normal">/ {result.dia}</span>
                                    </h1>
                                    
                                    <div className="p-4 rounded-4 mb-4" style={{ backgroundColor: `${result.color}15` }}>
                                        <p className="mb-0 fw-bold" style={{ color: result.color }}>
                                            {result.advice}
                                        </p>
                                    </div>

                                    <button onClick={handleSave} className="btn btn-lg w-100 py-3 fw-bolder rounded-4 text-white shadow-sm" style={{ backgroundColor: '#212529' }}>
                                        <i className="bi bi-journal-check me-2"></i> SAVE TO HEALTH JOURNAL
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}