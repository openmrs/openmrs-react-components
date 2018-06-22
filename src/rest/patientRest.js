import { axiosInstance } from '../config';


const api = {

  findPatient: (params) => {
    return axiosInstance.get('patient?q=' + params.query + "&v=" + params.representation)
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
