export const Section1 = () => (
  <section className="section1">
    <div>
      <h1>Question & Answers </h1>
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
      </div>
    </div>
  </section>
);
