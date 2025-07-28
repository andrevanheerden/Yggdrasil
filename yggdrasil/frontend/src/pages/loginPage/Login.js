import React from 'react';
import './Login.css';
import LoginForm from './components/LoginForm';
import Navbar from '../homePage/components/Navbar'; // Adjust the path if needed

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
      <Navbar />
      <LoginForm />
    </div>
  );
}

export default Login;