
export const applyFilters =  (list, filters, predicate) => {
  if (filters.length === 0) {
    return list;
  } else {
    if (predicate === 'and') {
      return applyFilters(list.filter(filters[filters.length - 1]), filters.slice(0, -1), predicate);
    }
    
    if (predicate === 'or') {
      return filters.reduce((l, f) => {
        const filteredItems = list.filter(f);
        const allFilteredItems = l.concat(filteredItems);
        return allFilteredItems;
      }, []);
    }
  }
};


