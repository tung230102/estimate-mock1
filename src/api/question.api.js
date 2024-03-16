import {
  adminServiceGet,
  adminServicePost,
  adminServicePatch,
  adminServiceDelete,
  adminServiceUpload,
} from "../services";

const getListQuestionSortFields = "id" | "title" | "createdAt" | "updatedAt";

const getQuestionParams = {
  sortField: getListQuestionSortFields,
  keyWord: "",
  order: "ASC" | "DESC",
  size: 10,
  page: 1,
};

export const apiGetQuestions = async (params = getQuestionParams) => {
  const data = await adminServiceGet({
    target: "questions",
    params,
  });
  return data?.data;
};

export const apiGetQuestionById = async (id) => {
  const data = await adminServiceGet({
    target: `questions/${id}`,
  });
  return data?.data;
};

export const apiCreateQuestion = async (data) => {
  const res = await adminServicePost({
    target: "questions",
    data,
  });
  return res;
};

export const apiUpdateQuestion = async (id, data) => {
  const res = await adminServicePatch({
    target: `questions/${id}`,
    data,
  });
  return res;
};

export const apiDeleteQuestion = async (id) => {
  const res = await adminServiceDelete({
    target: `questions/${id}`,
  });
  return res;
};

export const apiUploadThumbnail = async (data) => {
  const res = await adminServiceUpload({
    target: "questions/upload-thumbnail",
    data,
  });
  return res;
};

export const apiGetQuestionsPlay = async (total) => {
  const data = await adminServiceGet({
    target: `questions/play?total=${total}`,
  });
  return data?.data;
};

export const apiQuestionsSubmit = async (data) => {
  const res = await adminServicePost({
    target: "questions/submit",
    data,
  });
  return res;
};
