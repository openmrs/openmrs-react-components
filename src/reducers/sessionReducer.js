const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SESSION_FETCH_SUCCEEDED":
      return {
        ...action.session
      };

    default: return state;
  }
};
