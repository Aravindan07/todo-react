import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectUser = state => state.signin || initialState;

console.log(initialState);

export const selectUserDetails = () => createSelector(
  selectUser,
  userState => userState.loggedInUserDetails,
);
