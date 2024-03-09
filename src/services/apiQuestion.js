import axios from "./customize-axios";

export const apiGetQuestions = async (
  access_token,
  page,
  size,
  order,
  keyWord,
  sortField
) => {
  try {
    let url = "/questions";

    const queryParams = [];
    if (page) queryParams.push(`page=${page}`);
    if (size) queryParams.push(`size=${size}`);
    if (order) queryParams.push(`order=${order}`);
    if (keyWord) queryParams.push(`keyWord=${keyWord}`);
    if (sortField) queryParams.push(`sortField=${sortField}`);

    if (queryParams.length > 0) {
      url += `?${queryParams.join("&")}`;
    }

    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error("Questions could not be loaded");
  }
};

export const apiGetQuestionById = async (access_token, id) => {
  try {
    const res = await axios.get(`/questions/${id}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const apiCreateQuestion = async (access_token, data) => {
  try {
    const res = await axios.post("/questions", data, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

export const apiUpdateQuestion = async (access_token, id, data) => {
  try {
    const res = await axios.patch(`/questions/${id}`, data, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

export const apiDeleteQuestion = async (access_token, id) => {
  try {
    const res = await axios.delete(`/questions/${id}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

export const apiUploadThumbnail = async (access_token, data) => {
  try {
    const res = await axios.post("/questions/upload-thumbnail", data, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

export const apiGetQuestionsPlay = async (access_token, total) => {
  try {
    const res = await axios.get(`/questions/play?total=${total}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const apiQuestionsSubmit = async (access_token, data) => {
  try {
    const res = await axios.post("/questions/submit", data, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return res;
  } catch (error) {
    throw new Error(error);
  }
};
