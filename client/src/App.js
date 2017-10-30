import React, { Component } from 'react'
import ListContacts from './ListContacts'

class App extends Component {
	constructor(props) {
		super(props)
		this.removeContact = this.removeContact.bind(this)
	}

	state = {
		contacts: [
			{
				id: 'ryan',
				name: 'Ryan Florence',
				email: 'ryan@reacttraining.com',
				avatarURL: 'http://localhost:5001/ryan.jpg',
			},
			{
				id: 'michael',
				name: 'Michael Jackson',
				email: 'michael@reacttraining.com',
				avatarURL: 'http://localhost:5001/michael.jpg',
			},
			{
				id: 'tyler',
				name: 'Tyler McGinnis',
				email: 'tyler@reacttraining.com',
				avatarURL: 'http://localhost:5001/tyler.jpg',
			},
		],
	}

	removeContact = selectedContact => {
		// We’re returning an object literal inside this.setState, so our function body needs to be wrapped with (). https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#Returning_object_literals
		this.setState(prevState => ({
			contacts: prevState.contacts.filter(
				// Filter out any contacts whose ID matches our deleted contact.
				contact => contact.id !== selectedContact.id,
			),
		}))
	}

	render() {
		const { contacts } = this.state
		return (
			<div>
				<ListContacts
					contacts={contacts}
					onDeleteContact={this.removeContact}
				/>
			</div>
		)
	}
}

export default App
