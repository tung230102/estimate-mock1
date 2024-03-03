import axios from "./customize-axios";

export const apiGetUsers = async (access_token, page) => {
  try {
    const res = axios.get(`/user?page=${page}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return res;
  } catch (error) {
    console.error(error);
    throw new Error("Users could not be loaded");
  }
};

export const apiGetUserProfile = (access_token) => {
  try {
    return axios.get("/user/my-profile", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const apiChangePassword = (access_token, oldPassword, newPassword) => {
  try {
    return axios.patch(
      "/user/change-password",
      { oldPassword, newPassword },
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
  } catch (error) {
    console.error(error);
    throw new Error("Failed to change password");
  }
};

export const apiUploadAvatar = (access_token, data) => {
  try {
    return axios.post("/user/upload-avatar", data, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const apiCreateUser = (access_token, data) => {
  try {
    return axios.post(`/user`, data, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const apiUpdateUser = (access_token, id, data) => {
  try {
    return axios.patch(`/user/${id}`, data, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const apiDeleteUser = (access_token, id) => {
  try {
    return axios.delete(`/user/${id}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
