import { axiosInstance } from '../config';

// TODO add error handling

const api = {
  fetchCurrentSession: () => {
    return axiosInstance.get(`appui/session`)
      .then((response) => response.data);
  }
};

export default api;
