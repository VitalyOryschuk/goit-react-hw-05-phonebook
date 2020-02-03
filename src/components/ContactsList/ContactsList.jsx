import React from 'react';
import T from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Contact from './Contact';
import styles from './ContactsList.module.css';
import pop from './pop.module.css';

const ContactsList = ({ items, onDeleteContact }) => (
  <TransitionGroup component="ul" className={styles.contactList}>
    {items.map(contact => (
      <CSSTransition
        key={contact.id}
        timeout={{ enter: 750, exit: 850 }}
        unmountOnExit
        classNames={pop}
      >
        <li className={styles.ContactsListItem}>
          <Contact
            contact={contact}
            onDeleteContact={() => onDeleteContact(contact.id)}
          />
        </li>
      </CSSTransition>
    ))}
  </TransitionGroup>
);

ContactsList.propTypes = {
  items: T.arrayOf(T.shape({})).isRequired,
  onDeleteContact: T.func.isRequired,
};

export default ContactsList;
