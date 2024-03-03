import axios from "./customize-axios";

export const apiRegister = (email, name, password) => {
  try {
    const res = axios.post("/authentication/register", {
      email,
      name,
      password,
    });
    return res;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const apiLogin = (email, password) => {
  try {
    return axios.post("/authentication/login", { email, password });
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const apiLogout = (refresh_token) => {
  try {
    return axios.post("/authentication/logout", { refresh_token });
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const apiRefreshToken = (refresh_token) => {
  try {
    return axios.post("/authentication/refresh-token", { refresh_token });
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const apiForgotPass = (email) => {
  try {
    return axios.post("/authentication/forgot-password", { email });
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
