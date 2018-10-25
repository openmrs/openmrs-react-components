import { axiosInstance } from '../config';

const api = {
  fetchActiveOrdersByPatient: patientUUID => axiosInstance.get(`order?totalCount=true&sort=desc&status=active&patient=${patientUUID}&v=full`)
    .then((response) => {
      if (response.status !== 200) {
        throw response;
      } else {
        return response.data;
      }
    }),
};

export default api;
