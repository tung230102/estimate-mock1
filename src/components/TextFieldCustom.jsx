import { TextField } from "@mui/material";

function TextFieldCustom({
  label,
  onChange,
  type,
  value,
  error,
  helperText,
  disabled,
}) {
  return (
    <TextField
      variant="standard"
      color="primary"
      fullWidth
      error={error}
      sx={{ mb: 2 }}
      type={type}
      id={label}
      label={label}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      autoComplete="off"
      helperText={helperText}
      disabled={disabled}
    />
  );
}

export default TextFieldCustom;
