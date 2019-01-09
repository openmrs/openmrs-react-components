import { axiosInstance } from '../config';
import {DEFAULT_LOCATIONS_REP} from '../features/location/constants'

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
  fetchAllLocations: (representation) => {
    return axiosInstance.get(`location?v=custom:${representation || DEFAULT_LOCATIONS_REP}`)
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
