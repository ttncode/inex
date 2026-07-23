import { FetchState } from "@/types";

const FetchReducer = (state: FetchState, action: any) => {
  switch (action.type) {
    case "FETCH_START":
      return {
        data: null,
        isFetching: true,
        error: false,
      };
    case "FETCH_SUCCESS":
      return {
        data: action.payload,
        isFetching: false,
        error: false,
      };
    case "FETCH_FAILURE":
      return {
        data: null,
        isFetching: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default FetchReducer;
