import React from "react";
import pageBg from "../../../assets/images/page.png"; 
import "../character.css";
import Inventory from "./inventory";
import FullItemView from "./fullItemView";

const RightP = ({ activeTab, selectedItem, setSelectedItem }) => {
  return (
    <div className="page right-page" style={{ backgroundImage: `url(${pageBg})` }}>
      {activeTab === "inventory" && !selectedItem && <Inventory setSelectedItem={setSelectedItem} />}
      {activeTab === "inventory" && selectedItem && (
        <FullItemView item={selectedItem} />
      )}

    </div>
  );
};


export default RightP;

