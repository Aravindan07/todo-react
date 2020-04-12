import React from 'react';
import EmptyMessage from '../../../components/EmptyMessage';
import {
	AnalyticsWrap,
} from '../../Analytics/AnalyticsHome/styles';

function Search() {
	return (
		<AnalyticsWrap>
			<EmptyMessage type="notification" />
		</AnalyticsWrap>
	);
}

export default Search;