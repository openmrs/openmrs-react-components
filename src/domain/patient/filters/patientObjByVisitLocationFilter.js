
// creates a filter that filters out all patients that have visits at a given location


const byVisitLocationFilter = (locationUuid) => {

  return (patient) => {

    if (!locationUuid || !patient.activeVisit || !patient.activeVisit.location ) {
      return true;
    }
    else {
      return (patient.activeVisit.location.uuid === locationUuid );
    }

  };

};


export default byVisitLocationFilter;
