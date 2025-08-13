import React, { useState } from 'react';
import '../Login.css';

const SignupForm = ({ onSignup, loading, error }) => {
  const [formData, setFormData] = useState({
    username: '',  // Changed from 'name' to match your input fields
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when user types
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    console.log('Form data before submission:', formData);
    
    try {
      await onSignup(formData);
    } catch (err) {
      // Error is already handled in parent component
      console.error('Signup error:', err);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2 className="subtitle">Sign Up</h2>
      {error && <div className="error-message">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="signup-username">Username</label>
        <input
          type="text"
          id="signup-username"
          name="username"
          placeholder="Choose a username"
          value={formData.username}
          onChange={handleChange}
          className={validationErrors.username ? 'error' : ''}
          required
        />
        {validationErrors.username && (
          <span className="error-text">{validationErrors.username}</span>
        )}
      </div>
      
      <div className="form-group">
        <label htmlFor="signup-email">Email</label>
        <input
          type="email"
          id="signup-email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          className={validationErrors.email ? 'error' : ''}
          required
        />
        {validationErrors.email && (
          <span className="error-text">{validationErrors.email}</span>
        )}
      </div>
      
      <div className="form-group">
        <label htmlFor="signup-password">Password</label>
        <input
          type="password"
          id="signup-password"
          name="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
          className={validationErrors.password ? 'error' : ''}
          required
          minLength="6"
        />
        {validationErrors.password && (
          <span className="error-text">{validationErrors.password}</span>
        )}
      </div>
      
      <div className="form-group">
        <label htmlFor="signup-confirm-password">Confirm Password</label>
        <input
          type="password"
          id="signup-confirm-password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={validationErrors.confirmPassword ? 'error' : ''}
          required
        />
        {validationErrors.confirmPassword && (
          <span className="error-text">{validationErrors.confirmPassword}</span>
        )}
      </div>
      
      <button 
        type="submit" 
        className="submit-btn" 
        disabled={loading}
      >
        {loading ? 'Creating account...' : 'Sign Up'}
      </button>
    </form>
  );
};

export default SignupForm;

