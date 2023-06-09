const initialState = {
  loading: false,
  data: null,
  error: null,
};

const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_API_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_API_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case "FETCH_API_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default apiReducer;
