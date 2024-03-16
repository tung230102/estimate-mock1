import { Box, Button, styled } from "@mui/material";
import Heading from "../../components/Heading";
import { StyledModal } from "../../ui/StyledModal";
import { useDeleteAnswer } from "./useDeleteAnswer";

const ButtonContainer = styled(Box)({
  marginTop: 10,
  alignSelf: "flex-end",
});

function ModalConfirm({ open, onClose, data }) {
  const { isLoading, deleteAnswer } = useDeleteAnswer();

  function handleDeleteUser() {
    deleteAnswer(data.id, {
      onSuccess: (data) => {
        if (data?.statusCode === 200) {
          onClose();
        }
      },
    });
  }

  return (
    <StyledModal open={open} onClose={onClose}>
      <Box
        width={400}
        bgcolor={"background.default"}
        color={"text.primary"}
        p={3}
        borderRadius={5}
        display="flex"
        flexDirection="column"
        alignContent="center"
      >
        <Heading>Delete answer</Heading>

        <Box>
          This action can't be undone! Do you want to delete this answer,{" "}
          <b>id: {data?.id}, </b>
          <b>content: {data?.content}</b>
        </Box>

        <ButtonContainer>
          <Button
            variant="contained"
            color="error"
            disabled={isLoading}
            onClick={() => handleDeleteUser()}
          >
            Confirm
          </Button>
        </ButtonContainer>
      </Box>
    </StyledModal>
  );
}

export default ModalConfirm;
