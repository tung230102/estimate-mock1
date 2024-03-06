import axios from "./customize-axios";

export const apiGetUsers = async (access_token, page) => {
  try {
    const res = await axios.get(`/user?page=${page}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error("Users could not be loaded");
  }
};

export const apiGetUserProfile = async (access_token) => {
  try {
    const res = await axios.get("/user/my-profile", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

export const apiChangePassword = async (
  access_token,
  oldPassword,
  newPassword
) => {
  try {
    const res = await axios.patch(
      "/user/change-password",
      { oldPassword, newPassword },
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    return res;
  } catch (error) {
    throw new Error("Failed to change password");
  }
};

export const apiUploadAvatar = async (access_token, data) => {
  try {
    const res = await axios.post("/user/upload-avatar", data, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

export const apiCreateUser = async (access_token, data) => {
  try {
    const res = await axios.post(`/user`, data, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

export const apiUpdateUser = async (access_token, id, data) => {
  try {
    const res = await axios.patch(`/user/${id}`, data, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

export const apiDeleteUser = async (access_token, id) => {
  try {
    const res = await axios.delete(`/user/${id}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    return res;
  } catch (error) {
    throw new Error(error);
  }
};
