import {
    USER_TASKS,
    TASK_ERROR,
    COMPLETE_TASK,
    GET_TASK,
    UPDATE_TASK,
    CREATE_TASK
  } from "../actions/types";
  
  const initialState = {
    loading: true,
    tasks: {},
    task: {}
  };
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case USER_TASKS:
        return {
          ...state,
          tasks: payload,
          loading: false,
          dataLoading: false
        };
      case COMPLETE_TASK:
      case GET_TASK:
      case UPDATE_TASK:
        return {
          ...state,
          task: payload,
          loading: false,
          dataLoading: false
        };
      case CREATE_TASK:
        return {
          ...state,
          task: payload,
          loading: false,
          isAuthenticated: true,
          dataLoading: false
        };
      case TASK_ERROR:
        return {
          ...state,
          loading: false,
          dataLoading: false
        };
      default:
        return state;
    }
  }