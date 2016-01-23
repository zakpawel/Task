require('expose?$!expose?jQuery!jquery');
require('bootstrap-webpack');
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import * as App from './App';
import * as UserModal from './UserModal';

const update = (state, action) => {
  const newState = App.update(state, action);
  newState.userModal = UserModal.update(newState.userModal, action);
  return newState;
};

const store = createStore(update);

const render = () => {
  ReactDOM.render(
    <App.View
      store={store}
    />,
		document.getElementById('app')
	);
};

store.subscribe(render);
render();
