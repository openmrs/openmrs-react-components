import { axiosInstance } from "../config";

const api = {

  login: (params) => {
    var authStr = "Basic " + btoa(params.username + ':' + params.password);
    return axiosInstance.get('session', { headers: { Authorization: authStr}})
      .then((response) => response.data);
  },

};

export default api;
