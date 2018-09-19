
import { axiosInstance } from '../config';

const api = {

  createEncounter: (encounter) => {
    return axiosInstance.post('encounter', encounter)
      .then((response) => {
        if (response.status != 201) {
          throw response;
        }
      });
  },

  updateEncounter: (encounter) => {
    return axiosInstance.post('encounter/' + encounter.uuid, encounter)
      .then((response) => {
        if (response.status != 200) {
          throw response;
        }
      });
  }

};

export default api;
