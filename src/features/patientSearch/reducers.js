import PATIENT_SEARCH_TYPES from "./types";

const initialState = {};

function parseResults(results){
  let patients = [];
  for (const item of results) {
    let patient = {
      uuid: item.uuid,
      id: item.id,
      firstName: item.person.names[0].givenName,
      lastName: item.person.names[0].familyName,
      gender: item.person.gender,
      age: item.person.age,
      identifier: item.identifiers[0].identifier,
      checkedInTime: null,
      birthdate: item.person.birthdate
    };
    patients.push(patient);
  }
  return patients;
}

export default (state = initialState, action) => {
  switch (action.type) {
    case PATIENT_SEARCH_TYPES.SUCCEEDED:
      return Object.assign({}, state, {
        results: parseResults(action.results)
      });

    case PATIENT_SEARCH_TYPES.FAILED:
      return {
        error: {
          message: "Unable to find patients"
        }
      };

    default: return state;
  }
};
