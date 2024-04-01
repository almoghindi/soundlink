import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
export const RegularTextField = ({
  label,
  error,
  value,
  onChange,
  placeholder,
  marginTop,
  width,
}) => {
  return (
    <TextField
      label={label}
      color="secondary"
      focused
      error={error}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      sx={{
        "& input": {
          color: "white",
          width: "100%",
          height: "1vh",
        },
        "&": {
          width: width || "100%",
          marginTop: marginTop || "0px", // Add marginTop dynamically
        },
      }}
    />
  );
};

export const PasswordTextField = ({
  label,
  error,
  value,
  onChange,
  placeholder,
  showPassword,
  helperText,
  handleClickShowPassword,
  handleMouseDownPassword,
}) => {
  return (
    <TextField
      label={label}
      type={showPassword ? "text" : "password"}
      color="secondary"
      focused
      error={error}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      helperText={helperText}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              sx={{ color: "white" }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        "& input": {
          color: "white",
          height: "1vh",
        },
        "& .MuiFormHelperText-root": {
          color: "white",
        },
        "&": {
          width: "100%",
          marginTop: "20px",
        },
      }}
    />
  );
};
