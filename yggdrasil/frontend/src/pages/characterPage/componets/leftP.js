import React from "react";
import pageBg from "../../../assets/images/page.png"; 
import "../character.css";
import CharacterSheet from "./characterSheet";
import CharacterDes from "./characterDes";
import BackgroundDes from "./backgroundDes";
import ClassDes from "./classDes";
import RaceDes from "./raceDes";
import CharacterList from "./characterList";

const LeftP = ({ activeTab, onCreateCharacter }) => {
  return (
    <div className="page left-page" style={{ backgroundImage: `url(${pageBg})` }}>
      {activeTab === "characterList" && (
        <CharacterList onCreateCharacter={onCreateCharacter} />
      )}

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
