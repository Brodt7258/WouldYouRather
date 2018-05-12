import React, { Component } from 'react';
import { connect } from 'react-redux';

class AuthMenu extends Component {
  render() {
    const { users } = this.props;

    return (
      <div>
        <select>
          {
            users.map(u => (
              <option key={u.id}>{u.name}</option>
            ))
          }
        </select>
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return {
    users: users
      ? Object.values(users)
        .map(({ id, name }) => ({ id, name }))
      : []
  };
};

export default connect(mapStateToProps)(AuthMenu);