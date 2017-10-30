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
			query: query.trim(), // `.trim` gets rid of trailing whitespaces
		})
	}

	render() {
		const { contacts, onDeleteContact } = this.props
		const { query } = this.state
		let showingContacts
		// If someone has typed in our input field:
		if (query) {
			// `escapeRegExp` helps us to automatically escape special characters that are used as delimiters, so they can be treated as a string literal.
			// 'i' ignores case-sensitivity.
			const match = new RegExp(escapeRegExp(query), 'i')
			showingContacts = contacts.filter(
				// If contact matches our query
				contact => match.test(contact.name),
			)
		} else {
			// Show whatever the contacts initially was
			showingContacts = contacts
		}

		// Sort by alphabetical order
		// `.sort` is a built in JS method on arrays
		// `sortBy` is a small utility function,
		// which helps us sort alphabetically
		showingContacts.sort(sortBy('name'))

		return (
			<div className="list-contacts">
				<div className="list-contacts-top">
					<input
						type="text"
						className="search-contacts"
						placeholder="Search contacts"
						value={query}
						onChange={event => this.updateQuery(event.target.value)}
					/>
				</div>
				<ol className="contact-list">
					{showingContacts.map(contact => {
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
