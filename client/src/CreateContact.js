import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import serializeForm from 'form-serialize'
import ImageInput from './ImageInput'

class CreateContact extends Component {
	static propTypes = {
		onCreateContact: PropTypes.func.isRequired,
	}

	handleSubmit = event => {
		const { onCreateContact } = this.props
		event.preventDefault()
		// form-serialize does what the browser does, which is to take the 'name' prop of each form input, and pass it into the URL as query strings
		const formValues = serializeForm(event.target, {
			hash: true, // Output as a JS object
		})
		onCreateContact(formValues)
	}
	render() {
		return (
			<div>
				<Link className="close-create-contact" to="/">
					Close
				</Link>
				<form onSubmit={this.handleSubmit} className="create-contact-form">
					<ImageInput
						className="create-contact-avatar-input"
						name="avatarURL"
						maxHeight={128}
					/>
					<div className="create-contact-details">
						<input type="text" name="name" placeholder="Name" />
						<input type="text" name="email" placeholder="Email" />
						<button>Add Contact</button>
					</div>
				</form>
			</div>
		)
	}
}

export default CreateContact
