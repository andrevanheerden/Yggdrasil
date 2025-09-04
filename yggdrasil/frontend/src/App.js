import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/loginPage/Login';
import Home from './pages/homePage/Home';
import CreateCampaignPage from './pages/homePage/components/createCampaign';
import Campaign from './pages/campaignPage/campaign';
import Character from './pages/characterPage/character';
import Encounter from './pages/encounterPage/encounter';

function App() {
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
            element={<Login />} 
          />
          <Route 
            path="/home" 
            element={<Home />} 
          />
          <Route 
            path="/create" 
            element={<CreateCampaignPage />} 
          />
          <Route 
            path="/campaign" 
            element={<Campaign />} 
          />
          <Route 
            path="/character" 
            element={<Character />} 
          />
          <Route 
            path="/encounter" 
            element={<Encounter />} 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
