
import { axiosInstance } from '../config';

const api = {

  createProvider: (provider) => {
    return axiosInstance.post('provider', provider)
      .then((response) => {
        if (response.status != 201) {
          throw response;
        } else {
          return response.data;
        }
      });
  },


};

export default api;
