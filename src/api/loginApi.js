
import { axiosInstance } from "../config"

const api = {

  login: (params) => {
    axiosInstance.defaults.headers.common['Authorization'] = "Basic " + btoa(params.username + ':' + params.password);
    return axiosInstance.get('session')
      .then((response) => response.data);
  },

};

export default api;
