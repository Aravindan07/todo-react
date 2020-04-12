import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { 
	DeleteButton,
	DeleteContent,
} from './styles';
import { 
	deleteTask,
} from '../../../containers/Dashboard/DashboardHome/actions';

function DeleteTask({
	data,
	deleteTask,
}) {

	const deleteUserTask = () => {
  	deleteTask(data.id);
  }
	return (
		<React.Fragment>
			<DeleteContent>Are you sure in deleting <b>{data.name}</b>?</DeleteContent>
			<DeleteButton onClick={deleteUserTask}>Delete</DeleteButton>
		</React.Fragment>
	);
}


DeleteTask.propTypes = {
  deleteTask: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    deleteTask: (id) => dispatch(deleteTask(id)),
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
withConnect,
memo,
)(DeleteTask);