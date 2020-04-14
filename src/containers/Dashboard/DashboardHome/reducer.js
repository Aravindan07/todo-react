import produce from 'immer';
import {
	GET_TASK,
	RECEIVED_TASK,
  GET_INDIVIDUAL_USER_TASK,
  RECEIVED_INDIVIDUAL_USER_TASK,
  VIEW_USER_TASK_DETAILS,
  RECEIVED_USER_TASK_DETAILS,
  RECEIVED_TASK_FROM_SOCKET,
}
from './constants';

export const initialState = {
  listTask: undefined,
};

const taskReducer = (state = initialState, action) => 
  produce(state, draft => {
    switch (action.type) {
      case GET_TASK:
        draft.listTask = undefined;
        break;

      case RECEIVED_TASK:
        draft.listTask = action.payload.data;
        break;

      case RECEIVED_TASK_FROM_SOCKET:
        draft.listTask = action.payload.data;
        break;

      case GET_INDIVIDUAL_USER_TASK:
        draft.listIndividualTask = undefined;
        break;

      case RECEIVED_INDIVIDUAL_USER_TASK:
        draft.listIndividualTask = action.payload.data;
        break;

      case VIEW_USER_TASK_DETAILS:
        draft.viewTask = undefined;
        draft.taskStatus = undefined;
        break;

      case RECEIVED_USER_TASK_DETAILS:
        draft.viewTask = action.payload.data;
        draft.taskStatus = action.payload.isExpired;
        break;
    }
  });

export default taskReducer;