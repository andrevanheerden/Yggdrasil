import React from 'react';
import './Login.css';
import LoginSwitch from './components/LoginSwitch';

function Login() {
  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <LoginSwitch />
    </div>
  );
}

export default Login;