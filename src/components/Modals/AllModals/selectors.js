import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectModalsDomain = state => state.modals || initialState;

export const selectIsOpen = () => createSelector(
  selectModalsDomain,
  modalState => modalState.isOpen,
);

export const selectModalType = () => createSelector(
  selectModalsDomain,
  modalState => modalState.modalType,
);

export const selectModalData = () => createSelector(
  selectModalsDomain,
  modalState => modalState.data,
);
