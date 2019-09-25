import { axiosInstance } from '../config';

const api = {
  getConcept: (conceptUUID, representation) => {
    return axiosInstance.get(`/concept/${conceptUUID}?v=${representation || "full"}`)
      .then((response) => {
        if (response.status !== 200) {
          throw response;
        } else {
          return response.data;
        }
      })
  },
};

export default api;
