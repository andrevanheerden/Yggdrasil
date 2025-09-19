import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // ✅ import toast
import '../Login.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Email and password are required");
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/users/login', formData);
      localStorage.setItem('token', res.data.token);
      toast.success("Login successful!");
      navigate('/home');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2 className="subtitle">Log In</h2>
      <div className="form-group">
        <label htmlFor="login-email">Email</label>
        <input
          type="email"
          id="login-email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="login-password">Password</label>
        <input
          type="password"
          id="login-password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="submit-btn">Log In</button>
    </form>
  );
};

export default LoginForm;


