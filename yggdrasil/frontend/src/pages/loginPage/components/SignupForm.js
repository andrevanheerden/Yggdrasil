import React from 'react';
import '../Login.css';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const navigate = useNavigate(); // <-- you forgot this

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent form from reloading the page
    navigate('/home');  // navigate after submit
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2 className="subtitle">Sign Up</h2>
      <input
        type="text"
        id="signup-username"
        name="username"
        placeholder="Username"
        required
      />
      <input
        type="email"
        id="signup-email"
        name="email"
        placeholder="Email"
        required
      />
      <input
        type="password"
        id="signup-password"
        name="password"
        placeholder="Password"
        required
      />
      <input
        type="password"
        id="signup-confirm-password"
        name="confirmPassword"
        placeholder="Confirm Password"
        required
      />
      <button type="submit" className="submit-btn">
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;

