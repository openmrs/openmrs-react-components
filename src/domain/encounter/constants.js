
// The default REST representation to use when fetching an encounter
// TODO this will have to be to modified based on GP when to use form field vs comment
export const DEFAULT_ENCOUNTER_REP = '(id,uuid,encounterDatetime,location:(id,uuid,name),encounterType:(id,uuid,name),obs:(id,uuid,value,concept,comment,display))';
