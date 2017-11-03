import React, { Component } from 'react'
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component {
	constructor(props) {
		super(props)
		this.removeContact = this.removeContact.bind(this)
	}

	state = {
		screen: 'list', // list, create
		contacts: [],
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
				{this.state.screen === 'list' && (
					<ListContacts
						contacts={contacts}
						onDeleteContact={this.removeContact}
						onNavigate={() => {
							this.setState({
								screen: 'create',
							})
						}}
					/>
				)}
				{this.state.screen === 'create' && <CreateContact />}
			</div>
		)
	}
}

export default App
