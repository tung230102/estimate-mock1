import axios from "./customize-axios";

export const apiRegister = async (email, name, password) => {
  try {
    const res = await axios.post("/authentication/register", {
      email,
      name,
      password,
    });
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

export const apiLogin = async (email, password) => {
  try {
    const res = await axios.post("/authentication/login", { email, password });
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

export const apiLogout = async (refresh_token) => {
  try {
    const res = await axios.post("/authentication/logout", { refresh_token });
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

export const apiRefreshToken = async (refresh_token) => {
  try {
    const res = await axios.post("/authentication/refresh-token", {
      refresh_token,
    });
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

export const apiForgotPass = async (email) => {
  try {
    const res = await axios.post("/authentication/forgot-password", { email });
    return res;
  } catch (error) {
    throw new Error(error);
  }
};
