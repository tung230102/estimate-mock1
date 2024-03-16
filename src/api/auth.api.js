import { adminServicePost } from "../services";

export const apiRegister = async (data) => {
  const res = await adminServicePost({
    target: "authentication/register",
    data,
  });
  return res;
};

export const apiLogin = async (data) => {
  const res = await adminServicePost({
    target: "authentication/login",
    data,
  });
  return res;
};

export const apiLogout = async (data) => {
  const res = await adminServicePost({
    target: "authentication/logout",
    data,
  });
  return res;
};

export const apiForgotPass = async (data) => {
  const res = await adminServicePost({
    target: "authentication/forgot-password",
    data,
  });
  return res;
};
