import { Box } from "@mui/material";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const DefaultLayout = ({ children }) => {
  return (
    <Box display="flex" height="100vh" overflow="hidden">
      <Sidebar />
      <Box flex={1} sx={{ overflowY: "auto", overflowX: "hidden" }}>
        <Header />
        <main>
          <Box>{children}</Box>
        </main>
      </Box>
    </Box>
  );
};

export default DefaultLayout;
