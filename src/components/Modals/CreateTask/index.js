import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ReactSVG } from 'react-svg';
import AddTask from '../../../assets/images/addtask.svg';
import { useInjectSaga } from '../../../utils/injectSaga';
import { useInjectReducer } from '../../../utils/injectReducer';
import saga from '../../../containers/Dashboard/DashboardHome/saga';
import {
	SignupInput,
	UserIcon,
	SigninButton,
	ButtonWrap,
	MessageArea,
} from '../../../containers/SignIn/styles';
import {
	Select,
} from './styles';
import {
	createTask,
} from '../../../containers/Dashboard/DashboardHome/actions';

const key = 'dashboardhome';

function CreateTask({
	createTask,
}) {
	const [ taskname, setTask ] = useState('');
	const [ desc, setDesc ] = useState('');
	const [ status, setStatus ] = useState('not_initiated');
	const [ expiry, setExpiry ] = useState('');
	const changeTask = ((event) => {setTask(event.target.value)});
	const changeDesc = ((event) => {setDesc(event.target.value)});
	const changeStatus = ((event) => {setStatus(event.target.value)});
	const changeExpiry = ((event) => {setExpiry(event.target.value)});
	const CreateUserTask = () => {
		createTask(taskname, desc,status, expiry);
	}
	useInjectSaga({ key, saga });
	return (
		<React.Fragment>
			<SignupInput value={taskname} onChange={changeTask} placeholder='Task Name*' />
			<MessageArea maxLength='150' value={desc} onChange={changeDesc} placeholder='Description* (maximum 150 words)' />
			<Select onChange={changeStatus}>
				<option value="not_initiated">Yet to Pick</option>
				<option value="in_progress">In Progress</option>
				<option value="completed">Completed</option>
			</Select>
			<SignupInput value={expiry} onChange={changeExpiry} placeholder='Task Expiry* (Format: mm/dd/yyyy)' />
			<ButtonWrap>
				<SigninButton onClick={CreateUserTask}>Create</SigninButton>
			</ButtonWrap>
		</React.Fragment>
	);
}

CreateTask.propTypes = {
  createTask: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    createTask: (task_name, task_desc, status, expiry_date) => dispatch(createTask(task_name, task_desc, status, expiry_date)),
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
withConnect,
memo,
)(CreateTask);