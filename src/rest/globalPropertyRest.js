
import { axiosInstance } from '../config';

const api = {

  getGlobalProperty: (globalProperty) => {
    return axiosInstance.get(`systemsetting/${globalProperty}?v=custom:(property,value)`)
      .then((response) => {
        return response.data;
      });
  }

};

export default api;
