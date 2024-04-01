import "./style.css";
import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Autocomplete from "@mui/material/Autocomplete";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import CountrySelect from "../../../components/CountriesDropdown";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import {
  isValidIsraeliPhoneNumber,
  isValidUrl,
} from "../../../utils/Validations";
import { uploadFile, deletePreviousImage } from "../../../utils/UploadImage";
import { useHttpClient } from "../../../hooks/useHttp";
import { AuthContext } from "../../../context/auth-context";

const genresList = [
  "Boom bap",
  "Trap",
  "Hip hop trap",
  "Old school",
  "Lo-Fi",
  "Mumble trap",
  "Afro beats",
  "Latin trap",
  "Reggae",
  "Off beat",
  "moombahton",
  "Grime",
];

const EditProfile = () => {
  const auth = React.useContext(AuthContext);
  const { isLoading, sendRequest } = useHttpClient();

  const [loadedUser, setLoadedUser] = React.useState(null);

  const [phone, setPhone] = React.useState("");

  const [fullName, setFullName] = React.useState("Jhon Smith");
  const [location, setLocation] = React.useState(null);
  const [description, setDescription] = React.useState("About you here");

  const [gender, setGender] = React.useState(""); // State to track the selected gender
  const [profession, setProfession] = React.useState(""); // State to track the selected occupation

  const [song1Name, setSong1Name] = React.useState("Song 1");
  const [song1Url, setSong1Url] = React.useState("www.youtube.com/song");
  const [song2Name, setSong2Name] = React.useState("Song 2");
  const [song2Url, setSong2Url] = React.useState("www.youtube.com/song");
  const [song3Name, setSong3Name] = React.useState("Song 3");
  const [song3Url, setSong3Url] = React.useState("www.youtube.com/song");
  const [song4Name, setSong4Name] = React.useState("Song 4");
  const [song4Url, setSong4Url] = React.useState("www.youtube.com/song");

  const [imageSrc, setImageSrc] = React.useState("");
  const [image, setImage] = React.useState("");
  const [isImageChanged, setIsImageChanged] = React.useState(false);

  const [genres, setGenres] = React.useState([]); // State to track the selected occupation

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleLocationChange = (event, value) => {
    if (value) {
      value = value.label;
    }
    setLocation(value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleProfessionChange = (event) => {
    setProfession(event.target.value);
  };

  const handleSong1NameChange = (event) => {
    setSong1Name(event.target.value);
  };

  const handleSong1UrlChange = (event) => {
    setSong1Url(event.target.value);
  };

  const handleSong2NameChange = (event) => {
    setSong2Name(event.target.value);
  };

  const handleSong2UrlChange = (event) => {
    setSong2Url(event.target.value);
  };

  const handleSong3NameChange = (event) => {
    setSong3Name(event.target.value);
  };

  const handleSong3UrlChange = (event) => {
    setSong3Url(event.target.value);
  };

  const handleSong4NameChange = (event) => {
    setSong4Name(event.target.value);
  };

  const handleSong4UrlChange = (event) => {
    setSong4Url(event.target.value);
  };

  const handleGenresChange = (event, newValue) => {
    setGenres(newValue);
  };

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}users/${auth.userId}`
        );
        if (responseData) {
          setLoadedUser(responseData.user);
          setImageSrc(responseData.user.imageUrl);
          setPhone(responseData.user.phone);
          setFullName(responseData.user.name);
          setLocation(responseData.user.location);
          setDescription(responseData.user.description);
          setGender(responseData.user.gender);
          setProfession(responseData.user.profession);
          setSong1Name(responseData.user.songs[0].name);
          setSong1Url(responseData.user.songs[0].url);
          setSong2Name(responseData.user.songs[1].name);
          setSong2Url(responseData.user.songs[1].url);
          setSong3Name(responseData.user.songs[2].name);
          setSong3Url(responseData.user.songs[2].url);
          setSong4Name(responseData.user.songs[3].name);
          setSong4Url(responseData.user.songs[3].url);
          setGenres(responseData.user.genres);
        }
      } catch (err) {}
    };
    loadUser();
  }, []);

  const [message, setMessage] = React.useState("");
  const navigate = useNavigate();

  const ImageUploadButton = styled("label")({
    display: "inline-block",
    position: "relative",
    width: "100%",
    height: "250px",
    backgroundColor: "white",
    border: "2px dashed #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "border-color 0.3s ease",

    "&:hover": {
      borderColor: "#6200ea",
    },
  });

  const ImagePreview = styled("img")({
    width: "100%",
    height: "100%",
    objectFit: "cover",
    alignItems: "center",
  });

  const AddIconWrapper = styled("div")({
    position: "absolute",
    bottom: "8px",
    right: "8px",
    backgroundColor: "#6200ea",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    cursor: "pointer",
  });

  const FileInput = styled("input")({
    display: "none",
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setIsImageChanged(true);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageSrc("");
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [isValid, setIsValid] = React.useState(false);
  const isValidDetails = () => {
    if (
      isValidIsraeliPhoneNumber(phone) &&
      fullName !== "" &&
      location !== null &&
      description !== "" &&
      gender !== "" &&
      profession !== "" &&
      genres.length > 0 !== "" &&
      song1Name !== "" &&
      song2Name !== "" &&
      song3Name !== "" &&
      song4Name !== "" &&
      song1Url !== "" &&
      song2Url !== "" &&
      song3Url !== "" &&
      song4Url !== ""
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  useEffect(() => {
    isValidDetails();
  });

  const handleUploadImage = async () => {
    let imageUrl = loadedUser.imageUrl;
    try {
      if (image && isImageChanged) {
        if (imageUrl) {
          await deletePreviousImage(imageUrl);
        }
        imageUrl = await uploadFile(image);
      }
      const songsList = [
        {
          name: song1Name,
          url: song1Url,
        },
        {
          name: song2Name,
          url: song2Url,
        },
        {
          name: song3Name,
          url: song3Url,
        },
        {
          name: song4Name,
          url: song4Url,
        },
      ];

      const formData = {
        userId: auth.userId,
        phone,
        name: fullName,
        description,
        location,
        gender,
        profession,
        songs: songsList,
        imageUrl,
        genres,
      };

      handleAuth(
        `${process.env.REACT_APP_BACKEND_URL}users/updateUser`,
        formData
      );
    } catch (error) {
      // Handle the error if the image upload fails
      setMessage("Profile updated failed!");
    }
  };

  const handleAuth = async (url, body) => {
    try {
      const responseData = await sendRequest(url, "PUT", JSON.stringify(body), {
        "Content-Type": "application/json",
      });
      if (responseData.error) {
        setMessage(responseData.error);
      }
      setMessage("Profile updated successfully!");
      navigate("/profile");
    } catch (err) {
      setMessage("Profile updated failed!");
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {loadedUser && (
        <div className="edit-container">
          <h1 className="edit-title">Edit Profile</h1>
          <div className="edit-box">
            <div className="edit-pic">
              <ImageUploadButton>
                {imageSrc ? (
                  <>
                    <ImagePreview src={imageSrc} alt="Uploaded" />
                    <AddIconWrapper onClick={handleRemoveImage}>
                      <AddIcon style={{ color: "white" }} />
                    </AddIconWrapper>
                  </>
                ) : (
                  <>
                    <CloudUploadIcon fontSize="large" />
                    <FileInput
                      type="file"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                    <AddIconWrapper>
                      <AddIcon style={{ color: "white" }} />
                    </AddIconWrapper>
                  </>
                )}
              </ImageUploadButton>
            </div>
            <div className="edit-info">
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
                sx={{
                  background: "#201139",
                  width: "90%",
                  margin: "0",
                  color: "white",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    Phone:{" "}
                  </Typography>
                  <Typography sx={{ color: "white" }}>{phone}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    label="Phone"
                    color="secondary"
                    focused
                    error={!isValidIsraeliPhoneNumber(phone)}
                    value={phone}
                    onChange={handlePhoneChange}
                    sx={{
                      "& input": {
                        color: "white",
                        height: "1vh",
                      },
                      "&": {
                        width: "90%",
                        marginTop: "20px",
                      },
                    }}
                  />
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
                sx={{
                  background: "#201139",
                  width: "90%",
                  margin: "0",
                  color: "white",
                  marginTop: "20px",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    Full Name:{" "}
                  </Typography>
                  <Typography sx={{ color: "white" }}>{fullName}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    label="Full Name"
                    color="secondary"
                    focused
                    error={fullName === ""}
                    value={fullName}
                    onChange={handleFullNameChange}
                    sx={{
                      "& input": {
                        color: "white",
                        height: "1vh",
                      },
                      "&": {
                        width: "90%",
                        marginTop: "20px",
                      },
                    }}
                  />
                  <br />
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expanded === "panel3"}
                onChange={handleChange("panel3")}
                sx={{
                  background: "#201139",
                  width: "90%",
                  margin: "0",
                  color: "white",
                  marginTop: "20px",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    Location:{" "}
                  </Typography>
                  <Typography sx={{ color: "white" }}>{location}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <CountrySelect
                    label="Location"
                    // error={location === null}
                    value={location}
                    onChange={handleLocationChange}
                  />
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expanded === "panel4"}
                onChange={handleChange("panel4")}
                sx={{
                  background: "#201139",
                  width: "90%",
                  margin: "0",
                  color: "white",
                  marginTop: "20px",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    Description:{" "}
                  </Typography>
                  <Typography sx={{ color: "white" }}>{description}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    label="Description"
                    color="secondary"
                    type="textarea"
                    focused
                    error={description === ""}
                    value={description}
                    onChange={handleDescriptionChange}
                    sx={{
                      "& input": {
                        color: "white",
                        height: "1vh",
                      },
                      "&": {
                        width: "90%",
                        marginTop: "20px",
                      },
                    }}
                  />
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expanded === "panel5"}
                onChange={handleChange("panel5")}
                sx={{
                  background: "#201139",
                  width: "90%",
                  margin: "0",
                  color: "white",
                  marginTop: "20px",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    Gender:{" "}
                  </Typography>
                  <Typography sx={{ color: "white" }}>{gender}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div
                    style={{
                      margin: "15px",
                    }}
                    className="center-div"
                  >
                    <h3 className="edit-title">I am a:</h3>
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
                        <FormControlLabel
                          value="Male"
                          control={
                            <Radio
                              icon={<div className="radio-button">Male</div>}
                              checkedIcon={
                                <div className="radio-button-selected">
                                  Male
                                </div>
                              }
                            />
                          }
                          label=""
                          style={{ margin: 2 }}
                        />
                        <FormControlLabel
                          value="Female"
                          control={
                            <Radio
                              icon={<div className="radio-button">Female</div>}
                              checkedIcon={
                                <div className="radio-button-selected">
                                  Female
                                </div>
                              }
                            />
                          }
                          label=""
                          style={{ margin: 2 }}
                        />
                        <FormControlLabel
                          value="Other"
                          control={
                            <Radio
                              icon={<div className="radio-button">Other</div>}
                              checkedIcon={
                                <div className="radio-button-selected">
                                  Other
                                </div>
                              }
                            />
                          }
                          label=""
                          style={{ margin: 2 }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expanded === "panel6"}
                onChange={handleChange("panel6")}
                sx={{
                  background: "#201139",
                  width: "90%",
                  margin: "0",
                  color: "white",
                  marginTop: "20px",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    Profession:{" "}
                  </Typography>
                  <Typography sx={{ color: "white" }}>{profession}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div
                    style={{
                      margin: "15px",
                    }}
                    className="center-div"
                  >
                    <h3 className="edit-title">Profession:</h3>
                    <FormControl component="fieldset">
                      <RadioGroup
                        name="profession"
                        value={profession}
                        onChange={handleProfessionChange}
                        row
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                        }}
                      >
                        <FormControlLabel
                          value="Producer"
                          control={
                            <Radio
                              icon={
                                <div className="radio-button">Producer</div>
                              }
                              checkedIcon={
                                <div className="radio-button-selected">
                                  Producer
                                </div>
                              }
                            />
                          }
                          label=""
                          style={{ margin: 2 }}
                        />
                        <FormControlLabel
                          value="Rapper"
                          control={
                            <Radio
                              icon={<div className="radio-button">Rapper</div>}
                              checkedIcon={
                                <div className="radio-button-selected">
                                  Rapper
                                </div>
                              }
                            />
                          }
                          label=""
                          style={{ margin: 2 }}
                        />
                        <FormControlLabel
                          value="Singer"
                          control={
                            <Radio
                              icon={<div className="radio-button">Singer</div>}
                              checkedIcon={
                                <div className="radio-button-selected">
                                  Singer
                                </div>
                              }
                            />
                          }
                          label=""
                          style={{ margin: 2 }}
                        />
                        <FormControlLabel
                          value="Player"
                          control={
                            <Radio
                              icon={<div className="radio-button">Player</div>}
                              checkedIcon={
                                <div className="radio-button-selected">
                                  Player
                                </div>
                              }
                            />
                          }
                          label=""
                          style={{ margin: 2 }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expanded === "panel7"}
                onChange={handleChange("panel7")}
                sx={{
                  background: "#201139",
                  width: "90%",
                  margin: "0",
                  color: "white",
                  marginTop: "20px",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    Song 1:{" "}
                  </Typography>
                  <Typography sx={{ color: "white" }}>{song1Name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div style={{ marginTop: "20px" }}>
                    <TextField
                      label="Name of Song 1"
                      color="secondary"
                      type="textarea"
                      focused
                      error={song1Name === ""}
                      value={song1Name}
                      onChange={handleSong1NameChange}
                      sx={{
                        "& input": {
                          color: "white",
                          height: "1vh",
                          fontSize: "12px",
                        },
                        "&": {
                          width: "40%",
                          marginTop: "20px",
                          margin: "2px",
                        },
                      }}
                    />
                    <TextField
                      label="Link of Song 1"
                      color="secondary"
                      type="textarea"
                      focused
                      error={!isValidUrl(song1Url)}
                      value={song1Url}
                      onChange={handleSong1UrlChange}
                      sx={{
                        "& input": {
                          color: "white",
                          height: "1vh",
                          fontSize: "12px",
                        },
                        "&": {
                          width: "50%",
                          marginTop: "20px",
                          margin: "2px",
                        },
                      }}
                    />
                  </div>
                </AccordionDetails>
              </Accordion>
              <br />

              <Accordion
                expanded={expanded === "panel9"}
                onChange={handleChange("panel9")}
                sx={{
                  background: "#201139",
                  width: "90%",
                  margin: "0",
                  color: "white",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    Song 2:{" "}
                  </Typography>
                  <Typography sx={{ color: "white" }}>{song2Name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div>
                    <TextField
                      label="Name of Song 2"
                      color="secondary"
                      type="textarea"
                      focused
                      error={song2Name === ""}
                      value={song2Name}
                      onChange={handleSong2NameChange}
                      sx={{
                        "& input": {
                          color: "white",
                          height: "1vh",
                          fontSize: "12px",
                        },
                        "&": {
                          width: "40%",
                          marginTop: "20px",
                          margin: "2px",
                        },
                      }}
                    />
                    <TextField
                      label="Link of Song 2"
                      color="secondary"
                      type="textarea"
                      focused
                      error={!isValidUrl(song2Url)}
                      value={song2Url}
                      onChange={handleSong2UrlChange}
                      sx={{
                        "& input": {
                          color: "white",
                          height: "1vh",
                          fontSize: "12px",
                        },
                        "&": {
                          width: "50%",
                          marginTop: "20px",
                          margin: "2px",
                        },
                      }}
                    />
                  </div>
                </AccordionDetails>
              </Accordion>
              <br />

              <Accordion
                expanded={expanded === "panel10"}
                onChange={handleChange("panel10")}
                sx={{
                  background: "#201139",
                  width: "90%",
                  margin: "0",
                  color: "white",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    Song 3:{" "}
                  </Typography>
                  <Typography sx={{ color: "white" }}>{song3Name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div>
                    <TextField
                      label="Name of Song 3"
                      color="secondary"
                      type="textarea"
                      focused
                      error={song3Name === ""}
                      value={song3Name}
                      onChange={handleSong3NameChange}
                      sx={{
                        "& input": {
                          color: "white",
                          height: "1vh",
                          fontSize: "12px",
                        },
                        "&": {
                          width: "40%",
                          marginTop: "20px",
                          margin: "2px",
                        },
                      }}
                    />
                    <TextField
                      label="Link of Song 3"
                      color="secondary"
                      type="textarea"
                      focused
                      error={!isValidUrl(song3Url)}
                      value={song3Url}
                      onChange={handleSong3UrlChange}
                      sx={{
                        "& input": {
                          color: "white",
                          height: "1vh",
                          fontSize: "12px",
                        },
                        "&": {
                          width: "50%",
                          marginTop: "20px",
                          margin: "2px",
                        },
                      }}
                    />
                  </div>
                </AccordionDetails>
              </Accordion>
              <br />
              <Accordion
                expanded={expanded === "panel11"}
                onChange={handleChange("panel11")}
                sx={{
                  background: "#201139",
                  width: "90%",
                  margin: "0",
                  color: "white",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    Song 4:{" "}
                  </Typography>
                  <Typography sx={{ color: "white" }}>{song4Name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div>
                    <TextField
                      label="Name of Song 4"
                      color="secondary"
                      type="textarea"
                      focused
                      error={song4Name === ""}
                      value={song4Name}
                      onChange={handleSong4NameChange}
                      sx={{
                        "& input": {
                          color: "white",
                          height: "1vh",
                          fontSize: "12px",
                        },
                        "&": {
                          width: "40%",
                          marginTop: "20px",
                          margin: "2px",
                        },
                      }}
                    />
                    <TextField
                      label="Link of Song 4"
                      color="secondary"
                      type="textarea"
                      focused
                      error={!isValidUrl(song4Url)}
                      value={song4Url}
                      onChange={handleSong4UrlChange}
                      sx={{
                        "& input": {
                          color: "white",
                          height: "1vh",
                          fontSize: "12px",
                        },
                        "&": {
                          width: "50%",
                          marginTop: "20px",
                          margin: "2px",
                        },
                      }}
                    />
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
            <br />

            <div className="center-div">
              <Accordion
                expanded={expanded === "panel12"}
                onChange={handleChange("panel12")}
                sx={{
                  background: "#201139",
                  width: "90%",
                  margin: "0",
                  color: "white",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ width: "33%" }}>Genres: </Typography>
                  <p style={{ margin: 0 }}>
                    {" "}
                    {genres.map((item, index) => (
                      <span key={index}>
                        {item}
                        {index !== genres.length - 1 && <span>, </span>}
                      </span>
                    ))}
                  </p>
                </AccordionSummary>
                <AccordionDetails>
                  <Autocomplete
                    multiple
                    focused
                    id="tags-standard"
                    options={genresList}
                    getOptionLabel={(option) => option}
                    value={genres} // Use an array for defaultValue
                    onChange={handleGenresChange}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          key={index}
                          label={option}
                          color="secondary" // Set the chip color
                          {...getTagProps({ index })}
                          sx={{
                            background: "#201139",
                          }}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        focused
                        color="secondary"
                        label="Sub Genres"
                        sx={{
                          // background: "#201139",
                          color: "white",
                          width: "80%",

                          "& input": {
                            color: "white",
                          },
                          "& fieldset": {
                            borderColor: "#8c46fe", // Border color
                          },
                          "&:hover fieldset": {
                            borderColor: "#8c46fe", // Hovered border color
                          },
                          ".css-i4bv87-MuiSvgIcon-root": {
                            color: "white",
                          },
                        }}
                      />
                    )}
                    sx={{
                      "& input": {
                        color: "white",
                        background: "ba",
                      },
                      ".css-i4bv87-MuiSvgIcon-root": {
                        color: "white",
                      },
                    }}
                    clearIcon={<ClearIcon sx={{ color: "white" }} />}
                    closeIcon={<ClearIcon sx={{ color: "white" }} />}
                    openIcon={<ArrowDropDownIcon sx={{ color: "white" }} />}
                  />
                </AccordionDetails>
              </Accordion>
            </div>
            <button
              className={isValid ? "save-edit-btn" : "disabled"}
              disabled={!isValid}
              onClick={handleUploadImage}
            >
              Save
            </button>
            {message && <p style={{ color: "red" }}>{message}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
