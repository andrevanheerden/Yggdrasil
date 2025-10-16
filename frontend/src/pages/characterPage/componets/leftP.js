import React, { useState, useEffect } from "react";
import pageBg from "../../../assets/images/page.png";
import "../character.css";
import CharacterSheet from "./characterSheet";
import CharacterDes from "./characterDes";
import BackgroundDes from "./backgroundDes";
import ClassDes from "./classDes";
import RaceDes from "./raceDes";
import CharacterList from "./characterList";
import defaultPortrait from "../../../assets/images/rose.jpg";

const LeftP = ({
  activeTab,
  setActiveTab,
  onCreateCharacter,
  onEditCharacter, // ✅ Added
  latestCampaignId,
  selectedCharacter,
  setSelectedCharacter,
}) => {
  const [campaignId, setCampaignId] = useState(latestCampaignId || null);

  useEffect(() => {
    if (!latestCampaignId) {
      const storedCampaign = localStorage.getItem("selectedCampaignData");
      if (storedCampaign) {
        const parsed = JSON.parse(storedCampaign);
        setCampaignId(parsed.campaign_id);
      }
    } else {
      setCampaignId(latestCampaignId);
    }
  }, [latestCampaignId]);

  const handleSelectCharacter = (char) => {
    const mappedCharacter = {
      id: char.character_id,
      name: char.character_name || "-",
      class: char.class || "-",
      race: char.race || "-",
      background: char.background || "-",
      portrait: char.character_img || defaultPortrait,
      description: char.character_description || "",
      ac: char.character_AC || 0,
      level: char.character_level || 0,
      speed: char.character_speed || 0,
      hp: {
        current: char.character_current_HP || 0,
        max: char.character_max_HP || 0,
      },
      abilityScores: {
        Str: char.encounter_ability_score_str || 10,
        Dex: char.encounter_ability_score_dex || 10,
        Con: char.encounter_ability_score_con || 10,
        Int: char.encounter_ability_score_int || 10,
        Wis: char.encounter_ability_score_wis || 10,
        Cha: char.encounter_ability_score_cha || 10,
      },
    };

    setSelectedCharacter(mappedCharacter);
    if (setActiveTab) setActiveTab("character");
  };

  return (
    <div className="page left-page" style={{ backgroundImage: `url(${pageBg})` }}>
      {activeTab === "characterList" && campaignId && (
        <CharacterList
          campaignId={campaignId}
          onSelectCharacter={handleSelectCharacter}
          onCreateCharacter={onCreateCharacter}
        />
      )}

      <div className="char-left-tab-content">
        {activeTab === "character" && (
          <CharacterSheet
            character={selectedCharacter}
            onEdit={onEditCharacter} // ✅ Connected to Character.js
          />
        )}
        {activeTab === "desc" && <CharacterDes character={selectedCharacter} />}
        {activeTab === "background" && <BackgroundDes character={selectedCharacter} />}
        {activeTab === "class" && <ClassDes character={selectedCharacter} />}
        {activeTab === "race" && <RaceDes character={selectedCharacter} />}
      </div>
    </div>
  );
};

export default LeftP;
