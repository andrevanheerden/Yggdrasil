import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Login.css';

const SignupForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // No data collection, just navigate to home
    navigate('/home');
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2 className="subtitle">Sign Up</h2>
      <div className="form-group">
        <label htmlFor="signup-username">Username</label>
        <input
          type="text"
          id="signup-username"
          name="username"
          placeholder="Choose a username"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="signup-email">Email</label>
        <input
          type="email"
          id="signup-email"
          name="email"
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="signup-password">Password</label>
        <input
          type="password"
          id="signup-password"
          name="password"
          placeholder="Create a password"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="signup-confirm-password">Confirm Password</label>
        <input
          type="password"
          id="signup-confirm-password"
          name="confirmPassword"
          placeholder="Confirm your password"
          required
        />
      </div>
      <button 
        type="submit" 
        className="submit-btn"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;

