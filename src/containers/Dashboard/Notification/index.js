import React from 'react';
import EmptyMessage from '../../../components/EmptyMessage';
import {
	AnalyticsWrap,
} from '../../Analytics/AnalyticsHome/styles';

function Notification() {
	return (
		<AnalyticsWrap>
			<EmptyMessage type="notification" />
		</AnalyticsWrap>
	);
}

export default Notification;