const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        ...state,
        currentUser: action.payload,
      };
    }
    case "LOGOUT": {
      return {
        doc: null,
        currentUser: null,
      };
    }
    case "SAVE_DOCUMENT": {
      return {
        ...state,
        doc: action.payload.document,
      }
    }
    default:
      return state;
  }
};

export default AuthReducer;
