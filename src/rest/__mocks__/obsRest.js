const childObs = {
  uuid: "child-obs-uuid",
  voided: true,
  obsGroup: {
    uuid: "parent-obs-uuid",
    voided: false
  }
};

const parentObs = {
  uuid: "parent-obs-uuid",
  voided: false,
  groupMembers: null
};

const api = {

  deleteObs: (obs) => {
    if (!obs || !obs.uuid) {
      throw {
        name: 'Mock Exception',
        message: 'Unable to Delete'
      };
    }
    else if (obs.uuid === 'parent-obs-uuid') {
      parentObs.voided = true;
    } else {
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
    else if (uuid === 'child-obs-uuid') {
      return childObs;
    } else if(uuid === 'parent-obs-uuid') {
      return parentObs;
    }else {
      return;
    }
  },
};



export default api;
