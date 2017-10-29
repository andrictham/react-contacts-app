import React from 'react'
import PropTypes from 'prop-types'

const ListContacts = ({ contacts }) => {
	return (
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
						<button className="contact-remove" />
					</li>
				)
			})}
		</ol>
	)
}

ListContacts.propTypes = {
	contacts: PropTypes.array.isRequired,
}

export default ListContacts
