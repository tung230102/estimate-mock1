import { Button, Container, Paper } from "@mui/material";
import { useState } from "react";
import TextFieldCustom from "../../components/TextFieldCustom";
import { useQuiz } from "../../context/QuizContext";

const paperStyle = {
  margin: "20px auto",
  padding: "20px",
  minWidth: "360px",
  maxWidth: "400px",
};

function Loader() {
  const [total, setTotal] = useState("");
  const { createPlay } = useQuiz();

  return (
    <Container>
      <Paper elevation={10} style={paperStyle}>
        <TextFieldCustom label="Total" value={total} onChange={setTotal} />
        <Button onClick={() => createPlay(total)} fullWidth variant="contained">
          Play
        </Button>
      </Paper>
    </Container>
  );
}

export default Loader;
