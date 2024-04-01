import Button from "../../components/Button";
import { motion } from "framer-motion";
export const Section1 = ({
  isOpen,
  handleOpenAuthDialog,
  handleCloseAuthDialog,
}) => {
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
      <div className="section1-content">
        <h1 className="section1-title">We make collaboration easy</h1>{" "}
        <span>
          We connect producers, rappers, singers, and players from all over the
          globe.
        </span>
        <br />
        {/* Assuming you have a Button component */}
        <Button onClick={handleOpenAuthDialog} text="Sign up now" />
      </div>
    </motion.section>
  );
};

export const SectionPart = ({ title, description, image, isImageFirst }) => (
  <section className="section2-container">
    <div className="section2-part1">
      {isImageFirst ? (
        <>
          <img src={image} alt={title} className="card-img" />
          <div className="section2-right-card">
            <div className="section2-card">
              <h1>{title}</h1>
              <p>{description}</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="section2-left-card">
            <div className="section2-card">
              <h1>{title}</h1>
              <p>{description}</p>
            </div>
          </div>
          <img src={image} alt={title} className="card-img" />
        </>
      )}
    </div>
  </section>
);
