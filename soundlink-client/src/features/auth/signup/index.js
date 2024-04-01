import React, { useEffect, useReducer } from "react";
import "../style.css";
import "./style.css";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useHttpClient } from "../../../hooks/useHttp";
import { AuthContext } from "../../../context/auth-context";
import {
  isValidEmail,
  isValidPassword,
  isValidIsraeliPhoneNumber,
  isValidUrl,
} from "../../../utils/Validations";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import FourthStep from "./FourthStep";
import ImageUpload from "../../../components/ImageUpload";
import { uploadFile } from "../../../utils/UploadImage";
import FifthStep from "./FifthStep";
import { reducer, initialState } from "./signupReducer";

const Signup = () => {
  const theme = useTheme();
  const auth = React.useContext(AuthContext);
  const { isLoading, sendRequest } = useHttpClient();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    isValidStep();
  }, [
    state.activeStep,
    state.email,
    state.password,
    state.showPassword,
    state.phone,
    state.fullName,
    state.location,
    state.description,
    state.gender,
    state.profession,
    state.song1Name,
    state.song1Url,
    state.song2Name,
    state.song2Url,
    state.song3Name,
    state.song3Url,
    state.song4Name,
    state.song4Url,
    state.imageSrc,
    state.image,
    state.genres,
    state.isChecked,
    state.isValid,
    state.message,
  ]);

  const handleNext = () => {
    dispatch({ type: "SET_STEP", payload: state.activeStep + 1 });
  };

  const handleBack = () => {
    dispatch({ type: "SET_STEP", payload: state.activeStep - 1 });
  };

  const handleChange = (field, value) => {
    dispatch({ type: "SET_FIELD", field, value });
  };

  const handleLocationChange = (field, value) => {
    if (value) {
      value = value.label;
    }
    dispatch({ type: "SET_FIELD", field, value });
  };

  const handleClickShowPassword = () => {
    dispatch({ type: "TOGGLE_SHOW_PASSWORD" });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleRemoveImage = () => {
    dispatch({ type: "REMOVE_IMAGE" });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    dispatch({
      type: "SET_IMAGE",
      payload: {
        image: file,
      },
    });

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        dispatch({
          type: "SET_IMAGE_SRC",
          payload: {
            imageSrc: e.target.result,
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenresChange = (genre) => {
    const isChecked = state.genres.includes(genre);
    let updatedGenres;

    if (isChecked) {
      // If genre is already selected, remove it from the array
      updatedGenres = state.genres.filter((g) => g !== genre);
    } else {
      // If genre is not selected, add it to the array
      updatedGenres = [...state.genres, genre];
    }
    dispatch({ type: "SET_GENRES", payload: updatedGenres });
  };

  const handleIsCheckedPolicy = () => {
    dispatch({ type: "TOGGLE_IS_CHECKED" });
  };

  const isValidStep = () => {
    let isValid = false;

    switch (state.activeStep) {
      case 0:
        isValid =
          isValidEmail(state.email) &&
          isValidPassword(state.password) &&
          isValidIsraeliPhoneNumber(state.phone);
        break;
      case 1:
        isValid =
          state.fullName !== "" &&
          state.location !== null &&
          state.description !== "";
        break;
      case 2:
        isValid = state.gender !== "" && state.profession !== "";
        break;
      case 3:
        isValid =
          state.song1Name !== "" &&
          state.song2Name !== "" &&
          state.song3Name !== "" &&
          state.song4Name !== "" &&
          isValidUrl(state.song1Url) &&
          isValidUrl(state.song2Url) &&
          isValidUrl(state.song3Url) &&
          isValidUrl(state.song4Url);
        break;
      case 4:
        isValid = state.imageSrc !== "";
        break;
      case 5:
        isValid = state.genres.length > 0 && state.isChecked;
        break;
      default:
        isValid = false;
        break;
    }

    dispatch({ type: "SET_IS_VALID", payload: isValid });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}users/getUserByEmail`,
        "POST",
        JSON.stringify({ email: state.email }),
        {
          "Content-Type": "application/json",
        }
      );
      if (!responseData.isUserExists) {
        handleUploadImage();
      } else {
        dispatch({
          type: "SET_MESSAGE",
          payload: "Error: User with that email already exists",
        });
      }
    } catch (err) {
      dispatch({
        type: "SET_MESSAGE",
        payload: "Authentication error, please try again later",
      });
    }
  };

  const handleUploadImage = async () => {
    if (state.imageSrc) {
      try {
        const res = await uploadFile(state.image);

        if (res) {
          const songsList = [
            { name: state.song1Name, url: state.song1Url },
            { name: state.song2Name, url: state.song2Url },
            { name: state.song3Name, url: state.song3Url },
            { name: state.song4Name, url: state.song4Url },
          ];

          const formData = {
            email: state.email,
            phone: state.phone,
            password: state.password,
            name: state.fullName,
            description: state.description,
            location: state.location,
            gender: state.gender,
            profession: state.profession,
            songs: songsList,
            imageUrl: res,
            genres: state.genres,
          };

          handleAuth(
            `${process.env.REACT_APP_BACKEND_URL}users/signup`,
            formData
          );
        }
      } catch (error) {
        dispatch({
          type: "SET_MESSAGE",
          payload: "Image upload failed, please try again.",
        });
      }
    }
  };

  const handleAuth = async (url, body) => {
    try {
      const responseData = await sendRequest(
        url,
        "POST",
        JSON.stringify(body),
        {
          "Content-Type": "application/json",
        }
      );
      if (responseData.error) {
        dispatch({ type: "SET_MESSAGE", payload: responseData.error });
      }
      auth.login(responseData.userId, responseData.token);
    } catch (err) {
      dispatch({
        type: "SET_MESSAGE",
        payload: "Authentication error, please try again later",
      });
    }
  };

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

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="centered-container">
        <MobileStepper
          variant="progress"
          steps={6}
          position="static"
          activeStep={state.activeStep}
          sx={{
            maxWidth: 400,
            flexGrow: 1,
            marginBottom: "20px",
            backgroundColor: "transparent",
            color: "#8C46FE",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#8c46fe",
            },
            "& .MuiButtonBase-root": {
              color: "#8c46fe",
            },
          }}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={state.activeStep === 5 || !state.isValid}
            >
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={state.activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </div>

      {state.activeStep === 0 && (
        <FirstStep
          email={state.email}
          handleEmailChange={(e) => handleChange("email", e.target.value)}
          showPassword={state.showPassword}
          password={state.password}
          handlePasswordChange={(e) => handleChange("password", e.target.value)}
          handleClickShowPassword={handleClickShowPassword}
          handleMouseDownPassword={handleMouseDownPassword}
          phone={state.phone}
          handlePhoneChange={(e) => handleChange("phone", e.target.value)}
        />
      )}

      {state.activeStep === 1 && (
        <SecondStep
          fullName={state.fullName}
          handleFullNameChange={(e) => handleChange("fullName", e.target.value)}
          location={state.location}
          handleLocationChange={(e, v) => handleLocationChange("location", v)}
          description={state.description}
          handleDescriptionChange={(e) =>
            handleChange("description", e.target.value)
          }
        />
      )}

      {state.activeStep === 2 && (
        <ThirdStep
          gender={state.gender}
          handleGenderChange={(e) => handleChange("gender", e.target.value)}
          profession={state.profession}
          handleProfessionChange={(e) =>
            handleChange("profession", e.target.value)
          }
        />
      )}

      {state.activeStep === 3 && (
        <FourthStep
          song1Name={state.song1Name}
          handleSong1NameChange={(e) =>
            handleChange("song1Name", e.target.value)
          }
          song1Url={state.song1Url}
          handleSong1UrlChange={(e) => handleChange("song1Url", e.target.value)}
          song2Name={state.song2Name}
          handleSong2NameChange={(e) =>
            handleChange("song2Name", e.target.value)
          }
          song2Url={state.song2Url}
          handleSong2UrlChange={(e) => handleChange("song2Url", e.target.value)}
          song3Name={state.song3Name}
          handleSong3NameChange={(e) =>
            handleChange("song3Name", e.target.value)
          }
          song3Url={state.song3Url}
          handleSong3UrlChange={(e) => handleChange("song3Url", e.target.value)}
          song4Name={state.song4Name}
          handleSong4NameChange={(e) =>
            handleChange("song4Name", e.target.value)
          }
          song4Url={state.song4Url}
          handleSong4UrlChange={(e) => handleChange("song4Url", e.target.value)}
        />
      )}

      {state.activeStep === 4 && (
        <ImageUpload
          imageSrc={state.imageSrc}
          handleRemoveImage={handleRemoveImage}
          handleImageChange={handleImageChange}
        />
      )}

      {state.activeStep === 5 && (
        <FifthStep
          genresList={genresList}
          genres={state.genres}
          handleGenresChange={handleGenresChange}
          isChecked={state.isChecked}
          handleCheckboxChange={handleIsCheckedPolicy}
        />
      )}

      {state.activeStep < 5 ? (
        <button
          className={state.isValid ? "btn-login" : "disabled"}
          onClick={handleNext}
          disabled={!state.isValid}
        >
          Continue
        </button>
      ) : (
        <>
          <button
            className={state.isValid ? "btn-login" : "disabled"}
            onClick={handleSubmit}
            disabled={!state.isValid}
          >
            Submit
          </button>
          {<p style={{ color: "red" }}>{state.message}</p>}
        </>
      )}
    </>
  );
};

export default Signup;
