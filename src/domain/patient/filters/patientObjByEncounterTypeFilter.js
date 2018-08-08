
// creates a filter that filters out all patient that have a encounter of the matching type within their active visit


const byEncounterTypeFilter = (encounterTypeUuid) => {

  return (patient) => {

    if (!encounterTypeUuid || !patient.visit || !patient.visit.encounters || patient.visit.encounters.size === 0) {
      return true;
    }
    else {
      return !(patient.visit.encounters.some(e => e.encounterType.uuid === encounterTypeUuid && !e.voided));
    }

  };

};


export default byEncounterTypeFilter;
