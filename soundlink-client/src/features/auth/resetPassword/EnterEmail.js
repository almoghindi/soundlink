import React, { useState } from "react";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { RegularTextField } from "../../../components/TextFields";
import { useHttpClient } from "../../../hooks/useHttp";
import { isValidEmail } from "../../../utils/Validations";

const EnterEmail = () => {
  const [email, setEmail] = useState("example@gmail.com");
  const [isLinkSent, setLinkSent] = useState(false);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("green");
  const { isLoading, sendRequest } = useHttpClient();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!isValidEmail(email)) {
        setMessage("Please enter a valid email.");
        setMessageColor("red");
        return;
      }

      const formData = { email };
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}users/forgetPassword`,
        "POST",
        JSON.stringify(formData),
        { "Content-Type": "application/json" }
      );

      if (response.message) {
        setLinkSent(true);
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

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <h1>Reset password</h1>
      <p>Enter your email:</p>
      <RegularTextField
        label="Email"
        error={!isValidEmail(email)}
        value={email}
        onChange={handleEmailChange}
        placeholder="Enter email"
      />
      <br />
      <button
        className={
          isLinkSent || !isValidEmail(email) ? "disabled" : "btn-login"
        }
        onClick={handleSubmit}
        disabled={isLinkSent}
      >
        Reset password
      </button>
      {<p style={{ color: `${messageColor}` }}>{message}</p>}
    </>
  );
};

export default EnterEmail;
