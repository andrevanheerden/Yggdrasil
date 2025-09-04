import React, { useState } from "react";
import "../campaign.css";

const DMNotes = () => {
  const [notes, setNotes] = useState("");

  return (
    <div className="dm-notes-container">
      <h3 className="dm-notes-title">DM Notes</h3>
      <textarea
        className="dm-notes-textarea"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Write your DM notes here..."
      />
    </div>
  );
};

export default DMNotes;
