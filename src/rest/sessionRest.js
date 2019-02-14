import { axiosInstance } from '../config';

// TODO this makes things depend on appui

const api = {
  fetchCurrentSession: () => {
    return axiosInstance.get('appui/session?v=ref')
      .then((response) => response.data);
  },
  setCurrentSessionLocation: (params) => {
    return axiosInstance.post('appui/session?v=ref', params.location)
      .then( (response) => {
        return response.data;
      }
      );

  }
};

export default api;
