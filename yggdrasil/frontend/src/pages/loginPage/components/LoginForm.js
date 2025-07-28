import React, { useState } from 'react';
import '../Login.css';
import logoLong from '../../../assets/images/Logo.png';
import SignupForm from './SignupForm';

function LoginFormContent() {
  return (
    <>
      <div className="form-group">
        <label htmlFor="login-username">Username</label>
        <input type="text" id="login-username" name="username" required />
      </div>
      <div className="form-group">
        <label htmlFor="login-password">Password</label>
        <input type="password" id="login-password" name="password" required />
      </div>
      <button type="submit">Login</button>
    </>
  );
}

function LoginForm() {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="login-form">
      <div className="switch-btn-group">
        <button
          type="button"
          className={`switch-btn ${!showSignup ? 'active' : ''}`}
          onClick={() => setShowSignup(false)}
        >
          Login
        </button>
        <button
          type="button"
          className={`switch-btn ${showSignup ? 'active' : ''}`}
          onClick={() => setShowSignup(true)}
        >
          Sign Up
        </button>
      </div>
      <img src={logoLong} alt="Logo" className="login-logo" />
      <form>
        {showSignup ? <SignupForm /> : <LoginFormContent />}
      </form>
    </div>
  );
}

export default LoginForm;