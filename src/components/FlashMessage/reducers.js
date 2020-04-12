import produce from 'immer';
import { FLASH_MESSAGE } from './constants';

export const initialState = {

};

const flashMessageReducer = (state = initialState, action) => 
  	produce(state, draft => {
	    switch (action.type) {
		  	case FLASH_MESSAGE:
		    	draft.flashNotification = action;
	  			break;
	  	}
	});

export default flashMessageReducer;