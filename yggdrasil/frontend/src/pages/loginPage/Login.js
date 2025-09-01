import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';


function Login({ onLogin, loading, error }) {
  const [isLogin, setIsLogin] = useState(true);
  const [signupError, setSignupError] = useState(null);
  const [signupLoading, setSignupLoading] = useState(false);
  const navigate = useNavigate();

  // Handle login: just navigate to home
  const handleLogin = async () => {
    navigate('/home');
  };

  // Handle signup: just navigate to home
  const handleSignup = async () => {
    navigate('/home');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="tab-buttons">
          <button
            className={`tab-btn ${isLogin ? 'active' : ''}`}
            onClick={() => {
              setIsLogin(true);
              setSignupError(null);
            }}
          >
            Log In
          </button>
          <button
            className={`tab-btn ${!isLogin ? 'active' : ''}`}
            onClick={() => {
              setIsLogin(false);
              setSignupError(null);
            }}
          >
            Sign Up
          </button>
        </div>
        <div className="form-wrapper">
          {isLogin ? (
            <LoginForm 
              onLogin={handleLogin} 
              loading={loading} 
              error={error} 
            />
          ) : (
            <SignupForm 
              onSignup={handleSignup} 
              loading={signupLoading} 
              error={signupError} 
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;