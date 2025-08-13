import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/loginPage/Login';
import Home from './pages/homePage/Home';
import { loginUser, fetchHomeData } from './api';

function App() {
  const [user, setUser] = useState(null);
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle login
  const handleLogin = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await loginUser(credentials);
      setUser(userData);
      // Fetch home data after successful login
      const data = await fetchHomeData(userData.token);
      setHomeData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100vw', overflow: 'hidden' }}>
      <div className="absolute-bg"></div>
      <div className="fog-container">
        <div className="fog-img fog-img-first"></div>
        <div className="fog-img fog-img-second"></div>
      </div>
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={<Navigate to="/login" />} 
          />
          <Route 
            path="/login" 
            element={
              <Login 
                onLogin={handleLogin} 
                loading={loading} 
                error={error} 
              />
            } 
          />
          <Route 
            path="/home" 
            element={
              user ? (
                <Home 
                  user={user} 
                  data={homeData} 
                />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
