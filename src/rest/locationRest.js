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
  fetchLoginLocationLink: () => {
    return axiosInstance.get(`extension?extensionPoint=org.openmrs.module.appui.header.config&v=default`)
      .then((response) => {
        if (response.status !== 200) {
          throw response;
        }
        else {
          return response.data;
        }
      });
  },

};

export default api;
