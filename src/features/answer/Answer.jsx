import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { useQuestion } from "../questions/useQuestion";
import ModalConfirm from "./ModalConfirm";
import ModalCreateAnswer from "./ModalCreateAnswer";
import TableCustom from "./TableCustom";

const tableCell = ["ID", "Content", "Correct", "Actions"];

function Answer() {
  const { isLoading, data, refetch } = useQuestion();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (!isLoading && data) {
      setRows(data.answers);
    }
  }, [isLoading, data]);

  // create
  const [openCreateUpdate, setOpenCreateUpdate] = useState(false);

  function handleOpenCreate() {
    setOpenCreateUpdate(true);
  }

  const handleClose = () => {
    setOpenCreateUpdate(false);
    setSelectedData([]);
    setOpenConfirm(false);
    refetch();
  };

  // update
  const [selectedData, setSelectedData] = useState([]);

  const handleOpenUpdate = (questionId) => {
    setOpenCreateUpdate(true);
    const selectedQuestion = data?.answers.find(
      (question) => question.id === questionId
    );
    setSelectedData(selectedQuestion);
  };

  // delete
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleOpenConfirm = (questionId) => {
    setOpenConfirm(true);
    const selectedQuestion = data?.answers?.find(
      (question) => question.id === questionId
    );
    setSelectedData(selectedQuestion);
  };

  return (
    <Box p={2}>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleOpenCreate}
      >
        Add new
      </Button>

      <Loading loading={isLoading}>
        <TableCustom
          data={rows}
          tableCell={tableCell}
          onConfirm={handleOpenConfirm}
          onUpdate={handleOpenUpdate}
        />
      </Loading>

      <ModalCreateAnswer
        open={openCreateUpdate}
        onClose={handleClose}
        data={data}
        selectedData={selectedData}
      />

      <ModalConfirm
        open={openConfirm}
        onClose={handleClose}
        data={selectedData}
      />
    </Box>
  );
}

export default Answer;
