import SouthRoundedIcon from "@mui/icons-material/SouthRounded";

export const Section1 = ({ scrollToTarget }) => (
  <section className="section1">
    <div>
      <h1>
        We Make Collabs <br />
        EASY
      </h1>
      <button className="section1-scrolling" onClick={scrollToTarget}>
        <span>Scroll down</span>
        <SouthRoundedIcon
          sx={{ color: "white", marginLeft: "10px", fontSize: { xs: "15px" } }}
        />
      </button>
    </div>
  </section>
);

export const SectionPart = ({ title, description }) => (
  <section className="section2-container">
    <div className="section2-part1">
      <div className="section2-left-card">
        <div className="section2-card">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        {/* <button>Lets get started</button> */}
      </div>
    </div>
  </section>
);
