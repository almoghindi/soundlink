import React, { useState, useContext } from "react";
import {
  RegularTextField,
  PasswordTextField,
} from "../../../components/TextFields";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useHttpClient } from "../../../hooks/useHttp";
import { AuthContext } from "../../../context/auth-context";
import { isValidEmail, isValidPassword } from "../../../utils/Validations";

const Login = () => {
  const [email, setEmail] = useState("example@gmail.com");
  const [password, setPassword] = useState("zA7M5kvSWOYatE8");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const auth = useContext(AuthContext);
  const { isLoading, sendRequest } = useHttpClient();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const isValid = isValidEmail(email) && isValidPassword(password);

  const handleAuth = async (url, body) => {
    try {
      const responseData = await sendRequest(
        url,
        "POST",
        JSON.stringify(body),
        { "Content-Type": "application/json" }
      );
      auth.login(responseData.userId, responseData.token, responseData.isAdmin);
    } catch (err) {
      setMessage("Authentication error, please try again later");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = { email, password };
      handleAuth(`${process.env.REACT_APP_BACKEND_URL}users/login`, formData);
    } catch (err) {
      setMessage("Authentication error, please try again later");
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <RegularTextField
        label="Email"
        error={!isValidEmail(email)}
        value={email}
        onChange={handleEmailChange}
        placeholder="Enter email"
      />
      <br />
      <PasswordTextField
        label="Password"
        showPassword={showPassword}
        error={!isValidPassword(password)}
        value={password}
        onChange={handlePasswordChange}
        placeholder="Enter password"
        handleClickShowPassword={handleClickShowPassword}
        handleMouseDownPassword={handleMouseDownPassword}
      />
      <button
        className={`btn-login ${isValid ? "" : "disabled"}`}
        onClick={handleSubmit}
        disabled={!isValid}
      >
        Login
      </button>
      {<p style={{ color: "red" }}>{message}</p>}
    </>
  );
};

export default Login;
