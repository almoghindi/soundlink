import * as React from "react";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
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

export default function MultiSelectDropdown({
  selectedGenres,
  setSelectedGenres,
}) {
  const handleSelectChange = (event, newValue) => {
    setSelectedGenres(newValue);
  };

  return (
    <Autocomplete
      multiple
      id="multi-select-dropdown"
      limitTags={2}
      options={genresList}
      getOptionLabel={(genresList) => genresList}
      value={selectedGenres}
      onChange={handleSelectChange}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          style={{
            background: "white",
            width: "300px",
            "& input": {
              color: "#8c46fe", // Text color
            },
            "& fieldset": {
              borderColor: "#8c46fe", // Border color
            },
            "&:hover fieldset": {
              borderColor: "#8c46fe", // Hovered border color
            },
            // width: "90%", // Adjust the width as needed
          }}
        />
      )}
    />
  );
}
