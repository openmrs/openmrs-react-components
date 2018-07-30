import { axiosInstance } from '../config';


const api = {

  fetchLoginLocations: () => {
    return axiosInstance.get(`location?tag=Login%20Location`)
      .then((response) => {
        if (response.status !== 200) {
          throw response;
        }
        else {
          return response.data;
        }
      });
  },

  setCurrentSessionLocation: (params) => {
    return axiosInstance.post(`appui/session`, params.location)
      .then((response) => {
        if (response.status !== 200) {
          throw response;
        }
        else {
          return response.data;
        }
      });
  }
};

export default api;
