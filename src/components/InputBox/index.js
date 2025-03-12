import { FormControl, FormHelperText, InputLabel, OutlinedInput } from "@mui/material"

const InputBox = ({ label, value, onChange, error, placeholder, errorText, sx, required = false }) => {
  return (
    <div style={{ width: "100%" }}>
      <InputLabel htmlFor="custom-text-field" sx={{ color: "#1a1e3e" }}>
        {`${label} ${required ? " (Required)" : ""}`}
      </InputLabel>
      <FormControl sx={{ width: "100%" }} variant="outlined">
        <OutlinedInput
          id={`value_`}
          placeholder={placeholder}
          sx={{
            ...sx,
            "& .MuiInputBase-input": {
              color: "#1a1e3e",
              border: "1px solid #800000",
              width: "100%",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#800000", // Change border color on focus (Gold)
              borderWidth: "1.5px", // Optional: thicker border on focus
              width: "100%",

            }
          }}
          value={value}
          onChange={onChange}
          error={error}
        />
        {error && <FormHelperText error>{errorText}</FormHelperText>}
      </FormControl>
    </div>
  )
}

export default InputBox;
