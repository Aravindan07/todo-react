import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { ReactSVG } from 'react-svg';
import AddTask from '../../../assets/images/addtask.svg';
import TaskCard from '../../../components/TaskCard';
import { useInjectSaga } from '../../../utils/injectSaga';
import { useInjectReducer } from '../../../utils/injectReducer';
import saga from './saga';
import reducer from './reducer';
import EmptyMessage from '../../../components/EmptyMessage';
import { 
	TaskCardsContainer, 
	TitleWrap, 
	TaskTitle, 
	CreateTask 
} from '../../../components/TaskCard/styles';
import { openModal } from '../../../components/Modals/AllModals/actions';
import {
	getTask,
	getIndividualUserTask,
} from './actions';
import {
	selectListTask,
	selectListIndividualTask,
} from './selector';
import Loading from '../../../components/Loader';

const key = 'dashboardhome';
function DashboardHome({
	openCreateTaskModal,
	getTask,
	getIndividualUserTask,
	listAllTask,
	listIndividualTask,
}) {
	useInjectReducer({ key, reducer });
	useInjectSaga({ key, saga });
	useEffect(() => {
		getTask();
		getIndividualUserTask();
	}, []);
	return (
		<React.Fragment>
			<TitleWrap>
			<TaskTitle>
				My Tasks
			</TaskTitle>
			<CreateTask onClick={openCreateTaskModal}>
				<ReactSVG src={AddTask} />
				Create Task
			</CreateTask>
			</TitleWrap>
			<TaskCardsContainer>
				{!listIndividualTask &&
					<Loading />
				}
				{listIndividualTask && listIndividualTask.length <= 0 &&
					<EmptyMessage type='empty'/>
				}
				{listIndividualTask && listIndividualTask.map((task) => (
					<TaskCard
						key={task.id}
						name={task.task_name}
						desc={task.task_desc}
						id={task.id}
						status={task.status}
						expiry={task.expiry_date}
						expiryStatus={task.isExpired}
						action={true}
					/>
				))}
			</TaskCardsContainer>
			<TaskTitle>
				Tasks Dashboard
				</TaskTitle>
			<TaskCardsContainer>
			{listAllTask && listAllTask.length <= 0 &&
					<EmptyMessage type='empty'/>
				}
			{listAllTask && listAllTask.map((task) => (
				<TaskCard 
					key={task.id}
					name={task.task_name}
					desc={task.task_desc}
					id={task.id}
					status={task.status}
					expiry={task.expiry_date}
					expiryStatus={task.isExpired}
				/>
			))}
			</TaskCardsContainer>
		</React.Fragment>
	);
}

DashboardHome.propTypes = {
  openCreateTaskModal: PropTypes.func.isRequired,
  getTask: PropTypes.func.isRequired,
  listAllTask: PropTypes.array,
  listIndividualTask: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
	listAllTask: selectListTask(),
	listIndividualTask: selectListIndividualTask(),
});

export function mapDispatchToProps(dispatch) {
  return {
    openCreateTaskModal: (modalType, data) => dispatch(openModal('createTask', data)),
    getTask: () => dispatch(getTask()),
    getIndividualUserTask: () => dispatch(getIndividualUserTask()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
withConnect,
memo,
)(DashboardHome);