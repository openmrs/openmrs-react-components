
import { axiosInstance } from '../config';

const api = {

  deleteObs: (obs) => {
    return axiosInstance.delete('obs/' + obs.uuid)
      .then((response) => {
        if (response.status != 204) {
          throw response;
        }
      });
  },

};

export default api;
