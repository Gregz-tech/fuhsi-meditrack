import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setError(''); // Reset errors

        // MOCK AUTHENTICATION (Until Convex is added)
        // We'll just create a fake user session if they type anything for now
        if (email && password) {
            const mockUser = {
                name: "Peter Gregorian", // We can use your name for the mock!
                email: email,
                role: "Student",
                matric: "23/ITH/067",
                department: "Information Technology & Health Informatics"
            };
            
            sessionStorage.setItem('activeUser', JSON.stringify(mockUser));
            navigate('/dashboard'); // Route to dashboard!
        } else {
            setError('Please enter both email and password.');
        }
    };

    return (
        <div className="container py-4 mb-5 view-enter">
            <div className="row justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
                <div className="col-12 col-md-6 col-lg-5">
                    <div className="mt-card border-0 shadow-lg p-4 p-sm-5">
                        <div className="text-center mb-4">
                            <h2 className="fw-bold text-gradient">Welcome Back</h2>
                            <p className="text-muted small">Sign in to your FUHSI Meditrack account</p>
                        </div>

                        {/* Error Message Display */}
                        {error && (
                            <div className="alert alert-danger py-2 small" role="alert">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin}>
                            <div className="form-floating mb-3">
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="login_email" 
                                    placeholder="name@example.com" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required 
                                />
                                <label htmlFor="login_email">Email Address</label>
                            </div>
                            
                            <div className="form-floating mb-4">
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="login_password" 
                                    placeholder="Password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required 
                                />
                                <label htmlFor="login_password">Password</label>
                            </div>

                            <button type="submit" className="btn btn-primary-mt w-100 py-3 mb-3 fs-5 rounded-pill">
                                Login
                            </button>

                            <div className="text-center">
                                <p className="text-muted small">
                                    New to FUHSI Meditrack? <Link to="/roles" style={{ color: 'var(--color-primary)' }} className="fw-bold text-decoration-none">Create Account</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}