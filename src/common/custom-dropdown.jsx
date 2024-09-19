import React from "react";
import { Autocomplete, FormControl, TextField } from "@mui/material";

const checkIfError = (msg) => msg && typeof msg === "string" && msg.length > 0;

const CustomDropDownList = ({
  variant,
  size,
  id,
  label,
  value,
  onChange,
  options,
  disabled,
  errorMessage,
}) => {
  return (
    <FormControl style={{ width: "100%" }} error={checkIfError(errorMessage)}>
      <Autocomplete
        id={id}
        options={options}
        getOptionLabel={(option) => option.value || ""}
        value={
          value && Array.isArray(options) && options.length > 0
            ? options.filter((item) => item.id === value)[0]
            : ""
        }
        onChange={(e, newValue) => {
          let event = { ...e };
          event.target = { name: id, value: newValue.id };
          onChange(event);
        }}
        disabled={disabled}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            variant={variant}
            InputLabelProps={{ shrink: true }}
            size={size}
          />
        )}
      />
    </FormControl>
  );
};

CustomDropDownList.defaultProps = {
  variant: "standard",
  size: "small",
  option: [],
  errorMessage: null,
};

export default CustomDropDownList;
