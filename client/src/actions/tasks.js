import axios from "axios";
import {
  USER_TASKS,
  TASK_ERROR
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