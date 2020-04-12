import produce from 'immer';
import {
	GET_USER_DETAILS,
	RECEIVED_USER_DETAILS,
}
from './constants';

export const initialState = {
  loggedInUserDetails: {},
};

const signinReducer = (state = initialState, action) => 
  produce(state, draft => {
    switch (action.type) {
      case GET_USER_DETAILS:
        draft.loggedInUserDetails = {};
        break;

      case RECEIVED_USER_DETAILS:
        draft.loggedInUserDetails = action.payload.data;
        break;
    }
  });

export default signinReducer;