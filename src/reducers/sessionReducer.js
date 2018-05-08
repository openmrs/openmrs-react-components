export default (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_SESSION":
      return {
        ...state,
        session: action.currentSession
      };

    default: return state;
  }
};
