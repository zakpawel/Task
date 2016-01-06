import React from "react";
import ReactDOM from "react-dom";
import { Button, Modal, Table } from "react-bootstrap";

const UserModal = ({
	user,
	onSave,
	onCancel
}) => (
	<Modal.Dialog>
		<Modal.Body>
			{user.name}
			{user.email}
		</Modal.Body>
		<Modal.Footer>
  		<Button onClick={onCancel}>Cancel</Button>
  		<Button onClick={onSave} bsStyle="primary">Save user</Button>
		</Modal.Footer>
	</Modal.Dialog>
)

export default UserModal;