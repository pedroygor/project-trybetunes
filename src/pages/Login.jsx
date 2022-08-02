import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Login.module.css';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Login extends Component {
  state = {
    name: '',
    isDisable: true,
    click: false,
  }

  checkButtonDisable = () => {
    this.setState((prevState) => {
      const minLength = 3;
      const checkLenght = prevState.name.length < minLength;

      return {
        isDisable: checkLenght,
      };
    });
  }

  handleChange = ({ target }) => {
    const { name } = target;
    this.setState({ [name]: target.value }, this.checkButtonDisable);
  }

  handleClick = async () => {
    const { name } = this.state;
    this.setState({ click: true });
    await createUser({ name });
    const { history } = this.props;
    history.push('/search');
  }

  render() {
    const { name, isDisable, click } = this.state;
    return (
      <div data-testid="page-login" className={ styles.box }>
        <div className={ styles.container }>
          <h1>Login</h1>
          <input
            data-testid="login-name-input"
            name="name"
            type="text"
            placeholder="Username"
            onChange={ this.handleChange }
            value={ name }
          />
          <button
            data-testid="login-submit-button"
            type="submit"
            className={ styles.button }
            disabled={ isDisable }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </div>

        {click && <Loading />}

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
