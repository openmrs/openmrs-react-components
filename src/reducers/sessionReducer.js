const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_SESSION":
      return {
        ...action.session
      };

    default: return state;
  }
};
