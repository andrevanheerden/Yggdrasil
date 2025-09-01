import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Login.css';

const LoginForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // No data collection, just navigate to home
    navigate('/home');
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2 className="subtitle">Log In</h2>
      <div className="form-group">
        <label htmlFor="login-username">Username</label>
        <input
          type="text"
          id="login-username"
          name="username"
          placeholder="Enter your username"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="login-password">Password</label>
        <input
          type="password"
          id="login-password"
          name="password"
          placeholder="Enter your password"
          required
        />
      </div>
      <button 
        type="submit" 
        className="submit-btn"
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;

