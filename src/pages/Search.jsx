import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Card from '../components/Card';

export default class Search extends Component {
  state = {
    name: '',
    nameArtist: '',
    isDisable: true,
    albuns: [],
    isEmpty: false,
    click: false,
    artist: '',
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

  handleClick = () => {
    const { nameArtist } = this.state;
    this.setState({ click: true, artist: nameArtist });
    searchAlbumsAPI(nameArtist)
      .then((response) => {
        this.setState({
          albuns: [...response],
          nameArtist: '',
          isDisable: true,
          click: false },
        this.checkIsEmpty);
      });
  }

  checkIsEmpty = () => {
    const { albuns } = this.state;
    const isEmpty = albuns.length === 0;
    this.setState({ isEmpty });
  }

  checkButtonIsDisable = () => {
    this.setState((prevState) => {
      const minCaracters = 2;
      const isDisable = prevState.nameArtist.length < minCaracters;
      return {
        isDisable,
      };
    });
  }

  render() {
    const { name, nameArtist, isDisable, albuns, isEmpty, click, artist } = this.state;
    const titleSearch = (
      <h2>
        Resultado de álbuns de:
        {' '}
        {artist}
      </h2>);
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
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </div>
        <div>
          {click && <Loading />}
          {artist && titleSearch}
          {isEmpty ? <span>Nenhum álbum foi encontrado</span> : albuns.map((album) => (
            <Link key={ album.collectionId } to={ `/album/${album.collectionId}` }>
              <Card
                collectionId={ album.collectionId }
                imgAlbum={ album.artworkUrl100 }
                titleAlbum={ album.collectionName }
                artist={ album.artistName }
              />
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
