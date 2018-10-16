

const util = {

  // TODO this could be used in more than forms, potentially moved somewhere else?
  flattenObs: (obs, acc = [], path = []) => {

    if (!obs) {
      return acc;
    }

    return obs.reduce((acc, obs) => {
      const { groupMembers, ...obsWithoutGroupMembers } = obs;
      obsWithoutGroupMembers.conceptPath = [...path, obs.concept.uuid].join('^');
      return [...util.flattenObs(groupMembers, acc, [...path, obs.concept.uuid]), obsWithoutGroupMembers];
    }, acc);

  }

};

export default util;
