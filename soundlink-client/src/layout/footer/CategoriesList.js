import React from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
const CategoriesList = () => {
  return (
    <div style={{ display: "block", textAlign: "left" }}>
      <p style={{ fontFamily: "Assistant" }}>Contact Us:</p>
      <p
        style={{
          fontFamily: "Assistant",
          fontSize: "14px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <MailOutlineIcon sx={{ marginRight: "5px" }} /> support@soundlink.com
      </p>
      <p
        style={{
          fontFamily: "Assistant",
          fontSize: "14px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <LocalPhoneIcon sx={{ marginRight: "5px" }} /> +972-542259669
      </p>
    </div>
  );
};

export default CategoriesList;
