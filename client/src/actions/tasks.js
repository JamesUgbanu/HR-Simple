import axios from "axios";

import {
  USER_TASKS,
  TASK_ERROR
} from "./types";

// Get Logged in Users Tasks
export const getUserTasks = () => async dispatch => {
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/user/tasks`);
      
      dispatch({
        type: USER_TASKS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: TASK_ERROR
      });
    }
  };