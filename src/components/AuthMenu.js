import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import Button from 'material-ui-next/Button';
import Menu, { MenuItem } from 'material-ui-next/Menu';
import UserAvatar from './UserAvatar';

class AuthMenu extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleSetUser = id => {
    const { dispatch } = this.props;

    dispatch(setAuthedUser(id));
    this.setState({ anchorEl: null });
  }
  
  render() {
    const { users, isLoading, currentUser } = this.props;
    const { anchorEl } = this.state;
    
    return (
        isLoading
        ? null
        : (<div>
          <div style={{ display: 'flex' }} onClick={this.handleClick}>
            <UserAvatar uID={currentUser.id} />
            <Button >
              {currentUser ? currentUser.name : 'Login'}
            </Button>
            
          </div>
          <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
              anchorPosition={{ top: 1000, left: 300 }}
            >
              <MenuItem
                onClick={() => this.handleSetUser(currentUser.id)}
                style={{ display: 'flex' }}
              >
                <div style={{ flex: 1 }}><UserAvatar uID={currentUser.id} style={{ marginRight: 10 }} /></div>
                <div style={{ flex: 2 }}>{currentUser.name}</div>
              </MenuItem>
              {users.filter(u => u.id !== currentUser.id)
                .map(u => (
                <MenuItem 
                  key={u.id}
                  onClick={() => this.handleSetUser(u.id)}
                  style={{ display: 'flex' }}
                >
                  <div style={{ flex: 1 }}><UserAvatar uID={u.id} style={{ marginRight: 10 }} /></div>
                  <div style={{ flex: 2 }}>{u.name}</div>
                </MenuItem>))}
              
              { currentUser &&
                <div>
                <hr />
                <MenuItem onClick={() => this.handleSetUser(null)} style={{ display: 'flex' }}>
                  <div style={{ flex: 1 }}></div>
                  <div style={{ flex: 2 }}>Logout</div>
                </MenuItem>
                </div>
              }
            </Menu>
          </div>
        )
        
    );
  }
}

const mapStateToProps = ({ users, authedUser, isLoading }) => {
  return {
    currentUser: authedUser ? Object.values(users).filter(u => u.id === authedUser)[0] : {},
    users: users
      ? Object.values(users)
        .map(({ id, name }) => ({ id, name }))
      : [],
    isLoading
  };
};

export default connect(mapStateToProps)(AuthMenu);