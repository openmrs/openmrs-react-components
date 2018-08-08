
// creates a filter that filters out all patients that have visits at a given location


const byVisitLocationFilter = (locationUuid) => {

  return (patient) => {

    if (!locationUuid || !patient.visit || !patient.visit.location ) {
      return true;
    }
    else {
      return (patient.visit.location.uuid === locationUuid );
    }

  };

};


export default byVisitLocationFilter;
