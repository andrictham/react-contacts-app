import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component {
	constructor(props) {
		super(props)
		this.removeContact = this.removeContact.bind(this)
	}

	state = {
		contacts: [],
		// contacts: [
		// 	{
		// 		id: '...',
		// 		avatarURL: '...',
		//		name: 'John Appleseed',
		// 		email: 'name@email.com'
		// 	}
		// ]
	}

	createContact = contact => {
		ContactsAPI.create(contact).then(contact => {
			this.setState(state => ({
				contacts: state.contacts.concat([contact]),
			}))
		})
	}

	removeContact = selectedContact => {
		// We’re returning an object literal inside this.setState, so our function body needs to be wrapped with (). https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#Returning_object_literals
		this.setState(prevState => ({
			contacts: prevState.contacts.filter(
				// Filter out any contacts whose ID matches our deleted contact.
				contact => contact.id !== selectedContact.id,
			),
		}))

		ContactsAPI.remove(selectedContact)
	}

	componentDidMount() {
		ContactsAPI.getAll().then(contacts => {
			this.setState({
				contacts,
			})
		})
	}

	render() {
		const { contacts } = this.state
		return (
			<div>
				<Route
					exact
					path="/"
					// We want to be able to pass props to our component, so we use React Router’s render prop, which takes in a function that returns what we want to render. Since the body of the function is an object literal, we have to wrap it in () instead of {}.
					render={() => (
						<ListContacts
							contacts={contacts}
							onDeleteContact={this.removeContact}
						/>
					)}
				/>
				<Route
					exact
					path="/create"
					render={({ history }) => (
						<CreateContact
							onCreateContact={contact => {
								this.createContact(contact)
								// history is a prop given to us from Router
								// history.push programmatically controls the URL
								history.push('/')
							}}
						/>
					)}
				/>
			</div>
		)
	}
}

export default App
