import { axiosInstance } from '../config';

// TODO this makes things depend on appui

const api = {
  fetchCurrentSession: () => {
    return axiosInstance.get(`appui/session`)
      .then((response) => response.data);
  },
  setCurrentSessionLocation: (sessionLocation) => {
    return axiosInstance.post('appui/session', { location: sessionLocation })
      .then( (response) => {
        return response.data;
      }
      );

  }
};

export default api;
