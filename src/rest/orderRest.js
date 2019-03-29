import { axiosInstance } from '../config';
import { DEFAULT_ORDER_REP } from "../domain/encounter/constants";

const api = {
  fetchAllOrdersByPatient: (patientUUID, orderType) => axiosInstance.get(`order?s=default&totalCount=true&sort=desc&patient=${patientUUID}&orderTypes=${orderType}&v=custom:${DEFAULT_ORDER_REP}`)
    .then((response) => {
      if (response.status !== 200) {
        throw response;
      } else {
        return response.data;
      }
    }),
};

export default api;
