import React from "react";
import ReactDOM from 'react-dom';
import UserModal from "./UserModal";
import { Button, Modal, Table } from "react-bootstrap";

const initialModel = {
	modal: false,
	currentUser: { id: 1
		, name: 'Test1'
		, email: 'test1@outlook.com'
		},
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

export const update = (state = initialModel, action) => {
	switch (action.type) {
		case 'CLOSE_ADD_USER':
			return {
				...state,
				modal: false
			}
		case 'SHOW_ADD_USER':
			return {
				...state,
				modal: true
			}
		default:
			return state
	}
}

export const View = ({
	store,
	onAddUser
}) => {
	const state = store.getState();
	let modal = null;

	if (state.modal) {
		modal = (
			<UserModal
				user={state.currentUser}
				onSave={() =>
					store.dispatch({
						type: 'CLOSE_ADD_USER'
					})
				}
				onCancel={() =>
					store.dispatch({
						type: 'CLOSE_ADD_USER'
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
		</tr>
	);
});

	return (
		<div>
			{modal}
			<Table striped bordered condensed hover>
				<tbody>
					{rows}
				</tbody>
			</Table>
			<Button
				bsStyle='primary'
				onClick={() =>
					store.dispatch({
						type: 'SHOW_ADD_USER'
					})
				}>Add</Button>
		</div>
	);
};
