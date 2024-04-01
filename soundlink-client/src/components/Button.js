import React from "react";
import "./Button.css";
import { motion } from "framer-motion";

const Button = ({ text, onClick, variants, transition }) => {
  return (
    <motion.div
      className="sl-btn"
      whileHover={variants}
      transition={transition}
      onClick={onClick}
    >
      {text}
    </motion.div>
  );
};

Button.defaultProps = {
  variants: { scale: 1.1 },
  transition: { type: "spring", stiffness: 400, damping: 10 },
};

export default Button;
