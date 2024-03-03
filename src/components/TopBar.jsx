import LoginIcon from "@mui/icons-material/Login";
import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function TopBar() {
  return (
    <Box display="flex" justifyContent="space-between" px={2} py={1}>
      <Box display="flex" alignItems="center">
        <Typography
          variant="h6"
          noWrap
          sx={{
            mr: 2,
            fontWeight: 700,
            color: "inherit",
            textDecoration: "none",
          }}
          component={Link}
          to="/"
        >
          Quizify
        </Typography>
      </Box>
      <Box display="flex">
        <IconButton component={Link} to="/login">
          <LoginIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default TopBar;
