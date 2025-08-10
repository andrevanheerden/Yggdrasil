import React, { useState } from 'react';
import './Login.css';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="tab-buttons">
          <button
            className={`tab-btn ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Log In
          </button>
          <button
            className={`tab-btn ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>
        <div className="form-wrapper">
          {isLogin ? <LoginForm /> : <SignupForm />}
        </div>
      </div>
    </div>
  );
}

export default Login;