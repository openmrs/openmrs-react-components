
const api = {

  findPatient: (params) => {

    if (params.representation ==='invalid') {
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

};

export default api;
