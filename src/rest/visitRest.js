import { axiosInstance } from '../config';


const api = {

  getActiveVisits: (params) => {
    return axiosInstance.get("visit?includeInactive=false" + ( params.representation ? "&v=" + params.representation : ''))
      .then((response) => {
        if (response.status !== 200) {
          throw response;
        }
        else {
          return response.data;
        }
      });
  },

  getPatientActiveVisit: (params) => {
    return axiosInstance.get("visit?includeInactive=false&patient=" + params.patientUuid
      + ( params.representation ? "&v=" + params.representation : ''))
      .then((response) => {
        if (response.status !== 200) {
          throw response;
        }
        else {
          return response.data;
        }
      });
  },

  createVisit: (params) => {
    return axiosInstance.post('visit', params.visit)
      .then((response) => {
        if (response.status !== 201) {
          throw response;
        }
      });
  },

  closeVisit: (params) => {
    return axiosInstance.post('visit/' + params.visit.uuid, { stopDatetime: params.visit.stopDatetime })
      .then((response) => {
        if (response.status !== 200) {
          throw response;
        }
      });
  }
};

export default api;
