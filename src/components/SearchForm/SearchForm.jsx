import React, { Component } from 'react';
import shortid from 'shortid';
// import { CSSTransition } from 'react-transition-group';
import styles from './SearchForm.module.css';

export default class SearchForm extends Component {
  // static defaultProps = {
  //   onChangeSubmit: function,
  // };

  state = {
    name: '',
    number: '',
  };

  nameInputId = shortid.generate();

  numberInputId = shortid.generate();

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onChangeSubmit({ ...this.state });
    this.reset();
  };

  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;
    return (
      <div>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <label htmlFor={this.nameInputId}>
            Name
            <input
              className={styles.input}
              type="text"
              value={name}
              onChange={this.handleChange}
              id={this.nameInputId}
              name="name"
            />
          </label>
          <label htmlFor={this.numberInputId}>
            Number
            <input
              className={styles.input}
              type="number"
              value={number}
              onChange={this.handleChange}
              id={this.numberInputId}
              name="number"
            />
          </label>
          <button className={styles.button} type="submit">
            Add contacts
          </button>
        </form>
      </div>
    );
  }
}
