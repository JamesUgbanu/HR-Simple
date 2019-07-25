import axios from "axios";
import { setAlert } from "./alert";
import {
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AUTH_ERROR,
  START_FETCH
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// Load current User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("http://localhost:5000/api/v1/auth/signIn");

    dispatch({
      type: USER_LOADED,
      payload: res.body
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Login user
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });
  dispatch({ type: START_FETCH });
  try {
    const res = await axios.post("http://localhost:5000/api/v1/auth/signIn", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.data
    });

    //dispatch(loadUser());
  } catch (err) {
      
    const errors = err.response.data;

    if (errors) {
    //   errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    dispatch(setAlert(errors.error, "danger"));
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};