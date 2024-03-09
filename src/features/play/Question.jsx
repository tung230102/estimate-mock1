import React from "react";
import Heading from "../../components/Heading";
import { useQuiz } from "../../context/QuizContext";
import Options from "./Options";

function Question() {
  const { questions, index } = useQuiz();
  const question = questions[index];

  return (
    <div>
      {question && (
        <>
          <Heading>{question.title}</Heading>
          <div style={{ display: "flex", justifyContent: "center", margin: 8 }}>
            <img src={question.thumbnail_link} alt="thumbnail_link" />
          </div>
          <Options question={question} />
        </>
      )}
    </div>
  );
}

export default Question;
