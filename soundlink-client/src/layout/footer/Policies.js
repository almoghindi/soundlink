const Policies = () => {
  return (
    <>
      <p style={{ fontSize: "11px" }}>
        <a
          href="/TermsAndConditions.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{ cursor: "pointer", fontFamily: "Assistant" }}
        >
          Terms And Conditions
        </a>{" "}
      </p>
      <p style={{ fontSize: "11px" }}>
        <a
          href="/PrivacyPolicy.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{ cursor: "pointer", fontFamily: "Assistant" }}
        >
          Privacy
        </a>{" "}
      </p>
      <p style={{ fontSize: "11px" }}>
        <a
          href="/CookiePolicy.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{ cursor: "pointer", fontFamily: "Assistant" }}
        >
          Cookie
        </a>{" "}
      </p>
    </>
  );
};

export default Policies;
