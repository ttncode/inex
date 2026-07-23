export const fetchStart = () => ({
  type: "FETCH_START",
});

export const fetchSuccess = (data: any) => ({
  type: "FETCH_SUCCESS",
  payload: data,
});

export const fetchFailure = () => ({
  type: "FETCH_FAILURE",
});
