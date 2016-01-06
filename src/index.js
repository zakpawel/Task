require('expose?$!expose?jQuery!jquery');
require("bootstrap-webpack");
import React from "react";
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from "redux";
import * as App from './App';
import * as UserModal from './UserModal';

const update = (state, action) => {
	const newState = App.update(state, action);
	newState.currentUser = UserModal.update(newState.currentUser, action);
	return newState;
}

const store = createStore(update);

const render = () => {
	console.log("render", store.getState());
	ReactDOM.render(
		<App.View
			store={store}

		/>,
		document.getElementById("app")
	);
}

store.subscribe(render);
render();