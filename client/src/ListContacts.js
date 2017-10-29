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
			// `escapeRegExp` helps us to automatically escape special characters that are used as delimiters, so they can be treated as a string literal.
			// 'i' ignores case-sensitivity.
			const match = new RegExp(escapeRegExp(this.state.query), 'i')
			showingContacts = this.props.contacts.filter(
				// If contact matches our query
				contact => match.test(contact.name),
			)
		} else {
			// Show whatever the contacts initially was
			showingContacts = this.props.contacts
		}

		// Sort by alphabetical order
		showingContacts.sort(sortBy('name'))

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
