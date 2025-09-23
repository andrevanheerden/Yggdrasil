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

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const token = localStorage.getItem("token");
        const uid = localStorage.getItem("user_id");

        if (!token) {
          toast.error("No token found. Please log in.", { autoClose: 3000, toastId: "no-token" });
          return;
        }

        // Fetch campaigns where user is involved
        const res = await axios.get("http://localhost:5000/api/campaigns/my", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // For each campaign, check if user is creator or player to determine permissions
        const campaignsWithPermissions = await Promise.all(
          res.data.map(async (campaign) => {
            try {
              // Check if user is the creator
              const isCreator = String(campaign.creator_user_id) === String(uid);

              // Check if user is a player by looking at player_ids
              const playerIds = campaign.player_ids ? JSON.parse(campaign.player_ids) : [];
              const isPlayer = playerIds.includes(uid);

              // Also check the campaign_roles table for admin role
              let isAdmin = false;
              try {
                const rolesRes = await axios.get(
                  `http://localhost:5000/api/campaigns/${campaign.campaign_id}/roles`,
                  { headers: { Authorization: `Bearer ${token}` } }
                );
                const userRole = rolesRes.data.find(role => role.user_id === uid);
                isAdmin = userRole && userRole.role === 'admin';
              } catch (err) {
                console.error("Error fetching roles:", err);
              }

              return {
                ...campaign,
                isCreator,
                isPlayer,
                isAdmin
              };
            } catch (err) {
              console.error("Error processing campaign:", err);
              return {
                ...campaign,
                isCreator: false,
                isPlayer: false,
                isAdmin: false
              };
            }
          })
        );

        setCampaigns(campaignsWithPermissions);

      } catch (err) {
        console.error("Error fetching campaigns:", err.response?.data || err.message);
        toast.error("Failed to load campaigns.", { autoClose: 3000, toastId: "campaign-load-error" });
      }
    };

    fetchCampaigns();
  }, []);

  const confirmAction = (message, onConfirm) => {
    const toastId = toast.info(
      <div>
        {message}
        <div style={{ marginTop: "10px" }}>
          <button
            style={{ marginRight: "10px", background: "green", color: "white", border: "none", padding: "4px 8px", borderRadius: "4px" }}
            onClick={() => {
              toast.dismiss(toastId);
              onConfirm();
            }}
          >
            ✅
          </button>
          <button
            style={{ background: "red", color: "white", border: "none", padding: "4px 8px", borderRadius: "4px" }}
            onClick={() => toast.dismiss(toastId)}
          >
            ❌
          </button>
        </div>
      </div>,
      { autoClose: false, toastId: `confirm-${Math.random()}` } // unique id
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
        toast.success("Campaign deleted successfully!", { autoClose: 3000, toastId: `delete-${campaignId}` });

      } catch (err) {
        console.error("Delete error:", err.response?.data || err.message);
        toast.error("Failed to delete campaign.", { autoClose: 3000 });
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
        toast.success("You left the campaign.", { autoClose: 3000, toastId: `leave-${campaignId}` });
      } catch (err) {
        console.error("Leave error:", err.response?.data || err.message);
        toast.error("Failed to leave campaign.", { autoClose: 3000 });
      }
    });
  };

  return (
    <div className="books-outer-container">
      {/* inner scroll area so the outer border remains fixed while grid scrolls */}
      <div className="books-inner-scroll">
        <div className="book-center-wrapper">
          <CreateCampaignBook />
          {campaigns.map((c) => {
            // Show delete button if user is creator OR admin
            const showDelete = c.isCreator || c.isAdmin;
            // Show leave button if user is a player but NOT the creator
            const showLeave = c.isPlayer && !c.isCreator;

            return (
              <Book
                key={c.campaign_id}
                title={c.campaign_name}
                campaignImg={c.cover_img || campaignImg2}
                blockColor={c.cover_color || "#a65c2a"}
                lineColor={c.cover_color || "#a65c2a"}
                onClick={() => {
                  localStorage.setItem("selectedCampaignId", c.campaign_id); // save the ID
                  navigate("/campaign");
                }}
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
  );
};

export default BookCenterWrapper;

