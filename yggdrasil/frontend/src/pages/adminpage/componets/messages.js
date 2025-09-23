import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // toast notifications
import "../admin.css"; // reuse MyProfile styles

const Messages = () => {
  const [messageType, setMessageType] = useState("error");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/messages",
        { type: messageType, text: message },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 201) {
        toast.success("Message sent successfully!");
        setMessage("");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to send message");
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
        height: "70vh",
        width: "60vw",
        display: "flex",
        flexDirection: "column",
        color: "white",
        alignItems: "center",
      }}
    >
      <h2 className="profile-title">Send Feedback</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", width: "80%" }}
      >
        <label style={{ marginTop: "10px" }}>Type:</label>
        <select
          value={messageType}
          onChange={(e) => setMessageType(e.target.value)}
          style={{ padding: "8px", borderRadius: "6px", marginBottom: "15px" }}
        >
          <option value="error">Report Error</option>
          <option value="review">Write a Review</option>
        </select>

        <label>Message:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          style={{
            padding: "10px",
            borderRadius: "6px",
            marginBottom: "15px",
            resize: "none",
          }}
          required
        />

        <button type="submit" className="auth-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Messages;


