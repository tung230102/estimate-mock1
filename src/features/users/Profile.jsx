import { Box } from "@mui/material";
import React from "react";
import ChangePassword from "../../components/ChangePassword";
import UploadAvatar from "../../components/UploadAvatar";

function Profile() {
  return (
    <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={2}>
      <ChangePassword />
      <UploadAvatar />
    </Box>
  );
}

export default Profile;
