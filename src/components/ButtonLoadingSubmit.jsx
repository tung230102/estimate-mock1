import { LoadingButton } from "@mui/lab";

function ButtonLoadingSubmit({ disabled, loading, children }) {
  return (
    <LoadingButton
      variant="contained"
      color="primary"
      type="submit"
      fullWidth
      sx={{ mb: 2 }}
      disabled={disabled}
      loading={loading}
    >
      {children}
    </LoadingButton>
  );
}

export default ButtonLoadingSubmit;
