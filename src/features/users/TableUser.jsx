import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, ButtonGroup } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import _, { debounce } from "lodash";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Page from "../../components/Page";
import Search from "../../components/Search";
import ModalConfirm from "./ModalConfirm";
import ModalCreate from "./ModalCreate";
import ModalUpdate from "./ModalUpdate";
import { useUsers } from "./useUsers";

function UserTable() {
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(5);
  const [rows, setRows] = useState([]);
  const { isLoading, users } = useUsers(page);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      renderCell: (params) => <div>{params.row.roles.join(", ")}</div>,
    },
    {
      field: "action",
      headerName: "Actions",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <ButtonGroup variant="text">
          <Button
            color="warning"
            onClick={() => handleUpdate(params.row)}
            startIcon={<EditIcon />}
          />
          <Button
            color="error"
            onClick={() => handleDelete(params.row)}
            startIcon={<DeleteIcon />}
          />
        </ButtonGroup>
      ),
    },
  ];

  useEffect(() => {
    if (!isLoading) {
      setRows(users.result);
      setTotalPages(users.totalPages);
    }
  }, [isLoading, users]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // create
  const [openCreate, setOpenCreate] = useState(false);

  function handleModalCreate() {
    setOpenCreate((item) => !item);
  }

  const handleCreate = () => {
    setRows(users.result);
    setTotalPages(users.totalPages);
    handleModalCreate();
  };

  // update
  const [openUpdate, setOpenUpdate] = useState(false);
  const [updateData, setUpdateData] = useState({});

  function handleModalUpdate() {
    setOpenUpdate((item) => !item);
  }

  const handleUpdate = (row) => {
    setUpdateData(row);
    handleModalUpdate();
  };

  // delete
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteData, setDeleteData] = useState({});

  function handleModalDelete() {
    setOpenDelete((item) => !item);
  }
  function handleDelete(params) {
    setDeleteData(params);
    handleModalDelete();
  }

  // search
  const handleSearch = debounce((e) => {
    let key = e.target.value;
    if (key) {
      let cloneListUsers = _.cloneDeep(rows);
      cloneListUsers = cloneListUsers.filter((item) =>
        item.email.includes(key)
      );
      setRows(cloneListUsers);
    } else {
      setRows(users.result);
    }
  }, 500);

  // filter
  const [openFilter, setOpenFilter] = useState(null);
  const [sortOption, setSortOption] = useState({
    sortBy: "asc",
    sortField: "id",
  });

  const handleChange = (option) => {
    setOpenFilter(null);
    setSortOption(option.sortBy, option.sortField);
    let cloneListUsers = _.cloneDeep(rows);
    cloneListUsers = _.orderBy(
      cloneListUsers,
      [option.sortField],
      [option.sortBy]
    );
    setRows(cloneListUsers);
  };

  return (
    <Box p={2}>
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection={{ xs: "column", md: "row" }}
        gap={1}
        p={1}
      >
        <Box display="flex">
          <Search
            handleSearch={handleSearch}
            openFilter={openFilter}
            setOpenFilter={setOpenFilter}
            sortOption={sortOption}
            setSortOption={setSortOption}
            handleChange={handleChange}
          />
        </Box>
        <Box display="flex">
          <Button
            variant="contained"
            onClick={handleModalCreate}
            startIcon={<AddIcon />}
          >
            Create new user
          </Button>
        </Box>
      </Box>
      <Loading loading={isLoading}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </Loading>
      <ModalCreate
        open={openCreate}
        onClose={handleModalCreate}
        onCreate={handleCreate}
        data={updateData}
      />
      <ModalUpdate
        open={openUpdate}
        onClose={handleModalUpdate}
        data={updateData}
      />
      <ModalConfirm
        open={openDelete}
        onClose={handleModalDelete}
        data={deleteData}
      />
      <Page count={totalPages} onChange={handlePageChange} />
    </Box>
  );
}

export default UserTable;
