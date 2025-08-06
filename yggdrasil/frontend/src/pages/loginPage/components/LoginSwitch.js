import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import '../Login.css';

const LoginSwitch = () => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="login-switch-wrapper">
      <div className="tab-buttons">
        <button
          className={activeTab === 'login' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => setActiveTab('login')}
        >
          Log In
        </button>
        <button
          className={activeTab === 'signup' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => setActiveTab('signup')}
        >
          Sign Up
        </button>
      </div>
      <div className="login-container">
        <div className="tab-content">
          {activeTab === 'login' ? <LoginForm /> : <SignupForm />}
        </div>
      </div>
    </div>
  );
};

export default LoginSwitch;