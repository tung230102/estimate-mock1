import styled from "@emotion/styled";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useProfile from "../features/users/useProfile";
import useUploadAvatar from "../features/users/useUploadAvatar";

const paperStyle = {
  margin: "20px auto",
  padding: "20px",
  minWidth: "300px",
  maxWidth: "400px",
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function UploadAvatar() {
  const [file, setFile] = useState(null);
  const { changeAvatar, isLoading: isLoadingAvatar } = useUploadAvatar();
  const { isLoading, user, refetch, isFetching } = useProfile();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  useEffect(() => {
    refetch();
  }, [isLoadingAvatar]);

  const TextFieldStyle = ({
    label,
    onChange,
    type,
    value,
    disabled,
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
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        helperText={helperText}
      />
    );
  };

  const handleUpload = () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("avatar", file);
    changeAvatar(formData);
    setFile(null);
  };
  return (
    <Container>
      <Paper
        elevation={10}
        style={paperStyle}
        display="flex"
        justifyContent="center"
      >
        <Box>
          {isFetching && <p>fetching...</p>}
          {isLoading ? (
            <div>loading...</div>
          ) : (
            <>
              <Grid align="center">
                <Avatar src={user?.data?.avatar_link} alt="avatar" />
                <h2>UploadAvatar</h2>
              </Grid>
              <TextFieldStyle
                label="Email"
                disabled={!isLoading}
                value={user?.data?.email}
              />
              <TextFieldStyle
                label="Name"
                disabled={!isLoading}
                value={user?.data?.name}
              />
            </>
          )}
          <Box display="flex">
            <Button
              component="label"
              role={undefined}
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </Button>
            <p>{file ? file.name : "No file selected"}</p>
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            fullWidth
            sx={{ mb: 2 }}
            disabled={!file || isLoadingAvatar || isLoading || isFetching}
          >
            {isLoadingAvatar ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Upload Avatar"
            )}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default UploadAvatar;
