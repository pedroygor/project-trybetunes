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

  async componentDidMount() {
    await this.getAllAlbuns();
    await this.getAllFavorites();
  }

  getAllFavorites = async () => {
    const favorites = await getFavoriteSongs();
    this.setState({ tracksFavorites: [...favorites] });
  }

  getAllAlbuns = async () => {
    const { match: { params: { id } } } = this.props;
    const allAlbuns = await getMusics(id);
    this.setState({ descriptionAlbum: allAlbuns[0], musics: allAlbuns.slice(1) });
  }

  handleChange = async (trackId) => {
    this.setState({ loading: true });
    const { tracksFavorites } = this.state;
    if (tracksFavorites.some((id) => id === trackId)) {
      await removeSong(trackId);
      this.setState((prevState) => ({
        tracksFavorites: prevState.tracksFavorites.filter((id) => id !== trackId),
      }));
    } else {
      this.setState({ loading: true });
      await addSong(trackId);
      this.setState((prevState) => ({
        tracksFavorites: [...prevState.tracksFavorites, trackId],
      }));
    }
    this.setState({ loading: false });
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
        <div>
          {loading && <Loading />}
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
              isFavorite={ tracksFavorites.some((id) => id === music.trackId) }
            />
          ))}
        </div>
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
