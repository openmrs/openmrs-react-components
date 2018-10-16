
import { axiosInstance } from '../config';
import {DEFAULT_ENCOUNTER_REP} from "../domain/encounter/constants";

const api = {

  createEncounter: (encounter) => {
    return axiosInstance.post(`encounter/?v=custom:${DEFAULT_ENCOUNTER_REP}`, encounter)
      .then((response) => {
        if (response.status != 201) {
          throw response;
        } else {
          return response.data;
        }
      });
  },

  updateEncounter: (encounter) => {
    return axiosInstance.post(`encounter/${encounter.uuid}?v=custom:${DEFAULT_ENCOUNTER_REP}`, encounter)
      .then((response) => {
        if (response.status != 200) {
          throw response;
        } else {
          return response.data;
        }
      });
  },

  getEncounter: (encounterUuid) => axiosInstance.get(`encounter/${encounterUuid}?v=custom:${DEFAULT_ENCOUNTER_REP}`)
    .then((response) => {
      if (response.status !== 200) {
        throw response;
      } else {
        return response.data;
      }
    }),

  fetchEncountersByPatient: (patient, encounterType) => axiosInstance.get(`encounter/?patient=${patient}&encounterType=${encounterType}&v=custom:${DEFAULT_ENCOUNTER_REP}`)
    .then((response) => {
      if (response.status !== 200) {
        throw response;
      } else {
        return response.data;
      }
    }),

};

export default api;
