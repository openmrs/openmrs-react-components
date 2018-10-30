
export const applyFilters =  (list, filters) => {
  if (filters.length === 0) {
    return list;
  } else {
    return applyFilters(list.filter(filters[filters.length - 1]), filters.slice(0, -1));
  }
};


