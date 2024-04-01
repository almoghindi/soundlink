import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
const NavLinks = ({ pages }) => {
  return (
    <>
      {pages.map((page) => (
        <NavLink
          to={page}
          key={page}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <Button
            sx={{
              my: 2,
              color: "white",
              display: "block",
              fontFamily: "Assistant, sans-serif",
            }}
          >
            {page}
          </Button>
        </NavLink>
      ))}
    </>
  );
};

export default NavLinks;
