
import { axiosInstance } from '../config';
import { DEFAULT_OBS_REP } from "../domain/obs/constants";


const api = {

  deleteObs: (obs) => {
    return axiosInstance.delete('obs/' + obs.uuid)
      .then((response) => {
        if (response.status != 204) {
          throw response;
        } else {
          return response.data;
        }
      });
  },

  getObs: (uuid, representation) => {
    let getRequest = `obs/${uuid}?v=custom:${representation || DEFAULT_OBS_REP}`;

    return axiosInstance.get(getRequest)
      .then((response) => {
        if (response.status != 200) {
          throw response;
        } else {
          return response.data;
        }
      });
  },

  fetchObsByPatient: (patient, concepts, answers, groupingConcepts, limit) => {

    let getRequest = `obs/?patient=${patient}`;

    if (concepts) {
      getRequest += `&concepts=${concepts.constructor === String ? concepts : concepts.join(",")}`;
    }

    // TODO this clause needs to be tested
    if (answers) {
      getRequest +=`&answers=${answers.constructor === String ? answers : (answers.length > 0 ? answers.join(",") : '')}`;
    }

    if (groupingConcepts) {
      getRequest += `&groupingConcepts=${groupingConcepts.constructor === String ? groupingConcepts : (groupingConcepts.length > 0 ? groupingConcepts.join(",") : '')}`;
    }

    // TODO clause this needs to be tested
    if (limit) {
      getRequest += `&limit=${limit}`;
    }

    getRequest += `&v=custom:${DEFAULT_OBS_REP}`;

    return axiosInstance.get(getRequest)
      .then((response) => {
        if (response.status !== 200) {
          throw response;
        } else {
          return response.data;
        }
      });
  }
};

export default api;
