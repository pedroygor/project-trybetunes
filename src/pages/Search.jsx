import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

export default class Search extends Component {
  state = {
    name: '',
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

  render() {
    const { name } = this.state;
    return (
      <div data-testid="page-search">
        <Header
          title="Search"
        />
        {!name && <Loading />}
        <span data-testid="header-user-name">{name}</span>
      </div>
    );
  }
}
