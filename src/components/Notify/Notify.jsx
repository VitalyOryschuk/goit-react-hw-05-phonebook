import React from 'react';
import T from 'prop-types';
import styles from './Notify.module.css';

const Notify = ({ message }) => <h2 className={styles.title}>{message}</h2>;

Notify.propTypes = {
  message: T.string.isRequired,
};

export default Notify;
