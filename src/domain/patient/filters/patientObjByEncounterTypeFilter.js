
// creates a filter that filters patients based on whether encounter of the matching type within their active visit
// filterType = 'include': include if the visit has an encounter of that type
// filterType = 'exclude': exclude if the visit has an encounter of that type


const byEncounterTypeFilter = (encounterTypeUuid, filterType = 'include') => {

  return (patient) => {
    if (!patient) {
      return false;
    }
    else if (!encounterTypeUuid || !patient.visit || !patient.visit.encounters || patient.visit.encounters.size === 0) {
      return filterType.toLowerCase() === 'include' ? false : true;
    }
    else {
      return filterType.toLowerCase() === 'include' ?
        patient.visit.encounters.some(e => e.encounterType.uuid === encounterTypeUuid && !e.voided) :
        !patient.visit.encounters.some(e => e.encounterType.uuid === encounterTypeUuid && !e.voided);
    }

  };

};


export default byEncounterTypeFilter;
