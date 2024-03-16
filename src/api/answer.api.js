import {
  adminServicePost,
  adminServicePatch,
  adminServiceDelete,
} from "../services";

export const apiCreateAnswer = async (data) => {
  const res = await adminServicePost({
    target: "answers",
    data,
  });
  return res;
};

export const apiUpdateAnswer = async (id, data) => {
  const res = await adminServicePatch({
    target: `answers/${id}`,
    data,
  });
  return res;
};

export const apiDeleteAnswer = async (id) => {
  const res = await adminServiceDelete({
    target: `answers/${id}`,
  });
  return res;
};
