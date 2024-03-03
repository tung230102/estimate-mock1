import LoginIcon from "@mui/icons-material/Login";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import useProfile from "../features/users/useProfile";

function Header() {
  const { isLoading, user, isRoles } = useProfile();
  const data = user?.data;

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
      {!isLoading ? (
        <Box display="flex">
          {user?.statusCode === 200 && (
            <UserAvatar data={data} isRoles={isRoles} />
          )}
          {user?.status === 401 && (
            <IconButton component={Link} to="/login">
              <LoginIcon />
            </IconButton>
          )}
        </Box>
      ) : (
        <Avatar src="/logo192.png" alt="logo192.png" />
      )}
    </Box>
  );
}

export default Header;
