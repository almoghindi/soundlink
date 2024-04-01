import React, { useState, useEffect } from "react";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { PasswordTextField } from "../../../components/TextFields";
import Button from "../../../components/Button";
import { useParams, Link } from "react-router-dom";
import { useHttpClient } from "../../../hooks/useHttp";
import { isValidPassword } from "../../../utils/Validations";

const EnterPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("zA7M5kvSWOYatE8");
  const [confirmPassword, setConfirmPassword] = useState("zA7M5kvSWOYatE8");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("green");
  const [token, setToken] = useState("");
  const userId = useParams().userId;
  const { isLoading, sendRequest } = useHttpClient();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleClickShowPassword = (setState) => {
    setState((prevState) => !prevState);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const isValidCheck = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}users/checkResetLink`,
          "POST",
          JSON.stringify({
            userId: userId,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        setToken(responseData);
      } catch (err) {}
    };
    isValidCheck();
  }, []);

  const isValidForm = isValidPassword(password) && password === confirmPassword;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValidPassword(password)) {
      setMessage("Password doesn't meet the requirements");
      setMessageColor("red");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setMessageColor("red");
      return;
    }

    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}users/${userId}/${token.token}`,
        "PUT",
        JSON.stringify({ password }),
        { "Content-Type": "application/json" }
      );

      if (response.message) {
        setMessage(response.message);
        setMessageColor("green");
      } else if (response.error) {
        setMessage(response.error);
        setMessageColor("red");
      }
    } catch (err) {
      setMessage("Authentication error, please try again later");
      setMessageColor("red");
    }
  };

  if (!token.isValid) {
    return (
      <div
        style={{
          textAlign: "center",
          height: "100vh",
          backgroundColor: "#201139",
          color: "white",
          flexDirection: "column",
        }}
      >
        <h1>Invalid Link!</h1>
        <h2>Please try again</h2>
        <Link to="/">
          <p style={{ textDecoration: "underline" }}>Back Home</p>
        </Link>
      </div>
    );
  }

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div
        style={{
          width: "100%",
          height: "100vh",
          flexDirection: "column",
          color: "white",
        }}
        className="center-div"
      >
        <div className="reset-password-container">
          <h1
            style={{
              fontFamily: "Assistant",
              fontWeight: "600",
              fontSize: "36px",
              lineHeight: "42.66px",
            }}
          >
            Reset Password
          </h1>
          <div style={{ flexDirection: "column" }} className="center-div">
            <h5
              style={{
                fontFamily: "Assistant",
                fontWeight: "600",
                fontSize: "18px",
                lineHeight: "24.3px",
              }}
            >
              Please Enter Your New Password
            </h5>
            <PasswordTextField
              label="Password"
              showPassword={showPassword}
              error={!isValidPassword(password)}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter password"
              handleClickShowPassword={() =>
                handleClickShowPassword(setShowPassword)
              }
              handleMouseDownPassword={handleMouseDownPassword}
            />
            <PasswordTextField
              label="Confirm Password"
              showPassword={showConfirmPassword}
              error={!isValidPassword(confirmPassword)}
              value={confirmPassword}
              helperText="minimum 8 characters, at least one lowercase letter, one uppercase letter, and one number"
              onChange={handleConfirmPasswordChange}
              placeholder="Enter confirm password"
              handleClickShowPassword={() =>
                handleClickShowPassword(setShowConfirmPassword)
              }
              handleMouseDownPassword={handleMouseDownPassword}
            />
            <Button
              text="Reset Password"
              onClick={handleSubmit}
              disabled={!isValidForm}
            />
            {message && <p style={{ color: messageColor }}>{message}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default EnterPassword;
