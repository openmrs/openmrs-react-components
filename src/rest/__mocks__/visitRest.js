
const api = {

  getActiveVisits: (params) => {

    if (params.location ==='invalid') {
      throw {
        name: 'Mock Exception',
        message: 'Invalid'
      };
    }
    else {
      return (
        {
          "results": [
            {
              "uuid": "some_uuid"
            },
            {
              "uuid": "another_uuid"
            }
          ]
        }
      );
    }
  },

  createVisit: (params) => {
    // TODO stub this out later when we need to
  }
};

export default api;
