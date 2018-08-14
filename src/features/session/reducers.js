import SESSION_TYPES from "./types";
import { REHYDRATE } from 'redux-persist';
import { axiosInstance } from "../../config";

const initialState = {};

export default (state = {}, action) => {
  switch (action.type) {
    case SESSION_TYPES.FETCH_SUCCEEDED:
      return {
        ...action.session,
        ...action.authorization
      };

    case SESSION_TYPES.FETCH_FAILED:
      return {
        error: {
          message: "Unable to load session"
        }
      };
      
    case SESSION_TYPES.SET_SUCCEEDED:
      return {
        ...action.session
      };

    case SESSION_TYPES.SET_FAILED:
      return {
        error: {
          message: "Unable to set session"
        }
      };

    case REHYDRATE:
      if (action.payload && action.payload.openmrs.session.authenticated && action.payload.openmrs.session.authorization){
        axiosInstance.defaults.headers.common['Authorization'] = action.payload.openmrs.session.authorization;
      }
      return state;

    default:
      return state;
  }
};
