import React, { useEffect, useState } from "react";
import coverImg from '../../../assets/images/cover.png';
import campaignImg2 from '../../../assets/images/forest.jpg';
import { useNavigate } from "react-router-dom";
import API from "../../../api";
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

useEffect(() => {
  const fetchCampaigns = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No token found. Please log in.", { autoClose: 3000 });
        return;
      }

      const res = await API.get("/api/campaigns/my", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Backend response data:", res.data);

      const campaignsWithPermissions = res.data.map(c => ({
        ...c,
        isCreator: c.is_creator === 1,
        isAdmin: c.is_admin === 1,
        isPlayer: c.is_player === 1,
      }));

      setCampaigns(campaignsWithPermissions);
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
        await API.delete(`/api/campaigns/${campaignId}`, {
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
        await API.post(`/api/campaigns/${campaignId}/leave`, {}, {
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

