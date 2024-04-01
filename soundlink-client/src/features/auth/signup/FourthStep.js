import { RegularTextField } from "../../../components/TextFields";
import "./style.css";
const FourthStep = ({
  song1Name,
  song1Url,
  handleSong1NameChange,
  handleSong1UrlChange,
  song2Name,
  song2Url,
  handleSong2NameChange,
  handleSong2UrlChange,
  song3Name,
  song3Url,
  handleSong3NameChange,
  handleSong3UrlChange,
  song4Name,
  song4Url,
  handleSong4NameChange,
  handleSong4UrlChange,
}) => {
  return (
    <>
      <h2 className="signup-step2-title">Add your Shit</h2>
      <div className="upload-step">
        <div>
          <RegularTextField
            label="Name of Song 1"
            placeholder={"Enter name"}
            value={song1Name}
            onChange={handleSong1NameChange}
            width="35%"
            marginTop="20px"
          />

          <RegularTextField
            label="Link of Song 1"
            placeholder={"Enter link"}
            value={song1Url}
            onChange={handleSong1UrlChange}
            width="60%"
            marginTop="20px"
          />
        </div>
        <div>
          <RegularTextField
            label="Name of Song 2"
            placeholder={"Enter name"}
            value={song2Name}
            onChange={handleSong2NameChange}
            width="35%"
            marginTop="20px"
          />
          <RegularTextField
            label={"Link of Song 2"}
            placeholder={"Enter link"}
            value={song2Url}
            onChange={handleSong2UrlChange}
            width="60%"
            marginTop="20px"
          />
        </div>
        <div>
          <RegularTextField
            label="Name of Song 3"
            placeholder={"Enter name"}
            value={song3Name}
            onChange={handleSong3NameChange}
            width="35%"
            marginTop="20px"
          />
          <RegularTextField
            label="Link of Song 3"
            placeholder={"Enter link"}
            value={song3Url}
            onChange={handleSong3UrlChange}
            width="60%"
            marginTop="20px"
          />
        </div>
        <div>
          <RegularTextField
            label="Name of Song 4"
            placeholder={"Enter name"}
            value={song4Name}
            onChange={handleSong4NameChange}
            width="35%"
            marginTop="20px"
          />
          <RegularTextField
            label="Link of Song 4"
            placeholder={"Enter link"}
            value={song4Url}
            onChange={handleSong4UrlChange}
            width="60%"
            marginTop="20px"
          />
        </div>
        <p>Make sure that the links are correct!</p>
      </div>
    </>
  );
};

export default FourthStep;
