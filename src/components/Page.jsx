import { Pagination } from "@mui/material";

function Page({ count, onChange }) {
  return (
    <Pagination
      count={count}
      color="primary"
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: 8,
      }}
      onChange={onChange}
    />
  );
}

export default Page;
