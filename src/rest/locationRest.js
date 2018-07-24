import { axiosInstance } from '../config';


const api = {

  fetchLoginLocations: () => {
    return axiosInstance.get(`location?tag=Login Location`)
      .then((response) => {
        if (response.status !== 200) {
          throw response;
        }
        else {
          return response.data;
        }
      });
  },

  setCurrentLocation: (locationUuid) => {
    return axiosInstance.post(`appui/session`, { location: locationUuid })
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
