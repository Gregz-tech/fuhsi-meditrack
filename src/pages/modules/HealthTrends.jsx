import { useNavigate } from 'react-router-dom';

export default function HealthTrends() {
    const navigate = useNavigate();

    // Dummy data for the last 7 days of Lifestyle Scores (out of 100)
    const lifestyleData = [
        { day: 'Mon', score: 45 }, { day: 'Tue', score: 60 }, { day: 'Wed', score: 85 },
        { day: 'Thu', score: 70 }, { day: 'Fri', score: 90 }, { day: 'Sat', score: 50 }, { day: 'Sun', score: 80 }
    ];

    // Dummy data for Mental Wellness Scores (out of 12)
    const wellnessData = [2, 4, 3, 6, 8, 5, 3]; 
    const svgPoints = wellnessData.map((val, i) => `${i * 50},${60 - (val * 5)}`).join(' ');

    return (
        <div className="container py-4 position-relative overflow-hidden min-vh-100 view-enter">
            
            {/* --- ANIMATED BACKGROUND BLOBS (ANALYTICS THEME) --- */}
            <style>
                {`
                .blob {
                    position: absolute; width: 450px; height: 450px;
                    background: #4361ee; filter: blur(90px);
                    opacity: 0.15; z-index: -1; border-radius: 50%;
                    animation: move 25s infinite alternate;
                }
                .blob-2 {
                    background: #00f5d4; right: -50px; top: 30%; animation-delay: -7s;
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
                .module-card {
                    background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.5);
                }
                /* Animated Bar Chart */
                .bar-container { height: 150px; display: flex; align-items: flex-end; justify-content: space-between; gap: 8px; }
                .bar-wrapper { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px; }
                .bar-fill { 
                    width: 100%; background: linear-gradient(to top, #0ea5e9, #2dd4bf); 
                    border-radius: 6px; transition: height 1.5s cubic-bezier(0.4, 0, 0.2, 1);
                    animation: growUp 1s ease-out forwards; transform-origin: bottom;
                }
                @keyframes growUp { from { transform: scaleY(0); } to { transform: scaleY(1); } }
                `}
            </style>

            <div className="blob"></div>
            <div className="blob blob-2"></div>

            {/* --- CENTERED GREEN NAVIGATION PILL --- */}
            <div className="d-flex justify-content-center mb-5 mt-2">
                <div className="glass-nav-green p-1 rounded-pill">
                    <button onClick={() => navigate('/dashboard')} className="btn border-0 d-flex align-items-center fw-bolder py-2 px-4 rounded-pill" style={{ color: '#fff', fontSize: '0.75rem', letterSpacing: '1px' }}>
                        <i className="bi bi-grid-fill me-2 text-white"></i> BACK TO DASHBOARD
                    </button>
                </div>
            </div>

            <div className="row justify-content-center g-4 mb-5">
                
                <div className="col-12 text-center mb-2">
                    <h2 className="fw-bolder text-dark mb-1">Health Trends Analytics</h2>
                    <p className="text-muted small">Visualize your habits and wellness over the last 7 days</p>
                </div>

                {/* --- LIFESTYLE BAR CHART --- */}
                <div className="col-lg-6">
                    <div className="module-card p-4 p-sm-5 shadow-lg rounded-5 h-100 animate-fade-in">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div>
                                <h5 className="fw-bolder mb-1 d-flex align-items-center">
                                    <i className="bi bi-activity text-info me-2"></i> Vitality Score
                                </h5>
                                <p className="text-muted small mb-0">7-Day Average: <strong>68/100</strong></p>
                            </div>
                            <div className="badge bg-info bg-opacity-10 text-info border border-info rounded-pill px-3 py-2">
                                +12% vs last week
                            </div>
                        </div>

                        {/* Pure CSS Bar Chart */}
                        <div className="p-4 bg-light rounded-4 border-0">
                            <div className="bar-container">
                                {lifestyleData.map((item, idx) => (
                                    <div key={idx} className="bar-wrapper">
                                        <div className="small fw-bold text-muted mb-1" style={{ fontSize: '0.65rem' }}>{item.score}</div>
                                        <div className="bar-fill shadow-sm" style={{ height: `${item.score}%` }}></div>
                                        <div className="small fw-bold text-dark mt-1" style={{ fontSize: '0.7rem' }}>{item.day}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- MENTAL WELLNESS LINE CHART --- */}
                <div className="col-lg-6">
                    <div className="module-card p-4 p-sm-5 shadow-lg rounded-5 h-100 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div>
                                <h5 className="fw-bolder mb-1 d-flex align-items-center">
                                    <i className="bi bi-brain text-indigo me-2" style={{ color: '#6f42c1' }}></i> Stress Levels
                                </h5>
                                <p className="text-muted small mb-0">Lower is better (Out of 12)</p>
                            </div>
                            <div className="badge bg-warning bg-opacity-10 text-warning border border-warning rounded-pill px-3 py-2">
                                Midterm Week
                            </div>
                        </div>

                        {/* Pure SVG Line Chart */}
                        <div className="p-4 rounded-4 border-0 position-relative" style={{ backgroundColor: 'rgba(111, 66, 193, 0.05)', height: '198px' }}>
                            <svg viewBox="-10 -10 320 80" className="w-100 h-100" preserveAspectRatio="none">
                                {/* Grid Lines */}
                                <line x1="0" y1="0" x2="300" y2="0" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
                                <line x1="0" y1="30" x2="300" y2="30" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
                                <line x1="0" y1="60" x2="300" y2="60" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
                                
                                {/* The Data Line */}
                                <polyline 
                                    fill="none" 
                                    stroke="#6f42c1" 
                                    strokeWidth="4" 
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    points={svgPoints} 
                                    style={{ filter: 'drop-shadow(0 8px 6px rgba(111, 66, 193, 0.3))' }}
                                />
                                
                                {/* Data Points (Circles) */}
                                {wellnessData.map((val, i) => (
                                    <circle key={i} cx={i * 50} cy={60 - (val * 5)} r="4" fill="#fff" stroke="#6f42c1" strokeWidth="2" />
                                ))}
                            </svg>
                            
                            {/* X-Axis Labels */}
                            <div className="d-flex justify-content-between mt-2 px-1 text-muted fw-bold" style={{ fontSize: '0.7rem' }}>
                                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}