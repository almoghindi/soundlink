import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import PublicIcon from "@mui/icons-material/Public";
import { countries } from "../utils/CountriesData";

export default function CountrySelect({
  label,
  error,
  value,
  onChange,
  placeholder,
}) {
  return (
    <Autocomplete
      options={countries}
      autoHighlight
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      // getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <img
            loading="lazy"
            width="20"
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            alt=""
          />
          {option.label}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          color="secondary"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <PublicIcon style={{ color: "white", padding: 0 }} />
              </InputAdornment>
            ),
          }}
        />
      )}
      sx={{
        width: "100%",
        marginTop: "20px",
        "& .MuiOutlinedInput-root .MuiAutocomplete-input": {
          padding: 0,
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "secondary.main",
            borderWidth: "2px",
          },
          "&:hover fieldset": {
            borderColor: "secondary.main",
          },
          "&.Mui-focused fieldset": {
            borderColor: "secondary.main",
          },
        },
        "& .MuiInputLabel-root": {
          color: "secondary.main",
          "&.Mui-focused": {
            color: "secondary.main",
          },
        },
        "& .MuiOutlinedInput-input": {
          color: "white",
        },
        "& .MuiSvgIcon-root": {
          color: "white",
        },
      }}
    />
  );
}
