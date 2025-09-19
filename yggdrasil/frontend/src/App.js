import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // ✅ Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';   // ✅ Import Toastify CSS
import './App.css';
import Login from './pages/loginPage/Login';
import Home from './pages/homePage/Home';
import CreateCampaignPage from './pages/homePage/components/createCampaign';
import Campaign from './pages/campaignPage/campaign';
import Character from './pages/characterPage/character';
import Encounter from './pages/encounterPage/encounter';
import Dice from './pages/dice/dice'; // 👈 main dice manager

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
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<CreateCampaignPage />} />
          <Route path="/campaign" element={<Campaign />} />
          <Route path="/character" element={<Character />} />
          <Route path="/encounter" element={<Encounter />} />
        </Routes>

        {/* 👇 All dice controlled through Dice.jsx */}
        <Dice />
      </Router>

      {/* 👇 Toast notifications container, put it at root */}
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;

