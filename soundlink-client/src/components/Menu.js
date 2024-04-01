import React, { useState, useEffect } from "react";
import { useAnimate, stagger, motion } from "framer-motion";
import { AuthContext } from "../context/auth-context";
import { Link } from "react-router-dom";
import "./Menu.css";

const staggerMenuItems = stagger(0.08, { startDelay: 0.1 });

function useMenuAnimation(isOpen, animate) {
  useEffect(() => {
    animateBurgerLines(isOpen, animate);
    animateNav(isOpen, animate);
    animateMenuItems(isOpen, animate);
  }, [isOpen, animate]);
}

function animateBurgerLines(isOpen, animate) {
  animate(".burger-line-1", {
    rotate: isOpen ? 45 : 0,
    y: isOpen ? 10 : 0,
  });
  animate(".burger-line-2", {
    opacity: isOpen ? 0 : 1,
  });
  animate(".burger-line-3", {
    rotate: isOpen ? -45 : 0,
    y: isOpen ? -8 : 0,
  });
}

function animateNav(isOpen, animate) {
  animate(
    "ul",
    {
      clipPath: isOpen
        ? "inset(0% 0% 0% 0% round 10px)"
        : "inset(10% 50% 90% 50% round 10px)",
    },
    {
      type: "spring",
      bounce: 0,
      duration: 0.8,
    }
  );
}

function animateMenuItems(isOpen, animate) {
  animate(
    "li",
    isOpen
      ? { opacity: 1, scale: 1, filter: "blur(0px)" }
      : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
    {
      duration: 0.2,
      delay: isOpen ? staggerMenuItems : 0,
    }
  );
}

const Menu = ({ pages, isLeft }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scope, animate] = useAnimate();
  useMenuAnimation(isOpen, animate);
  const auth = React.useContext(AuthContext);

  const handleItemClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="menu" ref={scope}>
      <motion.button onClick={() => setIsOpen(!isOpen)}>
        <div
          className="burger-icon"
          style={{
            left: isLeft ? "15px" : "auto",
            right: !isLeft ? "15px" : "auto",
          }}
        >
          <motion.div className="burger-line-1" />
          <motion.div className="burger-line-2" />
          <motion.div className="burger-line-3" />
        </div>
      </motion.button>
      <ul
        style={{
          pointerEvents: isOpen ? "auto" : "none",
          clipPath: "inset(10% 50% 90% 50% round 10px)",
          left: isLeft ? 0 : "auto",
          right: !isLeft ? 0 : "auto",
        }}
      >
        {pages.map((page) => (
          <li key={page}>
            {page === "Logout" ? (
              <span onClick={auth.logout} style={{ cursor: "pointer" }}>
                {page}
              </span>
            ) : (
              <Link to={page} onClick={handleItemClick}>
                {page}
              </Link>
            )}
          </li>
        ))}
      </ul>{" "}
    </nav>
  );
};

export default Menu;
