import React from "react";
import ReactDOM from 'react-dom';
import * as UserModal from "./UserModal";
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

const tempID = (() => {
	let nextId = 0;
	return () => {
		return nextId++;
	}
})();

export const update = (state = initialModel, action) => {
	switch (action.type) {
		case 'CLOSE_ADD_USER':
			return {
				...state,
				modal: false
			}
		case 'ADD_USER':
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
				modal: false

			}
		case 'NEW_USER':
			return {
				...state,
				currentUser: {
					id: tempID(),
					name: '',
					email: ''
				},
				modal: true
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
				user={state.currentUser}
				onSave={(user) =>
					store.dispatch({
						type: 'ADD_USER',
						user: user
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
						type: 'NEW_USER'
					})
				}>Add</Button>
		</div>
	);
};
