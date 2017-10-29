import React, { Component } from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends Component {
	static propTypes = {
		contacts: PropTypes.array.isRequired,
		onDeleteContact: PropTypes.func.isRequired,
	}

	state = {
		query: '',
	}

	updateQuery = query => {
		this.setState({
			query: query.trim(),
		})
	}

	render() {
		const { contacts, onDeleteContact } = this.props
		let showingContacts
		// If someone has typed in our input field:
		if (this.state.query) {
			// TODO: Find out which contacts match their query, using regex
		} else {
			// TODO: Show whatever the contacts initially was
			showingContacts = this.props.contacts
		}
		return (
			<div className="list-contacts">
				<div className="list-contacts-top">
					<input
						type="text"
						className="search-contacts"
						placeholder="Search contacts"
						value={this.state.query}
						onChange={event => this.updateQuery(event.target.value)}
					/>
				</div>
				<ol className="contact-list">
					{contacts.map(contact => {
						return (
							<li key={contact.id} className="contact-list-item">
								<div
									className="contact-avatar"
									style={{
										backgroundImage: `url(${contact.avatarURL})`,
									}}
								/>
								<div className="contact-details">
									<p>{contact.name}</p>
									<p>{contact.email}</p>
								</div>
								<button
									className="contact-remove"
									onClick={() => onDeleteContact(contact)}
								>
									Remove
								</button>
							</li>
						)
					})}
				</ol>
			</div>
		)
	}
}

export default ListContacts
