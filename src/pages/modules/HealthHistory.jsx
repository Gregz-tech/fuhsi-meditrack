import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ☁️ NEW: Import Convex tools
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function HealthHistory() {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('All');
    const [user, setUser] = useState(null);

    // 1. Get the currently logged-in user from local storage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // 2. ☁️ Fetch REAL records from Convex based on the user's email
    // We use "skip" if the user hasn't loaded yet to prevent errors
    const records = useQuery(api.records.getUserRecords, user?.email ? { userId: user.email } : "skip");

    const filterOptions = ['All', 'BMI', 'Blood Pressure', 'Wellness', 'Genotype', 'Blood'];

    // 3. Helper to style the records dynamically based on the module name
    const getThemeForModule = (moduleName) => {
        const themes = {
            'BMI': { type: 'BMI', title: 'Body Mass Index', color: '#1FA971', icon: 'bi-heart-pulse-fill' },
            'Blood Pressure': { type: 'Blood Pressure', title: 'Blood Pressure Monitor', color: '#dc3545', icon: 'bi-activity' },
            'Wellness': { type: 'Wellness', title: 'Mental Wellness', color: '#3A86FF', icon: 'bi-brain' },
            'Genotype': { type: 'Genotype', title: 'Genotype Compatibility', color: '#8b5cf6', icon: 'bi-people-fill' },
            'Blood': { type: 'Blood', title: 'Blood Group Map', color: '#EF4444', icon: 'bi-droplet-fill' },
            'Lifestyle': { type: 'Lifestyle', title: 'Daily Habit Score', color: '#f59e0b', icon: 'bi-sun-fill' }
        };
        return themes[moduleName] || { type: 'Other', title: moduleName, color: '#6c757d', icon: 'bi-clipboard-data' };
    };

    // 4. Format the raw Unix timestamp from Convex into a readable date
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    // 5. Apply the UI filters to the fetched Convex data
    const filteredData = filter === 'All' && records
        ? records 
        : records?.filter(item => item.module === filter) || [];

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
                        
                        {/* Loading State */}
                        {records === undefined && (
                            <div className="text-center p-5">
                                <div className="spinner-border text-primary" role="status"></div>
                                <p className="mt-3 text-muted fw-bold">Syncing with Cloud...</p>
                            </div>
                        )}

                        {/* Render Fetched Data */}
                        {records !== undefined && filteredData.length > 0 ? (
                            filteredData.map((record) => {
                                const theme = getThemeForModule(record.module); // Map the colors!
                                
                                return (
                                    <div key={record._id} className="history-card rounded-4 p-3 p-sm-4 shadow-sm d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 animate-fade-in">
                                        
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="rounded-circle p-3 shadow-sm d-flex align-items-center justify-content-center" style={{ backgroundColor: `${theme.color}15`, color: theme.color, width: '55px', height: '55px' }}>
                                                <i className={`bi ${theme.icon} fs-4`}></i>
                                            </div>
                                            <div>
                                                <h6 className="fw-bolder mb-1 text-dark">{theme.title}</h6>
                                                <div className="d-flex align-items-center text-muted small fw-bold">
                                                    <i className="bi bi-calendar-event me-2"></i>{formatDate(record.timestamp)}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-sm-end ms-sm-auto bg-light bg-sm-transparent p-3 p-sm-0 rounded-3">
                                            <div className="display-6 fw-bolder mb-1" style={{ color: theme.color }}>
                                                {record.result}
                                            </div>
                                            <div className="badge rounded-pill px-3 py-2 border shadow-sm" style={{ backgroundColor: '#fff', color: theme.color, borderColor: `${theme.color}30` }}>
                                                {record.category}
                                            </div>
                                        </div>

                                    </div>
                                );
                            })
                        ) : records !== undefined && (
                            <div className="text-center p-5 rounded-4" style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}>
                                <i className="bi bi-inbox fs-1 text-muted opacity-50 mb-3 d-block"></i>
                                <h6 className="fw-bold text-muted">No records found</h6>
                                <p className="small text-muted mb-0">You haven't saved any {filter} data to the cloud yet.</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}