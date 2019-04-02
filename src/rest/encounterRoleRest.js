import { axiosInstance } from '../config';

const api = {
  getEncounterRole: value => axiosInstance.get(`/encounterrole/?q=${value}`)
    .then((response) => {
      if (response.status !== 200) {
        throw response;
      } else {
        return response.data;
      }
    }),
};

export default api;