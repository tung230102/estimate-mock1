import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoadingButton } from "@mui/lab";
import { Avatar, Container, Grid, Paper, TextField } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useEffect, useState } from "react";
import useChangePassword from "./users/useChangePassword";

const color = blue[800];

const paperStyle = {
  margin: "20px auto",
  padding: "20px",
  minWidth: "300px",
  maxWidth: "400px",
};

const TextFieldStyle = ({
  label,
  onChange,
  type,
  value,
  error,
  helperText,
}) => {
  return (
    <TextField
      variant="standard"
      color="primary"
      fullWidth
      error={error}
      sx={{ mb: 2 }}
      type={type}
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      autoComplete="off"
      helperText={helperText}
    />
  );
};

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");

  const { changePassword, isLoading, data } = useChangePassword();

  useEffect(() => {
    const errors = data?.data?.message;
    errors?.forEach((error) => {
      switch (error) {
        case "oldPassword should not be empty":
          setOldPasswordError("oldPassword should not be empty");
          break;
        case "newPassword must be longer than or equal to 7 characters":
          setNewPasswordError(
            "newPassword must be longer than or equal to 7 characters"
          );
          break;
        case "newPassword should not be empty":
          setNewPasswordError("newPassword should not be empty");
          break;
        default:
          break;
      }
    });
  }, [data]);

  const handleSubmit = (event) => {
    event.preventDefault();
    changePassword({ oldPassword, newPassword });
  };

  return (
    <Container>
      <Paper elevation={10} style={paperStyle}>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Grid align="center">
            <Avatar sx={{ bgcolor: color }}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Change Password</h2>
          </Grid>
          <TextFieldStyle
            type="password"
            label="Old Password"
            value={oldPassword}
            onChange={setOldPassword}
            error={Boolean(oldPasswordError)}
            helperText={oldPasswordError}
          />
          <TextFieldStyle
            type="password"
            label="New Password"
            value={newPassword}
            onChange={setNewPassword}
            error={Boolean(newPasswordError)}
            helperText={newPasswordError}
          />
          <LoadingButton
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mb: 2 }}
            disabled={!oldPassword || !newPassword}
            loading={isLoading}
          >
            Update password
          </LoadingButton>
        </form>
      </Paper>
    </Container>
  );
}

export default ChangePassword;
