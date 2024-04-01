import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import "./style.css";
import Login from "./login/index";
import SignUp from "./signup/index";
import ResetPassword from "./resetPassword/EnterEmail";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AuthContext } from "../../context/auth-context";

const AuthDialog = ({ handleCloseAuthDialog, isOpen }) => {
  const auth = React.useContext(AuthContext);
  const [authView, setAuthView] = useState("Login");

  const handleSwitchView = (view) => {
    setAuthView(view);
  };

  const isSmallScreen = useMediaQuery("(max-width:720px)");

  const renderMainContent = () => {
    switch (authView) {
      case "Login":
        return (
          <>
            <h1>Login & start collaborate with SOUNDLINK</h1>
            <p>
              Join <b>SOUNDLINK</b> for free today. No credit card required.
            </p>
            <Login />
            <p style={{ textAlign: "left", margin: "4px 0" }}>
              <button
                className="btn-change-login"
                onClick={() => handleSwitchView("Reset")}
              >
                Forgot password?
              </button>
            </p>
            <p style={{ textAlign: "center" }}>
              Don't have an account?
              <button
                className="btn-change-login"
                onClick={() => handleSwitchView("Signup")}
              >
                Sign up
              </button>
            </p>
          </>
        );
      case "Signup":
        return (
          <>
            <h1>Lets get to know you!</h1>
            <p>Few questions and you are in...</p>
            <SignUp />
          </>
        );
      case "Reset":
        return <ResetPassword />;
      default:
        return null;
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleCloseAuthDialog}
      maxWidth="lg"
      fullWidth
    >
      <div className="dialog-container">
        <div className="left-card">
          {auth.token && (
            <div>
              <h1>You logged in!</h1>
            </div>
          )}
          {renderMainContent()}
          {authView !== "Login" && (
            <p style={{ textAlign: "center" }}>
              Already have an account?
              <button
                className="btn-change-login"
                onClick={() => handleSwitchView("Login")}
              >
                Login
              </button>
            </p>
          )}
        </div>
        {authView !== "Signup" && !isSmallScreen && (
          <div className="right-card">
            <h1>
              where words fail.
              <br /> <b style={{ fontWeight: "800" }}>music speaks</b>
            </h1>
            <h3>Hans Christian Andersen</h3>
          </div>
        )}
      </div>
    </Dialog>
  );
};

export default AuthDialog;
