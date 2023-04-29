// * fetchData
//  - this is the one directly communicating with the backend
//  - all request to server will pass through this
//  - and all the response from the server will enter the client through this

const fetchData = async (
  { url, method = "POST", token = "", body = null },
  dispatch
) => {
  console.log("entering fetchData...");
  const headers = token
    ? { "Content-Type": "application/json", authorization: `Bearer ${token}` }
    : { "Content-Type": "application/json" };
  body = body ? { body: JSON.stringify(body) } : {};
  // console.log("HEADERS", headers);
  try {
    const response = await fetch(url, { method, headers, ...body });
    const data = await response.json();
    if (!data.success) {
      if (response.status === 401)
        dispatch({ type: "UPDATE_USER", payload: null });
      throw new Error(data.message);
    }

    if (data.success) {
      console.log("SUCCESS NGA BA?", data);
      dispatch({
        type: "UPDATE_ALERT",
        payload: { open: true, severity: "success", message: data.message },
      });
    }
    console.log("exiting fetchData at success");
    return data.result;
  } catch (error) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: { open: true, severity: "error", message: error.message },
    });
    // console.log(error);
    console.log("exiting fetchData at error");
    return null;
  }
};

export default fetchData;
