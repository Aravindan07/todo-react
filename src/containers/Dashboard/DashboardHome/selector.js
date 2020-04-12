import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDashboardHome = state => state.dashboardhome || initialState;

export const selectListTask = () => createSelector(
  selectDashboardHome,
  dashboardhomeState => dashboardhomeState.listTask,
);

export const selectListIndividualTask = () => createSelector(
  selectDashboardHome,
  dashboardhomeState => dashboardhomeState.listIndividualTask,
);

export const selectViewTask = () => createSelector(
  selectDashboardHome,
  dashboardhomeState => dashboardhomeState.viewTask,
);

export const selectTaskStatus = () => createSelector(
  selectDashboardHome,
  dashboardhomeState => dashboardhomeState.taskStatus,
);
