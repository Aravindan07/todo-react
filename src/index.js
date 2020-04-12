import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import { ConnectedRouter } from 'connected-react-router';
import history from './utils/history';
import App from './containers/App';
import GlobalStyle from './base-styles.js';

const initialState = {};
const store = configureStore(initialState, history);

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App />
		</ConnectedRouter>
	</Provider>
	, document.getElementById("app")
);
