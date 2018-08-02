import { axiosInstance } from '../config';


const api = {
  fetchHeaderLogoLinks: () => {
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
