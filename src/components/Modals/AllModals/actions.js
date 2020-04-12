import {
	OPEN_MODAL,
	CLOSE_MODAL,
} from './constants';

export function openModal(modalType, data) {
  return {
    type: OPEN_MODAL,
    modalType,
    data,
  };
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
  };
}

export function contactSubmit (name, email, phone, message) {
  return {
    type: CONTACT_SUBMIT,
    name,
    email,
    phone,
    message,
  };
}
