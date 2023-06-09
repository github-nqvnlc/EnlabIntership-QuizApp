import axios from "axios";

export const fetchApiData = () => {
  return async (dispatch) => {
    dispatch({ type: "FETCH_API_REQUEST" });
    await axios
      .get("https://opentdb.com/api.php?amount=10")
      .then((response) => {
        dispatch({
          type: "FETCH_API_SUCCESS",
          payload: response.data.results,
        });
      })
      .catch((error) => {
        dispatch({
          type: "FETCH_API_FAILURE",
          payload: error.message,
        });
      });
  };
};
