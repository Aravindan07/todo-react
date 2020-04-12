import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AnalyticsHome from '../AnalyticsHome';

function AnalyticsIndex () {
	return (
		<div>
          <Switch>
            <Route exact path="/analytics" component={AnalyticsHome} />
          </Switch>
		</div>
	);
}

export default AnalyticsIndex;