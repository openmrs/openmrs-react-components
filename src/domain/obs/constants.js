// The default REST representation to use when fetching an obs

// TODO how do we handle fetching nested obs?
// TODO now that we've extracted concept out into store, do we really need to fetch display?
// TODO do we really need the ids here?
export const DEFAULT_OBS_REP = '(id,uuid,display,obsDatetime,comment,value:(id,uuid,display,name:(uuid,name)),' +
  'concept:(uuid),encounter:(id,uuid,encounterDatetime,encounterType:(uuid)),groupMembers:(uuid),obsGroup:(uuid))';

