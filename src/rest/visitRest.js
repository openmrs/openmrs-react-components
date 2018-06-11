import { axiosInstance } from '../config';


const api = {

  getActiveVisits: (params) => {
    return axiosInstance.get("visit?includeInactive=false" + ( params.representation ? "&v=" + params.representation : '') )
      .then((response) => response);
  },

};

export default api;
