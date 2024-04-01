import Button from "../../components/Button";
import CountdownTimer from "../../utils/CountdownTimer";
import { motion } from "framer-motion";
import "./style.css";
export const Section1 = ({ scrollToTarget, timeToLaunch }) => {
  const sectionVariants = {
    hidden: { opacity: 0, y: "-100vh" },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };
  return (
    <motion.section
      className="section1"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
    >
      <div>
        <h1 className="section1-title">We Launch In</h1>
        <CountdownTimer targetDate={timeToLaunch} />
        <button className="section1-scrolling" onClick={scrollToTarget}>
          <span>And in the mean time</span>
        </button>
      </div>
    </motion.section>
  );
};

export const SectionPart = ({ title, description, image }) => (
  <section className="section2-container">
    <div className="section2-part1">
      <div className="section2-left-card">
        <div className="section2-card">
          <h1>{title}</h1>
          <img src={image} alt={title} className="card-img-mobile" />
          <p>{description}</p>
        </div>
        <Button text="Get premium for 0.5$ a day" />
        <br />
        <span className="span-comment">
          Hurry up before we change it to 30$ a month{" "}
        </span>
      </div>
      <img src={image} alt={title} className="card-img" />
    </div>
  </section>
);
