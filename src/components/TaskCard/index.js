import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ReactSVG } from 'react-svg';
import Edit from '../../assets/images/edit.svg';
import Delete from '../../assets/images/delete.svg';
import { 
	TaskCardsContainer,
	TaskCrd,
	TaskName,
	TaskDesc,
	ExpiryTag,
	ActionWrapper,
	StatusTag
} from './styles';
import { openModal } from '../Modals/AllModals/actions';
import { 
	viewUserTaskDetails,
} from '../../containers/Dashboard/DashboardHome/actions';
import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import saga from '../../containers/Dashboard/DashboardHome/saga';

const key = 'dashboardhome';

function TaskCard({
	openEditModal,
	openDeleteModal,
	name,
	desc,
	id,
	status,
	expiry,
	expiryStatus,
	action,
	viewUserTaskDetails,
	openViewModal,
}) {

	useInjectSaga({ key, saga });
	const getStatus = (value) => {
    if (value && value.length) {
      let x =  value.replace(/\_/g, " ");
      return x;
    } else {
      return null;
    }
  }
  const showTaskDetail = () => {
  	viewUserTaskDetails(id);
  	openViewModal('viewTask');
  }

  const deleteModalTask = () => {
  	openDeleteModal('deleteTask', {id, name});
  }

  const updateModalTask = () => {
  	openEditModal('editTask', {id, name, status, expiry, desc});
  }
	return (
		<React.Fragment>
		<TaskCrd type={status} expired={expiryStatus}>
			{action &&
				<ActionWrapper>
					<ReactSVG src={Edit} onClick={updateModalTask} />
					<ReactSVG src={Delete} onClick={deleteModalTask}/>
				</ActionWrapper>
			}
			<div onClick={showTaskDetail}>
				<TaskName >
					{name}
				</TaskName>
				<StatusTag>Status:{" "}<b>{getStatus(status)}</b></StatusTag>
				<TaskDesc>{desc}</TaskDesc>
				{!expiryStatus &&
					<ExpiryTag>Task Expires on{" "}<b>{expiry}</b></ExpiryTag>
				}
				{expiryStatus &&
					<ExpiryTag>Task Expired on{" "}<b>{expiry}</b></ExpiryTag>
				}
			</div>
		</TaskCrd>
		</React.Fragment>
	);
}

TaskCard.propTypes = {
  openEditModal: PropTypes.func.isRequired,
  openDeleteModal: PropTypes.func.isRequired,
  viewUserTaskDetails: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    openEditModal: (modalType, data) => dispatch(openModal(modalType, data)),
    openDeleteModal: (modalType, data) => dispatch(openModal(modalType, data)),
    openViewModal: (modalType, data) => dispatch(openModal(modalType, data)),
    viewUserTaskDetails: (id) => dispatch(viewUserTaskDetails(id)),
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
withConnect,
memo,
)(TaskCard);