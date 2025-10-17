import React, { useState } from 'react';
import API from "../../../api";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingScreen from '../../loadingPopup/loadingScreen'; // Import the loading screen
import '../Login.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);

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
      setLoading(true);
      setShowLoadingScreen(true); // Show loading screen

      // 1️⃣ Login and get token
      const res = await API.post('/api/users/login', formData);
      const token = res.data.token;
      if (!token) throw new Error("No token received from login");
      localStorage.setItem('token', token);
      toast.success("Login successful!");

      // 2️⃣ Fetch logged-in user
      const meRes = await API.get('/api/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      });

      // 3️⃣ Extract user_id
      const userData = meRes.data;
      const userId = userData.user_id || userData.id;
      if (!userId) {
        console.error("Cannot find user_id in /me response", userData);
        toast.error("Failed to retrieve user ID.");
        setLoading(false);
        setShowLoadingScreen(false);
        return;
      }

      localStorage.setItem('user_id', userId);
      console.log("Logged-in user ID:", userId);

      // Add a small delay to show the loading screen
      setTimeout(() => {
        // 4️⃣ Navigate to home
        navigate('/home');
      }, 3000);

    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      toast.error(err.response?.data?.error || 'Login failed');
      setShowLoadingScreen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoadingScreen isVisible={showLoadingScreen} />
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
            autoComplete="username"
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
            autoComplete="current-password"
          />
        </div>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
    </>
  );
};

export default LoginForm;