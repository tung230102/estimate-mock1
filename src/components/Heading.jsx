import { Typography } from "@mui/material";

function Heading({ children }) {
  return (
    <Typography variant="h6" color="gray" textAlign="center">
      {children}
    </Typography>
  );
}

export default Heading;
