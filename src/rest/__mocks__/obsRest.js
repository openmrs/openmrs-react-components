

const api = {

  deleteObs: (obs) => {
    if (!obs || !obs.uuid) {
      throw {
        name: 'Mock Exception',
        message: 'Unable to Submit'
      };
    }
    else {
      return;
    }
  },

};



export default api;
