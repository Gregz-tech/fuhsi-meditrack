import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname;

    const isAppArea = path === '/dashboard' || path.startsWith('/module-') || path === '/history' || path === '/profile';

    const handleLogout = () => {
        sessionStorage.removeItem('activeUser');
        navigate('/'); 
    };

    return (
        <nav className="navbar navbar-expand-lg sticky-top bg-white bg-opacity-75" style={{ backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--border-color)' }}>
            <div className="container">
                <Link className="navbar-brand text-gradient fs-4 fw-bold" to="/">
                    <i className="bi bi-heart-pulse-fill me-2"></i> FUHSI Meditrack
                </Link>
                
                <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">
                        {!isAppArea ? (
                            <>
                            
                            </>
                        ) : (
                            <li className="nav-item">
                                {/* <button onClick={handleLogout} className="btn btn-outline-danger btn-sm px-3 rounded-pill fw-bold">
                                    <i className="bi bi-box-arrow-right me-1"></i> Logout
                                </button> */}
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}