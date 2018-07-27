import Patient from "../Patient";

const visitRestRepToPatientObjConverter = () => {

  return (visit) => {
    return Patient.createFromRestRep(visit.patient, visit);
  };

};

export default visitRestRepToPatientObjConverter;
