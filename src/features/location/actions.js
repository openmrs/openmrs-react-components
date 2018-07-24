import LOCATION_TYPES from "./types";

const fetchLocations = () => ({
  type: LOCATION_TYPES.FETCH_REQUESTED
});

const fetchLocationsSucceded = (locations) => ({
  type: LOCATION_TYPES.FETCH_SUCCEEDED,
  locationTags: locations
});

const fetchLocationsFailed = (message) => ( {
  type: LOCATION_TYPES.FETCH_FAILED,
  message: message
} );

// const setCurrentLocation = (locationUuid) => {
//   return axiosInstance.post(`appui/session`, { location: locationUuid })
//     .then((response) => {
//       return ({
//         type: SESSION_TYPES.FETCH_SUCCEEDED,
//         currentSession: response.data,
//       });
//     });
// }

export default {
  fetchLocations,
  fetchLocationsSucceded,
  fetchLocationsFailed
};
