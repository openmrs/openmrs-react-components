import { axiosInstance } from '../config';

const api = {
  getSystem: () => axiosInstance.get(`/systeminformation`)
    .then((response) => {
      if (response.status !== 200) {
        throw response;
      } else {
        return response.data;
      }
    }),
};

export default api;
