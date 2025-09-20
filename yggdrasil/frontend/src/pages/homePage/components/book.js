import React, { useEffect, useState } from "react";
import coverImg from '../../../assets/images/cover.png';
import campaignImg2 from '../../../assets/images/forest.jpg';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../Home.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* --- Base Book Component --- */
const Book = ({ title, campaignImg, blockColor, lineColor, onClick, showMenu, onDelete, onLeave }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="book-container"
      style={{ backgroundImage: `url(${coverImg})` }}
      onClick={onClick}
    >
      {/* Dropdown menu button in top-left */}
      {showMenu && (
        <div className="book-menu" style={{ position: "absolute", top: "10px", left: "10px", zIndex: 10 }}>
          <button
            className="book-menu-btn"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
          >
            ⋮
          </button>
          {menuOpen && (
            <div className="book-menu-dropdown" style={{
              display: "flex",
              flexDirection: "column",
              background: "#1a1a1a",
              borderRadius: "8px",
              padding: "6px",
              marginTop: "4px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.5)"
            }}>
              {onDelete && (
                <button
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#fff",
                    padding: "4px 8px",
                    textAlign: "left",
                    cursor: "pointer"
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(false);
                    onDelete();
                  }}
                >
                  🗑 Delete Campaign
                </button>
              )}
              {onLeave && (
                <button
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#fff",
                    padding: "4px 8px",
                    textAlign: "left",
                    cursor: "pointer"
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(false);
                    onLeave();
                  }}
                >
                  🚪 Leave Campaign
                </button>
              )}
            </div>
          )}
        </div>
      )}

      <div className="book-vertical-line" style={{ background: lineColor }}></div>
      <div className="book-title">{title}</div>
      <div className="book-campaign-img-wrapper">
        <img className="book-campaign-img" src={campaignImg} alt="Campaign" />
      </div>
      <div className="book-color-block" style={{ background: blockColor }}></div>
    </div>
  );
};

/* --- Create Campaign Book --- */
const CreateCampaignBook = () => {
  const navigate = useNavigate();
  return (
    <Book
      title="Create a Campaign"
      campaignImg={campaignImg2}
      blockColor="#2a6ca6"
      lineColor="#2a6ca6"
      onClick={() => navigate("/create")}
    />
  );
};

/* --- BookCenterWrapper --- */
const BookCenterWrapper = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const token = localStorage.getItem("token");
        const uid = localStorage.getItem("user_id");
        setUserId(uid);

        if (!token) {
          toast.error("No token found. Please log in.");
          return;
        }

        const res = await axios.get("http://localhost:5000/api/campaigns/my", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCampaigns(res.data);
        toast.success("Campaigns loaded successfully!");
      } catch (err) {
        console.error("Error fetching campaigns:", err.response?.data || err.message);
        toast.error("Failed to load campaigns.");
      }
    };

    fetchCampaigns();
  }, []);

  // confirm action toast
  const confirmAction = (message, onConfirm) => {
    toast.info(
      <div>
        {message}
        <div style={{ marginTop: "10px" }}>
          <button
            style={{ marginRight: "10px", background: "green", color: "white", border: "none", padding: "4px 8px", borderRadius: "4px" }}
            onClick={() => {
              toast.dismiss();
              onConfirm();
            }}
          >
            ✅
          </button>
          <button
            style={{ background: "red", color: "white", border: "none", padding: "4px 8px", borderRadius: "4px" }}
            onClick={() => toast.dismiss()}
          >
            ❌
          </button>
        </div>
      </div>,
      { autoClose: false }
    );
  };

  const handleDeleteCampaign = async (campaignId) => {
    confirmAction("Are you sure you want to delete this campaign?", async () => {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/campaigns/${campaignId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCampaigns(campaigns.filter((c) => c.campaign_id !== campaignId));
        toast.success("Campaign deleted successfully!");
      } catch (err) {
        console.error("Delete error:", err.response?.data || err.message);
        toast.error("Failed to delete campaign.");
      }
    });
  };

  const handleLeaveCampaign = async (campaignId) => {
    confirmAction("Do you want to leave this campaign?", async () => {
      try {
        const token = localStorage.getItem("token");
        await axios.post(
          `http://localhost:5000/api/campaigns/${campaignId}/leave`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setCampaigns(campaigns.filter((c) => c.campaign_id !== campaignId));
        toast.success("You left the campaign.");
      } catch (err) {
        console.error("Leave error:", err.response?.data || err.message);
        toast.error("Failed to leave campaign.");
      }
    });
  };

  return (
    <>
      <div className="book-center-wrapper">
        <CreateCampaignBook />
        {campaigns.map((c) => {
          const isCreator = String(c.creator_user_id) === String(userId);
          const isPlayer = c.player_ids?.map(String).includes(String(userId));

          return (
            <Book
              key={c.campaign_id}
              title={c.campaign_name}
              campaignImg={c.cover_img || campaignImg2}
              blockColor={c.cover_color || "#a65c2a"}
              lineColor={c.cover_color || "#a65c2a"}
              onClick={() => navigate(`/campaign/${c.campaign_id}`)}
              showMenu
              onDelete={isCreator ? () => handleDeleteCampaign(c.campaign_id) : null}
              onLeave={isPlayer && !isCreator ? () => handleLeaveCampaign(c.campaign_id) : null}
            />
          );
        })}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default BookCenterWrapper;



