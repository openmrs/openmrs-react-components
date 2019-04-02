import { axiosInstance } from '../config';

const api = {
  getEncounterType: value => axiosInstance.get(`/encountertype/?q=${value}`)
    .then((response) => {
      if (response.status !== 200) {
        throw response;
      } else {
        return response.data;
      }
    }),
};

export default api;