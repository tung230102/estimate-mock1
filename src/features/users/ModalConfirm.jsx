import { Box, Button, Modal, Typography, styled } from "@mui/material";
import { useDeleteUser } from "./useDeleteUser";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const ButtonContainer = styled(Box)({
  marginTop: 10,
  alignSelf: "flex-end",
});

function ModalConfirm({ open, onClose, data }) {
  const { isLoading, deleteUser } = useDeleteUser();

  function handleDeleteUser() {
    deleteUser(data.id);
    onClose();
  }

  return (
    <StyledModal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        width={400}
        bgcolor={"background.default"}
        color={"text.primary"}
        p={3}
        borderRadius={5}
        fontStyle={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" color="gray" textAlign="center">
          Delete user
        </Typography>
        <div>
          This action can't be undone! Do you want to delete this user,{" "}
          <b>email: {data?.email}?</b>
        </div>

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
