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

	constructor(props) {
		super(props);
		this.state = {
			name: props.name,
			email: props.email
		}
	}

	render() {

		let { user, onSave, onCancel, store } = this.props;

		return (
			<Modal.Dialog>
				<Modal.Body>
		      <Input
		        type="text"
		        value={this.state.name}
		        onChange={(e) => {
		        	this.setState({
		        		...this.state,
		        		name: e.target.value
		        	})
		        }}
		        onBlur={() => store.dispatch({
			        	type: 'EDIT_NAME',
			        	name: this.state.name
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
			        value={this.state.email}
			        onChange={(e) => {
			        	this.setState({
			        		...this.state,
			        		email: e.target.value
			        	})
			        }}
			        onBlur={() => store.dispatch({
			        	type: 'EDIT_EMAIL',
			        	email: this.state.email
			        })}
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

