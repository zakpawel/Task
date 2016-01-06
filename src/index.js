require('expose?$!expose?jQuery!jquery');
require("bootstrap-webpack");
import React from "react";
import ReactDOM from 'react-dom';
import { createStore } from "redux";
import * as App from './App';

const store = createStore(App.update);

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