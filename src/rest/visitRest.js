import { axiosInstance } from '../config';
import { DEFAULT_VISIT_REP } from "../domain/visit/constants";


const api = {

  getActiveVisits: (params) => {
    return axiosInstance.get("visit?includeInactive=false"
      + ( params.location ? "&location=" + params.location : '')
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

  getVisitsStartedBeforeDate: (params) => {
    return axiosInstance.get("visit?includeInactive=true" +
      ( params.representation ? "&v=" + params.representation : '') +
      ( params.fromStartDate ? "&fromStartDate=" + params.fromStartDate : ''))
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
      + ( params.location ? "&location=" + params.location : '')
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
    return axiosInstance.post(`visit?v=custom:${DEFAULT_VISIT_REP}`, params.visit)
      .then((response) => {
        if (response.status !== 201) {
          throw response;
        } else {
          return response.data;
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
