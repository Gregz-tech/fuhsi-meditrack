import { useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function KioskSecurityWrapper({ children, timeout = 30000 }) {
    const navigate = useNavigate();
    const location = useLocation();
    const timerRef = useRef(null);

    // Define public routes where the auto-logout shouldn't trigger
    const publicRoutes = ['/', '/auth', '/roles'];

    const logoutAndReset = useCallback(() => {
        // 1. Wipe any stored data (critical for a shared kiosk)
        localStorage.clear();
        sessionStorage.clear();

        // 2. If they aren't already on a public page, force them back to the start
        if (!publicRoutes.includes(location.pathname)) {
            console.log("Kiosk Security: Inactivity detected. Forcing logout.");
            navigate('/', { replace: true });
        }
    }, [navigate, location.pathname, publicRoutes]);

    const resetTimer = useCallback(() => {
        if (timerRef.current) clearTimeout(timerRef.current);
        
        // Only run the countdown timer if the user is inside the private app modules
        if (!publicRoutes.includes(location.pathname)) {
            timerRef.current = setTimeout(logoutAndReset, timeout);
        }
    }, [logoutAndReset, timeout, location.pathname, publicRoutes]);

    useEffect(() => {
        // Events that count as "User Activity" on a touchscreen
        const activityEvents = [
            'mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'touchmove', 'click'
        ];

        const handleActivity = () => resetTimer();

        // Attach listeners to the entire document
        activityEvents.forEach(event => document.addEventListener(event, handleActivity));

        // Start the timer when the component mounts
        resetTimer();

        // Cleanup listeners when the component unmounts
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            activityEvents.forEach(event => document.removeEventListener(event, handleActivity));
        };
    }, [resetTimer]);

    return <>{children}</>;
}