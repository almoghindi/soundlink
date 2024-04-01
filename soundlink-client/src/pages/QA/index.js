import React from "react";
import { Section1, SectionPart } from "./Sections";
import "./style.css";

const QAPage = () => {
  const scrollToTarget = () => {
    const targetDiv = document.getElementById("section2");
    if (targetDiv) {
      targetDiv.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container-qa">
      <div className="qa-page">
        <Section1 scrollToTarget={scrollToTarget} />
        <div className="gradient-div"></div>
      </div>
      <div className="section2" id="section2">
        <SectionPart
          title="How do you cancel the match with someone?"
          description="Do you have doubts about a like you made?—No problem. You can cancel the match with anyone at any time. You only need to click on the X sign in the match's profile."
        />
        <SectionPart
          title="How do you cancel the match with someone?"
          description="Do you have doubts about a like you made?—No problem. You can cancel the match with anyone at any time. You only need to click on the X sign in the match's profile."
        />
        <SectionPart
          title="How do you cancel the match with someone?"
          description="Do you have doubts about a like you made?—No problem. You can cancel the match with anyone at any time. You only need to click on the X sign in the match's profile."
        />
        <SectionPart
          title="How do you cancel the match with someone?"
          description="Do you have doubts about a like you made?—No problem. You can cancel the match with anyone at any time. You only need to click on the X sign in the match's profile."
        />
      </div>
    </div>
  );
};

export default QAPage;
