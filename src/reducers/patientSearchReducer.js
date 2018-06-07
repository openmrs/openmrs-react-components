import { PATIENT_SEARCH_ACTIONS } from "../actions/types";

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case PATIENT_SEARCH_ACTIONS.SUCCEEDED:
            return Object.assign({}, state, {
                results: action.results
            });

        case PATIENT_SEARCH_ACTIONS.FAILED:
            return {
                error: {
                    message: "Unable to find patients"
                }
            };

        default: return state;
    }
};