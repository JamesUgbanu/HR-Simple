import axios from "axios";
import { setAlert } from "./alert";
import {
  USER_TASKS,
  TASK_ERROR,
  CREATE_TASK,
  START_FETCH,
  STOP_FETCH
} from "./types";
import setAuthToken from "../utils/setAuthToken";
// Get Logged in Users Tasks
export const getUserTasks = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

    try {
      const res = await axios.get('http://localhost:5000/api/v1/user/tasks');

      dispatch({
        type: USER_TASKS,
        payload: res.data.data
      });
      
    } catch (err) {
      dispatch({
        type: TASK_ERROR
      });
    }
  };

  // Create Task
export const createTask = (formData) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  dispatch({ type: START_FETCH });
  try {
    const res = await axios.post('http://localhost:5000/api/v1/task', formData, config);
   
    dispatch({
      type: CREATE_TASK,
      payload: res.data
    });
    dispatch({ type: STOP_FETCH });
    dispatch(setAlert(res.data.success, "success"));
  } catch (err) {
    dispatch({ type: STOP_FETCH });
    if (err.response) {
      const errors = err.response.data;
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch({
        type: TASK_ERROR
      });
      dispatch(setAlert("Network Problem", "danger"));
    }
  }
};