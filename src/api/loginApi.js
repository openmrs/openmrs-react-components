
import { axiosConfig } from "../config"
import { axiosInstance } from "../config"

const api = {

  login: (params) => {

    // TODO data validation
    let base64 = btoa(params.username + ':' + params.password);
    axiosConfig.headers['Authorization'] = 'Basic ' + base64;

    return axiosInstance.get('session', axiosConfig)
      .then((response) => response.data);
  }

};

export default api;
