import { Pagination } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { CommonSearchBox } from "../CommonSearchBox/CommonSearchBox";

export const CommonTable = ({
  rows,
  columns,
  onPagination,
  onChangeSort,
  count,
  onChangePage,
  value,
  showPagination = true,
  //
  placeholder,
  onChange,
  onClear,
  onSubmit,
  dropdownContent,
}) => {
  return (
    <>
      <CommonSearchBox
        placeholder={placeholder}
        onChange={onChange}
        onClear={onClear}
        onSubmit={onSubmit}
        dropdownContent={dropdownContent}
      />
      <DataGrid
        // data
        rows={rows}
        columns={columns}
        disableColumnMenu
        disableRowSelectionOnClick
        hideFooter={!showPagination}
        // rows per page
        onPaginationModelChange={onPagination}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        // sort
        onSortModelChange={(newSortModel) => {
          if (newSortModel.length) {
            const sortField = newSortModel[0].field;
            const order = newSortModel[0].sort === "asc" ? "ASC" : "DESC";
            onChangeSort(sortField, order);
          } else {
            onChangeSort(value.sortField, value.order); // []
          }
        }}
      />

      {showPagination && (
        <Pagination
          count={count}
          color="primary"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 8,
          }}
          onChange={onChangePage}
        />
      )}
    </>
  );
};
