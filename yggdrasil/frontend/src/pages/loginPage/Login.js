import React, { useState } from 'react';
import './Login.css';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import { signupUser } from '../../api'; // Add this import

function Login({ onLogin, loading, error }) {
  const [isLogin, setIsLogin] = useState(true);
  const [signupError, setSignupError] = useState(null);
  const [signupLoading, setSignupLoading] = useState(false);

  const handleSignup = async (userData) => {
    setSignupLoading(true);
    setSignupError(null);
    try {
      const response = await signupUser(userData);
      // Automatically log in after successful signup
      await onLogin({
        username: userData.username,
        password: userData.password
      });
    } catch (err) {
      setSignupError(err.message);
    } finally {
      setSignupLoading(false);
    }
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
              onLogin={onLogin} 
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