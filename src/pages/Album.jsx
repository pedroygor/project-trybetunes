import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    musics: [],
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    getMusics(id)
      .then((response) => {
        this.setState({ musics: [...response] });
      });
  }

  render() {
    const { musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header
          title="Album"
        />
        <div>
          {musics.length > 0
          && <h3 data-testid="album-name">{musics[0].collectionName}</h3>}
          {musics.length > 0 && <p data-testid="artist-name">{musics[0].artistName}</p>}
          {musics.length > 0 && musics.map((music, index) => (
            index !== 0 && <MusicCard
              key={ music.trackId }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
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
