import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import MultipleSelect from "../../components/MultipleSelect";
import { useUpdateUser } from "./userUpdateUser";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

function ModalUpdate({ open, onClose, data }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState([]);

  const { isLoading, updateUser } = useUpdateUser();

  useEffect(() => {
    if (data) {
      setName(data.name);
      setEmail(data.email);
      setRoles(data.roles);
    }
  }, [data]);

  function handleSaveUser() {
    updateUser(
      { id: data.id, data: { name, roles } },
      {
        onSuccess: (data) => {
          if (data?.statusCode === 200) {
            setName("");
            setEmail("");
            setRoles([]);
            onClose();
          }
        },
      }
    );
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
        height={280}
        bgcolor={"background.default"}
        color={"text.primary"}
        p={3}
        borderRadius={5}
      >
        <Typography variant="h6" color="gray" textAlign="center">
          Update info user
        </Typography>
        <TextField
          label="Name"
          variant="standard"
          fullWidth
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          variant="standard"
          fullWidth
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
          disabled={true}
        />
        <MultipleSelect roles={roles} setRoles={setRoles} />
        <Button
          sx={{ mt: 1 }}
          variant="contained"
          disabled={isLoading}
          fullWidth
          onClick={() => handleSaveUser()}
        >
          Submit
        </Button>
      </Box>
    </StyledModal>
  );
}

export default ModalUpdate;
