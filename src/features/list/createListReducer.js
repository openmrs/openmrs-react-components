
/*
  Factory function that can be used to build a reducer that listens for a specific action and applies
  a set of converters and filters a list attached to the action. Intended to be used with the List component
  (https://github.com/openmrs/openmrs-react-components/blob/master/src/components/list/List.jsx),
  but does not require it.

  Inputs:
    * actionType: the actionType that this reducer should handle
    * actionProperty: the property of the action that this reducer should operate on
    * converters: one or more converters that can transform elements in the list
    * filters: one or more filters that can be used to filter the list

  Example converter that, given a OpenMRS Visit represention, creates a Patient domain object (see Patient.js):
    * https://github.com/openmrs/openmrs-react-components/blob/master/src/domain/patient/converters/visitRestRepToPatientObjConverter.js

  Example filter that, given a list of Patients, filters out those that have an encounter of a certain type within their active visit:
    * https://github.com/openmrs/openmrs-react-components/blob/master/src/domain/patient/filters/patientObjByEncounterTypeFilter.js

 */

const createListReducer = (actionType = '', actionProperty = 'patients', converters = [], filters = []) =>  {

  // TODO add test cases for new test mappings

  const applyFilters = (list, filters) => {
    if (filters.length === 0) {
      return list;
    }
    else {
      return applyFilters(list.filter(filters[filters.length-1]), filters.slice(0,-1));
    }
  };

  const applyConverters = (list, converters) => {
    if (converters.length === 0) {
      return list;
    }
    else {
      return applyConverters(list.map(converters[converters.length-1]), converters.slice(0,-1));
    }
  };

  return (state = [], action) => {
    switch (action.type) {
      case actionType:
        return applyFilters(applyConverters(action[actionProperty], converters), filters);

      default:
        return state;
    }
  };
};

export default createListReducer;
