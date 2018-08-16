import { axiosInstance } from "../config";

const api = {

  login: (params) => {

    axiosInstance.defaults.headers.common['Authorization'] = params.authorization;
    return axiosInstance.get('session')
      .then((response) => response.data);
  },

  logout: () => {

    delete axiosInstance.defaults.headers.common['Authorization'];
    return axiosInstance.delete('session')
      .then((response) => response.data);
  }

};

export default api;
