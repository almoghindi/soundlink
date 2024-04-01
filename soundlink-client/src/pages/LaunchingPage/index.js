import React from "react";
import LaunchImg from "../../assets/launch-img.png";
import { Section1, SectionPart } from "./Sections";
import { motion, useAnimation } from "framer-motion";
import "./style.css";

const LaunchingPage = () => {
  const scrollToTarget = () => {
    const targetDiv = document.getElementById("section2");
    if (targetDiv) {
      targetDiv.scrollIntoView({ behavior: "smooth" });
    }
  };

  const targetDate = new Date("2024-04-30T12:00:00").getTime();

  const controls = useAnimation();

  React.useEffect(() => {
    const handleScroll = () => {
      // Get the distance from the top of the window to the section
      const sectionTop = document.querySelector(".section2").offsetTop;

      // Check if the section is in the viewport
      if (window.scrollY > sectionTop - window.innerHeight / 1.8) {
        // Start the animation when the section is in the viewport
        controls.start({ opacity: 1, y: 0 });
      }
    };

    // Add event listener for scroll
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [controls]);

  return (
    <div className="container-launch">
      <div className="launch-page">
        <Section1 scrollToTarget={scrollToTarget} timeToLaunch={targetDate} />
        <div className="gradient-div"></div>
      </div>

      <motion.section
        className="section2"
        id="section2"
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
      >
        <SectionPart
          title="GET PREMIUM ACCESS"
          description="Unlock Your Potential! Elevate Your Music Career with Premium: Find Your Perfect Match for Collaborations. Upgrade to Premium for Exclusive Features and Connect with Producers, Rappers, and Singers Seamlessly. Join the Elite Community of Creatives Today!"
          image={LaunchImg}
          isImageFirst={false}
        />
      </motion.section>
    </div>
  );
};

export default LaunchingPage;
