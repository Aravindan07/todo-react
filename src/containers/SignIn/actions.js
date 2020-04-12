import {
	SIGN_UP,
  SIGNUP_STATUS,
  SIGN_IN,
  SIGNIN_STATUS,
  GET_USER_DETAILS,
  RECEIVED_USER_DETAILS,
  LOGOUT,
  LOGOUT_STATUS,
} from './constants';

export function signUp(name, email, phone, password) {
  return {
    type: SIGN_UP,
    name,
    email,
    phone,
    password,
  };
}

export function signupStatus() {
  return {
    type: SIGNUP_STATUS,
  };
}

export function signIn(email, password) {
  return {
    type: SIGN_IN,
    email,
    password,
  };
}

export function signinStatus() {
  return {
    type: SIGNIN_STATUS,
  };
}

export function getUserDetails() {
  return {
    type: GET_USER_DETAILS,
  };
}

export function receivedUserDetails(payload) {
  return {
    type: RECEIVED_USER_DETAILS,
    payload,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function logoutStatus() {
  return {
    type: LOGOUT_STATUS,
  };
}