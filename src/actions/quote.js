import fetchData from "./utils/fetchData";

const url = process.env.REACT_APP_SERVER_URL + "/quote";

export const getRandomQuote = async (token, content, dispatch) => {
  dispatch({ type: "START_LOADING" });
  const result = fetchData(
    {
      url: url,
      method: "GET",
      token: token,
    },
    dispatch
  );
  dispatch({ type: "END_LOADING" });
  return result;
};
