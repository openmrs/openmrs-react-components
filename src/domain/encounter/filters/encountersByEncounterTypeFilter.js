
// creates a filter that a list of encounter based on matching encounter type

const encounterByEncounterTypeFilter = (encounterTypeUuid) => {
  return encounters => encounters.filter(e => e.encounterType.uuid === encounterTypeUuid);
};


export default encounterByEncounterTypeFilter;
