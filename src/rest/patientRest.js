import { axiosInstance } from '../config';


const api = {

  findPatient: (params) => {
    return axiosInstance.get('patient?q=' + params.query + "&v=" + params.representation)
      .then((response) => {
        if (response.status !== 200) {
          throw response;
        }
        else {
          return response.data;
        }
      });
  },

  // TODO fix to just take in a uuid?
  getPatient: params => axiosInstance.get(`patient/${params.patientUuid}?v=custom:(patientId,uuid,patientIdentifier:(uuid,identifier),person:(gender,age,birthdate,birthdateEstimated,personName,preferredAddress),attributes:(value,attributeType:(name)))`)
    .then((response) => {
      if (response.status !== 200) {
        throw response;
      } else {
        return response.data;
      }
    }),

  getPatientLabOrders: patientUUID => axiosInstance.get(`order?totalCount=true&sort=desc&status=active&patient=${patientUUID}&v=full`)
    .then((response) => {
      if (response.status !== 200) {
        throw response;
      } else {
        return response.data;
      }
    }),
  
  getPatientEncounters: ({ patientUUID, encounterUUID }) => axiosInstance.get(`encounter?s=default&patient=${patientUUID}&encounterType=${encounterUUID}&v=full`)
    .then((response) => {
      if (response.status !== 200) {
        throw response;
      } else {
        return response.data;
      }
    })

};

export default api;
