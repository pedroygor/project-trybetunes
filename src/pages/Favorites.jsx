import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  state = {
    favorites: [],
    loading: false,
  }

  componentDidMount() {
    this.getAllFavorites();
  }

getAllFavorites = async () => {
  this.setState({ loading: true });
  const favorites = await getFavoriteSongs();
  this.setState({ favorites, loading: false });
}

handleChange = async (_event, music) => {
  this.setState({ loading: true });
  await removeSong(music);
  await this.getAllFavorites();
}

render() {
  const { favorites, loading } = this.state;
  return (
    <div data-testid="page-favorites">
      <Header
        title="Favoritos"
      />
      {loading
        ? (<Loading />)
        : favorites.map((music) => (
          <MusicCard
            key={ music.trackId }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
            handleChange={ this.handleChange }
            trackId={ music.trackId }
            isFavorite={ favorites
              .some(({ trackId }) => trackId === music.trackId) }
            music={ music }
          />
        ))}
    </div>
  );
}
}
