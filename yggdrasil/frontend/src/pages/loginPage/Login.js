import React from 'react';
import './Login.css';
import LoginForm from './components/LoginForm';

function Login() {
  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <LoginForm />
    </div>
  );
}

export default Login;