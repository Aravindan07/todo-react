import io from 'socket.io-client';
import { call, put, select, takeLatest, take, all, fork, apply } from 'redux-saga/effects';
import { eventChannel, delay } from 'redux-saga';
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
  deleteTask,
  createTask,
  getTask,
  getIndividualUserTask,
  receivedTaskFromSocket,
} from './actions';
import { flashMessage } from '../../../components/FlashMessage/actions';
import { closeModal } from '../../../components/Modals/AllModals/actions';

function connect() {
  const socketUrl = config.api.hostUrl;
  const socket = io(socketUrl);
  return new Promise((resolve, reject) => {
    let attempts = 0;
    let connected = false;
    socket.on('connect', () => {
      connected = true;
      return resolve(socket);
    });

    socket.on('connect_error', () => {
      if (!connected) {
        if (attempts <= 2) {
          attempts += 1;
          console.log('connection error');
          socket.connect();
        } else {
          reject(new Error('socket connection error'));
        }
      }
    });
  });
}

function subscribe (socket) {
  return eventChannel((emit) => {
    socket.on('connect_error', () => {
      console.log('fucked up');
    });

    socket.on('connect', () => {
      console.log('into socket strt');
    });

    socket.on('received_task', function(payload) {
      const output = payload;
      const response  = output.payload;
      emit(receivedTask(response));
    });

    socket.on('disconnect', () => {
      console.log('disconnect');
    });

    return () => {};
  });
}

function* createUserTask(action) {
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
    const socket = yield call(connect);
    const socketValue = yield put(receivedTask(response));
    console.log(response);
    socket.emit('get_task', socketValue);
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

function* read(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* write(socket) {
    const { payload } = yield take(`${receivedTask}`);
    socket.emit('task', {payload});
}

function* handleIO(socket) {
  yield fork(read, socket);
  yield fork(write, socket);
}

function* flow() {
    const socket = yield call(connect);
    const task = yield fork(handleIO, socket);
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
  yield fork(flow);
}
