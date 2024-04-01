import React from "react";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const SiteLogo = () => {
  return (
    <Link to="/">
      <img
        alt="logo"
        className="logo"
        src={Logo}
        style={{ width: "136.5px", height: "50px" }}
      />
    </Link>
  );
};

export default SiteLogo;
