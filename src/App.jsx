import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import KioskSecurityWrapper from './components/layout/KioskSecurityWrapper'; // <-- Added Security Wrapper

// Page Imports
import Landing from './pages/Landing';
import AuthPage from './pages/auth/AuthPage'; 
import Dashboard from './pages/Dashboard';
import RoleSelection from './pages/auth/RoleSelection';

// Module Imports
import BmiCalculator from './pages/modules/BmiCalculator';
import BPModule from './pages/modules/BPModule';
import GenotypeCheck from './pages/modules/GenotypeCheck';
import BloodGroupCheck from './pages/modules/BloodGroupCheck';
import MentalWellnessCheck from './pages/modules/MentalWellnessCheck';
import LifestyleCheck from './pages/modules/LifestyleCheck';
import HealthHistory from './pages/modules/HealthHistory';
import HealthTrends from './pages/modules/HealthTrends';
import HealthSummary from './pages/modules/HealthSummary';
import HealthTips from './pages/modules/HealthTips';

// Layout wrapper
const StandardLayout = () => {
  return (
    <>
      <Navbar />
      <main className="container mt-5 mb-5 min-vh-100">
        <Outlet /> 
      </main>
    </>
  );
};

function App() {
  return (
    <Router>
      {/* 🛡️ Kiosk Security Wrapper surrounds all routes with a 60-second timeout */}
      <KioskSecurityWrapper timeout={30000}>
        <Routes>
          
          {/* FULLSCREEN ROUTES */}
          <Route path="/auth" element={<AuthPage />} />

          {/* STANDARD ROUTES */}
          <Route element={<StandardLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/roles" element={<RoleSelection />} />
            
            {/* Module Routes */}
            <Route path="/module-bmi" element={<BmiCalculator />} />
            <Route path="/module-bp" element={<BPModule />} />
            <Route path="/module-genotype" element={<GenotypeCheck />} />
            <Route path="/module-blood" element={<BloodGroupCheck />} />
            <Route path="/module-wellness" element={<MentalWellnessCheck />} />
            <Route path="/module-lifestyle" element={<LifestyleCheck />} />
            <Route path="/history" element={<HealthHistory />} />
            <Route path="/trends" element={<HealthTrends />} />
            <Route path="/summary" element={<HealthSummary />} />
            <Route path="/tips" element={<HealthTips />} />
            
            {/* 404 Fallback */}
            <Route path="*" element={
              <div className="text-center mt-5">
                <h1 className="display-1 fw-bold text-muted">404</h1>
                <p className="lead">Module not found.</p>
              </div>
            } />
          </Route>

        </Routes>
      </KioskSecurityWrapper>
    </Router>
  );
}

export default App;