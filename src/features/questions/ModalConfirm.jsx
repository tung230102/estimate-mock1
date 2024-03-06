import { Box, Button, styled } from "@mui/material";
import Heading from "../../components/Heading";
import { StyledModal } from "../../components/StyledModal";
import { useDeleteQuestion } from "./useDeleteQuestion";

const ButtonContainer = styled(Box)({
  marginTop: 10,
  alignSelf: "flex-end",
});

function ModalConfirm({ open, onClose, data }) {
  const { isLoading, deleteUser } = useDeleteQuestion();

  function handleDeleteUser() {
    deleteUser(data.id);
    onClose();
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
        <Heading>Delete question</Heading>

        <Box>
          This action can't be undone! Do you want to delete this question,{" "}
          <b>id: {data?.id}, </b>
          <b>title: {data?.title}</b>
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
