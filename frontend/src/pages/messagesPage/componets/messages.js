import React, { useState } from "react";
import API from "../../../api";
import { toast } from "react-toastify";
import "../message.css";

const Messages = () => {
  const [messageType, setMessageType] = useState("error");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await API.post(
        "/api/messages",
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
    <div className="messages-container">
      <h2 className="messages-title">Send Feedback</h2>

      <form onSubmit={handleSubmit} className="messages-form">

        <select
          value={messageType}
          onChange={(e) => setMessageType(e.target.value)}
          className="messages-select"
        >
          <option value="error">Report Error</option>
          <option value="review">Write a Review</option>
        </select>

        <label style={{color: '#fff'}}>Message:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="messages-textarea"
          required
        />

<button type="submit" className="messages-submit">
  Submit
</button>

      </form>
    </div>
  );
};

export default Messages;



