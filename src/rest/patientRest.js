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

  getPatientIdentifierTypes: () => axiosInstance.get(`patientidentifiertype`)
    .then((response) => {
      if (response.status !== 200) {
        throw response;
      } else {
        return response.data;
      }
    }),
};

export default api;
