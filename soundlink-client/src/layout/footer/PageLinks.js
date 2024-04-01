import React from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

const PageLinks = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        fontFamily: "Assistant",
      }}
    >
      <Box sx={{ mr: 2 }}>
        <Link to="/" color="inherit">
          Home
        </Link>
      </Box>
      <Box sx={{ mr: 2 }}>
        <Link to="/about" color="inherit">
          About
        </Link>
      </Box>
      <Box sx={{ mr: 2 }}>
        <Link to="/q&a" color="inherit">
          Q&A
        </Link>
      </Box>
    </Box>
  );
};

export default PageLinks;
