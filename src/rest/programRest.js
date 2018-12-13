import { axiosInstance } from '../config';
import { DEFAULT_PROGRAM_ENROLLMENT_REP } from '../domain/program/constants'; 


const api = {
  getProgramEnrollmentByPatient: (patient, representation) => axiosInstance.get(`programenrollment/?patient=${patient}&v=custom:${representation || DEFAULT_PROGRAM_ENROLLMENT_REP}`)
    .then((response) => {
      if (response.status !== 200) {
        throw response;
      } else {
        return response.data;
      }
    }),
};

export default api;
