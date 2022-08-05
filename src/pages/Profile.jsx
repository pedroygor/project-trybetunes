import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  state = {
    user: {},
    loading: false,
  }

  componentDidMount() {
    this.getUserProfile();
  }

  getUserProfile = async () => {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ user, loading: false });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header
          title="Perfil"
          titleName={ user.name }
        />
        {loading ? <Loading />
          : (
            <div>
              <div>
                <h4>Nome</h4>
                <h5>{user.name}</h5>
                {user.image
                && <img
                  data-testid="profile-image"
                  src={ user.image }
                  alt={ user.name }
                />}
                <p>{user.email}</p>
                <p>{user.description}</p>
              </div>
            </div>
          )}
        <Link to="/profile/edit"> Editar perfil</Link>
      </div>
    );
  }
}
