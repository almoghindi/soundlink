import React from "react";
import { Box } from "@mui/material";
import CategoriesList from "./CategoriesList";
import SocialMediaIcons from "./SocialMediaIcons";
import PageLinks from "./PageLinks";
import Policies from "./Policies";
const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "black",
        color: "#fff",
        padding: "24px 0",
        fontFamily: "Rubik",
        marginTop: "100px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
        }}
      >
        <Box sx={{ display: "flex", gap: "24px" }}>
          <CategoriesList />
          {/* Add more category lists here */}
        </Box>
        <Box
          sx={{
            backgroundColor: "#0f081b",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "16px",
            padding: "12px 0",
            width: "100%",
          }}
        >
          <Box sx={{ marginLeft: "12.5%" }}>
            <SocialMediaIcons />{" "}
          </Box>
          <Box sx={{ marginRight: "12.5%" }}>
            <PageLinks />
          </Box>
        </Box>
      </Box>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <p>© 2024 Soundlink, Inc.</p>
        <Policies />
      </div>
    </footer>
  );
};

export default Footer;
