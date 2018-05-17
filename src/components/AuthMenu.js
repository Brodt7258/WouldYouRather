import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { MenuItem } from 'material-ui-next/Menu';
import UserAvatar from './UserAvatar';

class AuthMenu extends Component {
  handleSetUser = id => {
    const { dispatch } = this.props;

    dispatch(setAuthedUser(id));
    this.setState({ anchorEl: null });
  }

  render() {
    const { users, currentUser, authedUser, handleLoggedIn = null } = this.props;
    
    return (
            <div>
              { authedUser &&
                <div>
                  <MenuItem
                    onClick={handleLoggedIn}
                    style={{ display: 'flex' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'flex-end', flex: 1 }}>
                      <UserAvatar uID={currentUser.id} style={{ marginRight: 10 }} />
                    </div>
                    <div style={{ flex: 2 }}>{currentUser.name}</div>
                  </MenuItem>
                  <hr />
                </div>  
              }
              { 
                users.filter(u => currentUser ? u.id !== currentUser.id : true)
                .map(u => (
                <MenuItem 
                  key={u.id}
                  onClick={() => {
                    this.handleSetUser(u.id);
                    if (handleLoggedIn) {
                      handleLoggedIn()
                    }
                  }}
                  style={{ display: 'flex' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'flex-end', flex: 1 }}>
                    <UserAvatar uID={u.id} style={{ marginRight: 10 }} />
                  </div>
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
          </div>  
    );
  }
}

const mapStateToProps = ({ users, authedUser }, props) => {
  return {
    authedUser,
    currentUser: authedUser ? Object.values(users).filter(u => u.id === authedUser)[0] : null,
    users: users
      ? Object.values(users)
        .map(({ id, name }) => ({ id, name }))
      : [],
    ...props
  };
};

export default connect(mapStateToProps)(AuthMenu);