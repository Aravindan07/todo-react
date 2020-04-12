import { call, put, select, takeLatest, take, all } from 'redux-saga/effects';
import io from 'socket.io-client';
import request, { makeReqOptions } from '../../../utils/request';
import config from '../../../config/base.json';
import {
	CREATE_TASK,
  GET_TASK,
  GET_INDIVIDUAL_USER_TASK,
  UPDATE_TASK,
  VIEW_USER_TASK_DETAILS,
  DELETE_TASK,
} from './constants';
import {
  createTaskStatus,
  receivedTask,
  receivedIndividualUserTask,
  receivedUserTaskDetails,
  deleteTaskStatus,
  updateTaskStatus,
} from './actions';
import { flashMessage } from '../../../components/FlashMessage/actions';
import { closeModal } from '../../../components/Modals/AllModals/actions';

function* createUserTask(action) {
  console.log('creating user');
	const requestUrl = config.api.baseUrl + config.api.createTaskUrl;
  try {
    const response = yield call( request, requestUrl, makeReqOptions({
      method: 'POST',
      apiKey: localStorage.getItem('actix'),
      data: action,
    }));
    yield put(createTaskStatus(response));
    yield put(closeModal());
    yield put(flashMessage(response.message, 'success'));
    yield* fetchIndividualUserTask();
    yield* fetchUserTask();
  } catch (e) {
    console.log(e);
  }
}

function* fetchUserTask() {
  const requestUrl = config.api.baseUrl + config.api.getTaskUrl;
  try {
    const response = yield call( request, requestUrl, makeReqOptions({
      method: 'GET',
      apiKey: localStorage.getItem('actix'),
    }));
    yield put(receivedTask(response));
  } catch (e) {
    console.log(e);
  }
}

function* fetchIndividualUserTask() {
  const requestUrl = config.api.baseUrl + config.api.userTaskUrl;
  try {
    const response = yield call( request, requestUrl, makeReqOptions({
      method: 'GET',
      apiKey: localStorage.getItem('actix'),
    }));
    yield put(receivedIndividualUserTask(response));
  } catch (e) {
    console.log(e);
  }
}

function* fetchTaskById(action) {
  const requestUrl = config.api.baseUrl + `/tasks/${action.id}`;
  const params = {
    apiKey: localStorage.getItem('actix'),
    data: { task_id: action.id }
  };
  try {
    const response = yield call( request, requestUrl, makeReqOptions(params));
    yield put(receivedUserTaskDetails(response));
  } catch (e) {
    console.log(e);
  }
}

function* deleteTaskById(action) {
  const requestUrl = config.api.baseUrl + `/tasks/delete/${action.id}`;
  const params = {
    method: 'DELETE',
    apiKey: localStorage.getItem('actix'),
    data: { task_id: action.id }
  };
  try {
    const response = yield call( request, requestUrl, makeReqOptions(params));
    yield put(deleteTaskStatus(response));
    yield put(closeModal());
    if(response.status === 'success') {
      yield put(flashMessage(response.message, 'success'));
    }
    if(response.status === 'warning') {
      yield put(flashMessage(response.message, 'warning')); 
    }
    yield put(closeModal());
    yield* fetchIndividualUserTask();
    yield* fetchUserTask();
  } catch (e) {
    console.log(e);
  }
}

function* updateTaskById(action) {
  const requestUrl = config.api.baseUrl + `/tasks/${action.id}`;
    
  try {
    const response = yield call( request, requestUrl, makeReqOptions({
      method: 'PUT',
      apiKey: localStorage.getItem('actix'),
      data: action,
    }));
    yield put(updateTaskStatus(response));
    if(response.status === 'success') {
      yield put(closeModal());
      yield put(flashMessage(response.message, 'success'));
      yield* fetchIndividualUserTask();
      yield* fetchUserTask();
    }
  } catch (e) {
    console.log(e);
  }
}
export default function* dashboardSaga() {
  yield all([
    takeLatest(CREATE_TASK, createUserTask),
    takeLatest(GET_TASK, fetchUserTask),
    takeLatest(GET_INDIVIDUAL_USER_TASK, fetchIndividualUserTask),
    takeLatest(VIEW_USER_TASK_DETAILS, fetchTaskById),
    takeLatest(DELETE_TASK, deleteTaskById),
    takeLatest(UPDATE_TASK, updateTaskById),
  ]);
}
