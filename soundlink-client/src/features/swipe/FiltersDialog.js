import React from "react";
import Dialog from "@mui/material/Dialog";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Box from "@mui/material/Box";
import MultiSelectDropdown from "./SelectGenreFilter";
import Switch from "../../components/Switch";
const FiltersDialog = ({
  handleCloseDialog,
  isOpen,
  selectedGenres,
  setSelectedGenres,
  selectedArea,
  setSelectedArea,
  onApplyFilters,
}) => {
  const handleDistanceChange = (event, value) => {
    setSelectedArea(value);
  };

  const handleFilter = () => {
    onApplyFilters();
    handleCloseDialog();
  };

  return (
    <Dialog open={isOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
      <div className="filters-container">
        <div className="distance-filter">
          <h3 style={{ margin: 2 }}>Select Area:</h3>
          <FormControl component="fieldset">
            <RadioGroup
              name="area"
              value={selectedArea}
              onChange={handleDistanceChange}
              row
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <FormControlLabel
                value="Global"
                control={
                  <Radio
                    icon={<div className="radio-button">Global</div>}
                    checkedIcon={
                      <div className="radio-button-selected">Global</div>
                    }
                  />
                }
                // label="Global"
                style={{ margin: 1 }}
              />
              <FormControlLabel
                value="Country"
                control={
                  <Radio
                    icon={<div className="radio-button">Country</div>}
                    checkedIcon={
                      <div className="radio-button-selected">Country</div>
                    }
                  />
                }
                // label="Country"
                style={{ margin: 1 }}
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="show-filter">
          <h3 style={{ margin: 0 }}>Show me:</h3>
          <Box mt={1}>
            <MultiSelectDropdown
              selectedGenres={selectedGenres}
              setSelectedGenres={setSelectedGenres}
            />{" "}
          </Box>
        </div>
        {/* <div className="paid-filter">
          <h3 style={{ margin: 0 }}>Paid</h3>
          <Switch defaultChecked />
        </div> */}

        <button
          style={{
            backgroundColor: "#201139",
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "5px",
            height: "40px",
            color: "#8c46fe",
            border: "1px solid #8c46fe",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={handleFilter}
        >
          Apply
        </button>
      </div>
    </Dialog>
  );
};

export default FiltersDialog;
