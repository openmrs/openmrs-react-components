
const util = {

  // a specific version of this also existing in formUtil, might be good to standardize
  flattenObs: (obs, excludeGroupingObs = false, acc = []) => {

    if (!obs) {
      return acc;
    }

    return obs.reduce((acc, obs) => {
      const { groupMembers, ...obsWithGroupMembersRemoved } = obs;
      return [...util.flattenObs(groupMembers, excludeGroupingObs, acc),
        ...(groupMembers && excludeGroupingObs ?  [] : [obsWithGroupMembersRemoved])];
    }, acc);

  }


}

export default util;
