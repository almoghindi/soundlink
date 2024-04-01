import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NavMenu = ({
  anchorElNav,
  handleOpenNavMenu,
  handleCloseNavMenu,
  pages,
}) => {
  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchororigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        {pages.map((page) => (
          <MenuItem key={page} onClick={handleCloseNavMenu}>
            <Link to={page}>
              <Typography textAlign="center">{page}</Typography>
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default NavMenu;
