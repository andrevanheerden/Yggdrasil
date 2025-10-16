import React, { useState, useEffect } from "react";
import "../campaign.css";
import pageBg from "../../../assets/images/page.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingScreen from "../../loadingPopup/loadingScreen";

const EditCampaignInfo = ({ editCampaignId }) => {
  const navigate = useNavigate();

  const [campaignName, setCampaignName] = useState("");
  const [description, setDescription] = useState("");
  const [setting, setSetting] = useState("");
  const [factions, setFactions] = useState([{ name: "", role: "Player" }]);
  const [themes, setThemes] = useState([""]);
  const [coverColor, setCoverColor] = useState("#2a6ca6");
  const [coverImage, setCoverImage] = useState(null);
  const [mapFile, setMapFile] = useState(null);
  const [existingCover, setExistingCover] = useState(null);
  const [existingMap, setExistingMap] = useState(null);
  const [activeTab, setActiveTab] = useState("Description");
  const [loading, setLoading] = useState(false);

  // Load existing campaign data
  useEffect(() => {
    const fetchCampaign = async () => {
      if (!editCampaignId) return;
      try {
        setLoading(true); // show loading
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/campaigns", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const campaign = res.data.find((c) => c.campaign_id === editCampaignId);
        if (!campaign) return;

        setCampaignName(campaign.campaign_name);
        setDescription(campaign.description || "");
        setSetting(campaign.setting || "");
        setFactions(campaign.factions ? JSON.parse(campaign.factions) : [{ name: "", role: "Player" }]);
        setThemes(campaign.themes ? JSON.parse(campaign.themes) : [""]);
        setCoverColor(campaign.cover_color || "#2a6ca6");
        setExistingCover(campaign.cover_img || null);
        setExistingMap(campaign.map_img || null);
      } catch (err) {
        console.error("Error fetching campaign:", err);
        toast.error("Failed to load campaign data.");
      } finally {
        setLoading(false); // hide loading
      }
    };

    fetchCampaign();
  }, [editCampaignId]);

  // Handlers
  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) setCoverImage(e.target.files[0]);
  };
  const handleMapUpload = (e) => {
    if (e.target.files && e.target.files[0]) setMapFile(e.target.files[0]);
  };

  const addFaction = () => setFactions([...factions, { name: "", role: "Player" }]);
  const updateFaction = (i, field, value) => {
    const updated = [...factions];
    updated[i][field] = value;
    setFactions(updated);
  };
  const removeFaction = (i) => setFactions(factions.filter((_, idx) => idx !== i));

  const addTheme = () => setThemes([...themes, ""]);
  const updateTheme = (i, val) => {
    const updated = [...themes];
    updated[i] = val;
    setThemes(updated);
  };
  const removeTheme = (i) => setThemes(themes.filter((_, idx) => idx !== i));

  // Submit update
  const handleSubmit = async () => {
    if (!campaignName) return toast.error("Campaign name is required");

    const formData = new FormData();
    formData.append("campaign_name", campaignName);
    formData.append("cover_color", coverColor);
    formData.append("description", description);
    formData.append("setting", setting);
    if (coverImage) formData.append("cover_img", coverImage);
    if (mapFile) formData.append("map_img", mapFile);
    formData.append("factions", JSON.stringify(factions));
    formData.append("themes", JSON.stringify(themes));

    try {
      setLoading(true); // show loading
      await axios.put(
        `http://localhost:5000/api/campaigns/${editCampaignId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Campaign updated!");
      localStorage.setItem("selectedCampaignId", editCampaignId);
      navigate("/campaign");
    } catch (err) {
      console.error("Error updating campaign:", err.response?.data || err.message);
      toast.error("Failed to update campaign.");
    } finally {
      setLoading(false); // hide loading
    }
  };

  return (
    <>
      <LoadingScreen isVisible={loading} />
      <div className="character-popup-overlay">
        <div
          className="character-popup"
          style={{
            backgroundImage: `url(${pageBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <button
            className="exit-x-btn"
            onClick={handleSubmit}
            disabled={loading}
            style={{ position: "absolute", top: "10px", right: "10px", zIndex: 10 }}
          >
            {loading ? "Updating..." : "Submit"}
          </button>

          <input
            type="text"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            className="adventure-title"
            placeholder="Campaign Name"
          />

          <div className="book-color-block" style={{ background: coverColor }} />

          <div className="adventure-main2">
            <div className="adventure-description-box2">
              {activeTab === "Description" && (
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="adventure-textarea"
                />
              )}
              {activeTab === "Setting" && (
                <textarea
                  value={setting}
                  onChange={(e) => setSetting(e.target.value)}
                  className="adventure-textarea"
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
                      />
                      <input
                        type="text"
                        value={f.role}
                        onChange={(e) => updateFaction(i, "role", e.target.value)}
                      />
                      <button onClick={() => removeFaction(i)}>✖</button>
                    </div>
                  ))}
                  <button onClick={addFaction}>+ Add Faction</button>
                </div>
              )}
              {activeTab === "Themes" && (
                <div className="themes-container">
                  {themes.map((t, i) => (
                    <div key={i}>
                      <input
                        value={t}
                        onChange={(e) => updateTheme(i, e.target.value)}
                      />
                      <button onClick={() => removeTheme(i)}>✖</button>
                    </div>
                  ))}
                  <button onClick={addTheme}>+ Add Theme</button>
                </div>
              )}
              {activeTab === "Map" && (
                <div className="map-upload-container">
                  <input type="file" onChange={handleMapUpload} />
                  {mapFile ? (
                    <img src={URL.createObjectURL(mapFile)} alt="Map" />
                  ) : existingMap ? (
                    <img src={existingMap} alt="Map" />
                  ) : null}
                </div>
              )}
            </div>

            <div className="adventure-side-buttons-wrapper">
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
    </>
  );
};

export default EditCampaignInfo;
