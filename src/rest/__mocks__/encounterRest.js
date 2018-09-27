
const api = {

  createEncounter: (encounter) => {

    if (encounter.encounterType === 'invalid_encounter_type') {
      throw {
        name: 'Mock Exception',
        message: 'Unable to Submit'
      };
    }
    else {
      return {
        uuid: "created-encounter"
      };
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
      return {
        uuid: "updated-encounter"
      };
    }
  },

  getEncounter: (encounterUuid) => {
    return {
      uuid: "fetched-encounter"
    };
  }

};



export default api;
