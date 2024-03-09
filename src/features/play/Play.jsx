import { Box } from "@mui/material";
import { useQuiz } from "../../context/QuizContext";
import Error from "./Error";
import FinishScreen from "./FinishScreen";
import Header from "./Header";
import Loader from "./Loader";
import Main from "./Main";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Question from "./Question";
import StartScreen from "./StartScreen";
import Timer from "./Timer";
import Footer from "./Footer";
import useProfile from "../users/useProfile";

const app = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

function Play() {
  const { status } = useQuiz();
  const { user } = useProfile();

  return (
    <Box sx={app}>
      <Header />
      {user?.status === 401 ? (
        <p>You can login to play</p>
      ) : (
        <Main>
          {status === "loading" && <Loader />}
          {status === "error" && (
            <>
              <Loader />
              <Error />
            </>
          )}
          {status === "ready" && <StartScreen />}
          {status === "active" && (
            <>
              <Progress />
              <Question />
              <Footer>
                <Timer />
                <NextButton />
              </Footer>
            </>
          )}
          {status === "finished" && <FinishScreen />}
        </Main>
      )}
    </Box>
  );
}

export default Play;
