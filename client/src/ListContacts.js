import React from 'react'
import PropTypes from 'prop-types'

class ListContacts extends React.Component {
	render() {
		const { contacts } = this.props
		return (
			<ol className="contact-list">
				{contacts.map(contact => {
					return (
						<li>
							<img
								src={contact.avatarURL}
								width="100"
								alt={`Avatar for ${contact.name}`}
							/>
							<h1>{contact.name}</h1>
							<p>{contact.email}</p>
						</li>
					)
				})}
			</ol>
		)
	}
}

export default ListContacts
