import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui-next/Paper';
import { MenuList } from 'material-ui-next/Menu';
import { setAuthedUser } from '../actions/authedUser';
import AuthMenu from './AuthMenu';

class Login extends Component {
  handleSetUser = id => {
    const { dispatch } = this.props;

    dispatch(setAuthedUser(id));
  }

  render() {
    return (
      <div style={{ marginTop: '20px' }}>
        <Paper 
          style={{ width: '50%', margin: 'auto' }}
        >
          <p>Login</p>
          <MenuList>
            <AuthMenu />    
          </MenuList>
        </Paper>
      </div>
    );
  }
}

export default connect()(Login);