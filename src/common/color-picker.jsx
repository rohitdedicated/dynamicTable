import React from "react";
import { TextField, Box, Grid } from "@mui/material";

const ColorPicker = ({ value, label, onChange }) => {
  return (
    <div style={{ position: "relative" }}>
      <Box>
        <TextField
          label={label}
          variant="outlined"
          onChange={onChange}
          size="small"
          style={{ width: "100%" }}
          InputLabelProps={{ shrink: true }}
          id={label || "colorPicker"}
        />
      </Box>
      <div style={{ position: "absolute", top: "17%", right: "9px" }}>
        <input type="color" value={value} onChange={onChange} />
      </div>
    </div>
  );
};

export default ColorPicker;
