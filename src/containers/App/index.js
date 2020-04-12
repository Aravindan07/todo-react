import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';

import VerticalBar from '../../components/VerticalBar';
import Header from '../../components/Header';
import Modals from '../../components/Modals/AllModals';
import FlashMessage from '../../components/FlashMessage';
import SignIn from '../../containers/SignIn/Loadable';
import AnalyticsIndex from '../../containers/Analytics/Index/Loadable';
import DashboardIndex from '../../containers/Dashboard/Index/Loadable';
import Loading from '../../components/Loader/Loadable';
import Notification from '../Dashboard/Notification/Loadable';
import Search from '../Dashboard/Search/Loadable';
import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import saga from '../SignIn/saga';
import reducer from '../SignIn/reducer';
import {
	selectUserDetails,
} from '../SignIn/selector';
import {
	AppWrapper,
	FixedBackground,
	MainWrap,
	ContentBackground,
	ContentWrapper
} from './styles';
import GlobalStyle from '../../base-styles.js';
import {
	getUserDetails,
} from '../SignIn/actions';

const key = 'signin';

function App({
	userDetails,
	getUserDetails,
}) {

	let location = useLocation();
	let history = useHistory();

	useInjectReducer({ key, reducer });
	useInjectSaga({ key, saga });
	useEffect(() => {
		getUserDetails();
	}, []);

	if(location.pathname !== '/signin') {
		console.log(userDetails);
		return (
			<React.Fragment>
			{!userDetails &&
				<Loading/>
			}
			{userDetails && userDetails.id &&
				<AppWrapper history={history}>
					<React.Fragment>
						<FixedBackground />
						<FlashMessage />
						<Modals />
						<VerticalBar />
						<MainWrap>
							<Header />
							<ContentBackground />
							<ContentWrapper>
								<Switch>
									<Route exact path='/' component={DashboardIndex} />
									<Route path='/analytics' component={AnalyticsIndex} />
									<Route path='/notification' component={Notification} />
									<Route path='/search' component={Search} />
								</Switch>
							</ContentWrapper>
						</MainWrap>
					</React.Fragment>
					<GlobalStyle />
				</AppWrapper>
			}
			</React.Fragment>
		);
	} else if(location.pathname === '/signin') {
		return (
			<React.Fragment>
			<AppWrapper history={history}>
				<FlashMessage />
				<Modals />
				<Switch>
					<Route path='/signin' component={SignIn} />
				</Switch>
				<GlobalStyle />
			</AppWrapper>
		</React.Fragment>
		);
	}
}

App.propTypes = {
  userDetails: PropTypes.object,
  getUserDetails: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
  	getUserDetails: () => dispatch(getUserDetails()),
  };
}

const mapStateToProps = createStructuredSelector({
	userDetails: selectUserDetails(),
});


const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
withConnect,
memo,
)(App);
