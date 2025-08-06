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
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginForm;
