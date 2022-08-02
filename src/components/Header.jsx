import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    const { title } = this.props;
    return (
      <header data-testid="header-component">
        <h1>{title}</h1>
        <nav>
          <ul>
            <li>
              <Link data-testid="link-to-favorites" to="/favorites"> Favoritos </Link>
            </li>
            <li>
              <Link data-testid="link-to-profile" to="/profile"> Profile </Link>
            </li>
            <li>
              <Link data-testid="link-to-search" to="/search"> Search </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
