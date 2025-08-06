import React from 'react';
import '../Login.css';

const SignupForm = () => {
  return (
    <form className="login-form">
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
        type="confirmPassword"
        id="signup-password"
        name="confirm password"
        placeholder="Password"
        required
      />
      <div className='submit-btn'>
      <button type="submit">Log in</button>
      </div>
    </form>
  );
};

export default SignupForm;
