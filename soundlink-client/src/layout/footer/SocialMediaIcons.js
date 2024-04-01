import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const SocialMediaIcons = () => {
  return (
    <Box>
      <Tooltip title="Facebook">
        <IconButton>
          <FacebookIcon sx={{ color: "#fff" }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Twitter">
        <IconButton>
          <TwitterIcon sx={{ color: "#fff" }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Instagram">
        <IconButton>
          <InstagramIcon sx={{ color: "#fff" }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default SocialMediaIcons;
