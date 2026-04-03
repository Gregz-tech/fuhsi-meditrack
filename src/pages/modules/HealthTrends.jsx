import { useNavigate } from 'react-router-dom';
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { 
    PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

export default function HealthTrends() {
    const navigate = useNavigate();

    // ☁️ Fetch Real-Time Aggregated Data from Convex
    const trendsData = useQuery(api.trends.getCampusData);

    // Standardized color mapping for clinical accuracy
    const COLORS = {
        // BMI Colors
        'Underweight': '#F59E0B', // Orange
        'Normal Weight': '#1FA971', // Green
        'Overweight': '#EF4444', // Red
        'Obese': '#7F1D1D', // Dark Red
        
        // BP Colors
        'Normal': '#1FA971', 
        'Elevated': '#17a2b8', 
        'High BP (Stage 1)': '#ffc107', 
        'High BP (Stage 2)': '#fd7e14', 
        'Hypertensive Crisis': '#dc3545',
        
        // Default Fallback
        'Default': '#6f42c1'
    };

    return (
        <div className="container-fluid py-4 position-relative overflow-hidden min-vh-100 view-enter" style={{ backgroundColor: '#f8f9fa' }}>
            
            {/* --- ANIMATED BACKGROUND BLOBS (ANALYTICS THEME) --- */}
            <style>
                {`
                .blob {
                    position: absolute; width: 500px; height: 500px;
                    background: #3A86FF; filter: blur(100px);
                    opacity: 0.1; z-index: 0; border-radius: 50%;
                    animation: move 25s infinite alternate;
                }
                .blob-2 {
                    background: #1FA971; right: -100px; top: 30%; animation-delay: -7s; opacity: 0.08;
                }
                @keyframes move {
                    from { transform: translate(-5%, -5%) rotate(0deg); }
                    to { transform: translate(5%, 5%) rotate(360deg); }
                }
                .glass-nav {
                    background: #212529; border: 2px solid rgba(255, 255, 255, 0.2);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2); position: relative; transition: all 0.3s ease;
                }
                .glass-nav:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3); }
                .chart-card {
                    background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px);
                    border: 1px solid rgba(0, 0, 0, 0.05); transition: all 0.3s ease;
                }
                .chart-card:hover { transform: translateY(-3px); box-shadow: 0 15px 35px rgba(0,0,0,0.08) !important; }
                `}
            </style>

            <div className="blob"></div>
            <div className="blob blob-2"></div>

            <div className="container position-relative" style={{ zIndex: 1 }}>
                
                {/* --- NAVIGATION --- */}
                <div className="d-flex justify-content-center mb-4 mt-2">
                    <div className="glass-nav p-1 rounded-pill">
                        <button onClick={() => navigate('/dashboard')} className="btn border-0 d-flex align-items-center fw-bolder py-2 px-4 rounded-pill" style={{ color: '#fff', fontSize: '0.75rem', letterSpacing: '1px' }}>
                            <i className="bi bi-grid-fill me-2 text-white"></i> BACK TO DASHBOARD
                        </button>
                    </div>
                </div>

                {/* --- HEADER --- */}
                <div className="text-center mb-5">
                    <div className="rounded-4 d-inline-flex p-3 mb-3 shadow-sm" style={{ background: 'linear-gradient(135deg, #212529 0%, #343a40 100%)', color: '#fff' }}>
                        <i className="bi bi-bar-chart-fill fs-2"></i>
                    </div>
                    <h2 className="fw-bolder text-dark mb-2">Campus Health Trends</h2>
                    <p className="text-muted small mb-0">Anonymized, real-time aggregate data from the Vida Sana Kiosk</p>
                </div>

                {/* --- LOADING STATE --- */}
                {trendsData === undefined ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status"></div>
                        <p className="mt-3 text-muted fw-bold">Crunching Campus Data...</p>
                    </div>
                ) : (
                    <>
                        {/* --- TOP SUMMARY CARDS --- */}
                        <div className="row g-4 mb-5">
                            <div className="col-md-4">
                                <div className="chart-card p-4 rounded-4 shadow-sm h-100 d-flex align-items-center gap-3 border-start border-primary border-5">
                                    <div className="rounded-circle bg-primary bg-opacity-10 p-3 text-primary">
                                        <i className="bi bi-database fs-3"></i>
                                    </div>
                                    <div>
                                        <h3 className="fw-bolder mb-0 text-dark">{trendsData.totalRecords}</h3>
                                        <div className="text-muted small fw-bold text-uppercase tracking-wider">Total Records</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="chart-card p-4 rounded-4 shadow-sm h-100 d-flex align-items-center gap-3 border-start border-success border-5">
                                    <div className="rounded-circle bg-success bg-opacity-10 p-3 text-success">
                                        <i className="bi bi-shield-check fs-3"></i>
                                    </div>
                                    <div>
                                        <h3 className="fw-bolder mb-0 text-dark">Active</h3>
                                        <div className="text-muted small fw-bold text-uppercase tracking-wider">Data Anonymization</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="chart-card p-4 rounded-4 shadow-sm h-100 d-flex align-items-center gap-3 border-start border-info border-5">
                                    <div className="rounded-circle bg-info bg-opacity-10 p-3 text-info">
                                        <i className="bi bi-broadcast fs-3"></i>
                                    </div>
                                    <div>
                                        <h3 className="fw-bolder mb-0 text-dark">Real-Time</h3>
                                        <div className="text-muted small fw-bold text-uppercase tracking-wider">Sync Status</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* --- CHARTS GRID --- */}
                        <div className="row g-4 mb-5">
                            
                            {/* BMI DISTRIBUTION PIE CHART */}
                            <div className="col-lg-6">
                                <div className="chart-card p-4 rounded-5 shadow-sm h-100">
                                    <h5 className="fw-bolder mb-4 d-flex align-items-center text-dark">
                                        <i className="bi bi-pie-chart-fill text-primary me-2"></i> BMI Distribution
                                    </h5>
                                    {trendsData.bmiChartData.length > 0 ? (
                                        <div style={{ height: '300px' }}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie data={trendsData.bmiChartData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                                                        {trendsData.bmiChartData.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={COLORS[entry.name] || COLORS['Default']} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                                                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                    ) : (
                                        <div className="h-100 d-flex align-items-center justify-content-center text-muted small pb-5">No BMI data available yet.</div>
                                    )}
                                </div>
                            </div>

                            {/* BP DISTRIBUTION PIE CHART */}
                            <div className="col-lg-6">
                                <div className="chart-card p-4 rounded-5 shadow-sm h-100">
                                    <h5 className="fw-bolder mb-4 d-flex align-items-center text-dark">
                                        <i className="bi bi-activity text-danger me-2"></i> Blood Pressure Status
                                    </h5>
                                    {trendsData.bpChartData.length > 0 ? (
                                        <div style={{ height: '300px' }}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie data={trendsData.bpChartData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                                                        {trendsData.bpChartData.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={COLORS[entry.name] || COLORS['Default']} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                                                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                    ) : (
                                        <div className="h-100 d-flex align-items-center justify-content-center text-muted small pb-5">No BP data available yet.</div>
                                    )}
                                </div>
                            </div>

                            {/* TOP RISKS BAR CHART */}
                            <div className="col-12">
                                <div className="chart-card p-4 p-md-5 rounded-5 shadow-sm">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h5 className="fw-bolder mb-0 d-flex align-items-center text-dark">
                                            <i className="bi bi-exclamation-triangle-fill text-warning me-2"></i> Prevalent Health Risks
                                        </h5>
                                        <span className="badge bg-light text-dark border">Top 5 Conditions</span>
                                    </div>
                                    
                                    {trendsData.topRisksData.length > 0 ? (
                                        <div style={{ height: '350px' }}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={trendsData.topRisksData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6c757d', fontSize: 12 }} />
                                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6c757d' }} allowDecimals={false} />
                                                    <Tooltip 
                                                        cursor={{ fill: 'rgba(0,0,0,0.05)' }} 
                                                        contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} 
                                                    />
                                                    <Bar dataKey="count" fill="#3A86FF" radius={[6, 6, 0, 0]} barSize={50}>
                                                        {trendsData.topRisksData.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#3A86FF'} />
                                                        ))}
                                                    </Bar>
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    ) : (
                                        <div className="h-100 d-flex align-items-center justify-content-center text-muted small py-5">
                                            Campus health looks highly stable! No major risk categories flagged yet.
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </>
                )}
            </div>
        </div>
    );
}