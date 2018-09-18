
import { axiosInstance } from '../config';

const api = {

  createEncounter: (params) => {
    return axiosInstance.post('encounter', params.encounter)
      .then((response) => {
        if (response.status != 201) {
          throw response;
        }
      });
  },

  updateEncounter: (params) => {
    return axiosInstance.post('encounter/' + params.encounter.uuid, params.encounter)
      .then((response) => {
        if (response.status != 200) {
          throw response;
        }
      });
  }

};

export default api;
