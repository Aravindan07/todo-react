import { call, put, select, takeLatest, take, all } from 'redux-saga/effects';
import { push, LOCATION_CHANGE } from 'react-router-redux';
import request, { makeReqOptions } from '../../utils/request';
import config from '../../config/base.json';
import {
	SIGN_UP,
  SIGN_IN,
  GET_USER_DETAILS,
  LOGOUT,
} from './constants';
import {
	signupStatus,
  signinStatus,
  receivedUserDetails,
  logoutStatus,
} from './actions';
import { flashMessage } from '../../components/FlashMessage/actions';
import { closeModal } from '../../components/Modals/AllModals/actions';

function* getSignUp(action) {
	const requestUrl = config.api.baseUrl + config.api.signupUrl;
  try {
    const response = yield call( request, requestUrl, makeReqOptions({
      method: 'POST',
      noApiKey: true,
      data: action,
    }));
    yield put(signupStatus(response));
    if(response.status === 'success') {
      yield put(closeModal());
      yield put(flashMessage(response.message, 'success'));
    } else if(response.status === 'missing_field' || response.status === 'duplicate') {
      yield put(flashMessage(response.message, 'warning'));
    }
  } catch (e) {
    console.log(e);
  }
}

function* getSignIn(action) {
  const requestUrl = config.api.baseUrl + config.api.signinUrl;
  try {
    const response = yield call( request, requestUrl, makeReqOptions({
      method: 'POST',
      noApiKey: true,
      data: action,
    }));
    yield put(signinStatus(response));
    if(response.status === 'success') {
      localStorage.setItem('actix', response.token);
      yield* fetchUserDetails();
      yield put(push('/'));
    } else if(response.status === 'duplicate' || response.status === 'wrong_pwd') {
      yield put(flashMessage(response.message, 'error'));
    }
  } catch (e) {
    console.log(e);
  }
}

function* fetchUserDetails() {
  const requestUrl = config.api.baseUrl + config.api.profileUrl;
  try {
    const response = yield call( request, requestUrl, makeReqOptions({
      method: 'GET',
      apiKey: localStorage.getItem('actix'),
    }));
    yield put(receivedUserDetails(response));
  } catch(e) {
    console.log(e);
    yield put(push('/signin'));
  }
}

function* logOut() {
  const requestUrl = config.api.baseUrl + config.api.logoutUrl;
  try {
    const response = yield call( request, requestUrl, makeReqOptions({
      method: 'PUT',
      apiKey: localStorage.getItem('actix'),
    }));
    yield put(logoutStatus(response));
    if(response.status === 'success') {
      localStorage.removeItem('actix');
      yield put(push('/signin'));
    }
  } catch(e) {
    console.log(e);
  }
}
 
export default function* signinSaga() {
  yield all([
    takeLatest(SIGN_UP, getSignUp),
    takeLatest(SIGN_IN, getSignIn),
    takeLatest(GET_USER_DETAILS, fetchUserDetails),
    takeLatest(LOGOUT, logOut),
  ]);
  yield take(LOCATION_CHANGE);
}
