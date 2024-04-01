import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const FifthStep = ({
  genresList,
  genres,
  handleGenresChange,
  isChecked,
  handleCheckboxChange,
}) => {
  return (
    <>
      <h2 className="signup-step2-title">Select Genres</h2>
      <FormGroup
        row
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {genresList.map((genre) => (
          <FormControlLabel
            key={genre}
            control={
              <Checkbox
                icon={<div className="radio-button-step4"># {genre}</div>}
                checkedIcon={
                  <div className="radio-button-selected-step4"># {genre}</div>
                }
                checked={genres.includes(genre)}
                onChange={() => handleGenresChange(genre)}
              />
            }
            label={""}
          />
        ))}
      </FormGroup>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <p>
          I have read the{" "}
          <a
            href="/TermsAndConditions.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#8c46fe", cursor: "pointer" }}
          >
            Terms And Conditions,
          </a>{" "}
          <a
            href="/PrivacyPolicy.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#8c46fe", cursor: "pointer" }}
          >
            Privacy Policy
          </a>{" "}
          And{" "}
          <a
            href="/CookiePolicy.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#8c46fe", cursor: "pointer" }}
          >
            Cookie Policy
          </a>{" "}
          and I agree
        </p>
        <Checkbox
          checked={isChecked}
          onChange={handleCheckboxChange}
          sx={{
            color: "#8c46fe",
            "&.Mui-checked": {
              color: "#8c46fe",
            },
          }}
        />
      </div>
    </>
  );
};

export default FifthStep;
