
import { axiosInstance } from '../config';
import {DEFAULT_ENCOUNTER_REP, DEFAULT_ENCOUNTER_POST_REP} from "../domain/encounter/constants";

const api = {

  createEncounter: (encounter, representation) => {
    return axiosInstance.post(`encounter/?v=custom:${representation || DEFAULT_ENCOUNTER_POST_REP}`, encounter)
      .then((response) => {
        if (response.status != 201) {
          throw response;
        } else {
          return response.data;
        }
      });
  },

  updateEncounter: (encounter, representation) => {
    return axiosInstance.post(`encounter/${encounter.uuid}?v=custom:${representation || DEFAULT_ENCOUNTER_POST_REP}`, encounter)
      .then((response) => {
        if (response.status != 200) {
          throw response;
        } else {
          return response.data;
        }
      });
  },

  getEncounter: (encounterUuid, representation) => axiosInstance.get(`encounter/${encounterUuid}?v=custom:${representation || DEFAULT_ENCOUNTER_REP}`)
    .then((response) => {
      if (response.status !== 200) {
        throw response;
      } else {
        return response.data;
      }
    }),

  fetchEncountersByPatient: (patient, encounterType, representation) => axiosInstance.get(`encounter/?patient=${patient}&encounterType=${encounterType}&v=custom:${representation || DEFAULT_ENCOUNTER_REP}`)
    .then((response) => {
      if (response.status !== 200) {
        throw response;
      } else {
        return response.data;
      }
    }),
    
  fetchEncountersByObs: (patient, concept, representation) => axiosInstance.get(`encounter?s=byObs&patient=${patient}&obsConcept=${concept}&v=custom:${representation || DEFAULT_ENCOUNTER_REP}`)
    .then((response) => {
      if (response.status !== 200) {
        throw response;
      } else {
        return response.data;
      }
    }),
};

export default api;
