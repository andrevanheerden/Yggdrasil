import React from 'react';
import '../Login.css';

const LoginForm = () => {
  return (
    <form className="login-form">
      <h2 className="subtitle">Log In</h2>
      <input
        type="text"
        id="login-username"
        name="username"
        placeholder="Username"
        required
      />
      <input
        type="password"
        id="login-password"
        name="password"
        placeholder="Password"
        required
      />
      <div className='submit-btn'>
      <button type="submit">Log in</button>
      </div>
    </form>
  );
};

export default LoginForm;
