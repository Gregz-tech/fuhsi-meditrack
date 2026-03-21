import { Link } from 'react-router-dom';

import studentImg from '../../images/fuhsi_students.png';
import staffImg from '../../images/staff.png';
import visitorImg from '../../images/visitor.png'; 

export default function RoleSelection() {
    return (
        <div className="container py-5 view-enter">
            <div className="text-center mb-5">
                <h2 className="display-6 fw-bolder text-dark mb-3">Who is using FUHSI Meditrack?</h2>
                <p className="lead text-muted">Select your campus profile to set up your personalized wellness workspace.</p>
            </div>

            <div className="row justify-content-center g-4">
                
                {/* 🎓 Student Card */}
                <div className="col-lg-4 col-md-6">
                    <Link to="/auth" state={{ role: 'Student' }} className="text-decoration-none h-100 d-block">
                        <div className="card h-100 border-0 shadow hover-float overflow-hidden rounded-4 cursor-pointer" style={{
                            backgroundImage: `url(${studentImg})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            minHeight: '420px'
                        }}>
                            <div className="card-img-overlay d-flex flex-column p-4" style={{
                                background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.1) 100%)'
                            }}>
                                <div className="text-center mt-3 mb-auto">
                                    <div className="rounded-circle d-inline-flex p-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(5px)' }}>
                                        <i className="bi bi-mortarboard-fill fs-1 text-white"></i>
                                    </div>
                                </div>
                                <div className="text-center text-white mt-auto">
                                    <h3 className="fw-bold mb-2">Student</h3>
                                    <p className="small text-light opacity-75 mb-4">
                                        For active students of FUHSI. Track your health, check compatibilities, and monitor daily wellness.
                                    </p>
                                    <div className="btn btn-success w-100 py-2 fw-bold rounded-pill" style={{ backgroundColor: 'var(--color-primary)', border: 'none' }}>
                                        Select Student
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* 💼 Staff Card */}
                <div className="col-lg-4 col-md-6">
                    <Link to="/auth" state={{ role: 'Staff' }} className="text-decoration-none h-100 d-block">
                        <div className="card h-100 border-0 shadow hover-float overflow-hidden rounded-4 cursor-pointer" style={{
                            backgroundImage: `url(${staffImg})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            minHeight: '420px'
                        }}>
                            <div className="card-img-overlay d-flex flex-column p-4" style={{
                                background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.1) 100%)'
                            }}>
                                <div className="text-center mt-3 mb-auto">
                                    <div className="rounded-circle d-inline-flex p-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(5px)' }}>
                                        <i className="bi bi-person-badge-fill fs-1 text-white"></i>
                                    </div>
                                </div>
                                <div className="text-center text-white mt-auto">
                                    <h3 className="fw-bold mb-2">Staff</h3>
                                    <p className="small text-light opacity-75 mb-4">
                                        For academic and non-academic campus staff members seeking to monitor their health metrics.
                                    </p>
                                    <div className="btn btn-primary w-100 py-2 fw-bold rounded-pill" style={{ backgroundColor: 'var(--color-accent)', border: 'none' }}>
                                        Select Staff
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* 🌍 Visitor Card */}
                <div className="col-lg-4 col-md-6">
                    <Link to="/auth" state={{ role: 'Visitor' }} className="text-decoration-none h-100 d-block">
                        <div className="card h-100 border-0 shadow hover-float overflow-hidden rounded-4 cursor-pointer" style={{
                            backgroundImage: `url(${visitorImg})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            minHeight: '420px'
                        }}>
                            <div className="card-img-overlay d-flex flex-column p-4" style={{
                                background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.1) 100%)'
                            }}>
                                <div className="text-center mt-3 mb-auto">
                                    <div className="rounded-circle d-inline-flex p-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(5px)' }}>
                                        <i className="bi bi-globe-americas fs-1 text-white"></i>
                                    </div>
                                </div>
                                <div className="text-center text-white mt-auto">
                                    <h3 className="fw-bold mb-2">Visitor</h3>
                                    <p className="small text-light opacity-75 mb-4">
                                        For interns, visiting students, or guests. Access tools with the option to save or use as a guest.
                                    </p>
                                    <div className="btn btn-warning w-100 py-2 fw-bold rounded-pill text-dark">
                                        Select Visitor
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

            </div>
        </div>
    );
}