import { axiosInstance } from '../config';
import { DEFAULT_ORDER_REP} from "../domain/encounter/constants";

const api = {
  fetchAllOrdersByPatient: (patientUUID, orderType) => axiosInstance.get(`order?s=default&totalCount=true&sort=desc&patient=${patientUUID}&orderTypes=${orderType}&v=custom:${DEFAULT_ORDER_REP}`)
    .then((response) => {
      if (response.status !== 200) {
        throw response;
      } else {
        return response.data;
      }
    }),

  createOrder: (order, representation) => {
    return axiosInstance.post(`order/?v=custom:${representation || DEFAULT_ORDER_REP}`, order)
      .then((response) => {
        if (response.status != 201) {
          throw response;
        } else {
          return response.data;
        }
      });
  },

  // note that this endpoint is only availabe in Core 2.2 and above
  updateFulfillerDetails: (order, details) => {
    return axiosInstance.post(`order/${order.uuid}/fulfillerdetails`, details)
      .then((response) => {
        if (response.status != 201) {
          throw response;
        } else {
          return response.data;
        }
      });
  },

};

export default api;
