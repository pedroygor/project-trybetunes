import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

export default class Album extends Component {
  state = {
    musics: [],
    checkFavorite: false,
    loading: false,
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    getMusics(id)
      .then((response) => {
        this.setState({ musics: [...response] });
      });
  }

  handleChange = async (trackId) => {
    this.setState({ loading: true });
    await addSong(trackId);
    this.setState({ loading: false });
  }

  render() {
    const { musics, checkFavorite, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header
          title="Album"
        />
        <div>
          {loading && <Loading />}
          {musics.length > 0
          && <h3 data-testid="album-name">{musics[0].collectionName}</h3>}
          {musics.length > 0 && <p data-testid="artist-name">{musics[0].artistName}</p>}
          {musics.length > 0 && musics.map((music, index) => (
            index !== 0 && <MusicCard
              key={ music.trackId }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              handleChange={ this.handleChange }
              checkFavorite={ checkFavorite }
              trackId={ music.trackId }
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
