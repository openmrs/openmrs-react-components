
import { axiosInstance } from '../config';
import {DEFAULT_OBS_REP} from "../domain/obs/constants";

const api = {

  deleteObs: (obs) => {
    return axiosInstance.delete('obs/' + obs.uuid)
      .then((response) => {
        if (response.status != 204) {
          throw response;
        }
      });
  },

  fetchObsByPatient: (patient, concepts, answers, groupingConcepts, limit) => {
    return axiosInstance.get(`obs/?patient=${patient}&concepts=${concepts.constructor === String ? concepts : concepts.join(",")}
      ${answers !== null ? (answers.constructor === String ? `&answers=${answers}` : (answers.length > 0 ? `&answers=${answers.join(",")}` : '')) : ''}
      ${groupingConcepts !==  null ? (groupingConcepts.constructor === String ? `&groupingConcepts=${groupingConcepts}` : (groupingConcepts.length > 0 ? `&groupingConcepts=${groupingConcepts.join(",")}` : '')) : ''}
      &v=custom:${DEFAULT_OBS_REP}`+ (limit ? "&limit=" + limit : ''))
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
