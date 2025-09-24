import React, { useState, useEffect } from "react"; 
import axios from "axios";
import "../admin.css"; // reuse the message CSS file

const AdminMessages = () => {
  const [filter, setFilter] = useState("all");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get token from localStorage
  const token = localStorage.getItem("token");

  // Fetch messages from backend
  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/messages", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(res.data.messages);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Pin message to top
  const handlePin = (id) => {
    const msgIndex = messages.findIndex(m => m.id === id);
    if (msgIndex > -1) {
      const newMessages = [...messages];
      const [msg] = newMessages.splice(msgIndex, 1);
      newMessages.unshift(msg);
      setMessages(newMessages);
    }
  };

  // Resolve (delete) message
  const handleResolve = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/messages/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(messages.filter(m => m.id !== id));
    } catch (err) {
      console.error("Failed to delete message:", err);
    }
  };

  // Filter & sort messages
  const filteredMessages = messages
    .filter(msg => filter === "all" || msg.type === filter)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  if (loading) return <p>Loading messages...</p>;

  return (
    <div className="messages-container">
      <h2 className="messages-title">User Messages</h2>

      {/* Filter dropdown */}
      <select
        className="messages-select"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="error">Errors</option>
        <option value="review">Reviews</option>
      </select>

      <div className="messages-list">
        {filteredMessages.map((msg) => (
          <div
            key={msg.id}
            className={`message-item ${msg.type === "error" ? "message-error" : "message-review"}`}
          >
            <div className="message-header">
              <span className="message-id">{msg.id}</span>
              <span className="message-type">{msg.type.toUpperCase()}</span>
              <span className="message-time">{new Date(msg.created_at).toLocaleString()}</span>
            </div>

            <div className="message-text">{msg.text}</div>

            <div className="message-buttons">
              
              <button className="resolve-button" onClick={() => handleResolve(msg.id)}>✔️ Resolve</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMessages;




