
const api = {

  createEncounter: (encounter) => {

    if (encounter.encounterType === 'invalid_encounter_type') {
      throw {
        name: 'Mock Exception',
        message: 'Unable to Submit'
      };
    }
    else {
      return;
    }
  },

  updateEncounter: (encounter) => {

    if (!encounter) {
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
