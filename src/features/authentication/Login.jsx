import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoadingButton } from "@mui/lab";
import { Avatar, Container, Grid, Paper, TextField } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useState } from "react";
import { Link } from "react-router-dom";
import TopBar from "../../components/TopBar";
import useLogin from "./useLogin";

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

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useLogin();

  const handleSubmit = (event) => {
    event.preventDefault();
    login({ email, password });
  };

  return (
    <>
      <TopBar />
      <Container>
        <Paper elevation={10} style={paperStyle}>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <Grid align="center">
              <Avatar sx={{ bgcolor: color }}>
                <LockOutlinedIcon />
              </Avatar>
              <h2>Login Form</h2>
            </Grid>
            <TextFieldStyle label="Email" value={email} onChange={setEmail} />
            <TextFieldStyle
              type="password"
              label="Password"
              value={password}
              onChange={setPassword}
            />
            <LoadingButton
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ mb: 2 }}
              disabled={!email || !password}
              loading={isLoading}
            >
              Login
            </LoadingButton>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <small>
                <Link to="/forgot-password" style={{ color: color }}>
                  Forgot password?
                </Link>
              </small>
              <small>
                Need an account?{" "}
                <Link to="/register" style={{ color: color }}>
                  Register here
                </Link>
              </small>
            </div>
          </form>
        </Paper>
      </Container>
    </>
  );
}

export default Register;
