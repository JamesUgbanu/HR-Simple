import axios from "axios";
import { setAlert } from "./alert";
import {
  USER_LOADED,
  GET_USERS,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGIN_FAIL,
  AUTH_ERROR,
  START_FETCH,
  STOP_FETCH
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// Load current User
export const loadUser = () => async dispatch => {

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("http://localhost:5000/api/v1/auth");
    
    dispatch({
      type: USER_LOADED,
      payload: res.data.data[0]
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
    dispatch({ type: STOP_FETCH });
    dispatch(loadUser());
  } catch (err) {
    if (err.response) {
      const errors = err.response.data;
    //   errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    dispatch(setAlert(errors.error, "danger"));
    } else {
      dispatch({
        type: LOGIN_FAIL
      });
      dispatch(setAlert("Network Problem", "danger"));
    }
  }
};

export const getUsers = () => async dispatch => {
  try {
    const res = await axios.get("http://localhost:5000/api/v1/users");

    dispatch({
      type: GET_USERS,
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};
// Logout
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};