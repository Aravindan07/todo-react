import produce from 'immer';
import {
	OPEN_MODAL,
	CLOSE_MODAL,
}
from './constants';

export const initialState = {
  modalType: '',
  isOpen: false,
  data: undefined,
};

const modalsReducer = (state = initialState, action) => 
  produce(state, draft => {
    switch (action.type) {
      case OPEN_MODAL:
        draft.modalType = action.modalType;
        draft.isOpen = true;
        draft.data = action.data
        break;

      case CLOSE_MODAL:
        draft.modalType = '';
        draft.isOpen = false;
        draft.data = undefined;
        break;
    }
  });

export default modalsReducer;