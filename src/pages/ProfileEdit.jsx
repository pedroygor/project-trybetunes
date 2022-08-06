import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  state = {
    loading: false,
    user: {},
    isDisable: true,
  }

componentDidMount = async () => {
  await this.getUserProfile();
  this.validationForm();
}

  getUserProfile = async () => {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ user, loading: false });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        [name]: value,
      },
    }), this.validationForm);
  }

  validationForm = () => {
    const { user } = this.state;
    const mailFormat = new RegExp('[a-z0-9]+@[a-z]+\\.[a-z]{2,3}');
    const isValidEmail = mailFormat.test(user.email);
    const isFieldValid = user.name.length > 0
    && user.description.length > 0 && user.image.length > 0;
    const isValid = isValidEmail && isFieldValid;
    this.setState({ isDisable: !isValid });
  }

  handleClick = async () => {
    const { user } = this.state;
    await updateUser(user);
  }

  render() {
    const { loading, user, isDisable } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header
          title="Profile Edit"
          titleName={ user.name }
        />
        {loading ? <Loading /> : (
          <div>
            <form>
              <label htmlFor="name">
                Nome:
                <input
                  type="text"
                  name="name"
                  id="name"
                  data-testid="edit-input-name"
                  onChange={ this.handleChange }
                  value={ user.name }
                />
              </label>

              <label htmlFor="email">
                Email:
                <input
                  type="email"
                  name="email"
                  id="email"
                  data-testid="edit-input-email"
                  onChange={ this.handleChange }
                  value={ user.email }
                />
              </label>

              <label htmlFor="description">
                Descrição
                <input
                  type="text"
                  name="description"
                  id="description"
                  data-testid="edit-input-description"
                  onChange={ this.handleChange }
                  value={ user.description }
                />
              </label>

              <label htmlFor="image">
                Imagem
                <input
                  type="text"
                  name="image"
                  src={ user.image }
                  alt={ user.name }
                  onChange={ this.handleChange }
                  value={ user.image }
                  data-testid="edit-input-image"
                />
              </label>

              <Link to="/profile">
                <button
                  type="submit"
                  onClick={ this.handleClick }
                  disabled={ isDisable }
                  data-testid="edit-button-save"
                >
                  Enviar
                </button>
              </Link>
            </form>
          </div>
        )}

      </div>
    );
  }
}
