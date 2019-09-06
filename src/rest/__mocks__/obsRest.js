

const api = {

  deleteObs: (obs) => {
    if (!obs || !obs.uuid) {
      throw {
        name: 'Mock Exception',
        message: 'Unable to Delete'
      };
    }
    else {
      return;
    }
  },

  getObs: (uuid, representation) => {
    if (!uuid) {
      throw {
        name: 'Mock Exception',
        message: 'Unable to Retrieve Obs'
      };
    }
    else {
      return;
    }
  },
};



export default api;
