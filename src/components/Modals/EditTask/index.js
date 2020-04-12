import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
	SignupInput,
	UserIcon,
	SigninButton,
	ButtonWrap,
	MessageArea,
} from '../../../containers/SignIn/styles';
import {
	Select,
} from '../CreateTask/styles';
import { 
	updateTask,
} from '../../../containers/Dashboard/DashboardHome/actions';

function UpdateTask({
	data,
	updateTask,
}) {
	const [ taskname, setTask ] = useState(data.name);
	const [ desc, setDesc ] = useState(data.desc);
	const [ status, setStatus ] = useState(data.status);
	const [ expiry, setExpiry ] = useState(data.expiry);
	const changeTask = ((event) => {setTask(event.target.value)});
	const changeDesc = ((event) => {setDesc(event.target.value)});
	const changeStatus = ((event) => {setStatus(event.target.value)});
	const changeExpiry = ((event) => {setExpiry(event.target.value)});
	const updateUserTask = () => {
  	updateTask(data.id, taskname, desc, status, expiry);
  }
	return (
		<React.Fragment>
			<SignupInput value={taskname} onChange={changeTask} placeholder='Task Name*' />
			<MessageArea maxLength='150' value={desc} onChange={changeDesc} placeholder='Description* (maximum 150 words)' />
			<Select value={status} onChange={changeStatus}>
				<option value="not_initiated">Yet to Pick</option>
				<option value="in_progress">In Progress</option>
				<option value="completed">Completed</option>
			</Select>
			<SignupInput value={expiry} onChange={changeExpiry} placeholder='Task Expiry* (Format: mm/dd/yyyy)' />
			<ButtonWrap>
				<SigninButton onClick={updateUserTask}>update</SigninButton>
			</ButtonWrap>
		</React.Fragment>
	);
}

UpdateTask.propTypes = {
  updateTask: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    updateTask: (id, task_name, task_desc, status, expiry_date) => dispatch(updateTask(id, task_name, task_desc, status, expiry_date)),
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
withConnect,
memo,
)(UpdateTask);