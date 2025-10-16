import React, { useEffect, useState } from "react";
import axios from "axios";
import "../campaign.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DMNotes = () => {
  const [notes, setNotes] = useState("");
  const [noteId, setNoteId] = useState(null); // stores existing note ID
  const [loading, setLoading] = useState(false);

  // Get the selected campaign ID from localStorage
  const campaignId = localStorage.getItem("selectedCampaignId");

  // Fetch notes for the selected campaign
  useEffect(() => {
    const fetchNotes = async () => {
      if (!campaignId) return;

      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5000/api/dm-notes/${campaignId}`
        );

        if (res.data && res.data.length > 0) {
          // Note exists → populate text area and store note ID
          setNotes(res.data[0].note_text);
          setNoteId(res.data[0].note_id);
        } else {
          // No note exists → clear text and noteId
          setNotes("");
          setNoteId(null);
        }
      } catch (err) {
        console.error("Error fetching DM notes:", err.response?.data || err.message);
        toast.error("Failed to load DM notes.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [campaignId]);

  // Save or update note
  const handleSave = async () => {
    if (!campaignId) {
      toast.error("No campaign selected. Cannot save notes.");
      return;
    }

    setLoading(true);
    try {
      if (noteId) {
        // Update existing note
        await axios.put(`http://localhost:5000/api/dm-notes/${noteId}`, {
          note_text: notes,
        });
        toast.success("DM notes updated successfully!");
      } else {
        // Create new note
        const res = await axios.post("http://localhost:5000/api/dm-notes", {
          campaign_id: campaignId,
          note_text: notes,
        });
        setNoteId(res.data.note_id); // store new note ID for future updates
        toast.success("DM notes saved successfully!");
      }
    } catch (err) {
      console.error("Error saving DM notes:", err.response?.data || err.message);
      toast.error("Failed to save DM notes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dm-notes-container">
      <button className="save-btn" onClick={handleSave} disabled={loading}>
        {loading ? "Saving..." : noteId ? "Save Edits" : "Save"}
      </button>
      <h3 className="dm-notes-title">DM Notes</h3>
      <textarea
        className="dm-notes-textarea"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Write your DM notes here..."
      />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default DMNotes;
