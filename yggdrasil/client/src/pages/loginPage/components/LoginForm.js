import React, { useState } from 'react';
import '../../loginPage/Login.css';
import logoLong from '../../../assets/images/Logo.png'; // Adjust the path if needed
import SignupForm from './SignupForm';


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
      <img
        src={logoLong}
        alt="Logo"
        className="login-logo"
      />
      {showSignup ? <SignupForm /> : <LoginForm />}
    </div>
  );
}

export default LoginForm;