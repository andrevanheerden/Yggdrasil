import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const RequireSuperAdmin = ({ children }) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return setLoading(false);
      try {
        const res = await axios.get("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Normalize role just like Navbar
        setRole(res.data.role?.toLowerCase().replace(' ', '_'));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  if (loading) return <p>Loading...</p>;
  if (role !== "super_admin") return <Navigate to="/home" replace />;
  return children;
};

export default RequireSuperAdmin;

