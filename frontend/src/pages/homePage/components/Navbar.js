import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../api";
import "../Home.css";
import logo from "../../../assets/images/logoLong.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!token) return;
      try {
        const res = await API.get("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Normalize role: lowercase and replace spaces with underscore
        setUserRole(res.data.role?.toLowerCase().replace(' ', '_'));
      } catch (err) {
        console.error("Failed to fetch current user:", err);
      }
    };

    fetchCurrentUser();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <div className="nav-container">
        {/* Home */}
        <div
          className="nav-icon"
          onClick={() => navigate("/home")}
          title="Home"
          style={{ cursor: "pointer" }}
        >
          🏠
        </div>

        {/* Profile */}
        <div
          className="nav-icon"
          onClick={() => navigate("/profile")}
          title="Profile"
          style={{ cursor: "pointer" }}
        >
          👤
        </div>

        {/* Messages */}
        <div
          className="nav-icon"
          onClick={() => navigate("/messages")}
          title="Messages"
          style={{ cursor: "pointer" }}
        >
          💬
        </div>

        {/* Admin (super admin only) */}
        {userRole === "super_admin" && (
          <div
            className="nav-icon"
            onClick={() => navigate("/admin-messages")}
            title="Admin Messages"
            style={{ cursor: "pointer" }}
          >
            🛠️
          </div>
        )}

        {/* Logout */}
        <div
          className="nav-icon"
          onClick={handleLogout}
          title="Logout"
          style={{ cursor: "pointer" }}
        >
          🔓
        </div>
      </div>
    </div>
  );
};

export default Navbar;





