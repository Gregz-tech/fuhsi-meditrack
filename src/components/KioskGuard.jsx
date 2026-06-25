import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function KioskGuard({ children }) {
    // 🟢 MASTER SWITCH: Set to 'true' for testing, change to 'false' for production TV launch!
    const IS_TESTING_MODE = true; 

    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    // If we are in testing mode, instantly bypass all security and show the app!
    if (IS_TESTING_MODE) {
        return children;
    }

    useEffect(() => {
        // 1. Look for the secret setup parameter in the URL
        const searchParams = new URLSearchParams(location.search);
        const setupKey = searchParams.get('setup');

        // 🚨 Change this string to whatever secret password you want!
        if (setupKey === 'fuhsi_admin_2026') { 
            // Lock this device permanently
            localStorage.setItem('kiosk_authorized', 'true');
            
            // Clean the URL instantly so nobody sees the secret key
            navigate(location.pathname, { replace: true });
        }

        // 2. Check if this specific device has the authorization token
        if (localStorage.getItem('kiosk_authorized') === 'true') {
            setIsAuthorized(true);
        }
        
        setIsLoading(false);
    }, [location, navigate]);

    // Prevent screen flashing while checking
    if (isLoading) return null; 

    // 🛑 THE LOCKOUT SCREEN (What students see on their phones when not in testing mode)
    if (!isAuthorized) {
        return (
            <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-dark text-white">
                <div className="text-center p-5 rounded-4 border border-danger shadow-lg" style={{ maxWidth: '500px', backgroundColor: '#111' }}>
                    <div className="text-danger mb-4">
                        <i className="bi bi-shield-lock-fill" style={{ fontSize: '4rem' }}></i>
                    </div>
                    <h2 className="fw-bolder mb-3 text-white">Terminal Access Restricted</h2>
                    <p className="text-muted lh-lg mb-0">
                        This application can only be accessed from authorized FUHSI campus terminal hardware. 
                        Remote connections are strictly prohibited by system security protocols.
                    </p>
                </div>
            </div>
        );
    }

    // ✅ If authorized, let them see the actual app
    return children; 
}