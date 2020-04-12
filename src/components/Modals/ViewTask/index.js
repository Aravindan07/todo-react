import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from '../../../utils/injectSaga';
import { useInjectReducer } from '../../../utils/injectReducer';
import reducer from '../../../containers/Dashboard/DashboardHome/reducer';
import {
	selectViewTask,
	selectTaskStatus,
} from '../../../containers/Dashboard/DashboardHome/selector';
import {
	Name,
	Description,
	CreatedBy,
	Expiry
} from './styles';

const key = 'dashboardhome';

function ViewTask({
	viewTaskById,
	taskStatusById,
}) {
	useInjectReducer({ key, reducer });	
	return (
		<React.Fragment>
			{viewTaskById &&
				<React.Fragment>
					<Name>{viewTaskById.task_name}</Name>
					<CreatedBy>Created by{" "}{viewTaskById.created_by_name}{" "}on{" "}{new Date(viewTaskById.create_date).toLocaleDateString()}</CreatedBy>
					<Description>{viewTaskById.task_desc}</Description>
					<CreatedBy>Status:{" "}{viewTaskById.status}</CreatedBy>
					<Expiry>Last Activity:{" "}{new Date(viewTaskById.last_update_date).toLocaleDateString()}</Expiry>
					{!taskStatusById &&
						<Expiry>Task expires on{" "}{viewTaskById.expiry_date}</Expiry>
					}
					{taskStatusById && 
						<Expiry>Task expired on{" "}{viewTaskById.expiry_date}</Expiry>
					}
				</React.Fragment>
			}
		</React.Fragment>
	);
}

ViewTask.propTypes = {
	viewTaskById: PropTypes.object,
	viewTaskById: PropTypes.bool,
}

const mapStateToProps = createStructuredSelector({
	viewTaskById: selectViewTask(),
	taskStatusById: selectTaskStatus(),
});

const withConnect = connect(mapStateToProps, null);

export default compose(
withConnect,
memo,
)(ViewTask);