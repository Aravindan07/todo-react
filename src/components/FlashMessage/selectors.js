import { createSelector } from 'reselect';
import { initialState } from './reducers';

const FlashMessage = state => state.flashmessage || initialState;

export const selectFlashMessage = () => createSelector(
  FlashMessage,
  messageState => messageState.flashNotification,
);
