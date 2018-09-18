
const api = {

  createEncounter: (params) => {

    if (params.encounter.encounterType === 'invalid_encounter_type') {
      throw {
        name: 'Mock Exception',
        message: 'Unable to Submit'
      };
    }
    else {
      return;
    }
  },

  updateEncounter: (params) => {

    if (!params.encounter) {
      throw {
        name: 'Mock Exception',
        message: 'Unable to Submit'
      };
    }
    else {
      return;
    }
  }


};



export default api;
