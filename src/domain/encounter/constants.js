
// The default REST representation to use when fetching an encounter
// TODO this will have to be to modified based on GP when to use form field vs comment
// TODO is there a better way to handle rep of nested group members?

export const DEFAULT_ENCOUNTER_REP = '(id,uuid,encounterDatetime,location:(id,uuid,name),encounterType:(id,uuid,name),' +
  'obs:(id,uuid,value:(id,uuid,display,name:(uuid,name)),concept:(uuid,display,name,datatype,units),comment,display,' +
  'groupMembers:(id,uuid,value:(id,uuid,display,name:(uuid,name)),concept:(uuid,display,name,datatype,units),comment,display,' +
  'groupMembers:(id,uuid,value:(id,uuid,display,name:(uuid,name)),concept:(uuid,display,name,datatype,units),comment,display,groupMembers)))';
export const DEFAULT_ORDER_REP = '(id,uuid,concept,orderNumber,dateActivated,urgency,display,patient,orderType,action)';
