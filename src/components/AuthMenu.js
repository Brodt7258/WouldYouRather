import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser';
import { MenuItem } from 'material-ui-next/Menu';
import { ListItemText } from 'material-ui-next/List';
import Add from 'react-icons/lib/md/add';
import Exit from 'react-icons/lib/md/exit-to-app';
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
    const { users, currentUser, authedUser, history } = this.props;
    
    return (
            <div>
              { authedUser &&
                <div>
                  <MenuItem
                    onClick={() => {
                      this.handleClick()
                      history.push(`/user/${authedUser}`)
                    }}
                    style={{ display: 'flex' }}
                  >  
                    <div style={{ display: 'flex', justifyContent: 'flex-end', flex: 1 }}>
                      <UserAvatar uID={currentUser.id} />
                    </div>
                    <ListItemText inset style={{ flex: 2 }}>
                      {currentUser.name}
                    </ListItemText>
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
                    <UserAvatar uID={u.id} />
                  </div>
                  <ListItemText inset style={{ flex: 2 }}>
                    {u.name}
                  </ListItemText>
                </MenuItem>))}

                {
                  users &&
                  <hr />
                }

                <MenuItem
                  onClick={() => {
                    this.handleClick();
                    history.push('/create');
                  }}
                  style={{ display: 'flex' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'flex-end', flex: 1 }}>
                    <Add style={{ padding: '10px' }} />
                  </div>
                  <ListItemText inset style={{ flex: 2 }}>
                    Create New
                  </ListItemText>
                </MenuItem>

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
                    <div style={{ display: 'flex', justifyContent: 'flex-end', flex: 1 }}>
                      <Exit style={{ padding: '10px' }} />
                    </div>
                    <ListItemText inset style={{ flex: 2 }}>
                      Logout
                    </ListItemText>
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

export default withRouter(connect(mapStateToProps)(AuthMenu));