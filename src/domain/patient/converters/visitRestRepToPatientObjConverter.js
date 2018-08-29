import patientUtil from "../patientUtil";

const visitRestRepToPatientObjConverter = () => {

  return (visit) => {
    return patientUtil.createFromRestRep(visit.patient, visit);
  };

};

export default visitRestRepToPatientObjConverter;
