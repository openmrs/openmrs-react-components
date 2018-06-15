import { axiosInstance } from '../config';


const api = {

  getActiveVisits: (params) => {
    return axiosInstance.get("visit?includeInactive=false" + ( params.representation ? "&v=" + params.representation : ''))
      .then((response) => response);
  },

  createVisit: (params) => {
    return axiosInstance.post('visit', params.visit)
      .then((response) => {
        if (response.status !== '201') {
          throw response;
        }
      });
  }
};

export default api;
