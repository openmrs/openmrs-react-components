
// The default REST representation to use when fetching a patient
export const DEFAULT_PATIENT_REP = '(uuid,id,display,identifiers:(uuid,identifier,identifierType:(uuid),preferred),person:(uuid,display,gender,age,birthdate,birthdateEstimated,dead,deathDate,causeOfDeath,names,preferredName,addresses,attributes))';

export const ATTRIBUTE_TYPES = {
  'telephoneNumber': {
    uuid: '14d4f066-15f5-102d-96e4-000c29c2a5d7'
  }
};
