import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';

class AuthMenu extends Component {
  handleSetUser = e => {
    const { dispatch } = this.props;

    dispatch(setAuthedUser(e.target.value));
  }
  
  render() {
    const { authedUser, users, loading } = this.props;

    return (
      <div>
      {
        loading
        ? null
        : <select value={authedUser} onChange={this.handleSetUser}>
            {
              users.map(u => (
                <option key={u.id} value={u.id}>{u.name}</option>
              )) 
            }
          </select>
      }
      </div>
    );
  }
}

const mapStateToProps = ({ users, authedUser }) => {
  return {
    authedUser,
    users: users
      ? Object.values(users)
        .map(({ id, name }) => ({ id, name }))
      : [],
    loading: authedUser === null
  };
};

export default connect(mapStateToProps)(AuthMenu);