import {
	CREATE_TASK,
  CREATE_TASK_STATUS,
  GET_TASK,
  RECEIVED_TASK,
  GET_INDIVIDUAL_USER_TASK,
  RECEIVED_INDIVIDUAL_USER_TASK,
  UPDATE_TASK,
  UPDATE_TASK_STATUS,
  VIEW_USER_TASK_DETAILS,
  RECEIVED_USER_TASK_DETAILS,
  DELETE_TASK,
  DELETE_TASK_STATUS,
  RECEIVED_TASK_FROM_SOCKET,
} from './constants';

export function createTask(task_name, task_desc, status, expiry_date) {
  return {
    type: CREATE_TASK,
    task_name,
    task_desc,
    status,
    expiry_date,
  };
}

export function createTaskStatus() {
  return {
    type: CREATE_TASK_STATUS,
  };
}

export function getTask() {
  return {
    type: GET_TASK,
  };
}

export function receivedTask(payload) {
  return {
    type: RECEIVED_TASK,
    payload,
  };
}

export function getIndividualUserTask() {
  return {
    type: GET_INDIVIDUAL_USER_TASK,
  };
}

export function receivedIndividualUserTask(payload) {
  return {
    type: RECEIVED_INDIVIDUAL_USER_TASK,
    payload,
  };
}

export function viewUserTaskDetails(id) {
  return {
    type: VIEW_USER_TASK_DETAILS,
    id,
  };
}

export function receivedUserTaskDetails(payload) {
  return {
    type: RECEIVED_USER_TASK_DETAILS,
    payload,
  };
}

export function deleteTask(id) {
  return {
    type: DELETE_TASK,
    id,
  };
}

export function deleteTaskStatus() {
  return {
    type: DELETE_TASK_STATUS,
  };
}

export function updateTask(id, task_name, task_desc, status, expiry_date) {
  return {
    type: UPDATE_TASK,
    id,
    task_name,
    task_desc,
    status,
    expiry_date,
  };
}

export function updateTaskStatus() {
  return {
    type: UPDATE_TASK_STATUS,
  };
}

//Socket actions

export function receivedTaskFromSocket() {
  return {
    type: RECEIVED_TASK_FROM_SOCKET,
  }
}