import React from 'react';
import T from 'prop-types';
import styles from './ContactsList.module.css';

const Contact = ({ contact, onDeleteContact }) => (
  <div>
    <p className={styles.container}>
      {contact.name}:<span>{contact.number}</span>
      <button onClick={onDeleteContact} className={styles.button} type="button">
        Delete
      </button>
    </p>
  </div>
);

Contact.propTypes = {
  contact: T.shape({
    name: T.string.isRequired,
    number: T.string.isRequired,
  }).isRequired,
  onDeleteContact: T.func.isRequired,
};

export default Contact;
