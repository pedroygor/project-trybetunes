import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

export default class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptionAlbum: {},
      musics: [],
      tracksFavorites: [],
      checkFavorite: false,
      loading: false,
    };
  }

  componentDidMount() {
    this.getAllFavorites();
  }

  getAllFavorites = async () => {
    this.setState({ loading: true });
    const favorites = await getFavoriteSongs();
    this.setState({ tracksFavorites: [...favorites], loading: false });
    await this.getAllAlbuns();
  }

  getAllAlbuns = async () => {
    const { match: { params: { id } } } = this.props;
    const allAlbuns = await getMusics(id);
    this.setState({ descriptionAlbum: allAlbuns[0],
      musics: allAlbuns.slice(1) });
  }

  handleChange = async ({ target: { checked } }, music) => {
    this.setState({ loading: true });
    if (checked) {
      this.setState({ loading: true });
      await addSong(music);
      this.setState((prevState) => ({
        tracksFavorites: [...prevState.tracksFavorites, music],
        loading: false,
      }));
    } else {
      await removeSong(music);
      this.setState((prevState) => ({
        tracksFavorites: prevState.tracksFavorites
          .filter(({ trackId }) => trackId !== music.trackId),
        loading: false,
      }));
    }
  }

  render() {
    const {
      musics,
      checkFavorite,
      loading,
      descriptionAlbum,
      tracksFavorites,
    } = this.state;
    return (
      <div data-testid="page-album">
        <Header
          title="Album"
        />
        {loading
          ? (<Loading />) : (
            <div>
              <h3 data-testid="album-name">{descriptionAlbum.collectionName}</h3>
              <p data-testid="artist-name">{descriptionAlbum.artistName}</p>
              {musics.map((music) => (
                <MusicCard
                  key={ music.trackId }
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
                  handleChange={ this.handleChange }
                  checkFavorite={ checkFavorite }
                  trackId={ music.trackId }
                  isFavorite={ tracksFavorites
                    .some(({ trackId }) => trackId === music.trackId) }
                  music={ music }
                />
              ))}
            </div>
          )}

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
