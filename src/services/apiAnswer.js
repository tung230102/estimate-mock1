import axios from "./customize-axios";

export const apiCreateAnswer = async (access_token, data) => {
  try {
    const res = await axios.post("/answers", data, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

export const apiDeleteAnswer = async (access_token, id) => {
  try {
    const res = await axios.delete(`/answers/${id}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

export const apiUpdateAnswer = async (access_token, id, data) => {
  try {
    const res = await axios.patch(`/answers/${id}`, data, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    return res;
  } catch (error) {
    throw new Error(error);
  }
};
