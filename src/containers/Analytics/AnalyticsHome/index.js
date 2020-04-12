import React from 'react';
import EmptyMessage from '../../../components/EmptyMessage';
import {
	AnalyticsWrap,
} from './styles';

function AnalyticsHome() {
	return (
		<AnalyticsWrap>
			<EmptyMessage type="analytics" />
		</AnalyticsWrap>
	);
}

export default AnalyticsHome;