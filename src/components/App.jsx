import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import shortid from 'shortid';
// helpers
import * as CONTACT from '../helpers';
// components
import SearchForm from './SearchForm/SearchForm';
import ContactsList from './ContactsList/ContactsList';
import Notify from './Notify/Notify';
import Filter from './Filter/Filter';
// transition
import '../transition/fade.css';
import '../transition/slide.css';
import message from '../transition/message.module.css';
import pop from '../transition/pop.module.css';
// css
import styles from './style.module.css';

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
    isShowNotify: false,
    messageNotify: '',
  };

  componentDidMount() {
    const persistedTask = localStorage.getItem('contacts');
    if (persistedTask) {
      const contacts = JSON.parse(persistedTask);
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  handleSignUp = contact => {
    const contactFind = CONTACT.findContact(this.state.contacts, contact);
    const contactToAdd = {
      ...contact,
      id: shortid.generate(),
    };

    if (contactFind) {
      this.setState({
        messageNotify: `${contactFind.name} is already in contacts!`,
        isShowNotify: true,
      });
      this.hideNotify();
    } else if (contact.name) {
      this.setState(state => ({
        contacts: [...state.contacts, contactToAdd],
        isShowNotify: false,
      }));
    } else {
      this.setState({ messageNotify: `Input name please!`, isShowNotify: true });
      this.hideNotify();
    }
  };

  hideNotify = () => {
    setTimeout(() => {
      this.setState({ isShowNotify: false });
    }, 1000);
  };

  handleChangeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  deleteContact = id => {
    const filtered = this.state.contacts.filter(contact => contact.id !== id);
    this.setState(state => ({
      contacts: filtered,
    }));
  };

  render() {
    const { contacts, filter, messageNotify, isShowNotify } = this.state;
    const filteredContacts = CONTACT.filterContacts(contacts, filter);
    return (
      <CSSTransition in timeout={1000} classNames="fade" appear>
        <div className={styles.container}>
          <CSSTransition in timeout={2000} classNames="slide" appear>
            <h2 className={styles.title}>PhoneBook</h2>
          </CSSTransition>
          <TransitionGroup>
            {isShowNotify && (
              <CSSTransition
                timeout={{ enter: 250, exit: 750 }}
                classNames={message}
                unmountOnExit
              >
                <Notify message={messageNotify} />
              </CSSTransition>
            )}
          </TransitionGroup>
          <SearchForm onChangeSubmit={this.handleSignUp} />
          {contacts.length > 0 && <h2 className={styles.title}>Contacts</h2>}
          <TransitionGroup>
            {contacts.length > 1 && (
              <CSSTransition timeout={{ enter: 250, exit: 1000 }} classNames={pop}>
                <Filter value={filter} onChangeFilter={this.handleChangeFilter} />
              </CSSTransition>
            )}
          </TransitionGroup>
          <ContactsList items={filteredContacts} onDeleteContact={this.deleteContact} />
        </div>
      </CSSTransition>
    );
  }
}
