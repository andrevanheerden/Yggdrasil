import React, { useState, useEffect } from "react";
import axios from "axios";
import profileIMG from "../../../assets/images/profile.jpg";
import "../profile.css";

const MyProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({
    username: "",
    profile_img: null,
    notifications: [], // optional
  });
  const [previewPic, setPreviewPic] = useState(""); // for preview
  const [profileFile, setProfileFile] = useState(null); // actual file to send

  // Fetch current user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  // Handle file selection and preview
  const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewPic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Save updates
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("username", user.username);

      if (profileFile) {
        formData.append("profile_img", profileFile); // send actual file
      }

      const res = await axios.put(
        "http://localhost:5000/api/users/me",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUser(res.data);
      setEditMode(false);
      setPreviewPic("");
      setProfileFile(null);
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  };

  return (
    <div
      className="profile-page-container"
      style={{
        position: "absolute",
        top: "48%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 200,
        background: "#000000a2",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 2px 8px #0001",
        height: "90vh",
        width: "94vw",
        display: "flex",
        flexDirection: "column",
        color: "white",
        alignItems: "center",
      }}
    >
      <h2 className="profile-title">My Profile</h2>

      <div className="profile-header" style={{ justifyContent: "center" }}>
        <img
          className="profile-avatar"
          src={previewPic || user.profile_img || profileIMG}
          alt="Profile"
        />
        <div className="profile-details" style={{ alignItems: "center" }}>
          {editMode ? (
            <>
              <input
                type="text"
                value={user.username}
                onChange={(e) =>
                  setUser({ ...user, username: e.target.value })
                }
                className="profile-input"
              />
              <div
                style={{
                  marginTop: "5px",
                  fontSize: "14px",
                  color: "#ccc",
                }}
              >
                ID: {user.user_id}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handlePicChange}
              />
              <button className="auth-button" onClick={handleSave}>
                Save
              </button>
              <button
                className="auth-button cancel"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <div className="profile-username">{user.username}</div>
              <div
                style={{
                  marginTop: "5px",
                  fontSize: "14px",
                  color: "#ccc",
                }}
              >
                ID: {user.user_id}
              </div>
              <button
                className="auth-button"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>

      <div className="profile-comments" style={{ width: "80%", marginTop: 30 }}>
        <h3>Notifications</h3>
        <div className="profile-comments-history">
          {user.notifications?.map((msg, i) => (
            <div key={i} className="profile-comment-item">
              <div className="profile-comment-item-details">{msg}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;



