import React from "react";
import pageBg from "../../../assets/images/page.png"; 
import "../character.css";
import CharacterSheet from "./characterSheet";
import CharacterDes from "./characterDes";
import BackgroundDes from "./backgroundDes";
import ClassDes from "./classDes";
import RaceDes from "./raceDes";
import CharacterList from "./characterList";

const LeftP = ({ activeTab }) => {
  return (   
    <div className="page left-page" style={{ backgroundImage: `url(${pageBg})` }}>
      
      {/* Optional: Always visible Character Sheet at the top */}
      {activeTab === "characterList" && <CharacterList />}

      {/* Tab content controlled by parent */}
      <div className="char-left-tab-content">
        {activeTab === "character" && <CharacterSheet />}
        {activeTab === "desc" && <CharacterDes />}
        {activeTab === "background" && <BackgroundDes />}
        {activeTab === "class" && <ClassDes />}
        {activeTab === "race" && <RaceDes />}
      </div>
    </div>
  );
};

export default LeftP;



