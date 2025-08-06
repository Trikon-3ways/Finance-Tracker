import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from '@clerk/clerk-react';
import Dashboard from '../pages/dashboard';
import Auth from '../pages/auth';
import { FinancialRecordContextProvider } from '../contexts/financial-record-contexts';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth();
  
  if (!isLoaded) {
    return <div className="loading">Loading...</div>;
  }
  
  if (!isSignedIn) {
    return <Navigate to="/auth" replace />;
  }
  
  return children;
};

// Public Route Component (for auth page)
const PublicRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth();
  
  if (!isLoaded) {
    return <div className="loading">Loading...</div>;
  }
  
  if (isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

function App() {
  return (
    <>
     <Router>
      <div className="App-container">
        <Routes>
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <FinancialRecordContextProvider>
                  <Dashboard/>
                </FinancialRecordContextProvider>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/auth" 
            element={
              <PublicRoute>
                <Auth/>
              </PublicRoute>
            }
          />
        </Routes>
        </div>
     </Router>
    </>
  )
}

export default App