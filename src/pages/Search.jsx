import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

export default class Search extends Component {
  state = {
    name: '',
    nameArtist: '',
    isDisable: true,
  }

  componentDidMount() {
    this.getName()
      .then(({ name }) => {
        this.setState({ name });
      });
  }

  getName = async () => {
    const nome = await getUser();
    return nome;
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.checkButtonIsDisable);
  }

  checkButtonIsDisable = () => {
    const { nameArtist } = this.state;
    const minCaracters = 2;
    const isDisable = nameArtist.length < minCaracters;

    this.setState({ isDisable });
  }

  render() {
    const { name, nameArtist, isDisable } = this.state;
    return (
      <div data-testid="page-search">
        <Header
          title="Search"
        />
        {!name && <Loading />}
        <span data-testid="header-user-name">{name}</span>
        <div>
          <input
            type="search"
            name="nameArtist"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
            value={ nameArtist }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ isDisable }
          >
            Pesquisar
          </button>
        </div>
      </div>
    );
  }
}
