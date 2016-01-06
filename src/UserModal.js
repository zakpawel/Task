import React from "react";
import ReactDOM from "react-dom";
import { Button, Modal, Table, Input } from "react-bootstrap";

export const update = (state, action) => {
	console.log(action);
	switch (action.type) {
		case 'EDIT_NAME':
			return {
				...state,
				name: action.name
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

		let { user, onSave, onCancel, store } = this.props;

		return (
			<Modal.Dialog>
				<Modal.Body>
		      <Input
		        type="text"
		        value={user.name}
		        onChange={(e) =>
		        	store.dispatch({
			        	type: 'EDIT_NAME',
			        	name: e.target.value
			      	})
		      	}
		        onBlur={() => store.dispatch({
			        	type: 'VALIDATE',
			        	fields: ['name']
			      })}
		        placeholder="Enter name"
		        label="Name"
		        help="Min. 3 alphanumeric characters"
		        hasFeedback
		        ref={node => {
		        	this.nameInput = node;
		        }}
		        groupClassName="group-class"
		        labelClassName="label-class"/>
		        <Input
			        type="text"
			        value={user.email}
			        onChange={(e) =>
			        	store.dispatch({
			        		type: 'EDIT_EMAIL',
			        		email: e.target.value
			        	})
			        }
			        onBlur={() =>
			        	store.dispatch({
				        	type: 'VALIDATE',
				        	fields: ['email']
			        	})
			       	}
			        placeholder="Enter email"
			        label="Email"
			        help="Email format e.g. name@mail.com"
			        hasFeedback
			        ref={node => {
		        		this.emailInput = node;
		        	}}
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

