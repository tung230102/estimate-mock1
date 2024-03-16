import { Box, Button, Paper } from "@mui/material";
import Heading from "../components/Heading";
import { useMoveBack } from "../hooks/useMoveBack";

const PageNotFound = () => {
  const moveBack = useMoveBack();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          padding: "20px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Heading>The page you are looking for could not be found 😢</Heading>
        <Button onClick={moveBack} variant="outlined">
          &larr; Go back
        </Button>
      </Paper>
    </Box>
  );
};

export default PageNotFound;
