import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoadingButton } from "@mui/lab";
import { Avatar, Container, Grid, Paper, TextField } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TopBar from "../../components/TopBar";
import useRegister from "./useRegister";

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
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { register, isLoading, data } = useRegister();

  useEffect(() => {
    const errors = data?.data?.message;
    errors?.forEach((error) => {
      switch (error) {
        case "email must be an email":
          setEmailError("Invalid email format");
          break;
        case "name should not be empty":
          setNameError("Name is required");
          break;
        case "password must be longer than or equal to 7 characters":
          setPasswordError("Password must be at least 7 characters long");
          break;
        case "password should not be empty":
          setPasswordError("Password is required");
          break;
        default:
          break;
      }
    });
  }, [data]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setEmailError("");
    setNameError("");
    setPasswordError("");

    register({ email, name, password });
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
              <h2>Register Form</h2>
            </Grid>
            <TextFieldStyle
              label="Email"
              value={email}
              error={Boolean(emailError)}
              helperText={emailError}
              onChange={setEmail}
            />
            <TextFieldStyle
              label="Name"
              value={name}
              error={Boolean(nameError)}
              helperText={nameError}
              onChange={setName}
            />
            <TextFieldStyle
              type="password"
              label="Password"
              value={password}
              error={Boolean(passwordError)}
              helperText={passwordError}
              onChange={setPassword}
            />
            <LoadingButton
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ mb: 2 }}
              disabled={!email || !name || !password}
              loading={isLoading}
            >
              Register
            </LoadingButton>
            <small>
              Already have an account?{" "}
              <Link to="/login" style={{ color: color }}>
                Login Here
              </Link>
            </small>
          </form>
        </Paper>
      </Container>
    </>
  );
}

export default Register;
