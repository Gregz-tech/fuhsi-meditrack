import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HealthTips() {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('All');

    // Categorized health tips tailored for university students
    const tipsData = [
        {
            id: 1,
            category: 'Study Ergonomics',
            title: 'The 20-20-20 Rule for IT Students',
            content: 'As an Information Technology & Health Informatics student, you likely spend long hours coding or analyzing data. To prevent digital eye strain, look at something 20 feet away for 20 seconds every 20 minutes.',
            icon: 'bi-laptop',
            color: '#3b82f6', // Blue
            featured: true
        },
        {
            id: 2,
            category: 'Nutrition',
            title: 'Brain Food for Midterms',
            content: 'Swap sugary energy drinks for water and complex carbs like oats or groundnuts. They provide sustained glucose release, keeping your focus sharp during long lectures without the afternoon crash.',
            icon: 'bi-apple',
            color: '#10b981', // Green
            featured: false
        },
        {
            id: 3,
            category: 'Mental Wellness',
            title: 'Managing Academic Burnout',
            content: 'Feeling overwhelmed by projects is normal. Break large tasks into 25-minute "Pomodoro" intervals, and do not hesitate to step away from your desk and walk around the FUHSI campus to clear your head.',
            icon: 'bi-flower1',
            color: '#8b5cf6', // Purple
            featured: false
        },
        {
            id: 4,
            category: 'Fitness',
            title: 'Dorm Room Workouts',
            content: 'No gym? No problem. 15 minutes of bodyweight exercises (push-ups, squats, and planks) in your room every morning is enough to boost your cardiovascular health and trigger endorphin release.',
            icon: 'bi-bicycle',
            color: '#f59e0b', // Orange
            featured: false
        },
        {
            id: 5,
            category: 'Sleep',
            title: 'The "Night Owl" Myth',
            content: 'Pulling all-nighters actually decreases memory retention. Your brain consolidates what you studied during the REM cycle of sleep. Aim for at least 6-7 hours before a major exam.',
            icon: 'bi-moon-stars',
            color: '#6366f1', // Indigo
            featured: false
        }
    ];

    const categories = ['All', 'Study Ergonomics', 'Nutrition', 'Mental Wellness', 'Fitness', 'Sleep'];

    const filteredTips = activeCategory === 'All' 
        ? tipsData 
        : tipsData.filter(tip => tip.category === activeCategory);

    const featuredTip = tipsData.find(tip => tip.featured);

    return (
        <div className="container py-4 position-relative overflow-hidden min-vh-100 view-enter">
            
            {/* --- ANIMATED BACKGROUND BLOBS (AMBER/GOLD THEME) --- */}
            <style>
                {`
                .blob {
                    position: absolute; width: 450px; height: 450px;
                    background: #f59e0b; filter: blur(90px);
                    opacity: 0.15; z-index: -1; border-radius: 50%;
                    animation: move 25s infinite alternate;
                }
                .blob-2 {
                    background: #fbbf24; right: -50px; top: 30%; animation-delay: -7s;
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
                    border: 1px solid rgba(255, 255, 255, 0.5); transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .tip-card:hover {
                    transform: translateY(-5px); box-shadow: 0 15px 35px rgba(0,0,0,0.08) !important;
                }
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
                <div className="col-lg-10">
                    
                    {/* HEADER */}
                    <div className="text-center mb-5">
                        <div className="rounded-4 d-inline-flex p-3 mb-3 shadow-sm" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)', color: '#fff' }}>
                            <i className="bi bi-lightbulb-fill fs-2"></i>
                        </div>
                        <h2 className="fw-bolder text-dark mb-2">Health Recommendations</h2>
                        <p className="text-muted small mb-0">Curated wellness advice for peak academic performance</p>
                    </div>

                    {/* FEATURED TIP OF THE DAY */}
                    {activeCategory === 'All' && (
                        <div className="module-card rounded-5 border-0 shadow-lg p-1 mb-5 animate-fade-in position-relative overflow-hidden">
                            {/* Gold gradient border effect */}
                            <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(251, 191, 36, 0.05) 100%)', zIndex: 0 }}></div>
                            
                            <div className="bg-white rounded-5 p-4 p-md-5 position-relative" style={{ zIndex: 1 }}>
                                <div className="d-flex align-items-center mb-3">
                                    <span className="badge bg-warning text-dark rounded-pill px-3 py-2 fw-bold d-flex align-items-center shadow-sm">
                                        <i className="bi bi-star-fill me-2"></i> Tip of the Day
                                    </span>
                                    <span className="ms-auto text-muted small fw-bold text-uppercase">{featuredTip.category}</span>
                                </div>
                                <h3 className="fw-bolder text-dark mb-3">{featuredTip.title}</h3>
                                <p className="text-muted lh-lg mb-4" style={{ fontSize: '1.05rem' }}>{featuredTip.content}</p>
                                <button className="btn btn-outline-dark rounded-pill px-4 py-2 fw-bold text-uppercase" style={{ fontSize: '0.8rem' }}>
                                    <i className="bi bi-bookmark-plus me-2"></i> Save for later
                                </button>
                            </div>
                        </div>
                    )}

                    {/* DYNAMIC FILTERS */}
                    <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
                        {categories.map(cat => (
                            <button 
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`btn rounded-pill px-4 py-2 fw-bold transition-all ${activeCategory === cat ? 'shadow-sm' : 'border-0'}`}
                                style={{ 
                                    fontSize: '0.8rem',
                                    background: activeCategory === cat ? '#f59e0b' : 'rgba(255,255,255,0.7)',
                                    color: activeCategory === cat ? '#fff' : '#6c757d',
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* TIPS GRID */}
                    <div className="row g-4 mb-5">
                        {filteredTips.filter(tip => !tip.featured || activeCategory !== 'All').map(tip => (
                            <div className="col-md-6" key={tip.id}>
                                <div className="module-card tip-card rounded-4 p-4 h-100 shadow-sm d-flex flex-column animate-fade-in border-0">
                                    <div className="d-flex align-items-center mb-3 gap-3">
                                        <div className="rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ backgroundColor: `${tip.color}15`, color: tip.color, width: '45px', height: '45px' }}>
                                            <i className={`bi ${tip.icon} fs-5`}></i>
                                        </div>
                                        <h6 className="fw-bolder mb-0 text-dark flex-grow-1">{tip.title}</h6>
                                    </div>
                                    <p className="text-muted small lh-lg flex-grow-1 mb-4">{tip.content}</p>
                                    <div className="d-flex justify-content-between align-items-center mt-auto border-top pt-3">
                                        <span className="badge bg-light text-muted border px-2 py-1">{tip.category}</span>
                                        <button className="btn btn-link text-muted p-0 text-decoration-none hover-float" title="Share this tip">
                                            <i className="bi bi-share-fill"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}