import React from 'react';
import '../Login.css';
import paperBg from '../../../assets/images/page.png';
import treeIcon from '../../../assets/images/logoB.png';

function LoginForm() {
  return (
    <div className="login-container" >
      <h1 className="title">YGGDRASIL</h1>
      <p className="login-label">Log in</p>
      
      <form className="login-form">
        <label>Username:</label>
        <input type="text" />

        <label>Password:</label>
        <input type="password" />

        <button type="submit">
          <img src={treeIcon} alt="tree logo" className="tree-icon" />
          Submit
        </button>
      </form>
    </div>
  );
}

export default LoginForm;