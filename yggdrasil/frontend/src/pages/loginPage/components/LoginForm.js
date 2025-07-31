import React, { useState } from 'react';
import '../Login.css';
import logoB from '../../../assets/images/logoB.png';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [tab, setTab] = useState('login');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="forest-bg">
      <div className="tree-bg tree-bg-left"></div>
      <div className="tree-bg tree-bg-right"></div>
      <div className="notepad-container">
        {/* Spiral rings */}
        <div className="spiral-rings">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="spiral-ring"></div>
          ))}
        </div>
        {/* Tabs */}
        <div className="side-tabs">
          <div
            className={`side-tab login-tab ${tab === 'login' ? 'active' : ''}`}
            onClick={() => setTab('login')}
          >
            Log In
          </div>
          <div
            className={`side-tab signup-tab ${tab === 'signup' ? 'active' : ''}`}
            onClick={() => setTab('signup')}
          >
            Sign Up
          </div>
        </div>
        {/* Notepad content */}
        <div className="notepad-paper">
          <div className="leaf-overlay"></div>
          <form className="login-form" onSubmit={handleSubmit}>
            <h1 className="notepad-title">YGGDRARSIL</h1>
            <div className="notepad-lines"></div>
            <div className="notepad-subtitle">{tab === 'login' ? 'Log in' : 'Sign Up'}</div>
            <label className="notepad-label" htmlFor="username">Username</label>
            <input
              className="notepad-input"
              type="text"
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoComplete="username"
            />
            {tab === 'signup' && (
              <>
                <label className="notepad-label" htmlFor="email">Email</label>
                <input
                  className="notepad-input"
                  type="email"
                  id="email"
                  autoComplete="email"
                />
              </>
            )}
            <label className="notepad-label" htmlFor="password">Password</label>
            <input
              className="notepad-input"
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button type="submit" className="notepad-submit">
              <img
                src={logoB}
                alt="Floral"
                className="floral-left"
                style={{  height: 60, transform: 'rotate(-90deg)' }}
              />
              Submit
              <img
                src={logoB}
                alt="Floral"
                className="floral-right"
                style={{ height: 60, transform: 'rotate(90deg)' }}
              />
            </button>
          </form>
        </div>
        {/* Footer */}
        <div className="notepad-footer">
          <span className="footer-glow">AFERA XV</span>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;