// The default REST representation to use when fetching an obs

// TODO is there a better way to handle rep of nested group members?
// TODO now that we've extracted concept out into store, do we really need to fetch display?
// TODO do we really need the ids here?
export const DEFAULT_OBS_REP = '(id,uuid,display,obsDatetime,value:(id,uuid,display,name:(uuid,name)),' +
  'concept:(uuid),encounter:(id,uuid,encounterDatetime),groupMembers:(uuid),obsGroup:(uuid))';

