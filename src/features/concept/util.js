
// determines if the concept matches the current datatype: returns false if no datatype is present on the concept or if the datatype specified is invalid
import { DATA_TYPES } from "../../domain/concept/constants";

export const isDatatype = (concept, datatype) => {

  if (!concept.datatype || !(datatype in DATA_TYPES)) {
    return false;
  }

  return concept.datatype.uuid === DATA_TYPES[datatype].uuid;
};
