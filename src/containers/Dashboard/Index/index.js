import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashboardHome from '../DashboardHome/Loadable';
import Notification from '../Notification/Loadable';
import Search from '../Search/Loadable';

function DashboardIndex () {
	return (
		<div>
          <Switch>
            <Route exact path="/" component={DashboardHome} />
          </Switch>
		</div>
	);
}

export default DashboardIndex;