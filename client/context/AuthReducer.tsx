import { AuthState } from "@/types";

const AuthReducer = (state: AuthState, action: any) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
        isVerify: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
        isVerify: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
        isVerify: false,
      };
    case "LOGOUT":
      return {
        user: null,
        isFetching: false,
        error: false,
        isVerify: false,
      };
    case "VERIFY":
      return {
        user: null,
        isFetching: false,
        error: false,
        isVerify: true,
      };
    default:
      return { ...state };
  }
};

export default AuthReducer;
