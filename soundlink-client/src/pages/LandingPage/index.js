import React from "react";
import ReactPlayer from "react-player";
import useMediaQuery from "@mui/material/useMediaQuery";
import { motion, useAnimation } from "framer-motion";
import Part1 from "../../assets/landingpage-part1.png";
import Part2 from "../../assets/landingpage-part2.png";
import Part3 from "../../assets/landingpage-part3.png";
import { Section1, SectionPart } from "./SectionPart";
import AuthDialog from "../../features/auth/Dialog";
import "./style.css";

const LandingPage = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpenAuthDialog = () => {
    setIsOpen(true);
  };
  const handleCloseAuthDialog = () => {
    setIsOpen(false);
  };

  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();
  React.useEffect(() => {
    const handleScroll = () => {
      const section1Top = document.querySelector(".section2-1").offsetTop;
      const section2Top = document.querySelector(".section2-2").offsetTop;
      const section3Top = document.querySelector(".section2-3").offsetTop;

      if (window.scrollY > section1Top - window.innerHeight / 1.8) {
        controls1.start({ opacity: 1, y: 0 });
      }

      if (window.scrollY > section2Top - window.innerHeight / 1.8) {
        controls2.start({ opacity: 1, y: 0 });
      }

      if (window.scrollY > section3Top - window.innerHeight / 1.8) {
        controls3.start({ opacity: 1, y: 0 });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [controls1, controls2, controls3]);

  const isSmallScreen = useMediaQuery("(max-width:720px)");
  return (
    <div className="container-home">
      <div className="home-page">
        <Section1
          isOpen={isOpen}
          handleOpenAuthDialog={handleOpenAuthDialog}
          handleCloseAuthDialog={handleCloseAuthDialog}
        />
        <div className="gradient-div"></div>
        <div
          style={{
            backgroundColor: "#201139",
          }}
          className="center-div"
        >
          <ReactPlayer
            url={"https://youtu.be/L5hTAsP4rXM"}
            controls
            width="90%" // Use 100% for full-width responsiveness
            height={isSmallScreen ? "200px" : "500px"}
            style={{
              backgroundColor: "black",
              marginBottom: "70px",
              maxWidth: "870px", // Set a max width if needed
              margin: "0 auto", // Center the player
            }}
          />
        </div>
      </div>
      <div className="section2">
        <motion.div
          className="section2-1"
          initial={{ opacity: 0, y: 50 }}
          animate={controls1}
        >
          <SectionPart
            number="01"
            title="GET STARTED"
            description="Hop in and let us know you. We would love to hear what you have to say. Are you into R&B or RAP? How old are you? Do you look for a collab or paid job? And the most important, let us hear your stuff!"
            image={Part1}
            isImageFirst={false}
          />
        </motion.div>
        <motion.div
          className="section2-2"
          initial={{ opacity: 0, y: 50 }}
          animate={controls2}
        >
          {" "}
          <SectionPart
            number="02"
            title="SWIPE-IT"
            description="Slide and explore the best artists on the platform and hear them out! Slide right if you would like to work with them or left if not..."
            image={Part2}
            isImageFirst={true}
          />
        </motion.div>
        <motion.div
          className="section2-3"
          initial={{ opacity: 0, y: 50 }}
          animate={controls3}
        >
          <SectionPart
            number="03"
            title="CHAT & COLLAB"
            description="If you both swipe right, you'll have a new collab in the section of the collabs."
            image={Part3}
            isImageFirst={false}
          />
        </motion.div>
      </div>
      <AuthDialog
        handleCloseAuthDialog={handleCloseAuthDialog}
        isOpen={isOpen}
      />
    </div>
  );
};

export default LandingPage;
