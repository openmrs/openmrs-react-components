
const util = {

  // a specific version of this also existing in formUtil, might be good to standaard
  flattenObs: (obs, acc = []) => {

    if (!obs) {
      return acc;
    }

    return obs.reduce((acc, obs) => {
      const { groupMembers, ...obsWithoutGroupMembers } = obs;
      return [...util.flattenObs(groupMembers, acc), obsWithoutGroupMembers];
    }, acc);

  }


}

export default util;
