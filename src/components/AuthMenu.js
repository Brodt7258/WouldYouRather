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

  handleClick = () => {
    const { handleLoggedIn = null } = this.props;
    if (handleLoggedIn) {
      handleLoggedIn();
    }
  }

  render() {
    const { users, currentUser, authedUser } = this.props;
    
    return (
            <div>
              { authedUser &&
                <div>
                  <MenuItem
                    onClick={this.handleClick}
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
                    this.handleClick();
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
                <MenuItem
                  onClick={() => {
                    this.handleSetUser(null);
                    this.handleClick();
                  }}
                  style={{ display: 'flex' }}
                >
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