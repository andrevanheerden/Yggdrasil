import React, { useEffect, useState } from "react";
import coverImg from '../../../assets/images/cover.png';
import campaignImg2 from '../../../assets/images/forest.jpg';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../Home.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingScreen from '../../loadingPopup/loadingScreen';

/* --- Base Book Component --- */
const Book = ({ title, campaignImg, blockColor, lineColor, onClick, showMenu, onDelete, onLeave }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="book-container"
      style={{ backgroundImage: `url(${coverImg})` }}
      onClick={onClick}
    >
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
              {!onDelete && !onLeave && (
                <div
                  style={{
                    color: "#999",
                    padding: "4px 8px",
                    textAlign: "left",
                    fontSize: "12px"
                  }}
                >
                  No actions available
                </div>
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
  const [loadingCampaign, setLoadingCampaign] = useState(false);

  /* --- Fetch campaigns on load --- */
useEffect(() => {
  const fetchCampaigns = async () => {
    try {
      const token = localStorage.getItem("token");
      const uid = localStorage.getItem("user_id");

      if (!token) {
        toast.error("No token found. Please log in.", { autoClose: 3000 });
        return;
      }

      // Fetch campaigns from API
      const res = await axios.get("http://localhost:5000/api/campaigns/my", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Include any locally saved campaigns from accepted invites
      const savedCampaigns = JSON.parse(localStorage.getItem("myCampaigns")) || [];
      const allCampaigns = [...res.data, ...savedCampaigns];

      const campaignsWithPermissions = await Promise.all(
        allCampaigns.map(async (campaign) => {
          const isCreator = String(campaign.creator_user_id) === String(uid);

          let isPlayer = false;
          let isAdmin = false;

          try {
            // Get roles for this campaign
            const rolesRes = await axios.get(
              `http://localhost:5000/api/campaigns/${campaign.campaign_id}/roles`,
              { headers: { Authorization: `Bearer ${token}` } }
            );

            // Look for current user in roles
            rolesRes.data.forEach(role => {
              if (role.user_id === uid) {
                if (role.role === "admin") isAdmin = true;
                else if (role.role === "player") isPlayer = true;
              }
            });
          } catch (err) {
            console.error("Error fetching campaign roles:", err);
          }

          return { ...campaign, isCreator, isPlayer, isAdmin };
        })
      );

      // Remove duplicates by campaign_id
      const uniqueCampaigns = Array.from(new Map(campaignsWithPermissions.map(c => [c.campaign_id, c])).values());

      setCampaigns(uniqueCampaigns);

      localStorage.removeItem("myCampaigns");
    } catch (err) {
      console.error("Error fetching campaigns:", err.response?.data || err.message);
      toast.error("Failed to load campaigns.", { autoClose: 3000 });
    }
  };

  fetchCampaigns();
}, []);





  /* --- Open campaign and save data --- */
const openCampaign = (campaignId) => {
  const selectedCampaign = campaigns.find(c => c.campaign_id === campaignId);
  if (!selectedCampaign) return;

  setLoadingCampaign(true);

  // Save campaign ID and full data
  localStorage.setItem("selectedCampaignId", campaignId);
  localStorage.setItem("selectedCampaignData", JSON.stringify(selectedCampaign));

  // Log to console
  console.log("Campaign data saved:", selectedCampaign);

  setTimeout(() => {
    setLoadingCampaign(false);
    navigate("/campaign");
  }, 1500);
};


  /* --- Confirmation toast --- */
  const confirmAction = (message, onConfirm) => {
    const toastId = toast.info(
      <div>
        {message}
        <div style={{ marginTop: "10px" }}>
          <button
            onClick={() => { toast.dismiss(toastId); onConfirm(); }}
            style={{
              marginRight: "10px",
              background: "transparent",
              color: "white",
              border: "none",
              padding: "4px 8px",
              borderRadius: "4px"
            }}
          >
            ✅
          </button>
          <button
            onClick={() => toast.dismiss(toastId)}
            style={{
              background: "transparent",
              color: "white",
              border: "none",
              padding: "4px 8px",
              borderRadius: "4px"
            }}
          >
            ❌
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        style: { 
          backgroundColor: "#222",
          color: "#fff",
          border: "1px solid #555",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.5)"
        }
      }
    );
  };

  /* --- Delete campaign --- */
  const handleDeleteCampaign = async (campaignId) => {
    confirmAction("Are you sure you want to delete this campaign?", async () => {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/campaigns/${campaignId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCampaigns(campaigns.filter(c => c.campaign_id !== campaignId));
        toast.success("Campaign deleted successfully!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete campaign.");
      }
    });
  };

  /* --- Leave campaign --- */
  const handleLeaveCampaign = async (campaignId) => {
    confirmAction("Do you want to leave this campaign?", async () => {
      try {
        const token = localStorage.getItem("token");
        await axios.post(`http://localhost:5000/api/campaigns/${campaignId}/leave`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCampaigns(campaigns.filter(c => c.campaign_id !== campaignId));
        toast.success("You left the campaign.");
      } catch (err) {
        console.error(err);
        toast.error("Failed to leave campaign.");
      }
    });
  };

return (
  <>
    <LoadingScreen isVisible={loadingCampaign} />
    <div className="books-outer-container">
      <div className="books-inner-scroll">
        <div className="book-center-wrapper">
          <CreateCampaignBook />
          {/*
            Remove duplicate campaigns by campaign_id before rendering
          */}
          {Array.from(new Map(campaigns.map(c => [c.campaign_id, c])).values()).map(c => {
            const showDelete = c.isCreator || c.isAdmin;
            const showLeave = c.isPlayer && !c.isCreator;

            return (
              <Book
                key={c.campaign_id}
                title={c.campaign_name}
                campaignImg={c.cover_img || campaignImg2}
                blockColor={c.cover_color || "#a65c2a"}
                lineColor={c.cover_color || "#a65c2a"}
                onClick={() => openCampaign(c.campaign_id)}
                showMenu={true}
                onDelete={showDelete ? () => handleDeleteCampaign(c.campaign_id) : null}
                onLeave={showLeave ? () => handleLeaveCampaign(c.campaign_id) : null}
              />
            );
          })}
        </div>
      </div>
      <ToastContainer position="top-right" />
    </div>
  </>
);

};

export default BookCenterWrapper;
