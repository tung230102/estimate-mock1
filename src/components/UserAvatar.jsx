import {
  Avatar,
  Box,
  IconButton,
  Menu,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../features/authentication/useLogout";

function UserAvatar({ data, isRoles }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout, isLoadingLogout } = useLogout();
  const avatar = data?.avatar_link;
  const name = data?.name;

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    logout();
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleMenu} sx={{ p: 0 }}>
            <Avatar src={avatar} alt={`Avatar of ${name}`} />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} component={Link} to="/my-profile">
            <Typography textAlign="center">Profile</Typography>
          </MenuItem>
          {isRoles && (
            <MenuItem onClick={handleClose} component={Link} to="/admin">
              <Typography textAlign="center">Dashboard</Typography>
            </MenuItem>
          )}
          <MenuItem onClick={handleLogout} disabled={isLoadingLogout}>
            <Typography textAlign="center">Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </div>
  );
}

export default UserAvatar;
