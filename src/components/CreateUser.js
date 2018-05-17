import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUser } from '../actions/users'

class CreateUser extends Component {
  
  handleCreateUser = () => {
    const { dispatch } = this.props;
    const user = { id: 'derrrr', name: 'testing Testingggg' }
    dispatch(createUser(user));
  }

  render() {
    return (
      <div>
        CreateUser
        <button onClick={this.handleCreateUser}>test</button>
      </div>
    )
  }
}

export default connect()(CreateUser);