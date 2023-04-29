import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import muiTheme from "../../muiTheme";

const Dropdown = ({ list, selectedOption, setSelectedOption }) => {
  const handleSelect = (e, value) => {
    setSelectedOption(value);
  };

  return (
    <Autocomplete
      id="activity-select"
      sx={{ width: "100%" }}
      value={selectedOption}
      onChange={handleSelect}
      options={list}
      autoHighlight
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{
            "& > img": { mr: 2, flexShrink: 0 },
          }}
          {...props}
        >
          <Typography
            ml={2}
            sx={{
              color: muiTheme.palette.primary.main,
            }}
          >
            {option.icon}
          </Typography>
          <Typography
            ml={2}
            sx={{
              color: muiTheme.palette.primary.main,
            }}
          >
            {option.name}
          </Typography>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose an activity"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};

export default Dropdown;
