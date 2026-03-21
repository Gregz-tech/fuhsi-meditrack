import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();
    
    // State to hold the full user profile object
    const [user, setUser] = useState({
        name: 'John Doe',
        role: 'student', // can be 'student', 'staff', or 'visitor'
        matric: 'FUHSI/ITH/24/001',
        dept: 'Information Technology',
        level: '300',
        staffId: '',
        visitorType: '',
        occupation: ''
    });

    useEffect(() => {
        // Fetch the serialized user object from storage
        const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Error parsing user data");
            }
        }
    }, []);

    // Module Data
    const modules = [
        { id: 1, title: 'BMI Checker', desc: 'Calculate your Body Mass Index and health category.', path: '/module-bmi', img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=600' },
        { id: 2, title: 'Genotype Compatibility', desc: 'Check genetic compatibility for future planning.', path: '/module-genotype', img: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=600' },
        { id: 3, title: 'Blood Group Map', desc: 'Understand donor compatibility and blood traits.', path: '/module-blood', img: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=600' },
        { id: 4, title: 'Mental Wellness', desc: 'A quick assessment of your current mental state.', path: '/module-wellness', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600' },
        { id: 7, title: 'Lifestyle Check', desc: 'Analyze habits like sleep, water, and exercise.', path: '/module-lifestyle', img: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=600' },
        { id: 9, title: 'Health Tips', desc: 'Personalized recommendations based on your data.', path: '/tips', img: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=600' },
         { id: 5, title: 'Health History', desc: 'Review all your past tests and calculations.', path: '/history', img: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600' },
        { id: 6, title: 'Health Trends', desc: 'Visualize your health progress over time.', path: '/trends', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600' },
         { id: 8, title: 'Health Summary', desc: 'A one-page overview of your entire health status.', path: '/summary', img: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=600' },
        { id: 10, title: 'Ask Meditrack AI', desc: 'Instant health answers from your AI assistant.', path: '/ai', img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600' }
    ];

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/', { replace: true });
    };

    // Helper function to render the correct badges based on user role
    const renderUserInfo = () => {
        if (user.role === 'student') {
            return (
                <>
                    <span className="badge bg-light text-dark border px-3 py-2 shadow-sm"><i className="bi bi-card-text text-primary me-2"></i>{user.matric}</span>
                    <span className="badge bg-light text-dark border px-3 py-2 shadow-sm"><i className="bi bi-building text-info me-2"></i>{user.dept}</span>
                    <span className="badge bg-light text-dark border px-3 py-2 shadow-sm"><i className="bi bi-mortarboard-fill text-warning me-2"></i>Level {user.level}</span>
                </>
            );
        }
        if (user.role === 'staff') {
            return (
                <>
                    <span className="badge bg-light text-dark border px-3 py-2 shadow-sm"><i className="bi bi-person-badge text-danger me-2"></i>Staff ID: {user.staffId}</span>
                    <span className="badge bg-light text-dark border px-3 py-2 shadow-sm"><i className="bi bi-building text-info me-2"></i>{user.dept}</span>
                </>
            );
        }
        if (user.role === 'visitor') {
            return (
                <>
                    <span className="badge bg-light text-dark border px-3 py-2 shadow-sm"><i className="bi bi-person-bounding-box text-success me-2"></i>{user.visitorType} Visitor</span>
                    <span className="badge bg-light text-dark border px-3 py-2 shadow-sm"><i className="bi bi-briefcase-fill text-secondary me-2"></i>{user.occupation}</span>
                </>
            );
        }
        return <p className="text-muted small mb-0 fw-bold">Select a module to begin your health check</p>;
    };

    return (
        <div className="container py-4 view-enter min-vh-100">
            
            <style>
                {`
                .image-card-container {
                    position: relative; border-radius: 1.25rem; overflow: hidden;
                    cursor: pointer; min-height: 240px; box-shadow: 0 10px 20px rgba(0,0,0,0.08);
                    transition: all 0.3s ease;
                }
                .image-card-container:hover { transform: translateY(-5px); box-shadow: 0 15px 30px rgba(0,0,0,0.15); }
                .image-card-bg {
                    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                    background-size: cover; background-position: center; transition: transform 0.5s ease;
                }
                .image-card-container:hover .image-card-bg { transform: scale(1.08); }
                .image-card-overlay {
                    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                    background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%); z-index: 1;
                }
                .image-card-content {
                    position: relative; z-index: 2; height: 100%; display: flex; flex-direction: column;
                    justify-content: flex-end; padding: 1.5rem; color: white;
                }
                `}
            </style>

            {/* DYNAMIC USER PROFILE HEADER */}
            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mb-5 mt-2 bg-white p-4 p-md-5 rounded-5 shadow-sm border-start border-4" style={{ borderColor: 'var(--color-primary)' }}>
                
                <div className="d-flex flex-column flex-sm-row align-items-sm-center gap-4 mb-4 mb-lg-0 w-100">
                    <div className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ backgroundColor: 'rgba(31, 169, 113, 0.1)', color: 'var(--color-primary)', width: '75px', height: '75px' }}>
                        <i className="bi bi-person-fill" style={{ fontSize: '2.5rem' }}></i>
                    </div>
                    
                    <div>
                        <h2 className="fw-bolder mb-2 text-dark">Welcome Back, {user.name}</h2>
                        <div className="d-flex flex-wrap gap-2">
                            {/* Injects the specific role badges here */}
                            {renderUserInfo()}
                        </div>
                    </div>
                </div>

                <div className="flex-shrink-0">
                    <button onClick={handleLogout} className="btn btn-outline-danger btn-lg rounded-pill px-4 fw-bold d-flex align-items-center w-100 justify-content-center">
                        <i className="bi bi-shield-lock-fill me-2"></i> Secure Logout
                    </button>
                </div>

            </div>

            {/* GRID LAYOUT */}
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mb-5">
                {modules.map((mod) => (
                    <div className="col" key={mod.id}>
                        <div className="image-card-container" onClick={() => navigate(mod.path)}>
                            <div className="image-card-bg" style={{ backgroundImage: `url(${mod.img})` }}></div>
                            <div className="image-card-overlay"></div>
                            <div className="image-card-content">
                                <h5 className="fw-bolder mb-2 tracking-wide">{mod.title}</h5>
                                <p className="small mb-0 opacity-75 lh-base" style={{ fontSize: '0.8rem' }}>{mod.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}