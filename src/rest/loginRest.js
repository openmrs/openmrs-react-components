import { axiosInstance } from "../config";

const api = {

  login: (params) => {
    // Authentication via cookie and not by setting default headers attempt
    // var authStr = "Basic " + btoa(params.username + ':' + params.password);
    // return axiosInstance.get('session', { headers: { Authorization: authStr } }).then(function (response) {
    //   return response.data;
    // });

    axiosInstance.defaults.headers.common['Authorization'] = "Basic " + btoa(params.username + ':' + params.password);
    return axiosInstance.get('session')
      .then((response) => response.data);
  },

};

export default api;
