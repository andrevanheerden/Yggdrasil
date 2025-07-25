import React from 'react';

function SignupForm() {
  return (
    <form className="login-form">
      <h2>Sign Up</h2>
      <div className="form-group">
        <label htmlFor="signup-username">Username</label>
        <input type="text" id="signup-username" name="username" required />
      </div>
      <div className="form-group">
        <label htmlFor="signup-email">Email</label>
        <input type="email" id="signup-email" name="email" required />
      </div>
      <div className="form-group">
        <label htmlFor="signup-password">Password</label>
        <input type="password" id="signup-password" name="password" required />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupForm;