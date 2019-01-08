import FETCH_LOCATIONS_TYPES from "./types";

const fetchAllLocations = () => ( {
  type: FETCH_LOCATIONS_TYPES.REQUESTED
} );

const fetchAllLocationsSucceeded = (locations) => ( {
  type: FETCH_LOCATIONS_TYPES.SUCCEEDED,
  locations
} );

const fetchAllLocationsFailed = (message) => ( {
  type: FETCH_LOCATIONS_TYPES.FAILED,
  message: message
} );

export default {
  fetchAllLocations,
  fetchAllLocationsSucceeded,
  fetchAllLocationsFailed
};
