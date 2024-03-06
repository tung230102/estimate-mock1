import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Page from "../../components/Page";
import { useDebounce } from "../../hooks/useDebounce";
import ModalConfirm from "./ModalConfirm";
import ModalCreateUpdate from "./ModalCreateUpdate";
import SearchAndMore from "./SearchAndMore";
import TableCustom from "./TableCustom";
import { useQuestions } from "./useQuestions";

const tableCell = ["ID", "Title", "Thumbnail", "Actions"];

function Question() {
  const [rows, setRows] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(null);
  const [key, setKey] = useState("");
  const keyWord = useDebounce(key, 1000);

  const [order, setOrder] = useState("");
  const [sortField, setSortField] = useState("");
  const [size, setSize] = useState(null);

  const { isLoading, data, refetch } = useQuestions(
    page,
    keyWord,
    size,
    order,
    sortField
  );

  useEffect(() => {
    if (!isLoading && data) {
      setRows(data.result);
      setTotalPages(data.totalPages);
    }
  }, [isLoading, data]);

  // page
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  //search
  function handleSearch(e) {
    setKey(e.target.value);
  }

  // filter
  const [openFilter, setOpenFilter] = useState(null);

  const handleChange = async (option) => {
    setOpenFilter(null);
    await setOrder(option.order);
    await setSortField(option.sortField);
    refetch();
  };

  // size
  const handleSizeChange = async (newSize) => {
    await setSize(newSize);
    refetch();
  };

  // create
  const [openCreateUpdate, setOpenCreateUpdate] = useState(false);

  function handleOpenCreate() {
    setOpenCreateUpdate((item) => !item);
    setSelectedData([]);
  }

  // update
  const [selectedData, setSelectedData] = useState([]);

  const handleOpenUpdate = (questionId) => {
    setOpenCreateUpdate((item) => !item);
    const selectedQuestion = data?.result.find(
      (question) => question.id === questionId
    );
    setSelectedData(selectedQuestion);
  };

  // delete
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleOpenConfirm = (questionId) => {
    setOpenConfirm(true);
    const selectedQuestion = data?.result.find(
      (question) => question.id === questionId
    );
    setSelectedData(selectedQuestion);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    setSelectedData([]);
  };

  return (
    <Box p={2}>
      <Box p={1} display="flex" justifyContent="space-between">
        <SearchAndMore
          onSearch={handleSearch}
          open={openFilter}
          setOpenFilter={setOpenFilter}
          onChange={handleChange}
          order={order}
          size={size}
          onSize={handleSizeChange}
        />

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenCreate}
        >
          Add new
        </Button>
      </Box>
      <Loading loading={isLoading}>
        <TableCustom
          data={rows}
          tableCell={tableCell}
          onConfirm={handleOpenConfirm}
          onUpdate={handleOpenUpdate}
        />
      </Loading>
      <ModalCreateUpdate
        open={openCreateUpdate}
        onClose={handleOpenCreate}
        data={selectedData}
      />
      <ModalConfirm
        open={openConfirm}
        onClose={handleCloseConfirm}
        data={selectedData}
      />
      <Page count={totalPages} onChange={handlePageChange} />
    </Box>
  );
}

export default Question;
