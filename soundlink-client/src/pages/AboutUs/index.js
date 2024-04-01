import React from "react";
import { Section1, SectionPart } from "./Sections";
import "./style.css";

const AboutUs = () => {
  const scrollToTarget = () => {
    const targetDiv = document.getElementById("section2");
    if (targetDiv) {
      targetDiv.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
      <div className="container-about">
        <div className="about-page">
          <Section1 scrollToTarget={scrollToTarget} />
          <div className="gradient-div"></div>
        </div>
        <div className="section2" id="section2">
          <SectionPart
            title="Our Mission"
            description="High quality collaboration doesn't have to be so hard to find. Nor does it have to be complicated. That is the core belief behind SoundLink. As a producer, we felt the problem personally. Music collaboration is often a complicated, hard to find, which slows us down and gets in the way of the creative process. By offering direct and unlimited access to the world top artists, we believe that SoundLink is the solution."
          />
        </div>
      </div>
  );
};

export default AboutUs;
