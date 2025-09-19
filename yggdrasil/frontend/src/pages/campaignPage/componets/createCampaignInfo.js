import React, { useState, useEffect } from "react";
import "../campaign.css";
import pageBg from "../../../assets/images/page.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateCampaignInfo = ({ coverImage, coverColor, onClose, initialCampaignName }) => {
  const navigate = useNavigate(); // ✅ Move useNavigate inside component

  const [campaignName, setCampaignName] = useState(initialCampaignName || "New Campaign");
  const [description, setDescription] = useState("");
  const [setting, setSetting] = useState("");
  const [factions, setFactions] = useState([{ name: "", role: "Player" }]);
  const [themes, setThemes] = useState([""]);
  const [mapFile, setMapFile] = useState(null);
  const [activeTab, setActiveTab] = useState("Description");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialCampaignName) setCampaignName(initialCampaignName);
  }, [initialCampaignName]);

  // Factions
  const addFaction = () => setFactions([...factions, { name: "", role: "Player" }]);
  const updateFaction = (i, field, value) => {
    const updated = [...factions];
    updated[i][field] = value;
    setFactions(updated);
  };
  const removeFaction = (i) => setFactions(factions.filter((_, idx) => idx !== i));

  // Themes
  const addTheme = () => setThemes([...themes, ""]);
  const updateTheme = (i, val) => {
    const updated = [...themes];
    updated[i] = val;
    setThemes(updated);
  };
  const removeTheme = (i) => setThemes(themes.filter((_, idx) => idx !== i));

  // Map file
  const handleMapUpload = (e) => {
    if (e.target.files && e.target.files[0]) setMapFile(e.target.files[0]);
  };

  // Submit campaign
  const handleSubmit = async () => {
    if (!campaignName) return alert("Campaign name is required");

    const formData = new FormData();
    formData.append("campaign_name", campaignName);
    formData.append("cover_color", coverColor || "");
    formData.append("description", description || "");
    formData.append("setting", setting || "");
    if (coverImage) formData.append("cover_img", coverImage);
    if (mapFile) formData.append("map_img", mapFile);
    formData.append("factions", JSON.stringify(factions || []));
    formData.append("themes", JSON.stringify(themes || []));

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/campaigns/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ send JWT
          },
        }
      );

      alert("Campaign created successfully!");

      // ✅ Redirect to new campaign page
      const campaignId = res.data.campaign_id;
      navigate(`/campaign/${campaignId}`);
    } catch (err) {
      console.error("Error creating campaign:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Error creating campaign");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="character-popup-overlay">
      <div
        className="character-popup"
        style={{
          backgroundImage: `url(${pageBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <button className="exit-x-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>

        <input
          type="text"
          value={campaignName}
          onChange={(e) => setCampaignName(e.target.value)}
          className="adventure-title"
          placeholder="Campaign Name"
        />

        <div className="adventure-main2">
          <div className="adventure-description-box2">
            {activeTab === "Description" && (
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="adventure-textarea"
                placeholder="Write the campaign description here..."
              />
            )}
            {activeTab === "Setting" && (
              <textarea
                value={setting}
                onChange={(e) => setSetting(e.target.value)}
                className="adventure-textarea"
                placeholder="Describe the world, tone, and setting..."
              />
            )}
            {activeTab === "Factions" && (
              <div className="factions-container">
                {factions.map((f, i) => (
                  <div key={i} className="faction-row">
                    <input
                      type="text"
                      value={f.name}
                      onChange={(e) => updateFaction(i, "name", e.target.value)}
                      placeholder="Faction Name"
                      className="faction-input"
                    />
                    <input
                      type="text"
                      value={f.role}
                      onChange={(e) => updateFaction(i, "role", e.target.value)}
                      placeholder="Faction Role"
                      className="faction-input"
                    />
                    <button onClick={() => removeFaction(i)}>✖</button>
                  </div>
                ))}
                <button onClick={addFaction}>+ Add Faction</button>
              </div>
            )}
            {activeTab === "Themes" && (
              <div className="themes-container">
                {themes.map((theme, i) => (
                  <div key={i} className="theme-row">
                    <input
                      type="text"
                      value={theme}
                      onChange={(e) => updateTheme(i, e.target.value)}
                      placeholder="Theme"
                      className="theme-input"
                    />
                    <button onClick={() => removeTheme(i)}>✖</button>
                  </div>
                ))}
                <button onClick={addTheme}>+ Add Theme</button>
              </div>
            )}
            {activeTab === "Map" && (
              <div className="map-upload-container">
                <input type="file" accept="image/*" onChange={handleMapUpload} />
                {mapFile && (
                  <img
                    src={URL.createObjectURL(mapFile)}
                    alt="Campaign Map Preview"
                    style={{ marginTop: "10px", maxWidth: "100%" }}
                  />
                )}
              </div>
            )}
          </div>

          <div className="adventure-side-buttons-wrapper">
            <div className="adventure-side-buttons">
              {["Description", "Setting", "Factions", "Themes", "Map"].map((tab) => (
                <button
                  key={tab}
                  className={`adventure-side-btn ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaignInfo;
