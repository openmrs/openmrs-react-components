
// creates a filter that filters patients based on whether encounter of the matching type within their active visit has the type of Obs passed in
// filterType = 'include': include if the visit has an encounter of that type and an obs.groupMembers with one of the concept id passed in
// filterType = 'exclude': exclude if the visit has an encounter of that type


const byEncounterTypeAndObsFilter = (encounterTypeUuid, concepts, filterType = 'include') => {

  return (patient) => {
    if (!patient) {
      return false;
    }
    else if (!encounterTypeUuid || !patient.visit || !patient.visit.encounters || patient.visit.encounters.size === 0) {
      return filterType.toLowerCase() === 'include' ? false : true;
    }
    else {
      let obsFound = false;
      let enc = patient.visit.encounters.find(encounter => encounter.encounterType.uuid === encounterTypeUuid);
      if (enc !== undefined) {
        if (enc.obs) {
          for (let observation of enc.obs) {
            // first check if top level obs.concept.uuid matches the concept UUIDs passed in
            obsFound = concepts.some(concept => concept === observation.concept.uuid);
            if (obsFound) {
              break;
            }
            if(observation.groupMembers) {
              for (let groupMember of observation.groupMembers){
                // look for Concept UUIDs with the obs.groupMembers
                obsFound = concepts.some(concept => concept == groupMember.concept.uuid);
                if (obsFound) {
                  break;
                }
              }
            }
          }
        }
      }

      return filterType.toLowerCase() === 'include' ? obsFound : !obsFound;
    }

  };

};


export default byEncounterTypeAndObsFilter;
