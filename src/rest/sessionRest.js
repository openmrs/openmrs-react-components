import { axiosInstance } from '../config';

// TODO this makes things depend on appui

const api = {
  fetchCurrentSession: () => {
    return axiosInstance.get('appui/session')
      .then((response) => response.data);
  },
  setCurrentSessionLocation: (params) => {
    return axiosInstance.post('appui/session', {
      location: params.location
    })
      .then( (response) => {
        return response.data;
      }
      );

  }
};

export default api;
