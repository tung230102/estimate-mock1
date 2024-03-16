import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Button, CircularProgress } from "@mui/material";
import { HiddenInput } from "../ui/HiddenInput";

function UploadFile({ onChange, file, onUpload, disabled, progress }) {
  return (
    <>
      <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
        <Button
          component="label"
          role={undefined}
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <HiddenInput
            type="file"
            style={{ display: "none" }}
            onChange={onChange}
          />
        </Button>
        <span>{file ? file.name : "No file selected"}</span>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={onUpload}
        fullWidth
        sx={{ mb: 2 }}
        disabled={disabled}
      >
        {progress ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Upload Avatar"
        )}
      </Button>
    </>
  );
}

export default UploadFile;
