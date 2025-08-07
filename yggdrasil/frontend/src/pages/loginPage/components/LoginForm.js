import React from 'react';
import '../Login.css';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate(); // <-- you forgot this

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent form from reloading the page
    navigate('/home');  // navigate after submit
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
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
      <button type="submit" className="submit-btn">
        Log in
      </button>
    </form>
  );
};

export default LoginForm;

