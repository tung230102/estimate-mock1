import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.response.use(
  function (response) {
    return response.data ? response.data : { statusCode: response.status };
  },
  function (error) {
    let res = {};
    if (error.response) {
      res.data = error.response.data;
      res.status = error.response.status;
      res.headers = error.response.headers;
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log(error.message);
    }
    return res;
  }
);

export default instance;
