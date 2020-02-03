import React, { Component } from 'react';
import shortid from 'shortid';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import SearchForm from './SearchForm/SearchForm';
import ContactsList from './ContactsList/ContactsList';
import Notify from './Notify/Notify';
import Filter from './Filter/Filter';
import styles from './style.module.css';
import '../transition/fade.css';
import '../transition/slide.css';
import message from '../transition/message.module.css';
import pop from '../transition/pop.module.css';

const filterContacts = (contacts, filter) => {
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
  );
};

const findContact = (contacts, contact) =>
  contacts.find(item => item.name.toLowerCase() === contact.name.toLowerCase());

export default class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermion Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    isShowNotify: false,
    info: '',
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
    const contactFind = findContact(this.state.contacts, contact);
    const contactToAdd = {
      ...contact,
      id: shortid.generate(),
    };

    if (contactFind) {
      this.setState({
        info: `${contactFind.name} is already in contacts!`,
        isShowNotify: true,
      });
      this.hideNotify();
    } else if (contact.name) {
      this.setState(state => ({
        contacts: [...state.contacts, contactToAdd],
        isShowNotify: false,
      }));
    } else {
      this.setState({ info: `Input name please!`, isShowNotify: true });
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
    this.setState(state => ({
      contacts: state.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter, info, isShowNotify } = this.state;
    const filteredContacts = filterContacts(contacts, filter);
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
                <Notify message={info} />
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
