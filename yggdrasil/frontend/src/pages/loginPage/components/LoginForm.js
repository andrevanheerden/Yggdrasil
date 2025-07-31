import React, { useState } from 'react';
import '../Login.css';

const LoginForm = () => {
  return (

      <div className="login-container">
        <form className="login-form">
          <h2 className="subtitle">Log in</h2>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
          <button type="submit">Submit</button>
        </form>
      </div>

  );
};

export default LoginForm;
