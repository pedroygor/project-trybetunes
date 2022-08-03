import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.css';

export default class Card extends Component {
  render() {
    const { imgAlbum, titleAlbum, artist, collectionId } = this.props;
    return (
      <div className={ styles.container } data-testid={ `link-to-album-${collectionId}` }>
        <div className={ styles.containerImg }>
          <img src={ imgAlbum } alt={ titleAlbum } />
        </div>
        <span className={ styles.titleAlbum }>{titleAlbum}</span>
        <span className={ styles.nameArtist }>{artist}</span>
      </div>
    );
  }
}

Card.propTypes = {
  imgAlbum: PropTypes.string.isRequired,
  titleAlbum: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
};
