import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import ButtonLoadingSubmit from "../../components/ButtonLoadingSubmit";
import Heading from "../../components/Heading";
import TextFieldCustom from "../../components/TextFieldCustom";
import UploadFile from "../../components/UploadFile";
import { styleBoxSubmit } from "../../ui/BoxSubmit";
import { StyledModal } from "../../ui/StyledModal";
import { useCreateQuestion } from "./useCreateQuestion";
import { useUpdateQuestion } from "./useUpdateQuestion";
import { useUploadThumbnail } from "./useUploadThumbnail";

function ModalCreateUpdate({ open, onClose, data }) {
  const [title, setTitle] = useState("");
  const [thumbnail_link, setThumbnail_link] = useState("");

  const { isLoading, createQuestion } = useCreateQuestion();
  const { isLoading: isLoadingUpdate, updateQuestion } = useUpdateQuestion();

  // thumbnail
  const { isLoading: isLoadingUpload, changeThumbnail } = useUploadThumbnail();

  const [file, setFile] = useState(null);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("thumbnail", file);
    changeThumbnail(formData, {
      onSuccess: (res) => {
        setThumbnail_link(res.data);
      },
    });
    setFile(null);
  };

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setThumbnail_link(data.thumbnail_link);
    }
  }, [data]);

  function handleSubmit(e) {
    e.preventDefault();
    if (data && data.id) {
      updateQuestion(
        {
          id: data.id,
          data: { title, thumbnail_link },
        },
        {
          onSuccess: (data) => {
            if (data?.statusCode === 200) {
              setTitle("");
              setThumbnail_link("");
              onClose();
            }
          },
        }
      );
    } else {
      createQuestion(
        { title, thumbnail_link },
        {
          onSuccess: (data) => {
            if (data?.statusCode === 201) {
              setTitle("");
              setThumbnail_link("");
              onClose();
            }
          },
        }
      );
    }
  }

  const loading = isLoading || isLoadingUpdate;

  return (
    <StyledModal open={open} onClose={onClose}>
      <Box component="form" sx={styleBoxSubmit} onSubmit={handleSubmit}>
        <Heading>
          {data?.id ? "Update question" : "Create new question"}
        </Heading>

        <TextFieldCustom label="Title" value={title} onChange={setTitle} />

        <TextFieldCustom
          label="Thumbnail Link"
          value={thumbnail_link}
          disabled={true}
        />

        <UploadFile
          onChange={handleFileChange}
          file={file}
          onUpload={handleUpload}
          disabled={!file || loading || isLoadingUpload}
          progress={isLoadingUpload}
        />

        <ButtonLoadingSubmit disabled={loading} loading={loading}>
          Submit
        </ButtonLoadingSubmit>
      </Box>
    </StyledModal>
  );
}

export default ModalCreateUpdate;
