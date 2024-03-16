import {
  adminServiceDelete,
  adminServiceGet,
  adminServicePatch,
  adminServicePost,
  adminServiceUpload,
} from "../services";

const getListUserSortFields =
  "id" | "email" | "name" | "created_at" | "updated_at";

const getUsersParams = {
  sortField: getListUserSortFields,
  role: "admin" | "user",
  keyWord: "",
  order: "ASC" | "DESC",
  page: 1,
  size: 10,
};

export const apiGetUsers = async (params = getUsersParams) => {
  const data = await adminServiceGet({
    target: "user",
    params,
  });

  return data?.data;
};

export const apiGetUserProfile = async () => {
  const data = await adminServiceGet({
    target: "user/my-profile",
  });

  return data?.data;
};

export const apiChangePassword = async (data) => {
  const res = await adminServicePatch({
    target: "user/change-password",
    data,
  });
  return res;
};

export const apiUploadAvatar = async (data) => {
  const res = await adminServiceUpload({
    target: "user/upload-avatar",
    data,
  });
  return res;
};

export const apiCreateUser = async (data) => {
  const res = await adminServicePost({
    target: "user",
    data,
  });
  return res;
};

export const apiUpdateUser = async (id, data) => {
  const res = await adminServicePatch({
    target: `user/${id}`,
    data,
  });
  return res;
};

export const apiDeleteUser = async (id) => {
  const res = await adminServiceDelete({
    target: `user/${id}`,
  });
  return res;
};
