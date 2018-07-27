
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
        return applyFilters(applyConverters(action[actionProperty], converters), filters)

      default:
        return state;
    }
  };
};

export default createListReducer;
