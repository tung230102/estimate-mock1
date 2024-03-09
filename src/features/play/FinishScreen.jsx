import { Box, Button, Container, Paper, Typography } from "@mui/material";
import Heading from "../../components/Heading";
import Loading from "../../components/Loading";
import { useQuiz } from "../../context/QuizContext";

const paperStyle = {
  margin: "20px auto",
  padding: "20px",
  minWidth: "360px",
  maxWidth: "400px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const paperStyle2 = {
  margin: "20px auto",
  padding: "20px",
  minWidth: "360px",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const styleAround = {
  backgroundColor: "green",
  borderRadius: "50%",
  padding: "8px",
  height: "20px",
  width: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: "4px",
};

const styleBox1 = {
  display: "flex",
  justifyContent: "space-between",
  padding: 1,
};
const styleBox2 = {
  display: "flex",
  alignItems: "center",
};

function FinishScreen() {
  const {
    dispatch,
    totalScore,
    highScore,
    submitQuestion,
    isLoadingSubmit,
    listQuestionSubmitted,
    listQuestionChecked,
  } = useQuiz();

  const percentage = (totalScore / 10) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥳👌";
  if (percentage >= 80 && percentage < 100) emoji = "👍";
  if (percentage >= 50 && percentage < 80) emoji = "👌";
  if (percentage >= 0 && percentage < 50) emoji = "👎";
  if (percentage === 0) emoji = "🤯";

  return (
    <Container>
      <Loading loading={isLoadingSubmit}>
        <Paper elevation={10} style={paperStyle}>
          <Typography variant="h6">(High score: {highScore} points)</Typography>
          {totalScore ? (
            <>
              <Typography variant="body1">
                <span>{emoji}</span> You scored <strong>{totalScore}</strong>{" "}
                out of {10} points. ({Math.ceil(percentage) || 0}%)
              </Typography>
              <Button
                variant="contained"
                onClick={() => dispatch({ type: "restart" })}
              >
                Restart quiz
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="success"
              onClick={() => submitQuestion({ listQuestionSubmitted })}
            >
              Submit questions
            </Button>
          )}
        </Paper>

        {totalScore >= 0 && (
          <Paper elevation={10} sx={paperStyle2}>
            {listQuestionChecked &&
              listQuestionChecked.map((question) => (
                <Box key={question.id}>
                  <Heading>{question.title}</Heading>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      margin: 8,
                    }}
                  >
                    <img src={question.thumbnail_link} alt="thumbnail_link" />
                  </Box>

                  <Box sx={styleBox1}>
                    <Box sx={styleBox2}>
                      Number Answers Correct{" "}
                      <span style={styleAround}>
                        {question.numberAnswersCorrect}
                      </span>
                    </Box>
                    <Box sx={styleBox2}>
                      Number Submit Correct{" "}
                      <span style={{ ...styleAround, backgroundColor: "blue" }}>
                        {question.numberSubmitCorrect}
                      </span>
                    </Box>
                  </Box>

                  <Box sx={styleBox1}>
                    <Box sx={styleBox2}>
                      Number Submit Incorrect{" "}
                      <span
                        style={{ ...styleAround, backgroundColor: "yellow" }}
                      >
                        {question.numberSubmitIncorrect}
                      </span>
                    </Box>
                    <Box sx={styleBox2}>
                      Score This Question{" "}
                      <span style={{ ...styleAround, backgroundColor: "gray" }}>
                        {question.scoreThisQuestion}
                      </span>
                    </Box>
                  </Box>

                  <Box style={{ width: 600 }}>
                    {question.answers.map((option) => (
                      <Button
                        key={option.id}
                        variant="contained"
                        fullWidth
                        sx={{
                          mb: 2,
                          backgroundColor:
                            option.is_correct && option.is_submit_correct
                              ? "blue"
                              : option.is_correct &&
                                option.is_submit_correct === undefined
                              ? "green"
                              : !option.is_correct &&
                                option.is_submit_correct === false
                              ? "yellow"
                              : !option.is_correct && "red",
                        }}
                      >
                        {option.content}
                      </Button>
                    ))}
                  </Box>
                </Box>
              ))}
          </Paper>
        )}
      </Loading>
    </Container>
  );
}

export default FinishScreen;
