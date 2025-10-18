import React, { useState } from 'react';
import API from "../../../api";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingScreen from '../../loadingPopup/loadingScreen'; 
import '../Login.css';

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!formData.username || !formData.email || !formData.password) {
      toast.error("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 6 || formData.password.length > 12) {
      toast.error("Password must be between 6 and 12 characters");
      return;
    }

    try {
      setShowLoadingScreen(true);

      // 1️⃣ Signup
      const signupRes = await API.post('/api/users/signup', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      toast.success(signupRes.data.message || "Signup successful!");

      // 2️⃣ Login immediately after signup
      const loginRes = await API.post('/api/users/login', {
        email: formData.email,
        password: formData.password
      });

      const token = loginRes.data.token;
      if (!token) throw new Error("Login failed: No token received");

      localStorage.setItem('token', token);

      // 3️⃣ Fetch current user
      const meRes = await API.get('/api/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const userData = meRes.data;
      if (!userData.user_id && !userData.id) throw new Error("Failed to fetch user data");

      localStorage.setItem('user_id', userData.user_id || userData.id);

      // Navigate to home
      setTimeout(() => navigate('/home'), 500);

    } catch (err) {
      console.error("Signup/Login error:", err.response?.data || err.message);

      // Show backend error messages
      if (err.response?.data?.error) {
        toast.error(err.response.data.error);
      } else {
        toast.error(err.message || "Signup/Login failed");
      }

      setShowLoadingScreen(false);
    }
  };

  return (
    <>
      <LoadingScreen isVisible={showLoadingScreen} />
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="subtitle">Sign Up</h2>

        <div className="form-group">
          <label htmlFor="signup-username">Username</label>
          <input
            type="text"
            id="signup-username"
            name="username"
            placeholder="Choose a username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="signup-email">Email</label>
          <input
            type="email"
            id="signup-email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="signup-password">Password</label>
          <input
            type="password"
            id="signup-password"
            name="password"
            placeholder="Create a password (6-12 characters)"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="signup-confirm-password">Confirm Password</label>
          <input
            type="password"
            id="signup-confirm-password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
        </div>

        <button type="submit" className="submit-btn">Sign Up</button>
      </form>
    </>
  );
};

export default SignupForm;
