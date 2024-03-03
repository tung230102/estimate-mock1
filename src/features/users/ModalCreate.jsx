import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";
import MultipleSelect from "../../components/MultipleSelect";
import { useCreateUser } from "./useCreateUser";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

function ModalCreate({ open, onClose, onCreate }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState(["user"]);

  const { isLoading, createUser } = useCreateUser();

  function handleSaveUser() {
    createUser(
      { name, email, password, roles },
      {
        onSuccess: (data) => {
          if (data?.statusCode === 201) {
            setName("");
            setEmail("");
            setPassword("");
            setRoles(["user"]);
            onCreate();
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
          Create new user
        </Typography>
        <TextField
          id="Name"
          label="Name"
          variant="standard"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="Email"
          label="Email"
          variant="standard"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="Password"
          label="Password"
          variant="standard"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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

export default ModalCreate;
