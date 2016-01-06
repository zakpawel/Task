import React from "react";
import ReactDOM from 'react-dom';
import * as UserModal from "./UserModal";
import { Button, Modal, Table, Panel, Dropdown, MenuItem, Glyphicon } from "react-bootstrap";

const initialModel = {
	modal: false,
	rows: [
		{ id: 1
		, name: 'Test1'
		, email: 'test1@outlook.com'
		},
		{ id:2
		, name: 'Test2'
		, email: 'test2@gmail.pl'
		}
	]
}

const tempID = (() => {
	let nextId = 0;
	return () => {
		return nextId--;
	}
})();

const newUser = () => {
	return {
		id: tempID(),
		name: '',
		email: ''
	};
};

export const update = (state = initialModel, action) => {
	switch (action.type) {
		case 'REMOVE_USER':
			return {
				...state,
				rows: state.rows.filter(user => {
					return user.id !== action.user.id;
				})
			}
		case 'CANCEL_USER':
			return {
				...state,
				modal: false
			}
		case 'SAVE_USER':
			const userFound = state.rows.findIndex((user) => {
				return user.id === action.user.id;
			})

			if (userFound === -1) {
				return {
					...state,
					modal: false,
					rows: [...state.rows, action.user]
				}
			}

			return {
				...state,
				rows: state.rows.map(user => {
					if (user.id === action.user.id) {
						return action.user;
					}
					return user;
				}),
				modal: false

			}
		case 'EDIT_USER':
			return {
				...state,
				modal: true,
				userModal: UserModal.initialState(action.user)
			}
		default:
			return state
	}
}

export const View = ({
	store
}) => {
	const state = store.getState();
	let modal = null;

	if (state.modal) {
		modal = (
			<UserModal.View
				store={store}
				state={state.userModal}
				onSave={(user) =>
					store.dispatch({
						type: 'SAVE_USER',
						user: user
					})
				}
				onCancel={() =>
					store.dispatch({
						type: 'CANCEL_USER'
					})
				}
			/>
		);
	}
let rows = state.rows.map(function(person) {
	return (
		<tr key={person.id}>
			<td>{person.name}</td>
			<td>{person.email}</td>
			<td style={{textAlign: 'center', verticalAlign: 'middle'}}>
				<Dropdown id={"dropdown" + person.id} pullRight>
					<Glyphicon style={{cursor: 'pointer'}} bsRole="toggle" glyph="cog" />
		      <Dropdown.Menu bsRole="menu">
		        <MenuItem
		        	onClick={() =>
		        		store.dispatch({
						    	type: 'EDIT_USER',
						    	user: { ...person }
		    				})
		        	}
		        	eventKey="1">
		        		Edit
		        </MenuItem>
		        <MenuItem
		        	onClick={() =>
		        		store.dispatch({
						    	type: 'REMOVE_USER',
						    	user: { ...person }
		    				})
		        	}
		        	eventKey="2">
		        		Remove
		        </MenuItem>
		      </Dropdown.Menu>
		    </Dropdown>
    	</td>
		</tr>
	);
});

	return (
		<div className="app-container">
			<Panel className="col-md-8 col-md-offset-2">
				{modal}
				<Table striped bordered condensed hover>
					<thead>
						<th>Name</th>
						<th>Email</th>
						<th>Actions</th>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</Table>
				<Button
					bsStyle='primary'
					onClick={() =>
						store.dispatch({
							type: 'EDIT_USER',
							user: newUser()
						})
					}>Create new</Button>
			</Panel>
		</div>
	);
};
