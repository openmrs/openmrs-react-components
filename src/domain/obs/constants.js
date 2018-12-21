// The default REST representation to use when fetching an obs

// TODO is there a better way to handle rep of nested group members?
// TODO extract concept out into concept store so that we only have to fetch concept uuid
export const DEFAULT_OBS_REP = '(id,uuid,display,obsDatetime,value:(id,uuid,display,name:(uuid,name)),' +
  'concept:(uuid,display,name,datatype,units,hiNormal,hiAbsolute,hiCritical,lowNormal,lowAbsolute,lowCritical),' +
  'encounter:(id,uuid,encounterDatetime),groupMembers(uuid),obsGroup)';

