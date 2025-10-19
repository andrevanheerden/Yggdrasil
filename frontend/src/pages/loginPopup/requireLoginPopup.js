import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api"; // keep your existing api path
import "./requireLoginPopup.css";

function RequireLoginPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserAuth = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("user_id");

      // No token or user ID
      if (!token || !userId) {
        setShowPopup(true);
        return;
      }

      try {
        // Validate token with backend
        await API.get("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // valid — do nothing (popup stays hidden)
      } catch (err) {
        console.warn("User auth check failed:", err.response?.data || err.message);
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        setShowPopup(true);
      }
    };

    checkUserAuth();

    // no body-class side-effects anymore
    return () => {};
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  if (!showPopup) return null;

  return (
    <div className="require-login-overlay">
      <div className="require-login-popup">
        <h2>Login Required</h2>
        <p>Please log in to continue using this website.</p>
        <button onClick={handleLoginClick}>Login</button>
      </div>
    </div>
  );
}

export default RequireLoginPopup;
