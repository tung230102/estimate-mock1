import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useEffect, useState } from "react";
import { styleBoxSubmit } from "../../components/BoxSubmit";
import ButtonLoadingSubmit from "../../components/ButtonLoadingSubmit";
import Heading from "../../components/Heading";
import { StyledModal } from "../../components/StyledModal";
import TextFieldCustom from "../../components/TextFieldCustom";
import { useCreateAnswer } from "./useCreateAnswer";
import { useUpdateAnswer } from "./useUpdateAnswer";

function ModalCreateAnswer({ open, onClose, data, selectedData }) {
  const [content, setContent] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const { isLoading, createAnswer } = useCreateAnswer();
  const { isLoading: isLoadingUpdate, updateAnswer } = useUpdateAnswer();

  useEffect(() => {
    if (selectedData) {
      setContent(selectedData.content);
      setIsCorrect(selectedData.is_correct);
    }
  }, [selectedData]);

  function handleSubmit(e) {
    e.preventDefault();
    if (selectedData && selectedData.id) {
      updateAnswer(
        {
          id: selectedData.id,
          data: { content, is_correct: isCorrect },
        },
        {
          onSuccess: (data) => {
            if (data?.statusCode === 200) {
              setContent("");
              setIsCorrect(false);
              onClose();
            }
          },
        }
      );
    } else {
      createAnswer(
        {
          content,
          questionId: data.id,
          is_correct: isCorrect,
        },
        {
          onSuccess: (data) => {
            if (data?.statusCode === 201) {
              setContent("");
              setIsCorrect(false);
              onClose();
            }
          },
        }
      );
    }
  }
  const handleRadioChange = (event) => {
    setIsCorrect(event.target.value === "true");
  };

  return (
    <StyledModal open={open} onClose={onClose}>
      <Box component="form" sx={styleBoxSubmit} onSubmit={handleSubmit}>
        <Heading>
          {selectedData?.id ? "Update answer" : "Create new answer"}
        </Heading>

        <TextFieldCustom
          label="Content"
          value={content}
          onChange={setContent}
        />

        <FormControl component="fieldset">
          <RadioGroup
            aria-label="answer"
            name="answer"
            value={String(isCorrect)}
            onChange={handleRadioChange}
          >
            <FormControlLabel
              value="true"
              control={<Radio />}
              label="Correct"
            />
            <FormControlLabel
              value="false"
              control={<Radio />}
              label="Incorrect"
            />
          </RadioGroup>
        </FormControl>

        <ButtonLoadingSubmit
          disabled={isLoading || isLoadingUpdate}
          loading={isLoading || isLoadingUpdate}
        >
          Submit
        </ButtonLoadingSubmit>
      </Box>
    </StyledModal>
  );
}

export default ModalCreateAnswer;
