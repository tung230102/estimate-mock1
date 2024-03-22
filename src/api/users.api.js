import {
  adminServiceDelete,
  adminServiceGet,
  adminServicePatch,
  adminServicePost,
  adminServiceUpload,
} from "../services";

export const getListUsers = async (params) => {
  const data = await adminServiceGet({
    target: "user",
    params,
  });

  return data?.data;
};

export const changePassword = async (data) => {
  const res = await adminServicePatch({
    target: "user/change-password",
    data,
  });
  return res;
};

export const uploadAvatar = async (data) => {
  const res = await adminServiceUpload({
    target: "user/upload-avatar",
    data,
  });
  return res;
};

export const createUser = async (data) => {
  const res = await adminServicePost({
    target: "user",
    data,
  });
  return res;
};

export const updateUser = async (id, data) => {
  const res = await adminServicePatch({
    target: `user/${id}`,
    data,
  });
  return res;
};

export const removeUser = async (id) => {
  const res = await adminServiceDelete({
    target: `user/${id}`,
  });
  return res;
};
