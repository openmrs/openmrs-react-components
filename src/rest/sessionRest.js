import { axiosInstance } from '../config';


const api = {
  fetchCurrentSession: () => {
    return axiosInstance.get('session')
      .then((response) => response.data);
  },
  setCurrentSessionLocation: (params) => {
    return axiosInstance.post('session', {
      location: params.location
    })
      .then( (response) => {
        return response.data;
      }
      );

  }
};

export default api;
