import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    USER_LOADED,
    AUTH_ERROR,
    GET_USERS,
    USERS_ERROR,
    START_FETCH,
    STOP_FETCH
  } from "../actions/types";
  
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    users: [],
    user: {}
  };
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: payload
        };
      case START_FETCH:
      return {
        ...state,
        dataLoading: true
      }
      case STOP_FETCH:
      return {
        ...state,
        dataLoading: false
      }
      case LOGIN_SUCCESS:
        localStorage.setItem("token", payload.token);
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false
        };
      case GET_USERS:
        return {
          ...state,
          isAuthenticated: true,
          users: payload,
          loading: false
        };
      case AUTH_ERROR:
          localStorage.removeItem("token");
          return {
            ...state,
            token: null,
            isAuthenticated: false,
            loading: false
          };
      case LOGIN_FAIL:
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false
        };
      case USERS_ERROR:
        return {
          ...state,
          loading: false,
          isAuthenticated: true
        };
      case LOGOUT:
        localStorage.removeItem("token");
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false
        };
      default:
        return state;
    }
  }