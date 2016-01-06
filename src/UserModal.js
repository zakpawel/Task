import React from "react";
import ReactDOM from "react-dom";
import { Button, Modal, Table, Input } from "react-bootstrap";
require('./fixGlyphs.less');

export const initialState = (user) => {
	const state = {
		validation: {
			name: false,
			email: false
		},
		messages: {
			name: null,
			email: null
		},
		user: user
	}
	return state;
}


export const update = (state = initialState(), action) => {
	console.log(action);
	switch (action.type) {
		case 'EDIT_NAME':
			return {
				...state,
				user: {...state.user, name: action.name}
			};
		case 'EDIT_EMAIL':
			return {
				...state,
				user: {...state.user, email: action.email}
			}
		case 'VALIDATE':
			const newState = {
				...state,
			}
			action.fields.forEach(key => {
				newState.validation[key] = true
			})
			return newState;
		default:
			return state;
	}
}

const validateName = name => {
	if (name) {
		if (name.length > 2) {
			return "success"
		}
	}
	return "error";
}

const validateEmail = email => {
    var re = /\S+@\S+\.\S+/;
    if (re.test(email)) {
    	return "success";
    }
    return "error";
}

export class View extends React.Component {

	render() {

		let { state, onSave, onCancel, store } = this.props;
		let { user, validation } = state;

		let nameStyle = null;
		let emailStyle = null;

		let nameValidation = validateName(user.name);
		let emailValidation = validateEmail(user.email);

		if (validation.name) {
			nameStyle = nameValidation;
		}

		if (validation.email) {
			emailStyle = emailValidation;
		}

		return (
			<Modal show={true}>
				<Modal.Header>
					Edit user
				</Modal.Header>
				<Modal.Body>
					<form>
			      <Input
			      	class="fix-glyphs"
			        type="text"
			        value={user.name}
			        onChange={(e) =>
			        	store.dispatch({
				        	type: 'EDIT_NAME',
				        	name: e.target.value
				      	})
			      	}
			        onBlur={() =>
			        	store.dispatch({
				        	type: 'VALIDATE',
				        	fields: ['name']
				      	})
				      }
				      bsStyle={nameStyle}
			        placeholder="Enter name"
			        label="Name"
			        help="Min. 3 alphanumeric characters"
			        hasFeedback />
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
			       	bsStyle={emailStyle}
			        placeholder="Enter email"
			        help="Email format, e.g. name@mail.com"
			        label="Email"
			        
			        hasFeedback />
	        </form>
				</Modal.Body>
				<Modal.Footer>
		  		<Button
		  			onClick={() => {
		  				store.dispatch({
		  					type: 'VALIDATE',
		  					fields: ['name', 'email']
		  				});
		  				if (nameValidation === "success" && emailValidation === "success") {
								onSave(user)
							}
		  			}}
		  			bsStyle="primary">
		  				Save
		  		</Button>
		  		<Button onClick={onCancel}>Cancel</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

