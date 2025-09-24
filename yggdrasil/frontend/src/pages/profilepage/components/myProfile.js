import React, { useState, useEffect } from "react";
import axios from "axios";
import profileIMG from "../../../assets/images/profile.jpg";
import "../profile.css";

const MyProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({
    username: "",
    profile_img: null,
    user_id: "",
  });
  const [previewPic, setPreviewPic] = useState(""); 
  const [profileFile, setProfileFile] = useState(null); 
  const [invites, setInvites] = useState([]); // store campaign invites

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

  // Fetch invites
  useEffect(() => {
    const fetchInvites = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/invites/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInvites(res.data || []);
      } catch (err) {
        console.error("Failed to fetch invites:", err);
      }
    };
    fetchInvites();
  }, []);

  // Handle profile pic change
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
        formData.append("profile_img", profileFile);
      }

      const res = await axios.put("http://localhost:5000/api/users/me", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setUser(res.data);
      setEditMode(false);
      setPreviewPic("");
      setProfileFile(null);
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  };

  // Respond to invite
  const handleInviteResponse = async (invite_id, accept) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/invites/respond",
        { invite_id, accept },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setInvites((prev) =>
        prev.filter((invite) => invite.invite_id !== invite_id)
      );
      alert(accept ? "Invite accepted!" : "Invite declined.");
    } catch (err) {
      console.error("Failed to respond to invite:", err);
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
        background: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(10px)",
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
              <div style={{ marginTop: "5px", fontSize: "14px", color: "#ccc" }}>
                ID: {user.user_id}
              </div>
              <input type="file" accept="image/*" onChange={handlePicChange} />
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
              <div style={{ marginTop: "5px", fontSize: "14px", color: "#ccc" }}>
                ID: {user.user_id}
              </div>
              <button className="auth-button" onClick={() => setEditMode(true)}>
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>

      {/* Notifications (Invites) */}
      <div className="profile-comments" style={{ width: "80%", marginTop: 30 }}>
        <h3>Notifications</h3>
        <div className="profile-comments-history">
          {invites.length === 0 ? (
            <div className="no-notifications">No notifications</div>
          ) : (
            invites.map((invite) => (
              <div key={invite.invite_id} className="profile-comment-item">
                <div className="profile-comment-item-details">
                  You were invited to <b>{invite.campaign_name}</b> by{" "}
                  <b>{invite.sender_username}</b>
                </div>
                {invite.status === "pending" && (
                  <div style={{ marginTop: "5px" }}>
                    <button
                      className="auth-button accept"
                      onClick={() => handleInviteResponse(invite.invite_id, true)}
                    >
                      Accept
                    </button>
                    <button
                      className="auth-button cancel"
                      onClick={() => handleInviteResponse(invite.invite_id, false)}
                      style={{ marginLeft: "10px" }}
                    >
                      Decline
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;





