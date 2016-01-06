import React from "react";
import ReactDOM from "react-dom";
import { Button, Modal, Table, Input } from "react-bootstrap";

export const update = (state = {}, action) => {
	switch (action.type) {
		case 'EDIT_NAME':
			return {
				...state,
				name: action.username
			};
		case 'EDIT_EMAIL':
			return {
				...state,
				email: action.email
			}
		default:
			return state;
	}
}

export class View extends React.Component {

	render() {

		let { user, onSave, onCancel } = this.props;

		return (
			<Modal.Dialog>
				<Modal.Body>
		      <Input
		        type="text"
		        value={user.name}
		        onChange={() => {}}
		        placeholder="Enter name"
		        label="Name"
		        help="Validation is based on string length."
		        hasFeedback
		        ref="input"
		        groupClassName="group-class"
		        labelClassName="label-class"/>
		        <Input
			        type="text"
			        value={user.email}
			        onChange={() => {}}
			        placeholder="Enter email"
			        label="Email"
			        help="Validation is based on string length."
			        hasFeedback
			        ref="input"
			        groupClassName="group-class"
		        	labelClassName="label-class"/>
				</Modal.Body>
				<Modal.Footer>
		  		<Button onClick={onCancel}>Cancel</Button>
		  		<Button onClick={() => onSave(user)} bsStyle="primary">Save user</Button>
				</Modal.Footer>
			</Modal.Dialog>
		);
	}
}

