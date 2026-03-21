import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HealthHistory() {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('All');

    // Dummy data representing saved records from our previous modules
    const historyData = [
        { id: 1, date: 'Today, 10:45 AM', type: 'Lifestyle', title: 'Daily Habit Score', result: '85/100', status: 'Optimal Vitality', color: '#1FA971', icon: 'bi-activity' },
        { id: 2, date: 'Yesterday, 8:20 PM', type: 'Wellness', title: 'Mental Wellness', result: '4/12', status: 'Mild Stress', color: '#3A86FF', icon: 'bi-brain' },
        { id: 3, date: 'Mar 15, 2026', type: 'BMI', title: 'Body Mass Index', result: '22.4', status: 'Normal Weight', color: '#1FA971', icon: 'bi-heart-pulse-fill' },
        { id: 4, date: 'Mar 10, 2026', type: 'Genotype', title: 'Couples Compatibility', result: 'AA + AS', status: 'Compatible', color: '#1FA971', icon: 'bi-people-fill' },
        { id: 5, date: 'Feb 28, 2026', type: 'Blood', title: 'Blood Group Map', result: 'O+', status: 'Universal Donor', color: '#EF4444', icon: 'bi-capsule' },
        { id: 6, date: 'Feb 10, 2026', type: 'BMI', title: 'Body Mass Index', result: '24.1', status: 'Normal Weight', color: '#1FA971', icon: 'bi-heart-pulse-fill' },
    ];

    const filterOptions = ['All', 'BMI', 'Lifestyle', 'Wellness', 'Genotype', 'Blood'];

    const filteredData = filter === 'All' 
        ? historyData 
        : historyData.filter(item => item.type === filter);

    return (
        <div className="container py-4 position-relative overflow-hidden min-vh-100 view-enter">
            
            {/* --- ANIMATED BACKGROUND BLOBS (DATA/TECH THEME) --- */}
            <style>
                {`
                .blob {
                    position: absolute; width: 450px; height: 450px;
                    background: #3A86FF; filter: blur(90px);
                    opacity: 0.1; z-index: -1; border-radius: 50%;
                    animation: move 25s infinite alternate;
                }
                .blob-2 {
                    background: #00C2FF; right: -50px; top: 30%; animation-delay: -7s;
                }
                @keyframes move {
                    from { transform: translate(-5%, -5%) rotate(0deg); }
                    to { transform: translate(5%, 5%) rotate(360deg); }
                }
                .glass-nav-green {
                    background: var(--color-primary); border: 2px solid rgba(255, 255, 255, 0.2);
                    box-shadow: 0 8px 25px rgba(31, 169, 113, 0.4); position: relative; transition: all 0.3s ease;
                }
                .glass-nav-green:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(31, 169, 113, 0.5); }
                
                /* Timeline Card Hover Effects */
                .history-card {
                    background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.5); transition: all 0.3s ease;
                }
                .history-card:hover { transform: translateY(-3px); box-shadow: 0 15px 35px rgba(0,0,0,0.08) !important; }
                `}
            </style>

            <div className="blob"></div>
            <div className="blob blob-2"></div>

            {/* --- CENTERED GREEN NAVIGATION PILL --- */}
            <div className="d-flex justify-content-center mb-4 mt-2">
                <div className="glass-nav-green p-1 rounded-pill">
                    <button onClick={() => navigate('/dashboard')} className="btn border-0 d-flex align-items-center fw-bolder py-2 px-4 rounded-pill" style={{ color: '#fff', fontSize: '0.75rem', letterSpacing: '1px' }}>
                        <i className="bi bi-grid-fill me-2 text-white"></i> BACK TO DASHBOARD
                    </button>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-lg-8">
                    
                    {/* HEADER & FILTERS */}
                    <div className="text-center mb-5">
                        <div className="rounded-4 d-inline-flex p-3 mb-3 shadow-sm" style={{ background: 'linear-gradient(135deg, #3A86FF 0%, #00C2FF 100%)', color: '#fff' }}>
                            <i className="bi bi-clock-history fs-2"></i>
                        </div>
                        <h2 className="fw-bolder text-dark mb-2">My Health History</h2>
                        <p className="text-muted small mb-4">Review your saved diagnostic and wellness records</p>
                        
                        {/* Dynamic Filter Pills */}
                        <div className="d-flex flex-wrap justify-content-center gap-2">
                            {filterOptions.map(opt => (
                                <button 
                                    key={opt}
                                    onClick={() => setFilter(opt)}
                                    className={`btn rounded-pill px-4 py-2 fw-bold text-uppercase transition-all ${filter === opt ? 'shadow-sm' : 'border-0'}`}
                                    style={{ 
                                        fontSize: '0.75rem', letterSpacing: '0.5px',
                                        background: filter === opt ? 'var(--color-primary)' : 'rgba(255,255,255,0.6)',
                                        color: filter === opt ? '#fff' : '#6c757d',
                                    }}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* TIMELINE / RECORDS LIST */}
                    <div className="d-flex flex-column gap-3 mb-5">
                        {filteredData.length > 0 ? (
                            filteredData.map((record) => (
                                <div key={record.id} className="history-card rounded-4 p-3 p-sm-4 shadow-sm d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 animate-fade-in">
                                    
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="rounded-circle p-3 shadow-sm d-flex align-items-center justify-content-center" style={{ backgroundColor: `${record.color}15`, color: record.color, width: '55px', height: '55px' }}>
                                            <i className={`bi ${record.icon} fs-4`}></i>
                                        </div>
                                        <div>
                                            <h6 className="fw-bolder mb-1 text-dark">{record.title}</h6>
                                            <div className="d-flex align-items-center text-muted small fw-bold">
                                                <i className="bi bi-calendar-event me-2"></i>{record.date}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-sm-end ms-sm-auto bg-light bg-sm-transparent p-3 p-sm-0 rounded-3">
                                        <div className="display-6 fw-bolder mb-1" style={{ color: record.color }}>
                                            {record.result}
                                        </div>
                                        <div className="badge rounded-pill px-3 py-2 border shadow-sm" style={{ backgroundColor: '#fff', color: record.color, borderColor: `${record.color}30` }}>
                                            {record.status}
                                        </div>
                                    </div>

                                </div>
                            ))
                        ) : (
                            <div className="text-center p-5 rounded-4" style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}>
                                <i className="bi bi-inbox fs-1 text-muted opacity-50 mb-3 d-block"></i>
                                <h6 className="fw-bold text-muted">No records found</h6>
                                <p className="small text-muted mb-0">You haven't saved any {filter} data yet.</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}