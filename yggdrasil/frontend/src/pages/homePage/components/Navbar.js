import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Home.css';
import logo from '../../../assets/images/logoLong.png';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="nav-container">
        <div
          className="nav-icon"
          onClick={() => navigate('/home')}
          style={{ cursor: 'pointer' }}
        >
          🏠
        </div>
<div
  className="nav-icon"
  onClick={() => navigate('/profile')}
  style={{ cursor: 'pointer' }}
>
  👤
</div>

        <div
          className="nav-icon"
          onClick={() => navigate('/settings')}
          style={{ cursor: 'pointer' }}
        >
          ⚙️
        </div>
        <div
          className="nav-icon"
          onClick={() => navigate('/login')}
          style={{ cursor: 'pointer' }}
        >
          🔓
        </div>
      </div>
    </div>
  );
};

export default Navbar;

