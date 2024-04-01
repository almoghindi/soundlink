import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import "./style.css";
const ThirdStep = ({
  gender,
  handleGenderChange,
  profession,
  handleProfessionChange,
}) => {
  const genders = ["Male", "Female", "Other"];
  const professions = ["Producer", "Rapper", "Singer", "Player"];
  return (
    <>
      <h2 className="signup-step2-title">I am a</h2>
      <FormControl component="fieldset">
        <RadioGroup
          name="gender"
          value={gender}
          onChange={handleGenderChange}
          row
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {genders &&
            genders.map((gender) => {
              return (
                <FormControlLabel
                  value={gender}
                  control={
                    <Radio
                      icon={<div className="radio-button">{gender}</div>}
                      checkedIcon={
                        <div className="radio-button-selected">{gender}</div>
                      }
                    />
                  }
                  label=""
                  style={{ margin: 2 }}
                />
              );
            })}
        </RadioGroup>
      </FormControl>
      <h2 className="signup-step2-title">And...</h2>
      <div className="centered-container">
        <FormControl component="fieldset">
          <RadioGroup
            name="occupation"
            value={profession}
            onChange={handleProfessionChange}
            row
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {professions &&
              professions.map((profession) => {
                return (
                  <FormControlLabel
                    value={profession}
                    control={
                      <Radio
                        icon={<div className="radio-button">{profession}</div>}
                        checkedIcon={
                          <div className="radio-button-selected">
                            {profession}
                          </div>
                        }
                      />
                    }
                    label=""
                    style={{ margin: 2 }}
                  />
                );
              })}
          </RadioGroup>
        </FormControl>
      </div>
    </>
  );
};
export default ThirdStep;
