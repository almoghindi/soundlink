import {
  RegularTextField,
  PasswordTextField,
} from "../../../components/TextFields";

const FirstStep = ({
  email,
  handleEmailChange,
  showPassword,
  password,
  handlePasswordChange,
  handleClickShowPassword,
  handleMouseDownPassword,
  phone,
  handlePhoneChange,
}) => {
  return (
    <>
      <RegularTextField
        label="Email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Enter email"
      />

      <br />
      <PasswordTextField
        label="Password"
        showPassword={showPassword}
        value={password}
        onChange={handlePasswordChange}
        placeholder="Enter password"
        handleClickShowPassword={handleClickShowPassword}
        handleMouseDownPassword={handleMouseDownPassword}
        helperText={
          "minimum 8 characters, at least one lowercase letter, one uppercase letter, and one number"
        }
      />
      <div style={{ margin: "10px" }}></div>
      <RegularTextField
        label="Phone"
        value={phone}
        onChange={handlePhoneChange}
        placeholder="Enter phone"
      />
    </>
  );
};

export default FirstStep;
