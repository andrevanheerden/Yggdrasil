import React, { useState } from 'react';
import '../Login.css';

const LoginForm = ({ onLogin, loading, error }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await onLogin({
      email: e.target.email.value,  // Ensure input name="email"
      password: e.target.password.value
    });
  } catch (err) {
    // Handle error
  }
};

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2 className="subtitle">Log In</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="form-group">
        <label htmlFor="login-username">Username</label>
        <input
          type="text"
          id="login-username"
          name="username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
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
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button 
        type="submit" 
        className="submit-btn" 
        disabled={loading || !formData.username || !formData.password}
      >
        {loading ? 'Logging in...' : 'Log in'}
      </button>
    </form>
  );
};

export default LoginForm;

